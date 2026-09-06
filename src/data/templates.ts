import { SimulationInputs } from '../engine/types';

export interface IndustrialTemplate {
  id: string;
  titleFa: string;
  titleEn: string;
  categoryFa: string;
  descriptionFa: string;
  recommendedFlowsheet: SimulationInputs['flowsheet'];
  recommendedTopology: SimulationInputs['topology'];
  inputs: Omit<SimulationInputs, 'flowsheet' | 'topology'>;
}

export const INDUSTRIAL_TEMPLATES: IndustrialTemplate[] = [
  {
    id: 'clean-slate',
    titleFa: 'ورود دستی داده‌ها (خام / بدون پیش‌فرض)',
    titleEn: 'Clean Slate (Custom Zero-Based Input)',
    categoryFa: 'سفارشی',
    descriptionFa: 'تمام مقادیر روی صفر تنظیم شده تا مهندس بتواند داده‌های میدانی و آزمایشگاهی خود را بدون هیچ پیش‌فرضی وارد کند.',
    recommendedFlowsheet: 'A1',
    recommendedTopology: '2Ex1S',
    inputs: {
      plsFlow: 0,
      plsCu: 0,
      plsFe3: 0,
      plsFe2: 0,
      plsMn: 0,
      plsAcid: 0,
      targetPercentML: 80,
      ratioOA: 1.25,
      cuPrScavengerRatio: 5.0,
      currentDensity: 300,
      cathodeArea: 2.41,
      cathodesPerCell: 69,
      cathodeVelocity: 0.12,
      kFactor: 1.1858,
      washStageOA: 50,
      washBypass: 40,
      feScrubbingEff: 65
    }
  },
  {
    id: 'heap-leach-standard',
    titleFa: 'کارخانه هیپ‌لیچینگ مرسوم مس (پایه کافومبیلا)',
    titleEn: 'Conventional Copper Heap Leach SX-EW',
    categoryFa: 'هیپ‌لیچینگ متعارف',
    descriptionFa: 'خوراک معمول لیچینگ اکسیدی مس (۲.۵ g/L مس)؛ مناسب برای ارزیابی مدارهای مرسوم A1، A2 و شستشوی لندر.',
    recommendedFlowsheet: 'A1',
    recommendedTopology: '2Ex1S',
    inputs: {
      plsFlow: 1000,
      plsCu: 2.5,
      plsFe3: 0.5,
      plsFe2: 2.0,
      plsMn: 4.0,
      plsAcid: 5.0,
      targetPercentML: 80,
      ratioOA: 1.25,
      cuPrScavengerRatio: 5.0,
      currentDensity: 300,
      cathodeArea: 2.41,
      cathodesPerCell: 69,
      cathodeVelocity: 0.12,
      kFactor: 1.1858,
      washStageOA: 50,
      washBypass: 40,
      feScrubbingEff: 65
    }
  },
  {
    id: 'high-iron-leach',
    titleFa: 'کانسار با آهن فریک بالا (نیاز به اسکرابینگ D یا E)',
    titleEn: 'High Ferric Deposit (Acid/Bleed Scrubbing)',
    categoryFa: 'آهن بالا',
    descriptionFa: 'عیار آهن فریک بالا (Fe³⁺ = 1.8 g/L)؛ در این شرایط استفاده از اسکرابینگ اسیدی D1/D2 یا بلید رقیق E1/E2 ضروری است.',
    recommendedFlowsheet: 'E2',
    recommendedTopology: '2Ex1S',
    inputs: {
      plsFlow: 800,
      plsCu: 3.0,
      plsFe3: 1.8,
      plsFe2: 2.5,
      plsMn: 3.0,
      plsAcid: 6.5,
      targetPercentML: 82,
      ratioOA: 1.25,
      cuPrScavengerRatio: 5.0,
      currentDensity: 300,
      cathodeArea: 2.41,
      cathodesPerCell: 69,
      cathodeVelocity: 0.12,
      kFactor: 1.1858,
      washStageOA: 45,
      washBypass: 40,
      feScrubbingEff: 65
    }
  },
  {
    id: 'high-manganese-deposit',
    titleFa: 'کانسار با منگنز بحرانی (نیاز به شستشوی C یا B)',
    titleEn: 'High Manganese Deposit (C1/C2 or B1/B2 Wash)',
    categoryFa: 'منگنز بحرانی',
    descriptionFa: 'منگنز در خوراک بیش از ۷ گرم بر لیتر است. بدون مرحله شستشوی کارآمد، آندهای سربی به سرعت دچار پسیواسیون و رسوب MnO2 می‌شوند.',
    recommendedFlowsheet: 'C2',
    recommendedTopology: '2Ex1S',
    inputs: {
      plsFlow: 1200,
      plsCu: 2.2,
      plsFe3: 0.4,
      plsFe2: 1.5,
      plsMn: 7.5,
      plsAcid: 4.5,
      targetPercentML: 80,
      ratioOA: 1.25,
      cuPrScavengerRatio: 5.0,
      currentDensity: 300,
      cathodeArea: 2.41,
      cathodesPerCell: 69,
      cathodeVelocity: 0.12,
      kFactor: 1.1858,
      washStageOA: 50,
      washBypass: 40,
      feScrubbingEff: 65
    }
  },
  {
    id: 'high-capacity-chalcocite',
    titleFa: 'کانسار سولفیدی کم‌عمق / عیار بالا (سری-موازی ExPx)',
    titleEn: 'High-Grade Operation (Series-Parallel ExPx)',
    categoryFa: 'مقیاس بزرگ / عیار بالا',
    descriptionFa: 'دبی بالا و مس بالای ۴ گرم بر لیتر که در آن تفکیک دبی آبی (آرایش ExPx1S یا 2Ex2Px1S) جهت کاهش مصرف آلی توصیه می‌شود.',
    recommendedFlowsheet: 'A2',
    recommendedTopology: 'ExPx1S',
    inputs: {
      plsFlow: 1500,
      plsCu: 4.2,
      plsFe3: 0.8,
      plsFe2: 2.0,
      plsMn: 3.5,
      plsAcid: 5.0,
      targetPercentML: 80,
      ratioOA: 1.25,
      cuPrScavengerRatio: 5.0,
      currentDensity: 310,
      cathodeArea: 2.41,
      cathodesPerCell: 69,
      cathodeVelocity: 0.12,
      kFactor: 1.1858,
      washStageOA: 50,
      washBypass: 40,
      feScrubbingEff: 65
    }
  }
];
