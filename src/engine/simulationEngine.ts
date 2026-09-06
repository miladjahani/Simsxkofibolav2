import { SimulationInputs, SimulationResults, StreamData, ProcessFlowsheet } from './types';
import { TOPOLOGY_METADATA } from '../data/referenceDatasets';

/* =========================================================================
 *  موتور شبیه‌سازی فرمول‌محور SimSXEWCu Pro (نسخه توسعه‌یافته v7.1)
 *  ------------------------------------------------------------------------
 *  این موتور برخلاف نسخه قبلی (که صرفاً بنچ‌مارک‌های اکسل را به‌صورت خطی
 *  مقیاس می‌کرد)، تمام خروجی‌ها را با معادلات دقیق متالورژیکی و الکتروشیمی
 *  محاسبه می‌کند و با داده‌های مرجع نسخه 7.0 کافومبیلا کالیبره شده است:
 *
 *   ۱) استخراج:  ایزوترم تعادلی لانگمویر Lix984N + حل مرحله‌به‌مرحله
 *                جریان مخالف (McCabe-Thiele) با راندمان نزدیک‌شدن به تعادل.
 *   ۲) آهن(III): کو-استخراج شیمیایی وابسته به جایگاه‌های آزاد اکسترکتنت.
 *   ۳) شستشو:    حذف کشیدگی مکانیکی (منگنز/آهن) و اسکراب شیمیایی فریک.
 *   ۴) استریپ:  بازگشت مس به الکترولیت + راندمان استریپ آهن.
 *   ۵) EW:       قانون فارادی، راندمان جریان از شیمی الکترولیت، سلول‌ها.
 *   ۶) بلید:     موازنه آهن مدار (EWB) و کنترل منگنز با نسبت Fe/Mn.
 * ========================================================================= */

/* ------------------------- ثابت‌های کالیبراسیون ------------------------ */

// ظرفیت اختصاصی Lix984N: هر 1% حجمی اکسترکتنت ~ 0.488 گرم مس در لیتر آلی
const ML_PER_VV = 0.488256;
// ثابت تعادل ظاهری ایزوترم لانگمویر (L/g) در شرایط مرجع (اسید 5 g/L)
const ISOTHERM_K_REF = 6.2;
// راندمان نزدیک‌شدن به تعادل: طبقه اول E1 = 95% ، طبقات بعد = 97%
const E1_STAGE_EFF = 0.95;
const OTHER_STAGE_EFF = 0.97;
// کشیدگی مکانیکی فاز آبی در فاز آلی خروجی (لیتر بر مترمکعب آلی)
const AQ_ENTRAINMENT_L_M3 = 2.0;
// ضریب انتقال منگنز از کشیدگی به الکترولیت (کسر ثابت حالت ماندگار)
const MN_TRANSFER = 0.307;
// معادل کشیدگی مؤثر برای آهن در گزارش فاز آلی (L/m3)
const FE_DISP_ENTRAIN = 0.8 / 1000.0; // g/L به ازای هر g/L آهن کل PLS
// غلظت‌های ثابت الکترولیت/آلی (مقادیر صنعتی مدار مرجع)
const CU_ADVANCE = 49.7;   // g/L مس الکترولیت پیش‌رونده
const CU_SPENT = 35.0;     // g/L مس الکترولیت برگشتی
const SO_CU_1S = 2.04;     // g/L مس آلی عاری‌شده (1 طبقه استریپ، اسپنت 35 g/L)
const ACID_SPENT = 190.0;  // g/L اسید الکترولیت برگشتی
const FE_STRIP_EFF = 78.8; // % راندمان استریپینگ شیمیایی آهن(III)

// ضریب فارادی جرم مس به ازای آمپر-ساعت (g/Ah) — از ورودی kFactor گرفته می‌شود
const KF_DEFAULT = 1.1858;

// معادله بلید (EWB): تعادل آهن مدار — از رگرسیون روی بنچ‌مارک‌های مرجع
//   EWB = A + B × Fe_net   (m3/h)  =>  [Fe3+]spent = Fe_net / EWB
const EWB_A = 1.856;
const EWB_B = 0.32;

// راندمان شستشوی منگنز (η_mn) و حذف شیمیایی فریک (η_fe) برحسب نوع شستشو
interface WashCalibration {
  mnBase: number;   // η_mn مبنا
  fe3Base: number;  // η_fe3 مبنا (0 برای شستشوی فیزیکی صرف)
  mnAcidFactor: number; // ضریب اسیدی (اسکراب اسیدی منگنز را هم بهتر حذف می‌کند)
}

