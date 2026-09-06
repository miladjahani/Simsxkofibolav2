export type ProcessFlowsheet = 
  | 'A1' // بدون شستشو، جریان بلید به لیچ
  | 'A2' // بدون شستشو، بازچرخانی بلید به استخراج
  | 'B1' // شستشو در لندر فاز آلی E1 با آب خام
  | 'B2' // شستشو در لندر E1 با بازچرخانی بلید و درین
  | 'C1' // میکسر-ستلر شستشو با آب خام
  | 'C2' // شستشو با آب خام با بازچرخانی بلید و WSOS
  | 'D1' // شستشو با آب اسیدی جهت اسکراب آهن(III)
  | 'D2' // اسکراب اسیدی آهن با بازچرخانی به استخراج
  | 'E1' // شستشو با بلید رقیق‌شده الکترولیت جهت اسکراب آهن
  | 'E2'; // اسکراب آهن با بلید رقیق‌شده + بازچرخانی

export type CircuitTopology = 
  | '2Ex1S' 
  | 'ExPx1S' 
  | '3Ex1S' 
  | '2Ex1Px1S' 
  | '2Ex2Px1S' 
  | '2Ex2S' 
  | 'ExPx2S' 
  | '3Ex2S' 
  | '2Ex1Px2S' 
  | '2Ex2Px2S';

export interface StreamData {
  id: string;
  name: string;
  nameEn: string;
  flow: number; // m3/h
  cu: number;   // g/L
  fe3: number;  // g/L
  fe2: number;  // g/L
  mn: number;   // g/L
  acid: number; // g/L
  phase: 'aqueous' | 'organic';
  descriptionFa: string;
}

export interface SimulationInputs {
  flowsheet: ProcessFlowsheet;
  topology: CircuitTopology;
  plsFlow: number;        // m3/h
  plsCu: number;          // g/L
  plsFe3: number;         // g/L
  plsFe2: number;         // g/L
  plsMn: number;          // g/L
  plsAcid: number;        // g/L
  targetPercentML: number;// % (معمولاً 80)
  ratioOA: number;        // نسبت دبی آلی به آبی (پیش‌فرض 1.25)
  cuPrScavengerRatio: number; // CuPr/ScCuPr (معمولاً 5.0 معادل 20%)
  
  // متغیرهای سلول الکترووینینگ
  currentDensity: number; // A/m2 (پیش‌فرض 300)
  cathodeArea: number;    // m2 (پیش‌فرض 2.41)
  cathodesPerCell: number;// عدد (پیش‌فرض 69)
  cathodeVelocity: number;// m3/h.m2 (پیش‌فرض 0.12)
  kFactor: number;        // ضریب فارادی (پیش‌فرض 1.1858)
  
  // پارامترهای اختصاصی شستشو و اسکراب
  washStageOA: number;    // O/A مرحله شستشو (پیش‌فرض 50)
  washBypass: number;     // درصد بای‌پس لندر B1/B2 (پیش‌فرض 40%)
  feScrubbingEff: number; // درصد راندمان اسکراب آهن فریک D1/D2
}

export interface SimulationResults {
  flowsheet: ProcessFlowsheet;
  topology: CircuitTopology;
  extractantVolPercent: number; // v/v%
  maxLoading: number;           // ML (g/L Cu)
  plsE_pH: number;              // pH محلول ورودی به استخراج
  extractionEff: number;        // راندمان استخراج مس (%)
  cuFeOrganicEx: number;        // نسبت Cu/Fe در فاز آلی بدون کشیدگی
  loCuExEn: number;             // غلظت مس در LOT با کشیدگی (g/L)
  loFeExEn: number;             // غلظت آهن در LOT با کشیدگی (g/L)
  cuFeOrganicExEn: number;      // نسبت نهایی Cu/Fe در فاز آلی باردار
  strippingEff: number;         // راندمان استریپینگ مس (%)
  netTransfer: number;          // انتقال خالص مس (g/L به ازای هر ۱٪ اکسترکتنت)
  feStrippingEff: number;       // راندمان استریپینگ آهن (%)
  
