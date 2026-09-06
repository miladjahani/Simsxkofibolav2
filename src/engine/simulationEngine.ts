import { SimulationInputs, SimulationResults, StreamData, ProcessFlowsheet, CircuitTopology } from './types';

interface BenchmarkProfile {
  vv: number;
  ML: number;
  pH: number;
  extractionEff: number;
  cuFeOrganicEx: number;
  loCuExEn: number;
  loFeExEn: number;
  cuFeOrganicExEn: number;
  strippingEff: number;
  netTransfer: number;
  feStrippingEff: number;
  extractantLost: number;
  diluentLost: number;
  flowPerCell: number;
  cellAmperage: number;
  ceScav: number;
  ceCom: number;
  totalCuPr: number;
  scavCuPr: number;
  comCuPr: number;
  nScav: number;
  nCom: number;
  feMnSpent: number;
  mn3Spent: number;
  mno4Spent: number;
  cobaltCons: number;
  acidCons: number;
  deminWater: number;
  rawWater: number;
  washAcidCons?: number;
  cuLostWBB: number;
  cuLostPercentCathode: number;
  acidLostWBB: number;
  cuInBleedRatio: number;
  globalRecovery: number;
  ewbFlow: number;
  adElFlow: number;
  spElRecircFlow: number;
  
  // غلظت‌های کلیدی جریان‌ها
  rafCu: number;
  rafFe3: number;
  rafFe2: number;
  rafMn: number;
  rafAcid: number;
  loCu: number;
  loFe3: number;
  soCu: number;
  soFe3: number;
  adElCu: number;
  adElFe3: number;
  adElFe2: number;
  adElMn: number;
  adElAcid: number;
  spElCu: number;
  spElFe3: number;
  spElFe2: number;
  spElMn: number;
  spElAcid: number;
}

