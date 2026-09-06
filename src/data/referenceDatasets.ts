import { ProcessFlowsheet, CircuitTopology, SimulationResults } from '../engine/types';

export interface FlowsheetMetadata {
  id: ProcessFlowsheet;
  titleFa: string;
  titleEn: string;
  category: 'A' | 'B' | 'C' | 'D' | 'E';
  hasWashStage: boolean;
  washType: 'none' | 'launder' | 'mixer-settler-water' | 'mixer-settler-acid' | 'mixer-settler-diluted-ewb';
  hasRecirculationToE1: boolean;
  descriptionFa: string;
  descriptionEn: string;
  keyBenefitsFa: string[];
}

export const FLOWSHEET_METADATA: Record<ProcessFlowsheet, FlowsheetMetadata> = {
  A1: {
    id: 'A1',
    titleFa: 'شکل ۱ (A1): مدار مرسوم بدون مرحله شستشو',
    titleEn: 'Figure 1 (A1): Conventional SX-EW without Wash Stage',
    category: 'A',
    hasWashStage: false,
    washType: 'none',
    hasRecirculationToE1: false,
    descriptionFa: 'مدار متداول استخراج حلالی و الکترووینینگ مس بدون شستشوی فاز آلی. بلید الکترولیت و درین‌ها مستقیماً به مدار لیچینگ فرستاده می‌شوند.',
    descriptionEn: 'Conventional circuit without wash step; EW bleed solution goes to leach circuit.',
    keyBenefitsFa: ['ساده‌ترین پیکربندی با حداقل تجهیزات', 'پایه ارزیابی بهبودهای متالورژیکی در سایر مدارها']
  },
  A2: {
    id: 'A2',
    titleFa: 'شکل ۲ (A2): بدون شستشو با بازچرخانی بلید به E1/PLS',
    titleEn: 'Figure 2 (A2): Without Wash Stage + Recirculation of EWB to E1',
    category: 'A',
    hasWashStage: false,
    washType: 'none',
    hasRecirculationToE1: true,
    descriptionFa: 'مدار بدون شستشو که در آن بلید الکترووینینگ (EWB) به مرحله اول استخراج بازچرخانی می‌شود تا ریکاوری سراسری مس افزایش یابد.',
    descriptionEn: 'Conventional circuit where EW bleed is recirculated to E1 extraction to boost global copper recovery.',
    keyBenefitsFa: ['افزایش ریکاوری کل مس به بالای ۹۱٪', 'کاهش هدررفت مس بدون نیاز به مرحله شستشوی مجزا']
  },
  B1: {
    id: 'B1',
    titleFa: 'شکل ۳ (B1): شستشو در لندر فاز آلی استخراج E1 با آب خام',
    titleEn: 'Figure 3 (B1): Wash Stage in Organic Launder of E1 (Raw Water)',
    category: 'B',
    hasWashStage: true,
    washType: 'launder',
    hasRecirculationToE1: false,
    descriptionFa: 'تزریق آب خام به لندر فاز آلی ستلر E1 جهت شستشوی کشیدگی مکانیکی منگنز و آهن. درین‌های کوالسر به پوند رافینیت می‌رود.',
    descriptionEn: 'Raw water wash directly injected into E1 organic launder to wash entrained Mn and Fe. Drawoffs to raffinate.',
    keyBenefitsFa: ['راندمان شستشوی منگنز تا ۸۵.۳٪', 'کاهش نیاز به میکسر-ستلر مجزای شستشو با حداقل سرمایه‌گذاری']
  },
  B2: {
    id: 'B2',
    titleFa: 'شکل ۴ (B2): شستشو در لندر E1 با بازچرخانی بلید و درین‌ها به E1',
    titleEn: 'Figure 4 (B2): Launder Wash + Recirculation of EWB and Drawoffs to E1',
    category: 'B',
    hasWashStage: true,
    washType: 'launder',
    hasRecirculationToE1: true,
    descriptionFa: 'شستشوی لندر فاز آلی E1 به همراه بازچرخانی بلید EW و درین‌های ACT/LOT به ورودی E1 برای به حداکثر رساندن ریکاوری مس.',
    descriptionEn: 'Organic launder wash with EWB and coalescer drainage recycled back to E1.',
    keyBenefitsFa: ['ترکیب ریکاوری بالای مس (۹۱.۴٪) با شستشوی مؤثر منگنز', 'کاهش مصرف آب دمین در الکترووینینگ']
  },
  C1: {
    id: 'C1',
    titleFa: 'شکل ۵ (C1): میکسر-ستلر شستشو با آب خام (O/A=50)',
    titleEn: 'Figure 5 (C1): Dedicated Wash Stage Mixer-Settler with Raw Water',
    category: 'C',
    hasWashStage: true,
    washType: 'mixer-settler-water',
    hasRecirculationToE1: false,
    descriptionFa: 'بهره‌گیری از یک استیج کامل میکسر-ستلر شستشو با آب خام و نسبت O/A برابر ۵۰. راندمان شستشوی منگنز به بیش از ۹۵٪ می‌رسد.',
    descriptionEn: 'Dedicated mixer-settler wash stage utilizing raw water at O/A=50; Mn wash efficiency reaches >95%.',
    keyBenefitsFa: ['راندمان شستشوی فوق‌العاده منگنز (۹۵.۵٪)', 'پایدارسازی شدید نسبت Fe/Mn در الکترولیت (بالای ۲۳)']
  },
  C2: {
    id: 'C2',
    titleFa: 'شکل ۶ (C2): میکسر-ستلر شستشو با آب خام + بازچرخانی به E1',
    titleEn: 'Figure 6 (C2): Wash Stage with Raw Water + Recirculation to E1',
    category: 'C',
    hasWashStage: true,
    washType: 'mixer-settler-water',
    hasRecirculationToE1: true,
    descriptionFa: 'میکسر-ستلر شستشو با آب خام همراه با بازچرخانی بلید EW، محلول خروجی شستشو (WSOS) و درین‌ها به E1.',
    descriptionEn: 'Wash stage with raw water where EWB, WSOS, and tank drawoffs return to E1.',
    keyBenefitsFa: ['ریکاوری کل مس ۹۱.۵٪ با حفظ نسبت Fe/Mn بالا (۲۴.۵)', 'کنترل کامل اکسیداسیون منگنز در سلول‌ها']
  },
  D1: {
    id: 'D1',
    titleFa: 'شکل ۷ (D1): اسکرابینگ آهن(III) با آب اسیدی',
    titleEn: 'Figure 7 (D1): Acidulated Water Wash for Fe(III) Scrubbing',
    category: 'D',
    hasWashStage: true,
    washType: 'mixer-settler-acid',
    hasRecirculationToE1: false,
    descriptionFa: 'شستشوی فاز آلی باردار با آب اسیدی جهت اسکراب انتخابی آهن فریک و شستشوی فیزیکی منگنز و آهن. نسبت Cu/Fe فاز آلی به بالای ۹۵۰ می‌رسد.',
    descriptionEn: 'Acidulated water wash stage for selective Fe(III) chemical scrubbing and entrainment removal.',
    keyBenefitsFa: ['افزایش نسبت Cu/Fe در فاز آلی باردار به بیش از ۹۶۰', 'کاهش بار فریک در الکترولیت و ارتقای راندمان جریان کاتدی به ۹۴.۸٪']
  },
  D2: {
    id: 'D2',
    titleFa: 'شکل ۸ (D2): اسکرابینگ آهن با آب اسیدی + بازچرخانی به E1',
    titleEn: 'Figure 8 (D2): Acid Scrubbing + Recirculation to E1',
    category: 'D',
    hasWashStage: true,
    washType: 'mixer-settler-acid',
    hasRecirculationToE1: true,
    descriptionFa: 'اسکراب آهن با آب اسیدی همراه با بازچرخانی بلید و WSOS به استخراج E1؛ تعادل بهینه بین کیفیت کاتد و ریکاوری حداکثری.',
    descriptionEn: 'Acid scrubbing stage with full recycle of EWB and WSOS back to E1.',
    keyBenefitsFa: ['ریکاوری مس ۹۱.۳۳٪ با خلوص کاتد عالی', 'کاهش شدید مصرف کبالت محافظ آند (۰.۱۸ kg/t Cu)']
  },
  E1: {
    id: 'E1',
    titleFa: 'شکل ۹ (E1): اسکرابینگ آهن با بلید رقیق‌شده EW',
    titleEn: 'Figure 9 (E1): Fe Scrubbing with Diluted Copper EW Bleed',
    category: 'E',
    hasWashStage: true,
    washType: 'mixer-settler-diluted-ewb',
    hasRecirculationToE1: false,
    descriptionFa: 'استفاده هوشمندانه از اسید بلید الکترووینینگ به عنوان عامل اسکراب آهن بدون خرید اسید تازه اضافی. تنظیم استخراج مس در ۰.۵٪.',
    descriptionEn: 'Using acid from diluted EW bleed for Fe(III) scrubbing without buying fresh acid.',
    keyBenefitsFa: ['بالاترین نسبت Cu/Fe در فاز آلی (بیش از ۱۰۹۰)', 'حداقل مصرف ویژه اسید (۰.۴۱ t/t Cu) و بهینه‌ترین حالت اقتصادی']
  },
  E2: {
    id: 'E2',
    titleFa: 'شکل ۱۰ (E2): اسکرابینگ با بلید رقیق‌شده + بازچرخانی به E1',
    titleEn: 'Figure 10 (E2): Diluted EWB Scrubbing + Recirculation to E1',
    category: 'E',
    hasWashStage: true,
    washType: 'mixer-settler-diluted-ewb',
    hasRecirculationToE1: true,
    descriptionFa: 'ترکیب اسکراب با بلید رقیق‌شده و بازچرخانی WSOS و درین‌ها به E1؛ پیشرفته‌ترین و کارآمدترین مدار جامع مس در نسخه ۷.۰.',
    descriptionEn: 'The pinnacle configuration in version 7.0 combining diluted EWB scrubbing with E1 recycling.',
    keyBenefitsFa: ['بالاترین ریکاوری سراسری مس در میان مدارهای اسکرابینگ (۹۲.۲۵٪)', 'کاهش مصرف آب دمین به ۱.۰۳ m3/t Cu و ارتقای راندمان کاتدی به ۹۵.۱٪']
  }
};