  // اتلافات و مصارف ویژه
  extractantLost: number;       // اتلاف اکسترکتنت (kg/t Cu)
  diluentLost: number;          // اتلاف رقیق‌ساز (kg/t Cu)
  flowPerCell: number;          // دبی جریان به ازای هر سلول (m3/h)
  cellAmperage: number;         // آمپراژ سلول (kA)
  ceScavenger: number;          // راندمان جریان سلول‌های اسکونجر (%)
  ceCommercial: number;         // راندمان جریان سلول‌های تجاری (%)
  totalCuProduction: number;    // تولید کل مس کاتدی (t/h)
  scavengerCuProduction: number;// تولید مس سلول‌های اسکونجر (t/h)
  commercialCuProduction: number;// تولید مس سلول‌های تجاری (t/h)
  numScavengerCells: number;    // تعداد سلول‌های اسکونجر
  numCommercialCells: number;   // تعداد سلول‌های تجاری
  
  // شیمی الکترولیت و کنترل منگنز
  feMnSpentElectrolyte: number; // نسبت Fe/Mn در الکترولیت برگشتی
  mn3SpentElectrolyte: number;  // غلظت منگنز(III) در الکترولیت برگشتی (g/L)
  mno4SpentElectrolyte: number; // غلظت پرمنگنات در الکترولیت برگشتی (g/L)

  // --- خروجی‌های توسعه‌یافته مدل فرمول‌محور (v7.1) ---
  organicFlow: number;            // دبی فاز آلی مدار (m3/h)
  cuInFeedTotal: number;          // بار مس کل خوراک (t/h)
  copperToElectrolyte: number;    // مس انتقال‌یافته به الکترولیت (kg/h)
  feNetToElectrolyte: number;     // آهن خالص ورودی به الکترولیت (kg/h)
  washWaterFlow: number;          // دبی آب شستشو / اسکراب (m3/h)
  mnWashEfficiency: number;       // راندمان شستشوی منگنز (%)
  feScrubEfficiency: number;      // راندمان اسکراب آهن فریک (%)
  cellVoltage: number;            // ولتاژ سلول الکترووینینگ (V)
  energyConsumption: number;      // مصرف ویژه انرژی (kWh/t Cu)
  totalEnergyMW: number;          // توان الکتریکی کل مدار EW (MW)
  totalCells: number;             // تعداد کل سلول‌های الکترووینینگ
  cathodePerCell: number;         // تولید کاتدی هر سلول (kg/h)
  cobaltConsumption: number;    // مصرف کبالت سولفات (kg/t Cu)
  acidConsumption: number;      // مصرف اسید سولفوریک در EW (t/t Cu)
  deminWaterConsumption: number;// مصرف آب بدون املاح در EW (m3/t Cu)
  rawWaterConsumption: number;  // مصرف آب خام (m3/t Cu)
  washAcidConsumption?: number; // مصرف اسید در مرحله شستشو (kg/t Cu)
  
  // تراز و ریکاوری
  cuLostAdditionalWater: number;// مس تلف‌شده در بلید تعادل آب (kgCu/t Cu)
  cuLostPercentCathode: number; // درصد اتلاف مس نسبت به کاتد تولیدی (%)
  acidLostAdditionalWater: number; // اسید تلف‌شده در بلید تعادل آب (kgAc/t Cu)
  cuInBleedRatio: number;       // نسبت مس موجود در بلید به کل مس تولیدی (%)
  globalRecovery: number;       // ریکاوری سراسری مس (SX و EW) (%)
  
  // دبی‌های عمده مدار
  ewbFlow: number;              // دبی بلید الکترووینینگ (m3/h)
  advanceElectrolyteFlow: number;// دبی الکترولیت پیش‌رونده به EW (m3/h)
  spentElectrolyteRecircFlow: number; // دبی بازچرخانی الکترولیت برگشتی (m3/h)
  
  // جدول کلیه جریان‌ها
  streams: StreamData[];
}

export interface SimulationSession {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  inputs: SimulationInputs;
  isCalculated: boolean;
}