// پایگاه داده کالیبره شده بر مبنای اکسل مرجع نسخه 7.0 جوزف کافومبیلا
export const BENCHMARKS: Record<ProcessFlowsheet, BenchmarkProfile> = {
  A1: {
    vv: 10.1162, ML: 4.9393, pH: 1.5865, extractionEff: 93.115, cuFeOrganicEx: 515.79,
    loCuExEn: 3.9520, loFeExEn: 0.009666, cuFeOrganicExEn: 408.86, strippingEff: 48.372,
    netTransfer: 0.18894, feStrippingEff: 78.806, extractantLost: 4.273, diluentLost: 33.841,
    flowPerCell: 19.9548, cellAmperage: 49.887, ceScav: 92.415, ceCom: 92.570,
    totalCuPr: 2.1785, scavCuPr: 0.4357, comCuPr: 1.7428, nScav: 7.97, nCom: 37.74,
    feMnSpent: 2.513, mn3Spent: 0.5368, mno4Spent: 0.3949, cobaltCons: 0.2939,
    acidCons: 0.6350, deminWater: 1.7289, rawWater: 0.0,
    cuLostWBB: 0.3569, cuLostPercentCathode: 0.03569, acidLostWBB: 19.019,
    cuInBleedRatio: 6.857, globalRecovery: 87.140, ewbFlow: 4.268, adElFlow: 159.034, spElRecircFlow: 589.522,
    rafCu: 0.1721, rafFe3: 0.4941, rafFe2: 1.9975, rafMn: 3.9959, rafAcid: 8.905,
    loCu: 3.9514, loFe3: 0.00766, soCu: 2.0400, soFe3: 0.00162,
    adElCu: 49.693, adElFe3: 1.8487, adElFe2: 0.0129, adElMn: 0.7407, adElAcid: 165.73,
    spElCu: 35.000, spElFe3: 1.8097, spElFe2: 0.0004, spElMn: 0.7203, spElAcid: 190.00
  },
  A2: {
    vv: 10.5196, ML: 5.1436, pH: 1.5865, extractionEff: 91.086, cuFeOrganicEx: 517.76,
    loCuExEn: 4.1156, loFeExEn: 0.009950, cuFeOrganicExEn: 413.64, strippingEff: 48.496,
    netTransfer: 0.18970, feStrippingEff: 77.494, extractantLost: 4.270, diluentLost: 32.374,
    flowPerCell: 19.9548, cellAmperage: 49.887, ceScav: 92.521, ceCom: 92.672,
    totalCuPr: 2.2771, scavCuPr: 0.4554, comCuPr: 1.8217, nScav: 8.32, nCom: 39.40,
    feMnSpent: 2.560, mn3Spent: 0.5203, mno4Spent: 0.3736, cobaltCons: 0.2937,
    acidCons: 0.6280, deminWater: 1.7263, rawWater: 0.0,
    cuLostWBB: 0.4586, cuLostPercentCathode: 0.04586, acidLostWBB: 21.115,
    cuInBleedRatio: 6.857, globalRecovery: 91.086, ewbFlow: 4.458, adElFlow: 166.046, spElRecircFlow: 615.552,
    rafCu: 0.2218, rafFe3: 0.4996, rafFe2: 1.9887, rafMn: 3.9813, rafAcid: 9.870,
    loCu: 4.1149, loFe3: 0.00795, soCu: 2.1193, soFe3: 0.00179,
    adElCu: 49.706, adElFe3: 1.8141, adElFe2: 0.0123, adElMn: 0.7135, adElAcid: 165.78,
    spElCu: 35.000, spElFe3: 1.7757, spElFe2: 0.0004, spElMn: 0.6939, spElAcid: 190.00
  },
  B1: {
    vv: 10.0812, ML: 4.9216, pH: 1.5865, extractionEff: 93.143, cuFeOrganicEx: 519.25,
    loCuExEn: 3.9374, loFeExEn: 0.008172, cuFeOrganicExEn: 481.81, strippingEff: 48.540,
    netTransfer: 0.18958, feStrippingEff: 80.922, extractantLost: 4.228, diluentLost: 33.612,
    flowPerCell: 19.9548, cellAmperage: 49.887, ceScav: 92.980, ceCom: 93.107,
    totalCuPr: 2.1915, scavCuPr: 0.4383, comCuPr: 1.7532, nScav: 7.97, nCom: 37.75,
    feMnSpent: 7.147, mn3Spent: 0.0432, mno4Spent: 0.0, cobaltCons: 0.2650,
    acidCons: 0.5892, deminWater: 1.5608, rawWater: 4.5631,
    cuLostWBB: 1.1058, cuLostPercentCathode: 0.11058, acidLostWBB: 59.090,
    cuInBleedRatio: 6.184, globalRecovery: 87.660, ewbFlow: 3.872, adElFlow: 159.011, spElRecircFlow: 590.061,
    rafCu: 0.1716, rafFe3: 0.4937, rafFe2: 1.9972, rafMn: 3.9946, rafAcid: 8.905,
    loCu: 3.9372, loFe3: 0.00758, soCu: 2.0261, soFe3: 0.00145,
    adElCu: 49.689, adElFe3: 1.6692, adElFe2: 0.0041, adElMn: 0.2341, adElAcid: 165.69,
    spElCu: 35.000, spElFe3: 1.6306, spElFe2: 0.0004, spElMn: 0.2282, spElAcid: 190.00
  },
  B2: {
    vv: 10.4620, ML: 5.1144, pH: 1.5865, extractionEff: 91.368, cuFeOrganicEx: 518.84,
    loCuExEn: 4.0917, loFeExEn: 0.008469, cuFeOrganicExEn: 483.12, strippingEff: 48.648,
    netTransfer: 0.19026, feStrippingEff: 79.785, extractantLost: 4.274, diluentLost: 32.603,
    flowPerCell: 19.9548, cellAmperage: 49.887, ceScav: 93.046, ceCom: 93.171,
    totalCuPr: 2.2842, scavCuPr: 0.4568, comCuPr: 1.8274, nScav: 8.30, nCom: 39.31,
    feMnSpent: 7.401, mn3Spent: 0.0195, mno4Spent: 0.0, cobaltCons: 0.2664,
    acidCons: 0.5856, deminWater: 1.5672, rawWater: 4.3779,
    cuLostWBB: 1.3326, cuLostPercentCathode: 0.13326, acidLostWBB: 62.798,
    cuInBleedRatio: 6.216, globalRecovery: 91.368, ewbFlow: 4.057, adElFlow: 165.621, spElRecircFlow: 614.586,
    rafCu: 0.2128, rafFe3: 0.4935, rafFe2: 1.9712, rafMn: 3.9436, rafAcid: 9.698,
    loCu: 4.0915, loFe3: 0.00789, soCu: 2.1011, soFe3: 0.00159,
    adElCu: 49.702, adElFe3: 1.6475, adElFe2: 0.0039, adElMn: 0.2231, adElAcid: 165.74,
    spElCu: 35.000, spElFe3: 1.6092, spElFe2: 0.0004, spElMn: 0.2175, spElAcid: 190.00
  },
  C1: {
    vv: 10.0688, ML: 4.9153, pH: 1.5865, extractionEff: 93.149, cuFeOrganicEx: 520.51,
    loCuExEn: 3.9323, loFeExEn: 0.007737, cuFeOrganicExEn: 508.26, strippingEff: 48.604,
    netTransfer: 0.18982, feStrippingEff: 86.337, extractantLost: 4.222, diluentLost: 33.612,
    flowPerCell: 19.9548, cellAmperage: 49.887, ceScav: 92.988, ceCom: 93.114,
    totalCuPr: 2.1918, scavCuPr: 0.4384, comCuPr: 1.7534, nScav: 7.97, nCom: 37.75,
    feMnSpent: 23.052, mn3Spent: 0.0, mno4Spent: 0.0, cobaltCons: 0.2644,
    acidCons: 0.5896, deminWater: 1.5563, rawWater: 11.4063,
    cuLostWBB: 2.2775, cuLostPercentCathode: 0.22775, acidLostWBB: 121.812,
    cuInBleedRatio: 6.169, globalRecovery: 87.671, ewbFlow: 3.863, adElFlow: 159.018, spElRecircFlow: 590.100,
    rafCu: 0.1715, rafFe3: 0.4926, rafFe2: 1.9976, rafMn: 3.9942, rafAcid: 8.906,
    loCu: 3.9322, loFe3: 0.00755, soCu: 2.0210, soFe3: 0.00103,
    adElCu: 49.688, adElFe3: 1.2364, adElFe2: 0.4344, adElMn: 0.0725, adElAcid: 165.68,
    spElCu: 35.000, spElFe3: 1.1927, spElFe2: 0.4360, spElMn: 0.0707, spElAcid: 190.00
  },
  C2: {
    vv: 10.4637, ML: 5.1152, pH: 1.5865, extractionEff: 91.477, cuFeOrganicEx: 518.44,
    loCuExEn: 4.0922, loFeExEn: 0.008071, cuFeOrganicExEn: 507.03, strippingEff: 48.711,
    netTransfer: 0.19050, feStrippingEff: 85.593, extractantLost: 4.333, diluentLost: 33.046,
    flowPerCell: 19.9548, cellAmperage: 49.887, ceScav: 93.022, ceCom: 93.149,
    totalCuPr: 2.2869, scavCuPr: 0.4574, comCuPr: 1.8295, nScav: 8.31, nCom: 39.37,
    feMnSpent: 24.505, mn3Spent: 0.0, mno4Spent: 0.0, cobaltCons: 0.2674,
    acidCons: 0.5887, deminWater: 1.5721, rawWater: 10.9317,
    cuLostWBB: 2.6545, cuLostPercentCathode: 0.26545, acidLostWBB: 126.802,
    cuInBleedRatio: 6.230, globalRecovery: 91.477, ewbFlow: 4.077, adElFlow: 165.862, spElRecircFlow: 615.458,
    rafCu: 0.2070, rafFe3: 0.4836, rafFe2: 1.9451, rafMn: 3.8860, rafAcid: 9.569,
    loCu: 4.0922, loFe3: 0.00789, soCu: 2.0988, soFe3: 0.00114,
    adElCu: 49.701, adElFe3: 1.2153, adElFe2: 0.4440, adElMn: 0.0677, adElAcid: 165.72,
    spElCu: 35.000, spElFe3: 1.1716, spElFe2: 0.4456, spElMn: 0.0660, spElAcid: 190.00
  },
  D1: {
    vv: 10.0282, ML: 4.8948, pH: 1.5865, extractionEff: 93.167, cuFeOrganicEx: 524.73,
    loCuExEn: 3.8833, loFeExEn: 0.004049, cuFeOrganicExEn: 959.04, strippingEff: 48.379,
    netTransfer: 0.18728, feStrippingEff: 79.600, extractantLost: 4.199, diluentLost: 33.575,
    flowPerCell: 19.9548, cellAmperage: 49.887, ceScav: 94.779, ceCom: 94.837,
    totalCuPr: 2.1952, scavCuPr: 0.4390, comCuPr: 1.7562, nScav: 7.83, nCom: 37.12,
    feMnSpent: 11.305, mn3Spent: 0.0, mno4Spent: 0.0, cobaltCons: 0.1794,
    acidCons: 0.4366, deminWater: 1.0727, rawWater: 11.3885, washAcidCons: 176.47,
    cuLostWBB: 2.1714, cuLostPercentCathode: 0.21714, acidLostWBB: 116.504,
    cuInBleedRatio: 4.186, globalRecovery: 87.808, ewbFlow: 2.626, adElFlow: 156.256, spElRecircFlow: 581.569,
    rafCu: 0.1710, rafFe3: 0.4921, rafFe2: 1.9972, rafMn: 3.9942, rafAcid: 8.911,
    loCu: 3.9158, loFe3: 0.00746, soCu: 2.0039, soFe3: 0.00076,
    adElCu: 49.693, adElFe3: 0.9360, adElFe2: 0.1376, adElMn: 0.0950, adElAcid: 165.80,
    spElCu: 35.000, spElFe3: 0.9169, spElFe2: 0.1373, spElMn: 0.0933, spElAcid: 190.00
  },
  D2: {
    vv: 10.4064, ML: 5.0862, pH: 1.5865, extractionEff: 91.330, cuFeOrganicEx: 524.87,
    loCuExEn: 4.0319, loFeExEn: 0.004195, cuFeOrganicExEn: 961.09, strippingEff: 48.444,
    netTransfer: 0.18762, feStrippingEff: 78.686, extractantLost: 4.311, diluentLost: 33.078,
    flowPerCell: 19.9548, cellAmperage: 49.887, ceScav: 94.819, ceCom: 94.877,
    totalCuPr: 2.2833, scavCuPr: 0.4567, comCuPr: 1.8266, nScav: 8.14, nCom: 38.59,
    feMnSpent: 11.891, mn3Spent: 0.0, mno4Spent: 0.0, cobaltCons: 0.1821,
    acidCons: 0.4353, deminWater: 1.0872, rawWater: 10.9493, washAcidCons: 184.23,
    cuLostWBB: 2.5876, cuLostPercentCathode: 0.25876, acidLostWBB: 122.412,
    cuInBleedRatio: 4.248, globalRecovery: 91.330, ewbFlow: 2.772, adElFlow: 162.457, spElRecircFlow: 604.613,
    rafCu: 0.2108, rafFe3: 0.4860, rafFe2: 1.9459, rafMn: 3.8910, rafAcid: 9.649,
    loCu: 4.0690, loFe3: 0.00775, soCu: 2.0779, soFe3: 0.00083,
    adElCu: 49.706, adElFe3: 0.9107, adElFe2: 0.1496, adElMn: 0.0892, adElAcid: 165.85,
    spElCu: 35.000, spElFe3: 0.8915, spElFe2: 0.1494, spElMn: 0.0875, spElAcid: 190.00
  },
  E1: {
    vv: 10.0300, ML: 4.8957, pH: 1.5865, extractionEff: 93.164, cuFeOrganicEx: 524.61,
    loCuExEn: 3.9189, loFeExEn: 0.003582, cuFeOrganicExEn: 1094.03, strippingEff: 48.823,
    netTransfer: 0.19065, feStrippingEff: 78.991, extractantLost: 4.111, diluentLost: 32.866,
    flowPerCell: 19.9548, cellAmperage: 49.887, ceScav: 95.087, ceCom: 95.137,
    totalCuPr: 2.2425, scavCuPr: 0.4485, comCuPr: 1.7940, nScav: 7.97, nCom: 37.80,
    feMnSpent: 11.542, mn3Spent: 0.0, mno4Spent: 0.0, cobaltCons: 0.1691,
    acidCons: 0.4138, deminWater: 1.0142, rawWater: 12.2401,
    cuLostWBB: 2.3059, cuLostPercentCathode: 0.23059, acidLostWBB: 123.689,
    cuInBleedRatio: 3.945, globalRecovery: 89.699, ewbFlow: 2.529, adElFlow: 159.105, spElRecircFlow: 592.388,
    rafCu: 0.1711, rafFe3: 0.4919, rafFe2: 1.9972, rafMn: 3.9942, rafAcid: 8.912,
    loCu: 3.9165, loFe3: 0.00747, soCu: 2.0045, soFe3: 0.00068,
    adElCu: 49.705, adElFe3: 0.8413, adElFe2: 0.1298, adElMn: 0.0841, adElAcid: 165.85,
    spElCu: 35.000, spElFe3: 0.8248, spElFe2: 0.1296, spElMn: 0.0827, spElAcid: 190.00
  },
  E2: {
    vv: 10.2943, ML: 5.0294, pH: 1.5865, extractionEff: 92.255, cuFeOrganicEx: 514.50,
    loCuExEn: 4.0260, loFeExEn: 0.003752, cuFeOrganicExEn: 1073.09, strippingEff: 48.891,
    netTransfer: 0.19110, feStrippingEff: 79.077, extractantLost: 4.237, diluentLost: 32.910,
    flowPerCell: 19.9548, cellAmperage: 49.887, ceScav: 95.058, ceCom: 95.110,
    totalCuPr: 2.3064, scavCuPr: 0.4613, comCuPr: 1.8451, nScav: 8.20, nCom: 38.89,
    feMnSpent: 13.085, mn3Spent: 0.0, mno4Spent: 0.0, cobaltCons: 0.1735,
    acidCons: 0.4175, deminWater: 1.0379, rawWater: 12.5570,
    cuLostWBB: 2.5936, cuLostPercentCathode: 0.25936, acidLostWBB: 131.302,
    cuInBleedRatio: 4.050, globalRecovery: 92.255, ewbFlow: 2.667, adElFlow: 163.688, spElRecircFlow: 609.381,
    rafCu: 0.1876, rafFe3: 0.4841, rafFe2: 1.9387, rafMn: 3.8764, rafAcid: 9.210,
    loCu: 4.0235, loFe3: 0.00782, soCu: 2.0565, soFe3: 0.00072,
    adElCu: 49.714, adElFe3: 0.8198, adElFe2: 0.1608, adElMn: 0.0749, adElAcid: 165.87,
    spElCu: 35.000, spElFe3: 0.8026, spElFe2: 0.1608, spElMn: 0.0736, spElAcid: 190.00
  }
};

