export interface ParameterGuideItem {
  id: string;
  nameFa: string;
  nameEn: string;
  symbol: string;
  unit: string;
  category: 'feed' | 'sx' | 'ew' | 'wash';
  typicalRange: string;
  descriptionFa: string;
  metallurgicalImpactFa: string;
  highConsequenceFa: string;
  lowConsequenceFa: string;
  formulaFa?: string;
}

export const PARAMETERS_ENCYCLOPEDIA: ParameterGuideItem[] = [
  {
    id: 'plsFlow',
    nameFa: 'دبی محلول باردار ترشیحی (PLS Flow)',
    nameEn: 'Pregnant Leach Solution Flow Rate',
    symbol: 'Q_PLS',
    unit: 'm³/h',
    category: 'feed',
    typicalRange: '۱۰۰ تا ۳۰۰۰ متر مکعب بر ساعت',
    descriptionFa: 'حجم محلول اسیدی باردار مس خروجی از پد هیپ‌لیچینگ یا تیکنر اولیه که در هر ساعت وارد مرحله اول استخراج حلالی (E1) می‌شود.',
    metallurgicalImpactFa: 'تعیین‌کننده ابعاد هندسی میکسرها، سطح ته‌نشینی ستلرها و ظرفیت اسمی کل مجتمع هیدرومتالورژی مس.',
    highConsequenceFa: 'افزایش زمان اقامت هیدرولیکی ناکافی در میکسرها، کاهش راندمان اختلاط و افزایش کشیدگی فاز آبی به فاز آلی در ستلر.',
    lowConsequenceFa: 'کاهش ظرفیت تولید کارخانه و افزایش هزینه‌های سرمایه‌گذاری ویژه به ازای هر تن مس تولیدی.',
    formulaFa: 'Total Cu Input (kg/h) = Q_PLS × [Cu]_PLS'
  },
  {
    id: 'plsCu',
    nameFa: 'عیار مس در محلول باردار (PLS Copper Grade)',
    nameEn: 'Copper Concentration in PLS',
    symbol: '[Cu]_PLS',
    unit: 'g/L',
    category: 'feed',
    typicalRange: '۱.۵ تا ۶.۰ گرم بر لیتر (معمولاً ۲.۰ تا ۳.۵ g/L)',
    descriptionFa: 'غلظت یون‌های مس دو ظرفیتی (Cu²⁺) محلول در فاز آبی ورودی به استخراج حلالی.',
    metallurgicalImpactFa: 'اصلی‌ترین فاکتور تعیین‌کننده درصد حجمی اکسترکتنت مورد نیاز در فاز آلی و تناژ نهایی مس کاتدی.',
    highConsequenceFa: 'نیاز به درصد حجمی بالاتر اکسترکتنت Lix و افزایش ویسکوزیته فاز آلی.',
    lowConsequenceFa: 'افت صرفه اقتصادی استخراج، افزایش هزینه نسبی رقیق‌ساز و نیاز به مدارهای سری-موازی.',
    formulaFa: '[Cu]_LO = ML × (%ML / 100)'
  },
  {
    id: 'plsFe3',
    nameFa: 'غلظت آهن فریک (Ferric Iron Concentration)',
    nameEn: 'Ferric Iron [Fe3+] in PLS',
    symbol: '[Fe³⁺]_PLS',
    unit: 'g/L',
    category: 'feed',
    typicalRange: '۰.۲ تا ۳.۰ گرم بر لیتر',
    descriptionFa: 'غلظت یون آهن سه ظرفیتی در خوراک. آهن فریک رقیب اصلی مس در پیوند با استخراج‌کننده هیدروکسی‌اکسیم است.',
    metallurgicalImpactFa: 'انتقال فریک به الکترولیت باعث احیای آن در کاتد و افت مستقیم راندمان جریان (Current Efficiency) می‌شود.',
    highConsequenceFa: 'آلودگی الکترولیت، افت شدید راندمان فارادی سلول‌های EW، خوردگی خطوط و نیاز به بلید شدید.',
    lowConsequenceFa: 'نسبت Fe/Mn در الکترولیت کاهش می‌یابد که ممکن است خطر رسوب دی‌اکسید منگنز (MnO2) روی آندها را تشدید کند.'
  },
  {
    id: 'plsFe2',
    nameFa: 'غلظت آهن فروس (Ferrous Iron Concentration)',
    nameEn: 'Ferrous Iron [Fe2+] in PLS',
    symbol: '[Fe²⁺]_PLS',
    unit: 'g/L',
    category: 'feed',
    typicalRange: '۰.۵ تا ۵.۰ گرم بر لیتر',
    descriptionFa: 'غلظت یون آهن دو ظرفیتی. فروس برخلاف فریک توسط اکسترکتنت استخراج شیمیایی نمی‌شود و فقط از طریق کشیدگی فیزیکی منتقل می‌گردد.',
    metallurgicalImpactFa: 'فروس عامل احیاکننده منگنز پرمنگنات در بالای سلول الکترووینینگ است و مانع از تشکیل گل آندی می‌شود.',
    highConsequenceFa: 'افزایش بار آهن کل در محلول‌های شستشو در صورت کشیدگی مکانیکی شدید.',
    lowConsequenceFa: 'در صورت عدم وجود آهن در الکترولیت، واکنش نوترکیبی پرمنگنات مختل می‌شود.'
  },
  {
    id: 'plsMn',
    nameFa: 'غلظت منگنز کل (Total Manganese)',
    nameEn: 'Manganese Concentration in PLS',
    symbol: '[Mn]_PLS',
    unit: 'g/L',
    category: 'feed',
    typicalRange: '۱.۰ تا ۱۰.۰ گرم بر لیتر',
    descriptionFa: 'منگنز از کانی‌های باطله و اکسیدهای منگنز حل شده و به مدار می‌آید. به صورت شیمیایی استخراج نمی‌شود اما توسط قطرات فاز آبی (Entrainment) به الکترولیت راه می‌یابد.',
    metallurgicalImpactFa: 'در آند الکترووینینگ به منگنز ۳ ظرفیتی و پرمنگنات اکسید می‌شود. اگر کنترل نشود به صورت لجن MnO2 رسوب کرده و به کاتد و آند آسیب می‌زند.',
    highConsequenceFa: 'پسیو شدن آندهای سربی، تغییر رنگ کاتد به قهوه‌ای/سیاه و کاهش عمر تجهیزات.',
    lowConsequenceFa: 'خطر کمتری برای الکترووینینگ دارد، اما در مقادیر کمتر از ۰.۰۵ g/L الکترولیت، تشکیل لایه محافظ آند کاهش می‌یابد.'
  },
  {
    id: 'plsAcid',
    nameFa: 'غلظت اسید سولفوریک آزاد (Free Sulfuric Acid in PLS)',
    nameEn: 'Free Acid Concentration in PLS',
    symbol: '[H₂SO₄]_free',
    unit: 'g/L',
    category: 'feed',
    typicalRange: '۲.۰ تا ۱۰.۰ گرم بر لیتر (معمولاً ۳ تا ۵ g/L)',
    descriptionFa: 'اسید سولفوریک حل نشده باقیمانده از لیچینگ که در فاز آبی خوراک وجود دارد.',
    metallurgicalImpactFa: 'افزایش اسید آزاد باعث شیفت واکنش تعادلی استخراج به سمت چپ (پس‌زدن مس) می‌شود و ظرفیت استخراج را کاهش می‌دهد.',
    highConsequenceFa: 'افت راندمان استخراج مس، نیاز به حجم بالاتر آلی و کاهش ضریب انتقال خالص مس.',
    lowConsequenceFa: 'افزایش خطر هیدرولیز و رسوب نمک‌های آهن فریک (مانند جاروسیت) در لوله‌ها و ستلر.'
  },
  {
    id: 'targetPercentML',
    nameFa: 'درصد بارگیری بهینه فاز آلی (%ML Target)',
    nameEn: 'Percentage to Maximum Loading',
    symbol: '%ML',
    unit: '%',
    category: 'sx',
    typicalRange: '۷۵٪ تا ۸۵٪ (نقطه ایده‌آل صنعتی: ۸۰٪)',
    descriptionFa: 'نسبت غلظت مس در فاز آلی باردار به حداکثر ظرفیت تئوریک جذب مس توسط اکسترکتنت موجود در آن فاز.',
    metallurgicalImpactFa: 'کلیدی‌ترین ابزار شیمیایی برای افزایش انتخاب‌پذیری مس نسبت به آهن فریک (Cu/Fe Selectivity).',
    highConsequenceFa: 'اگر بالای ۸۵٪ برود، خطر از دست رفتن مس در رافینیت و افزایش عیار رافینیت به وجود می‌آید.',
    lowConsequenceFa: 'اگر زیر ۷۰٪ بیاید، جایگاه‌های آزاد اکسترکتنت توسط آهن فریک اشغال شده و نسبت Cu/Fe فاز آلی به شدت افت می‌کند.',
    formulaFa: '%ML = ([Cu]_LO / ML) × 100'
  },
  {
    id: 'ratioOA',
    nameFa: 'نسبت دبی فاز آلی به فاز آبی (O/A Ratio)',
    nameEn: 'Organic to Aqueous Flow Ratio',
    symbol: 'O/A',
    unit: 'بی‌بعد',
    category: 'sx',
    typicalRange: '۱.۰ تا ۱.۳ (پیش‌فرض استاندارد ۱.۲۵)',
    descriptionFa: 'نسبت دبی حجمی فاز آلی ورودی به ستلرها به دبی فاز آبی.',
    metallurgicalImpactFa: 'تنظیم رژیم پیوستگی فاز در میکسر (Phase Continuity). نسبت بالای ۱.۰ به ۱.۲۵ فاز آلی را پیوسته (Organic Continuous) می‌کند.',
    highConsequenceFa: 'کاهش کشیدگی آلی در رافینیت و حفظ رژیم فاز آلی پیوسته، اما نیاز به موجودی بالاتر فاز آلی در کارخانه.',
    lowConsequenceFa: 'تغییر رژیم به فاز آبی پیوسته (Aqueous Continuous) و افزایش شدید اتلاف گران‌قیمت اکسترکتنت در رافینیت.'
  },
  {
    id: 'extractantVolPercent',
    nameFa: 'درصد حجمی اکسترکتنت (Extractant Volume Percentage)',
    nameEn: 'Lix984N Extractant Volume %',
    symbol: 'v/v%',
    unit: '%',
    category: 'sx',
    typicalRange: '۷٪ تا ۲۲٪ (بسته به عیار خوراک و مدار)',
    descriptionFa: 'درصد حجمی معرف فعال کیلیتور (Lix984N یا معادل) حل شده در رقیق‌ساز نفتی هیدروکربنی (مانند Escaid یا Orfom).',
    metallurgicalImpactFa: 'تعیین‌کننده مستقیم ظرفیت مولی استخراج مس از فاز آبی.',
    highConsequenceFa: 'افزایش ویسکوزیته فاز آلی، کاهش سرعت جدایش فازها در ستلر و افزایش هزینه اولیه سرمایه‌گذاری آلی.',
    lowConsequenceFa: 'عدم کفایت ظرفیت جذب مس خوراک و بالا رفتن اتلاف مس در رافینیت.'
  },
  {
    id: 'currentDensity',
    nameFa: 'دانسیته جریان الکترووینینگ (Current Density)',
    nameEn: 'EW Operating Current Density',
    symbol: 'i',
    unit: 'A/m²',
    category: 'ew',
    typicalRange: '۲۵۰ تا ۳۵۰ آمپر بر متر مربع (استاندارد ۳۰۰ A/m²)',
    descriptionFa: 'شدت جریان الکتریکی عبوری به ازای هر مترمربع از سطح فعال غوطه‌ور کاتد مس.',
    metallurgicalImpactFa: 'تعیین‌کننده سرعت رسوب مس بر کاتد، اندازه سلول‌ها و مشخصات متالورژیکی دانه‌بندی کاتد مس.',
    highConsequenceFa: 'افزایش ظرفیت تولید، اما بالا رفتن پتانسیل بیش‌ازحد (Overpotential)، افزایش خطر گره‌ای شدن کاتد و رشد دندریت‌ها.',
    lowConsequenceFa: 'بهبود دانه‌بندی و صافی سطح کاتد، اما نیاز به تعداد بسیار بیشتری سلول کاتدی و سرمایه‌گذاری سنگین‌تر.'
  },
  {
    id: 'cuPrScavengerRatio',
    nameFa: 'نسبت تولید کل مس به سلول اسکونجر (CuPr/ScCuPr)',
    nameEn: 'Total Cu to Scavenger Cu Production Ratio',
    symbol: 'CuPr/ScCuPr',
    unit: 'بی‌بعد',
    category: 'ew',
    typicalRange: '۴.۵ تا ۵.۵ (پیش‌فرض ۵.۰ معادل ۲۰٪ سهم اسکونجر)',
    descriptionFa: 'نسبتی که بر اساس آن دبی بلید آهن الکترولیت کنترل می‌شود تا تجمع یون‌های آهن در محدوده مجاز تثبیت گردد.',
    metallurgicalImpactFa: 'تنظیم مستقیم نرخ بلید خروجی از مدار الکترووینینگ بدون برهم زدن تراز اسید و آب.',
    highConsequenceFa: 'کاهش دبی بلید و افزایش تدریجی تجمع فریک و منگنز در الکترولیت.',
    lowConsequenceFa: 'افزایش دبی بلید، اتلاف اسید و مس و نیاز به اضافه کردن آب بدون املاح بیشتر.'
  },
  {
    id: 'feMnRatio',
    nameFa: 'نسبت بحرانی آهن به منگنز در الکترولیت (Fe/Mn Ratio)',
    nameEn: 'Electrolyte Iron to Manganese Ratio',
    symbol: 'Fe/Mn',
    unit: 'بی‌بعد',
    category: 'ew',
    typicalRange: 'بزرگتر از ۷.۰ تا ۱۰.۰ (محدوده ایده‌آل ۸ تا ۱۵)',
    descriptionFa: 'نسبت غلظت آهن کل به منگنز در الکترولیت بازگشتی به استریپینگ.',
    metallurgicalImpactFa: 'ضامن اکسید نشدن منگنز به فاز جامد دی‌اکسید منگنز و حفاظت شیمیایی از آندهای سربی.',
    highConsequenceFa: 'حفاظت کامل در برابر پسیواسیون آند، کاهش چشمگیر گل آندی روی کاتد.',
    lowConsequenceFa: 'رسوب شدید فلسی و چسبنده MnO2 بر روی آندها، افت شدید ولتاژ سلول و ایجاد اتصالی کوتاه کاتد-آند.'
  },
  {
    id: 'cobaltCons',
    nameFa: 'مصرف ویژه کبالت سولفات (Cobalt Consumption)',
    nameEn: 'Cobalt Sulfate Consumption',
    symbol: 'Co_spec',
    unit: 'kg Co/t Cu',
    category: 'ew',
    typicalRange: '۰.۱۵ تا ۰.۵۰ کیلوگرم کبالت بر تن مس کاتدی',
    descriptionFa: 'یون کبالت (۰.۱ تا ۰.۱۵ g/L) به الکترولیت اضافه می‌شود تا ولتاژ فرارفت اکسیژن در آند را کاهش داده و از خوردگی آند سربی جلوگیری کند.',
    metallurgicalImpactFa: 'کاهش نرخ خوردگی آند سرب-کلسیم-قلع از طریق پایدارسازی لایه هدایت‌کننده دی‌اکسید سرب.',
    highConsequenceFa: 'افزایش هزینه مواد مصرفی، اما افزایش عمر مفید آندها به بالای ۵ سال.',
    lowConsequenceFa: 'سایش سریع آند سربی، ورود سرب به کاتد مس و افت گرید متالورژیکی کاتد از Grade A.'
  }
];