export const TOPOLOGY_METADATA: Record<CircuitTopology, { titleFa: string; stagesEx: number; stagesStrip: number; parallel: boolean }> = {
  '2Ex1S': { titleFa: '۲ مرحله استخراج سری - ۱ مرحله استریپینگ (2Ex1S)', stagesEx: 2, stagesStrip: 1, parallel: false },
  'ExPx1S': { titleFa: 'سری-موازی با تقسیم دبی آبی (ExPx1S)', stagesEx: 2, stagesStrip: 1, parallel: true },
  '3Ex1S': { titleFa: '۳ مرحله استخراج سری - ۱ مرحله استریپینگ (3Ex1S)', stagesEx: 3, stagesStrip: 1, parallel: false },
  '2Ex1Px1S': { titleFa: '۲ سری - ۱ موازی - ۱ استریپینگ (2Ex1Px1S)', stagesEx: 3, stagesStrip: 1, parallel: true },
  '2Ex2Px1S': { titleFa: '۲ سری - ۲ موازی - ۱ استریپینگ (2Ex2Px1S)', stagesEx: 4, stagesStrip: 1, parallel: true },
  '2Ex2S': { titleFa: '۲ مرحله استخراج - ۲ مرحله استریپینگ سری (2Ex2S)', stagesEx: 2, stagesStrip: 2, parallel: false },
  'ExPx2S': { titleFa: 'سری-موازی با ۲ مرحله استریپینگ (ExPx2S)', stagesEx: 2, stagesStrip: 2, parallel: true },
  '3Ex2S': { titleFa: '۳ مرحله استخراج - ۲ مرحله استریپینگ سری (3Ex2S)', stagesEx: 3, stagesStrip: 2, parallel: false },
  '2Ex1Px2S': { titleFa: '۲ سری - ۱ موازی - ۲ استریپینگ (2Ex1Px2S)', stagesEx: 3, stagesStrip: 2, parallel: true },
  '2Ex2Px2S': { titleFa: '۲ سری - ۲ موازی - ۲ استریپینگ (2Ex2Px2S)', stagesEx: 4, stagesStrip: 2, parallel: true },
};