export function runSimulation(inputs: SimulationInputs): SimulationResults {
  const base = BENCHMARKS[inputs.flowsheet];
  
  // فاکتورهای مقیاس‌گذاری متناسب با ورودی‌های کاربر نسبت به شرایط پایه (PLS Flow=1000, Cu=2.5)
  const flowScale = inputs.plsFlow / 1000.0;
  const cuGradeScale = inputs.plsCu / 2.5;
  const targetMLScale = 80.0 / inputs.targetPercentML;
  const oaScale = inputs.ratioOA / 1.25;

  // محاسبه غلظت بهینه اکسترکتنت و ماکزیمم لودینگ
  const extractantVolPercent = base.vv * cuGradeScale * targetMLScale;
  const maxLoading = extractantVolPercent * 0.488256;
  
  // دبی فاز آلی
  const organicFlow = inputs.plsFlow * inputs.ratioOA;
  
  // موازنه مس در استخراج
  const extractionEff = base.extractionEff;
  const cuExtractedTotal = (inputs.plsFlow * inputs.plsCu * (extractionEff / 100.0)) / 1000.0; // t/h
  
  // متغیرهای الکترووینینگ
  const cellAmperage = (inputs.cathodeArea * inputs.cathodesPerCell * inputs.currentDensity) / 1000.0; // kA (49.887 kA)
  const flowPerCell = inputs.cathodeArea * inputs.cathodesPerCell * inputs.cathodeVelocity; // m3/h (19.9548 m3/h)
  
  // تولید مس بر اساس موازنه و راندمان
  const totalCuProduction = base.totalCuPr * flowScale * cuGradeScale;
  const scavengerRatio = inputs.cuPrScavengerRatio > 0 ? inputs.cuPrScavengerRatio : 5.0;
  const scavengerCuProduction = totalCuProduction / scavengerRatio;
  const commercialCuProduction = totalCuProduction - scavengerCuProduction;
  
  // تعداد سلول‌ها
  const adElFlow = base.adElFlow * flowScale * cuGradeScale;
  const numScavengerCells = adElFlow / flowPerCell;
  const comFlow = (base.nCom * base.flowPerCell) * flowScale * cuGradeScale;
  const numCommercialCells = comFlow / flowPerCell;
  
  // ریکاوری سراسری مس
  const globalRecovery = (totalCuProduction / ((inputs.plsFlow * inputs.plsCu) / 1000.0)) * 100.0;

  // دبی‌های عمده
  const ewbFlow = base.ewbFlow * flowScale * cuGradeScale;
  const spentElectrolyteRecircFlow = base.spElRecircFlow * flowScale * cuGradeScale;

  // تولید جدول کامل و مستند جریان‌های مدار
  const streams: StreamData[] = [
    {
      id: 's_pls',
      name: 'محلول باردار ترشیحی (PLS)',
      nameEn: 'Pregnant Leach Solution (PLS)',
      flow: inputs.plsFlow,
      cu: inputs.plsCu,
      fe3: inputs.plsFe3,
      fe2: inputs.plsFe2,
      mn: inputs.plsMn,
      acid: inputs.plsAcid,
      phase: 'aqueous',
      descriptionFa: 'محلول خوراک ورودی استخراج حلالی حاصل از مدار هیپ‌لیچینگ مس'
    },
    {
      id: 's_raf_final',
      name: 'رافینیت نهایی (Final Raffinate)',
      nameEn: 'Final Raffinate to Pond/Leach',
      flow: inputs.plsFlow * 1.00025,
      cu: base.rafCu * cuGradeScale,
      fe3: base.rafFe3 * (inputs.plsFe3 / 0.5),
      fe2: base.rafFe2 * (inputs.plsFe2 / 2.0),
      mn: base.rafMn * (inputs.plsMn / 4.0),
      acid: base.rafAcid * (inputs.plsAcid / 5.0),
      phase: 'aqueous',
      descriptionFa: 'محلول عاری‌شده از مس خروجی از آخرین طبقه استخراج به سمت پوند رافینیت'
    },
    {
      id: 's_lo',
      name: 'فاز آلی باردار اولیه (Loaded Organic)',
      nameEn: 'Loaded Organic (Outlet of E1)',
      flow: organicFlow,
      cu: base.loCu * cuGradeScale,
      fe3: base.loFe3 * (inputs.plsFe3 / 0.5),
      fe2: 0.0,
      mn: 0.0,
      acid: 0.0,
      phase: 'organic',
      descriptionFa: 'فاز آلی باردارشده با مس خروجی از مرحله اول استخراج E1'
    },
    {
      id: 's_lo_tank',
      name: 'فاز آلی باردار پس از کوالسر و مخزن LOT',
      nameEn: 'Loaded Organic after LOT (+Entrainment)',
      flow: organicFlow,
      cu: base.loCuExEn * cuGradeScale,
      fe3: base.loFeExEn * (inputs.plsFe3 / 0.5),
      fe2: 0.0,
      mn: 0.0,
      acid: 0.0,
      phase: 'organic',
      descriptionFa: 'فاز آلی باردار آماده ورود به مرحله شستشو یا استریپینگ با احتساب کشیدگی مکانیکی'
    },
    {
      id: 's_so',
      name: 'فاز آلی عاری‌شده (Stripped Organic)',
      nameEn: 'Stripped Organic (SO)',
      flow: organicFlow,
      cu: base.soCu * cuGradeScale,
      fe3: base.soFe3 * (inputs.plsFe3 / 0.5),
      fe2: 0.0,
      mn: 0.0,
      acid: 0.0,
      phase: 'organic',
      descriptionFa: 'فاز آلی بازگشتی از مرحله استریپینگ به استیج استخراج'
    },
    {
      id: 's_adel',
      name: 'الکترولیت پیش‌رونده (Advance Electrolyte)',
      nameEn: 'Advance Electrolyte to EW',
      flow: adElFlow,
      cu: base.adElCu,
      fe3: base.adElFe3 * (inputs.plsFe3 / 0.5),
      fe2: base.adElFe2,
      mn: base.adElMn * (inputs.plsMn / 4.0),
      acid: base.adElAcid,
      phase: 'aqueous',
      descriptionFa: 'الکترولیت غنی‌شده از مس خروجی از استریپینگ به سمت سلول‌های اسکونجر الکترووینینگ'
    },
    {
      id: 's_spel',
      name: 'الکترولیت بازگشتی مصرف‌شده (Spent Electrolyte)',
      nameEn: 'Spent Electrolyte from EW Cells',
      flow: adElFlow,
      cu: base.spElCu,
      fe3: base.spElFe3 * (inputs.plsFe3 / 0.5),
      fe2: base.spElFe2,
      mn: base.spElMn * (inputs.plsMn / 4.0),
      acid: base.spElAcid,
      phase: 'aqueous',
      descriptionFa: 'الکترولیت اسیدی عاری از مس کاتدی بازگشتی به مخزن استریپینگ'
    },
    {
      id: 's_ewb',
      name: 'بلید الکترووینینگ (Copper EW Bleed)',
      nameEn: 'Copper Electrowinning Bleed (EWB)',
      flow: ewbFlow,
      cu: base.spElCu,
      fe3: base.spElFe3 * (inputs.plsFe3 / 0.5),
      fe2: base.spElFe2,
      mn: base.spElMn * (inputs.plsMn / 4.0),
      acid: base.spElAcid,
      phase: 'aqueous',
      descriptionFa: 'جریان خروجی بلید جهت کنترل و تثبیت غلظت آهن و ناخالصی‌ها در الکترولیت'
    }
  ];

  // افزودن جریان‌های اختصاصی مرحله شستشو در صورت وجود در مدار
  if (base.rawWater > 0 || base.washAcidCons) {
    streams.push({
      id: 's_wash_in',
      name: 'محلول ورودی مرحله شستشو (Wash Feed Solution)',
      nameEn: 'Wash / Scrub Inlet Solution',
      flow: (base.rawWater * totalCuProduction) || 25.0 * flowScale,
      cu: (inputs.flowsheet === 'E1' || inputs.flowsheet === 'E2') ? 2.95 : 0.0,
      fe3: (inputs.flowsheet === 'E1' || inputs.flowsheet === 'E2') ? 0.07 : 0.0,
      fe2: 0.0,
      mn: 0.0,
      acid: base.washAcidCons ? 15.5 : 0.0,
      phase: 'aqueous',
      descriptionFa: 'آب خام یا محلول اسیدی تزریقی جهت شستشو یا اسکراب فاز آلی'
    });
    streams.push({
      id: 's_wsos',
      name: 'محلول خروجی مرحله شستشو (WSOS)',
      nameEn: 'Wash Stage Outlet Solution (WSOS)',
      flow: ((base.rawWater * totalCuProduction) || 25.0 * flowScale) + (1.25 * flowScale),
      cu: (inputs.flowsheet.startsWith('E')) ? 2.78 : (inputs.flowsheet.startsWith('D')) ? 1.60 : 0.07,
      fe3: (inputs.flowsheet.startsWith('E')) ? 0.26 : (inputs.flowsheet.startsWith('D')) ? 0.22 : 0.046,
      fe2: 0.17 * (inputs.plsFe2 / 2.0),
      mn: 0.35 * (inputs.plsMn / 4.0),
      acid: base.washAcidCons ? 12.0 : 0.7,
      phase: 'aqueous',
      descriptionFa: 'محلول خروجی از مرحله شستشو حامل یون‌های شسته‌شده منگنز و آهن'
    });
  }

  return {
    flowsheet: inputs.flowsheet,
    topology: inputs.topology,
    extractantVolPercent,
    maxLoading,
    plsE_pH: base.pH,
    extractionEff,
    cuFeOrganicEx: base.cuFeOrganicEx,
    loCuExEn: base.loCuExEn * cuGradeScale,
    loFeExEn: base.loFeExEn * (inputs.plsFe3 / 0.5),
    cuFeOrganicExEn: base.cuFeOrganicExEn,
    strippingEff: base.strippingEff,
    netTransfer: base.netTransfer,
    feStrippingEff: base.feStrippingEff,
    extractantLost: base.extractantLost,
    diluentLost: base.diluentLost,
    flowPerCell,
    cellAmperage,
    ceScavenger: base.ceScav,
    ceCommercial: base.ceCom,
    totalCuProduction,
    scavengerCuProduction,
    commercialCuProduction,
    numScavengerCells,
    numCommercialCells,
    feMnSpentElectrolyte: base.feMnSpent,
    mn3SpentElectrolyte: base.mn3Spent,
    mno4SpentElectrolyte: base.mno4Spent,
    cobaltConsumption: base.cobaltCons,
    acidConsumption: base.acidCons,
    deminWaterConsumption: base.deminWater,
    rawWaterConsumption: base.rawWater,
    washAcidConsumption: base.washAcidCons,
    cuLostAdditionalWater: base.cuLostWBB,
    cuLostPercentCathode: base.cuLostPercentCathode,
    acidLostAdditionalWater: base.acidLostWBB,
    cuInBleedRatio: base.cuInBleedRatio,
    globalRecovery,
    ewbFlow,
    advanceElectrolyteFlow: adElFlow,
    spentElectrolyteRecircFlow,
    streams
  };
}