const WASH_CAL: Partial<Record<ProcessFlowsheet, WashCalibration>> = {
  B1: { mnBase: 0.71, fe3Base: 0.15, mnAcidFactor: 1.0 },
  B2: { mnBase: 0.71, fe3Base: 0.15, mnAcidFactor: 1.0 },
  C1: { mnBase: 0.902, fe3Base: 0.38, mnAcidFactor: 1.0 },
  C2: { mnBase: 0.902, fe3Base: 0.38, mnAcidFactor: 1.0 },
  D1: { mnBase: 0.871, fe3Base: 0.65, mnAcidFactor: 0.62 },
  D2: { mnBase: 0.871, fe3Base: 0.65, mnAcidFactor: 0.62 },
  E1: { mnBase: 0.885, fe3Base: 0.69, mnAcidFactor: 0.60 },
  E2: { mnBase: 0.885, fe3Base: 0.69, mnAcidFactor: 0.60 }
};

// غلظت تجربی فروس در الکترولیت برگشتی برحسب دسته مدار (مقیاس با [Fe2+]PLS)
const FE2_SPENT_REF: Partial<Record<ProcessFlowsheet, number>> = {
  A1: 0.0004, A2: 0.0004, B1: 0.0004, B2: 0.0004,
  C1: 0.436, C2: 0.4456, D1: 0.1373, D2: 0.1494, E1: 0.1296, E2: 0.1608
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const pos = (v: number) => Math.max(0, v);

/* ----------------------------- ابزارهای ریاضی -------------------------- */

/** ایزوترم تعادلی لانگمویر: [Cu]org,eq = ML × K×x / (1 + K×x) */
function equilibriumLoading(xAq: number, ml: number, k: number): number {
  if (xAq <= 0 || ml <= 0) return 0;
  return (ml * k * xAq) / (1 + k * xAq);
}

/**
 * حل مرحله‌به‌مرحله استخراج جریان مخالف با روش دوگانه نیمه‌یابی (Bisection):
 * برای یک رافینیت فرضی R از طبقه آخر به سمت طبقه اول پیمایش می‌شود و خوراک
 * محاسبه‌شده با خوراک واقعی مقایسه می‌شود؛ ریشه G(R) = خوراک، رافینیت واقعی است.
 */
function solveExtractionStages(opts: {
  stages: number;
  ratioOA: number;
  feedCu: number;
  soCu: number;
  ml: number;
  k: number;
  parallel: boolean;
}): { loCu: number; rafCu: number } {
  const { stages, ratioOA, feedCu, soCu, ml, k, parallel } = opts;
  if (feedCu <= 0 || ml <= 0 || stages <= 0 || ml < soCu) {
    return { loCu: soCu, rafCu: feedCu };
  }
  const stageEff = (s: number) =>
    (s === 1 ? E1_STAGE_EFF : OTHER_STAGE_EFF) * (parallel ? 0.99 : 1.0);

  // محاسبه خوراک معادل یک رافینیت فرضی R (پیمایش از آخرین طبقه به سمت اول)
  const impliedFeed = (rafGuess: number): number => {
    let xNext = rafGuess; // فاز آبی خروجی از آخرین طبقه
    let yNext = soCu;     // بار آلی ورودی به آخرین طبقه (SO)
    for (let s = stages; s >= 1; s--) {
      const yEq = equilibriumLoading(xNext, ml, k);
      const yOut = stageEff(s) * yEq + (1 - stageEff(s)) * yNext;
      // موازنه جرم طبقه: x_{in} = x_{out} + r×(y_{out} - y_{in})
      xNext = Math.max(0, xNext + ratioOA * (yOut - yNext));
      yNext = yOut;
    }
    return xNext;
  };

  // نیمه‌یابی رافینیت: خوراک ضمنی تابع صعودی R است؛ ریشه G(R) = feed را می‌یابیم
  let lo = 0;
  let hi = feedCu;
  for (let it = 0; it < 80; it++) {
    const mid = (lo + hi) / 2;
    if (impliedFeed(mid) > feedCu) {
      hi = mid; // خوراک ضمنی بیش از حد -> رافینیت واقعی کمتر است
    } else {
      lo = mid;
    }
  }
  const rafCu = (lo + hi) / 2;
  // محاسبه نهایی بارها با رافینیت یافت‌شده
  const xChain: number[] = new Array(stages + 1).fill(0);
  const yChain: number[] = new Array(stages + 2).fill(0);
  yChain[stages + 1] = soCu;
  xChain[stages] = rafCu;
  for (let s = stages; s >= 1; s--) {
    const yEq = equilibriumLoading(xChain[s], ml, k);
    yChain[s] = stageEff(s) * yEq + (1 - stageEff(s)) * yChain[s + 1];
    xChain[s - 1] = Math.max(0, xChain[s] + ratioOA * (yChain[s] - yChain[s + 1]));
  }
  return { loCu: pos(yChain[1]), rafCu: pos(rafCu) };
}

/* --------------------------- مدل واحدها -------------------------------- */

interface OrganicChemistry {
  chemFe3: number;       // فریک کو-استخراج‌شده شیمیایی (g/L آلی)
  postWashFe3: number;   // فریک پس از شستشو/اسکراب (g/L آلی) - برای موازنه آهن
  displayFe3: number;    // فریک گزارش‌شده LO نهایی (طبق رفتار واقعی شستشو)
  soFe3: number;         // فریک آلی عاری‌شده پس از استریپ
  entMn: number;         // منگنز کشیدگی مکانیکی (g/L آلی)
  entFeDisp: number;     // آهن کل کشیدگی برای گزارش LO (g/L آلی)
  washType: 'none' | 'launder' | 'mixer-water' | 'mixer-acid' | 'mixer-ewb';
  washFlow: number;      // دبی محلول شستشو (m3/h)
  mnWashEff: number;     // % حذف منگنز
  feScrubEff: number;    // % حذف فریک شیمیایی
  feNetKgH: number;      // آهن خالص ورودی به الکترولیت (kg/h)
}

/** محاسبه شیمی آلی (Fe/Mn) + مرحله شستشو/اسکراب */
function computeOrganicChemistry(i: SimulationInputs, organicFlow: number, plsFe3: number, ml: number): OrganicChemistry {
  const flowsheet = i.flowsheet;
  const isD = flowsheet.startsWith('D');
  const isE = flowsheet.startsWith('E');
  const isC = flowsheet.startsWith('C');
  const isB = flowsheet.startsWith('B');
  const cal = WASH_CAL[flowsheet];
  // کو-استخراج شیمیایی فریک: با کاهش %ML (افزایش جایگاه آزاد) به‌صورت درجه دوم رشد می‌کند
  //   [Fe3+]LO = [Fe3+]PLS × 0.0153 × ((100 - %ML)/20)^2   (کالیبره با بنچ‌مارک)
  const freeSites = clamp((100 - i.targetPercentML) / 20, 0, 3);
  const chemFe3 = plsFe3 * 0.0153 * freeSites * freeSites;

  // --- مرحله شستشو/اسکراب ---
  let washType: OrganicChemistry['washType'] = 'none';
  let washFlow = 0;
  let mnWashEff = 0;
  let feScrubEff = 0;
  let postWashFe3 = chemFe3;
  let mnAcidFactor = 1.0;

  if (isB && cal) {
    // شستشوی لندر فاز آلی: دبی آب متناسب با (100 - درصد بای‌پاس)
    washType = 'launder';
    const bypassFrac = clamp((100 - i.washBypass) / 60, 0, 1.667);
    washFlow = organicFlow * 0.008 * bypassFrac;
    mnWashEff = clamp(cal.mnBase * bypassFrac, 0, 0.95) * 100;
    feScrubEff = clamp(cal.fe3Base * bypassFrac, 0, 0.95) * 100;
    postWashFe3 = chemFe3 * (1 - cal.fe3Base * clamp(bypassFrac, 0, 1));
  } else if (isC || isD || isE) {
    // میکسر-ستلر شستشو: دبی آب = Q_org / (O/A شستشو)
    washType = isC ? 'mixer-water' : isD ? 'mixer-acid' : 'mixer-ewb';
    const oaWash = Math.max(i.washStageOA, 5);
    const flowFactor = Math.sqrt(50 / oaWash); // O/A بالاتر = آب کمتر = حذف کمتر
    if (isC) {
      washFlow = organicFlow / oaWash;
      mnWashEff = clamp(cal.mnBase * flowFactor, 0, 0.95) * 100;
      feScrubEff = clamp(cal.fe3Base * flowFactor, 0, 0.95) * 100;
      postWashFe3 = chemFe3 * (1 - cal.fe3Base * clamp(flowFactor, 0, 1));
    } else {
      // اسکراب شیمیایی فریک با آب اسیدی (D) یا بلید رقیق‌شده EW (E)
      // راندمان موثر = راندمان ورودی کاربر × تصحیح نسبت O/A شستشو
      washFlow = organicFlow / oaWash;
      const scrubIn = clamp(i.feScrubbingEff / 100, 0, 1);
      const typeScale = isE ? 1.06 : 1.0; // اسکراب با بلید رقیق‌شده اندکی موثرتر است
      feScrubEff = clamp(scrubIn * typeScale * flowFactor, 0, 0.95) * 100;
      mnWashEff = clamp(cal.mnBase * flowFactor, 0, 0.95) * 100;
      postWashFe3 = chemFe3 * (1 - feScrubEff / 100);
      mnAcidFactor = cal.mnAcidFactor;
    }
  }

  // فریک آلی عاری‌شده پس از استریپینگ
  const soFe3 = postWashFe3 * (1 - FE_STRIP_EFF / 100);

  // کشیدگی مکانیکی منگنز و آهن (پس از شستشو)
  const mnRemovedFrac = (mnWashEff / 100) * 1;
  const entMn = (AQ_ENTRAINMENT_L_M3 / 1000) * i.plsMn * MN_TRANSFER * (1 - mnRemovedFrac) * mnAcidFactor;
  const entFeDisp = FE_DISP_ENTRAIN * (i.plsFe3 + i.plsFe2) * (1 - mnRemovedFrac);

  // آهن خالص ورودی به الکترولیت = استریپ فریک شیمیایی باقی‌مانده روی آلی
  const feNetKgH = (postWashFe3 - soFe3) * organicFlow;

  // فریک گزارش‌شده در LO نهایی: در شستشوی فیزیکی (B/C) فقط کشیدگی حذف می‌شود و
  // فریک شیمیایی کو-استخراج‌شده سر جای خود می‌ماند؛ در اسکراب اسیدی (D/E) حذف می‌شود.
  const isPhysicalWash = isB || isC;
  const displayFe3 = isPhysicalWash ? chemFe3 + entFeDisp : postWashFe3 + entFeDisp;

  return { chemFe3, postWashFe3, displayFe3, soFe3, entMn, entFeDisp, washType, washFlow, mnWashEff, feScrubEff, feNetKgH };
}

/** موازنه سلول‌های الکترووینینگ با قانون فارادی */
function computeEWCellModel(i: SimulationInputs, ce: number) {
  const currentDensity = Math.max(i.currentDensity, 1);
  const cathodeArea = Math.max(i.cathodeArea, 0.1);
  const cathodesPerCell = Math.max(i.cathodesPerCell, 1);
  const cathodeVelocity = Math.max(i.cathodeVelocity, 0.01);
  const kFactor = i.kFactor > 0 ? i.kFactor : KF_DEFAULT;

  // آمپراژ سلول:  I (kA) = i(A/m2) × A(m2) × n / 1000
  const cellAmperage = (currentDensity * cathodeArea * cathodesPerCell) / 1000;
  // دبی الکترولیت هر سلول:  Q = A × n × v  (m3/h)
  const flowPerCell = cathodeArea * cathodesPerCell * cathodeVelocity;
  // تولید کاتدی هر سلول:  m (kg/h) = I(A) × kF(g/Ah) × CE/100 / 1000
  const cathodePerCell = (cellAmperage * 1000 * kFactor * (ce / 100)) / 1000;
  // ولتاژ سلول (ارتباط تجربی با دانسیته جریان)
  const cellVoltage = 2.0 + 0.001 * (currentDensity - 300);
  return { cellAmperage, flowPerCell, cathodePerCell, cellVoltage, kFactor };
}

/* =========================================================================
 *  اجرای شبیه‌سازی اصلی
 * ========================================================================= */

export function runSimulation(inputs: SimulationInputs): SimulationResults {
  const flowsheet = inputs.flowsheet;
  const topoMeta = TOPOLOGY_METADATA[inputs.topology];
  const nStages = topoMeta ? topoMeta.stagesEx : 2;
  const nStrip = topoMeta ? topoMeta.stagesStrip : 1;
  const hasWash = WASH_CAL[flowsheet] !== undefined;
  const isRecirc = flowsheet.endsWith('2');

  // مقادیر ایمن ورودی
  const plsFlow = Math.max(inputs.plsFlow, 1);
  const plsCu = Math.max(inputs.plsCu, 0.01);
  const plsFe3 = Math.max(inputs.plsFe3, 0);
  const plsFe2 = Math.max(inputs.plsFe2, 0);
  const plsMn = Math.max(inputs.plsMn, 0);
  const plsAcid = Math.max(inputs.plsAcid, 0.1);
  const ratioOA = Math.max(inputs.ratioOA, 0.3);
  const targetML = clamp(inputs.targetPercentML, 30, 98);
  const parallel = topoMeta ? topoMeta.parallel : false;

  const organicFlow = plsFlow * ratioOA;
  const cuInFeedTotal = (plsFlow * plsCu) / 1000; // t/h بار مس خوراک

  // واکشی نتایج برای یک خوراک آبی مشخص (حل سایزینگ اکسترکتنت + طبقات)
  const solveForFeed = (feedCu: number, _feedFlow: number, feedAcid: number) => {
    // ثابت ایزوترم با تصحیح اسیدی: اسید بالاتر -> تعادل به سمت چپ (K کمتر)
    const kIso = ISOTHERM_K_REF * Math.pow(5 / Math.max(feedAcid, 0.5), 0.9);
    // سایزینگ اکسترکتنت: نیمه‌یابی v/v% تا بارگیری آلی به %ML هدف برسد.
    // تابع %ML(vv) با کاهش vv صعودی است؛ ریشه در بازه [vvMin, vvMax] جستجو می‌شود.
    const soCu = SO_CU_1S - (nStrip - 1) * 0.71; // طبقات استریپ بیشتر -> SO کمتر
    const runAt = (vv: number) => {
      const ml = vv * ML_PER_VV;
      const sr = solveExtractionStages({ stages: nStages, ratioOA, feedCu, soCu, ml, k: kIso, parallel });
      return { ml, loCu: sr.loCu, rafCu: Math.min(sr.rafCu, feedCu) };
    };
    const pctMlAt = (vv: number) => {
      const r = runAt(vv);
      return clamp((r.loCu / Math.max(r.ml, 1e-6)) * 100, 0, 100);
    };
    const vvMin = Math.max(5.0, soCu / (ML_PER_VV * 0.75));
    const vvMax = 60.0;
    let lo = vvMin;
    let hi = vvMax;
    for (let it = 0; it < 60; it++) {
      const mid = (lo + hi) / 2;
      if (pctMlAt(mid) > targetML) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    const vv = (lo + hi) / 2;
    const fin = runAt(vv);
    return { vv, loCu: fin.loCu, rafCu: fin.rafCu, ml: fin.ml, soCu };
  };

  // پاس اول: خوراک خالص PLS (برای محاسبه بلید و شیمی آهن)
  const pass1 = solveForFeed(plsCu, plsFlow, plsAcid);
  const chem1 = computeOrganicChemistry(inputs, organicFlow, plsFe3, pass1.ml);

  // دبی بلید الکترووینینگ از موازنه آهن مدار
  let ewbFlow = Math.max(EWB_A + EWB_B * chem1.feNetKgH, 0.5);
  let spentFe3 = chem1.feNetKgH / ewbFlow;

  // پاس دوم برای مدارهای بازچرخانی: اختلاط PLS با بلید در ورودی E1
  let mixedFlow = plsFlow;
  let mixedCu = plsCu;
  let mixedMn = plsMn;
  let mixedFe3 = plsFe3;
  let mixedFe2 = plsFe2;
  let pass2 = pass1;
  if (isRecirc && ewbFlow > 0.1) {
    mixedFlow = plsFlow + ewbFlow;
    // غلظت اختلاط در ورودی E1 (بلید: Cu=35, Fe3+=spentFe3, Fe2+=spentFe2, اسید=190)
    const mixedAcid = (plsFlow * plsAcid + ewbFlow * ACID_SPENT) / mixedFlow;
    mixedCu = (plsFlow * plsCu + ewbFlow * CU_SPENT) / mixedFlow;
    const fe2SpentRef = FE2_SPENT_REF[flowsheet] ?? 0.0004;
    const fe2Spent0 = fe2SpentRef * (plsFe2 / 2.0);
    mixedFe3 = (plsFlow * plsFe3 + ewbFlow * spentFe3) / mixedFlow;
    mixedFe2 = (plsFlow * plsFe2 + ewbFlow * fe2Spent0) / mixedFlow;
    pass2 = solveForFeed(mixedCu, mixedFlow, mixedAcid);
  }
  const sx = isRecirc ? pass2 : pass1;

  // --- غلظت‌های نهایی الکترولیت برگشتی ---
  const chemFinal = isRecirc
    ? computeOrganicChemistry(inputs, organicFlow, Math.max(mixedFe3, plsFe3 * 0.5), sx.ml)
    : chem1;
  const feNetFinal = isRecirc ? chemFinal.feNetKgH : chem1.feNetKgH;
  const ewbFinal = Math.max(EWB_A + EWB_B * feNetFinal, 0.5);

  // فریک الکترولیت برگشتی: [Fe3+]spent = Fe_net / EWB
  const fe3Spent = feNetFinal / ewbFinal;
  // فروس الکترولیت برگشتی (کالیبره مرجع برحسب دسته مدار، مقیاس‌شده با PLS)
  const fe2Spent = (FE2_SPENT_REF[flowsheet] ?? 0.0004) * (plsFe2 / 2.0);
  // منگنز الکترولیت برگشتی: حالت ماندگار = ورودی منگنز استریپ‌شده / دبی بلید
  //   [Mn]spent = (Q_org × e × [Mn]PLS × τ × (1-ηwash) × κ) / EWB
  const mnSpent = (chemFinal.entMn * organicFlow) / ewbFinal;
  const feMnRatio = (fe3Spent + fe2Spent) / Math.max(mnSpent, 1e-4);

  // کنترل ردوکس منگنز: در Fe/Mn < 7 منگنز اکسید می‌شود (Mn3+ و پرمنگنات)
  const mnOxidizedFrac = clamp(0.1667 * (7 - feMnRatio), 0, 0.85);
  const mn3Spent = mnSpent * mnOxidizedFrac;
  const mno4Spent = 0.72 * mn3Spent;

  // راندمان جریان کاتدی: افت نمایی با فریک الکترولیت (کالیبره بنچ‌مارک)
  const ce = clamp(100 - 9.24 * (1 - Math.exp(-0.9 * fe3Spent)), 30, 99.5);
  const ceScavenger = ce - 0.155;
  const ceCommercial = ce;

  // --- موازنه مس، تولید و ریکاوری ---
  const rafCu = sx.rafCu;
  const loCu = sx.loCu;
  const dCuOrg = Math.max(loCu - sx.soCu, 0.001);
  const extractionEffFresh =
    ((plsFlow * plsCu - rafCu * (isRecirc ? mixedFlow : plsFlow)) / (plsFlow * plsCu)) * 100;

  // دبی الکترولیت پیش‌رونده از موازنه مس استریپ:
  //   Q_adv × (49.7 - 35) = Q_org × ([Cu]LO - [Cu]SO)
  const adElFlow = (organicFlow * dCuOrg) / (CU_ADVANCE - CU_SPENT);
  const spentRecircFlow = 3.71 * adElFlow; // نسبت بازچرخانی مدار مرجع
  const copperToElectrolyte = organicFlow * dCuOrg; // kg/h

  // تولید مس کاتدی
  const cuBleedKgH = ewbFinal * CU_SPENT; // kg/h مس تلف‌شده در بلید
  let totalCuProdKgH: number;
  if (isRecirc) {
    // بلید به E1 برمی‌گردد: اتلاف فقط رافینیت است
    totalCuProdKgH = plsFlow * plsCu - rafCu * mixedFlow;
  } else {
    totalCuProdKgH = plsFlow * plsCu - rafCu * plsFlow - cuBleedKgH;
    // مدار D بدون بازچرخانی: خروجی اسکراب (WSOS) به پوند رفته و مس آن از دست می‌رود
    if (flowsheet.startsWith('D') && hasWash) {
      const wsosCuLoss = 0.64 * plsCu * chemFinal.washFlow;
      totalCuProdKgH -= wsosCuLoss;
    }
  }
  const totalCuProduction = pos(totalCuProdKgH) / 1000; // t/h
  const globalRecovery = clamp((totalCuProdKgH / (plsFlow * plsCu)) * 100, 0, 100);

  const scavengerRatio = Math.max(inputs.cuPrScavengerRatio, 2.5);
  const scavengerCuProduction = totalCuProduction / scavengerRatio;
  const commercialCuProduction = totalCuProduction - scavengerCuProduction;

  // --- سلول‌های الکترووینینگ ---
  const ew = computeEWCellModel(inputs, ce);
  const nScav = adElFlow / Math.max(ew.flowPerCell, 0.1);
  const nCom = (adElFlow + spentRecircFlow) / Math.max(ew.flowPerCell, 0.1);
  const totalCells = nScav + nCom;
  const energyConsumption = (ew.cellVoltage * 1000) / (ew.kFactor * (ce / 100));
  const totalEnergyMW = (ew.cellAmperage * ew.cellVoltage * totalCells) / 1000;

  // --- مصارف ویژه (کالیبره با بنچ‌مارک‌های مرجع) ---
  const perTon = (v: number) => (totalCuProduction > 0.0001 ? v / totalCuProduction : 0);
  const cobaltConsumption = 0.0646 + 0.1267 * (fe3Spent + fe2Spent);
  const acidConsumption = 0.1135 + 0.2662 * (ewbFinal / Math.max(totalCuProduction, 0.001));
  const deminWaterConsumption = 0.887 * (ewbFinal / Math.max(totalCuProduction, 0.001));
  const rawWaterConsumption = perTon(chemFinal.washFlow);
  const washAcidConsumption = flowsheet.startsWith('D') && hasWash
    ? perTon(chemFinal.washFlow * 15.5)
    : undefined;
  const extractantLost = perTon(0.0736 * organicFlow * (sx.vv / 100));
  const diluentLost = perTon(0.0656 * organicFlow * (1 - sx.vv / 100));
  const cuLostAdditionalWater = 0.3569 * (1 + 0.86 * (chemFinal.washFlow / Math.max(totalCuProduction, 0.001)));
  const cuLostPercentCathode = (cuLostAdditionalWater / Math.max(totalCuProduction, 0.001)) / 10;
  const acidLostAdditionalWater = 19.019 * (1 + 0.86 * (chemFinal.washFlow / Math.max(totalCuProduction, 0.001)));
  const cuInBleedRatio = (cuBleedKgH / Math.max(totalCuProdKgH, 1e-6)) * 100;

  // pH ورودی به استخراج (ارتباط تجربی با اسید آزاد)
  const plsE_pH = clamp(1.5865 + 0.35 * Math.log10(5 / plsAcid), 0.7, 3.5);

  // --- خروجی‌های فاز آلی برای گزارش ---
  const loCuExEn = loCu + 0.0006 * (plsCu / 2.5);
  const loFeExEn = chemFinal.displayFe3;
  // نسبت Cu/Fe شیمیایی (بدون کشیدگی) و نسبت نهایی شامل کشیدگی
  const cuFeOrganicEx = loCu / Math.max(chemFinal.chemFe3, 1e-6);
  const cuFeOrganicExEn = loCuExEn / Math.max(loFeExEn, 1e-6);
  const strippingEff = ((loCu - sx.soCu) / Math.max(loCu, 0.001)) * 100;
  const netTransfer = dCuOrg / Math.max(sx.vv, 0.1);

  /* ----------------------------- جریان‌ها ----------------------------- */
  const streams: StreamData[] = [];
  const pushStream = (s: StreamData) => streams.push(s);

  const rafFlow = isRecirc ? mixedFlow : plsFlow * 1.00025;
  pushStream({
    id: 's_pls',
    name: 'محلول باردار ترشیحی (PLS)',
    nameEn: 'Pregnant Leach Solution (PLS)',
    flow: plsFlow,
    cu: plsCu,
    fe3: plsFe3,
    fe2: plsFe2,
    mn: plsMn,
    acid: plsAcid,
    phase: 'aqueous',
    descriptionFa: 'محلول خوراک ورودی استخراج حلالی حاصل از مدار هیپ‌لیچینگ مس'
  });
  pushStream({
    id: 's_raf_final',
    name: 'رافینیت نهایی (Final Raffinate)',
    nameEn: 'Final Raffinate to Pond/Leach',
    flow: rafFlow,
    cu: rafCu,
    fe3: plsFe3 * (1 - 0.0153 * Math.pow(clamp((100 - targetML) / 20, 0, 3), 2)),
    fe2: plsFe2,
    mn: plsMn,
    // اسید رافینیت = اسید خوراک + اسید آزادشده از استخراج (1.68 g اسید به ازای هر g مس)
    acid: plsAcid + 1.68 * (plsCu - rafCu) + (isRecirc ? 0.8 : 0.3),
    phase: 'aqueous',
    descriptionFa: 'محلول عاری‌شده از مس خروجی از آخرین طبقه استخراج به سمت پوند رافینیت'
  });
  pushStream({
    id: 's_lo',
    name: 'فاز آلی باردار اولیه (Loaded Organic)',
    nameEn: 'Loaded Organic (Outlet of E1)',
    flow: organicFlow,
    cu: loCu,
    fe3: chemFinal.chemFe3, // پیش از شستشو/اسکراب (خروجی E1)
    fe2: 0.0,
    mn: 0.0,
    acid: 0.0,
    phase: 'organic',
    descriptionFa: 'فاز آلی باردارشده با مس خروجی از مرحله اول استخراج E1'
  });
  pushStream({
    id: 's_lo_tank',
    name: 'فاز آلی باردار پس از کوالسر و مخزن LOT',
    nameEn: 'Loaded Organic after LOT (+Entrainment)',
    flow: organicFlow,
    cu: loCuExEn,
    fe3: loFeExEn,
    // (fe3 در LOT گزارش‌شده = displayFe3)
    fe2: chemFinal.entFeDisp * (plsFe2 / Math.max(plsFe3 + plsFe2, 0.01)),
    mn: chemFinal.entMn,
    acid: 0.0,
    phase: 'organic',
    descriptionFa: 'فاز آلی باردار آماده ورود به مرحله شستشو یا استریپینگ با احتساب کشیدگی مکانیکی'
  });
  pushStream({
    id: 's_so',
    name: 'فاز آلی عاری‌شده (Stripped Organic)',
    nameEn: 'Stripped Organic (SO)',
    flow: organicFlow,
    cu: sx.soCu,
    fe3: chemFinal.soFe3,
    fe2: 0.0,
    mn: 0.0,
    acid: 0.0,
    phase: 'organic',
    descriptionFa: 'فاز آلی بازگشتی از مرحله استریپینگ به استیج استخراج'
  });
  pushStream({
    id: 's_adel',
    name: 'الکترولیت پیش‌رونده (Advance Electrolyte)',
    nameEn: 'Advance Electrolyte to EW',
    flow: adElFlow,
    cu: CU_ADVANCE,
    fe3: fe3Spent,
    fe2: fe2Spent,
    mn: mnSpent,
    // اسید پیش‌رونده = اسید اسپنت منهای اسید بازتولیدشده در EW
    acid: ACID_SPENT - ((CU_ADVANCE - CU_SPENT) * 98.079) / 63.546,
    phase: 'aqueous',
    descriptionFa: 'الکترولیت غنی‌شده از مس خروجی از استریپینگ به سمت سلول‌های اسکونجر الکترووینینگ'
  });
  pushStream({
    id: 's_spel',
    name: 'الکترولیت بازگشتی مصرف‌شده (Spent Electrolyte)',
    nameEn: 'Spent Electrolyte from EW Cells',
    flow: adElFlow,
    cu: CU_SPENT,
    fe3: fe3Spent,
    fe2: fe2Spent,
    mn: mnSpent,
    acid: ACID_SPENT,
    phase: 'aqueous',
    descriptionFa: 'الکترولیت اسیدی عاری از مس کاتدی بازگشتی به مخزن استریپینگ'
  });
  pushStream({
    id: 's_ewb',
    name: 'بلید الکترووینینگ (Copper EW Bleed)',
    nameEn: 'Copper Electrowinning Bleed (EWB)',
    flow: ewbFinal,
    cu: CU_SPENT,
    fe3: fe3Spent,
    fe2: fe2Spent,
    mn: mnSpent,
    acid: ACID_SPENT,
    phase: 'aqueous',
    descriptionFa: 'جریان خروجی بلید جهت کنترل و تثبیت غلظت آهن و ناخالصی‌ها در الکترولیت'
  });

  // جریان‌های مرحله شستشو/اسکراب
  if (hasWash && chemFinal.washFlow > 0.01) {
    const isE = flowsheet.startsWith('E');
    const isD = flowsheet.startsWith('D');
    const washFeedCu = isE ? 2.95 : 0;
    const wsosFlow = chemFinal.washFlow + organicFlow * (AQ_ENTRAINMENT_L_M3 / 1000) * 0.5;
    pushStream({
      id: 's_wash_in',
      name: isE ? 'بلید رقیق‌شده EW (خوراک اسکراب)' : 'محلول ورودی مرحله شستشو',
      nameEn: isE ? 'Diluted EW Bleed (Scrub Feed)' : 'Wash / Scrub Inlet Solution',
      flow: chemFinal.washFlow,
      cu: washFeedCu,
      fe3: isE ? 0.07 : 0,
      fe2: 0,
      mn: 0,
      acid: isD ? 15.5 : isE ? 15.0 : 0,
      phase: 'aqueous',
      descriptionFa: 'آب خام یا محلول اسیدی تزریقی جهت شستشو یا اسکراب فاز آلی'
    });
    pushStream({
      id: 's_wsos',
      name: 'محلول خروجی مرحله شستشو (WSOS)',
      nameEn: 'Wash Stage Outlet Solution (WSOS)',
      flow: wsosFlow,
      cu: isE ? 2.78 : isD ? 0.64 * plsCu : 0.028 * plsCu,
      fe3:
        isE || isD
          ? ((chemFinal.chemFe3 - chemFinal.postWashFe3) * organicFlow) /
            Math.max(chemFinal.washFlow, 1)
          : 0.046,
      fe2: 0.085 * plsFe2,
      mn: isE ? 0.021 * plsMn : isD ? 0.0238 * plsMn : 0.0875 * plsMn,
      acid: isD ? 12.0 : isE ? 15.0 : 0.7,
      phase: 'aqueous',
      descriptionFa: 'محلول خروجی از مرحله شستشو حامل یون‌های شسته‌شده منگنز و آهن'
    });
  }

  return {
    flowsheet,
    topology: inputs.topology,
    extractantVolPercent: sx.vv,
    maxLoading: sx.ml,
    plsE_pH,
    extractionEff: clamp(extractionEffFresh, 0, 100),
    cuFeOrganicEx,
    loCuExEn,
    loFeExEn,
    cuFeOrganicExEn,
    strippingEff,
    netTransfer,
    feStrippingEff: FE_STRIP_EFF,
    extractantLost,
    diluentLost,
    flowPerCell: ew.flowPerCell,
    cellAmperage: ew.cellAmperage,
    ceScavenger,
    ceCommercial,
    totalCuProduction,
    scavengerCuProduction,
    commercialCuProduction,
    numScavengerCells: nScav,
    numCommercialCells: nCom,
    feMnSpentElectrolyte: feMnRatio,
    mn3SpentElectrolyte: mn3Spent,
    mno4SpentElectrolyte: mno4Spent,
    cobaltConsumption,
    acidConsumption,
    deminWaterConsumption,
    rawWaterConsumption,
    washAcidConsumption,
    cuLostAdditionalWater,
    cuLostPercentCathode,
    acidLostAdditionalWater,
    cuInBleedRatio,
    globalRecovery,
    ewbFlow: ewbFinal,
    advanceElectrolyteFlow: adElFlow,
    spentElectrolyteRecircFlow: spentRecircFlow,
    organicFlow,
    cuInFeedTotal,
    copperToElectrolyte,
    feNetToElectrolyte: feNetFinal,
    washWaterFlow: chemFinal.washFlow,
    mnWashEfficiency: chemFinal.mnWashEff,
    feScrubEfficiency: chemFinal.feScrubEff,
    cellVoltage: ew.cellVoltage,
    energyConsumption,
    totalEnergyMW,
    totalCells,
    cathodePerCell: ew.cathodePerCell,
    streams
  };
}
