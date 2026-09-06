import React, { useState } from 'react';
import { X, BookOpen, Search, Atom, Zap, ShieldAlert, FileText, CheckCircle2, Compass, Layers, Activity, Sliders, FlaskConical } from 'lucide-react';
import { PARAMETERS_ENCYCLOPEDIA, ParameterGuideItem } from '../data/parametersGuide';
import { FLOWSHEET_METADATA } from '../data/referenceDatasets';
import { ProcessFlowsheet } from '../engine/types';

interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'manual' | 'parameters' | 'scenarios' | 'theory';
}

export const HelpCenter: React.FC<HelpCenterProps> = ({ isOpen, onClose, initialTab = 'manual' }) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'parameters' | 'scenarios' | 'theory'>(initialTab);
  const [paramSearch, setParamSearch] = useState('');
  const [paramCategory, setParamCategory] = useState<'all' | 'feed' | 'sx' | 'ew'>('all');

  if (!isOpen) return null;

  const filteredParams = PARAMETERS_ENCYCLOPEDIA.filter((item) => {
    const matchesCategory = paramCategory === 'all' || item.category === paramCategory;
    const matchesSearch =
      item.nameFa.toLowerCase().includes(paramSearch.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(paramSearch.toLowerCase()) ||
      item.symbol.toLowerCase().includes(paramSearch.toLowerCase()) ||
      item.descriptionFa.toLowerCase().includes(paramSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-750 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn text-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-copper-600/20 text-copper-400 flex items-center justify-center border border-copper-500/30">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">مرکز جامع راهنما و مستندات مهندسی SimSXEWCu Pro</h2>
              <p className="text-xs text-slate-400">راهنمای صفر تا صد پارامترها، متدولوژی استفاده و تئوری هیدرومتالورژی مس</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-4 border-b border-slate-800 bg-slate-900/60 overflow-x-auto text-xs font-semibold py-2">
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'manual'
                ? 'bg-copper-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>۱. راهنمای گام‌به‌گام اپلیکیشن</span>
          </button>

          <button
            onClick={() => setActiveTab('parameters')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'parameters'
                ? 'bg-copper-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>۲. فرهنگ جامع پارامترها (صفر تا صد)</span>
          </button>

          <button
            onClick={() => setActiveTab('scenarios')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'scenarios'
                ? 'bg-copper-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>۳. راهنمای سناریوهای ده‌گانه (A1 تا E2)</span>
          </button>

          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'theory'
                ? 'bg-copper-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            <span>۴. مبانی تئوری و معادلات کافومبیلا</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs leading-relaxed">
          {/* TAB 1: App User Guide */}
          {activeTab === 'manual' && (
            <div className="space-y-4">
              <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-copper-400 mb-2">چرخه کار با برنامه در پروژه‌های صنعتی:</h3>
                <p className="text-slate-300 mb-3">
                  نرم‌افزار <strong>SimSXEWCu Pro</strong> جهت شبیه‌سازی دقیق و بدون نقص عملیات صنعتی در محیط‌های کارگاهی، اتاق کنترل و طراحی کارخانجات هیدرومتالورژی مس آماده‌سازی شده است.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-750">
                    <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-copper-600 text-white flex items-center justify-center text-[10px]">۱</span>
                      <span>ایجاد سکشن جدید یا انتخاب سناریو</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      با کلیک روی دکمه «+ سکشن جدید» می‌توانید یک مطالعه موردی مستقل بسازید. برای هر سکشن نام اختصاصی بگذارید، نوع مدار فرایندی (مثلاً شستشوی لندر B1 یا اسکراب با بلید E2) را انتخاب کنید و تصمیم بگیرید داده‌ها از صفر وارد شوند یا از یک الگوی صنعتی بارگذاری گردند.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-750">
                    <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-copper-600 text-white flex items-center justify-center text-[10px]">۲</span>
                      <span>ورود داده‌های شیمیایی و عملیاتی</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      داده‌های عیار مس، آهن فریک، آهن فروس، منگنز و اسید آزاد را در تب «شیمی و خوراک PLS» وارد کنید. سپس در تب SX نسبت دبی آلی به آبی و درصد بارگیری هدف (%ML = 80%) را مشخص نمایید.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-750">
                    <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-copper-600 text-white flex items-center justify-center text-[10px]">۳</span>
                      <span>تحلیل تعاملی دیاگرام فرآیندی (PFD)</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      در بخش PFD، خطوط جریان با رنگ‌های تفکیکی آبی (فاز آبی)، زرد (فاز آلی)، سبز (الکترولیت) و صورتی (بازچرخانی) رسم شده‌اند. با کلیک روی هر خط، کارت هوشمند جریان با دبی و غلظت دقیق ۵ عنصر باز می‌شود.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-750">
                    <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-copper-600 text-white flex items-center justify-center text-[10px]">۴</span>
                      <span>مقایسه سناریوها و خروجی اکسل</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      در تب «مقایسه ۱۰ سناریو»، بدون نیاز به تغییر دستی پارامترها، خروجی تمامی مدارهای ده‌گانه را کنار هم ببینید تا بهینه‌ترین گزینه از لحاظ ریکاوری، مصرف اسید و کیفیت مس کاتدی را انتخاب کنید. در پایان خروجی CSV برای نرم‌افزار اکسل دانلود نمایید.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Parameter Encyclopedia */}
          {activeTab === 'parameters' && (
            <div className="space-y-4">
              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="جستجوی پارامتر (مثلاً: مس، منگنز، لودینگ، دانسیته جریان)..."
                    value={paramSearch}
                    onChange={(e) => setParamSearch(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-8 pl-3 py-1.5 text-white focus:outline-none focus:border-copper-500 text-xs"
                  />
                </div>

                <div className="flex items-center gap-1 text-[11px]">
                  <button
                    onClick={() => setParamCategory('all')}
                    className={`px-2.5 py-1 rounded-lg ${paramCategory === 'all' ? 'bg-copper-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    همه
                  </button>
                  <button
                    onClick={() => setParamCategory('feed')}
                    className={`px-2.5 py-1 rounded-lg ${paramCategory === 'feed' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    خوراک PLS
                  </button>
                  <button
                    onClick={() => setParamCategory('sx')}
                    className={`px-2.5 py-1 rounded-lg ${paramCategory === 'sx' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    استخراج حلالی (SX)
                  </button>
                  <button
                    onClick={() => setParamCategory('ew')}
                    className={`px-2.5 py-1 rounded-lg ${paramCategory === 'ew' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    الکترووینینگ (EW)
                  </button>
                </div>
              </div>

              {/* Encyclopedia Cards List */}
              <div className="space-y-3">
                {filteredParams.map((item) => (
                  <div key={item.id} className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{item.nameFa}</span>
                        <span className="text-[11px] text-slate-400 font-mono">({item.nameEn})</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-copper-400 font-bold">{item.symbol}</span>
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">واحد: {item.unit}</span>
                        <span className="bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded text-emerald-400">
                          دامنه معمول: {item.typicalRange}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs">{item.descriptionFa}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                        <span className="text-emerald-400 font-semibold block mb-0.5">اهمیت متالورژیکی:</span>
                        <span className="text-slate-400">{item.metallurgicalImpactFa}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                        <span className="text-amber-400 font-semibold block mb-0.5">پیامد انحراف از محدوده مجاز:</span>
                        <span className="text-slate-400">
                          <strong>بالا:</strong> {item.highConsequenceFa} <br />
                          <strong>پایین:</strong> {item.lowConsequenceFa}
                        </span>
                      </div>
                    </div>

                    {item.formulaFa && (
                      <div className="bg-slate-900 px-2.5 py-1 rounded text-copper-300 font-mono text-[10px] dir-ltr text-left border border-slate-800">
                        {item.formulaFa}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Flowsheet Scenarios */}
          {activeTab === 'scenarios' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-850 rounded-xl border border-slate-800 text-slate-300">
                <p>
                  در مدل نسخه ۷.۰ جوزف کافومبیلا، ۱۰ پیکربندی اصلی با هدف بهینه‌سازی ریکاوری مس، کنترل پدیده حمل مکانیکی منگنز و اسکراب انتخابی آهن فریک شبیه‌سازی شده‌اند:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.keys(FLOWSHEET_METADATA).map((key) => {
                  const f = key as ProcessFlowsheet;
                  const meta = FLOWSHEET_METADATA[f];
                  return (
                    <div key={f} className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="font-bold text-white text-sm flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-copper-500"></span>
                            <span>{meta.titleFa}</span>
                          </span>
                          <span className="font-mono text-copper-400 text-xs font-bold">{f}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mb-2">{meta.titleEn}</div>
                        <p className="text-slate-300 text-xs mb-3">{meta.descriptionFa}</p>
                      </div>

                      <div className="border-t border-slate-800/80 pt-2">
                        <span className="text-[11px] font-semibold text-emerald-400 block mb-1">مزایای کلیدی:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-400">
                          {meta.keyBenefitsFa.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: Theoretical & Electrochemical Models */}
          {activeTab === 'theory' && (
            <div className="space-y-4">
              <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-2">
                  <Atom className="w-4 h-4" />
                  <span>معادلات تعادل ترمودینامیکی استخراج مس و آهن(III) با Lix984N</span>
                </h3>
                <p className="mb-2">
                  بر مبنای مقاله مدل‌سازی استخراج مس با استخراج‌کننده‌های کیلیتور هیدروکسی‌اکسیم (Kafumbila, 2024)، تعادل تبادل کاتیونی و استریپینگ توسط رابطه زیر تعیین می‌شود:
                </p>
                <div className="bg-slate-900 p-3 rounded-lg font-mono text-copper-300 text-xs border border-slate-750 my-2 space-y-1 dir-ltr text-left">
                  <div>Cu²⁺_aq + 2 RH_org ⇌ R₂Cu_org + 2 H⁺_aq</div>
                  <div>Fe³⁺_aq + 3 RH_org ⇌ R₃Fe_org + 3 H⁺_aq</div>
                  <div>ML = (v/v%) × 0.488256  [g/L Cu]</div>
                  <div>%ML = ([Cu]_LO / ML) × 100 ≈ 80% (جهت جلوگیری از لودینگ فریک)</div>
                  <div>vv% = (ΔCu_aq ÷ O/A + [Cu]_SO) ÷ (0.488256 × %ML/100)   (سایزینگ اکسترکتنت)</div>
                  <div>[Cu]_LO = %ML/100 × ML</div>
                </div>
              </div>

              <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-2">
                  <Sliders className="w-4 h-4" />
                  <span>ایزوترم تعادلی و حل مرحله‌به‌مرحله استخراج (McCabe-Thiele)</span>
                </h3>
                <p className="text-slate-400 text-[11px] mb-2">
                  موتور محاسباتی نسخه ۷.۱ به‌جای مقیاس خطی بنچ‌مارک، طبقات استخراج جریان مخالف را با ایزوترم لانگمویر حل می‌کند؛ بنابراین تعداد طبقات، O/A، عیار خوراک و اسید آزاد مستقیماً راندمان استخراج را تغییر می‌دهند:
                </p>
                <div className="bg-slate-900 p-3 rounded-lg font-mono text-emerald-300 text-xs border border-slate-750 my-2 space-y-1 dir-ltr text-left">
                  <div>Y_eq = ML × (K×X) ÷ (1 + K×X)   (ایزوترم لانگمویر، K ≈ 6.2 L/g)</div>
                  <div>K = 6.2 × (5 ÷ [H₂SO₄]_PLS)^0.9   (تصحیح اسیدی تعادل)</div>
                  <div>Y_k = η_k × Y_eq,k + (1 - η_k) × Y_(k+1)   (η: E1=95% ، E2+=97%)</div>
                  <div>موازنه هر طبقه: X_(k-1) = X_k + (O/A) × (Y_k - Y_(k+1))</div>
                  <div>رافینیت با نیمه‌یابی همگرای موازنه جرم کل به‌دست می‌آید</div>
                </div>
              </div>

              <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2 mb-2">
                  <FlaskConical className="w-4 h-4" />
                  <span>کو-استخراج آهن(III) و موازنه بلید الکترووینینگ</span>
                </h3>
                <p className="text-slate-400 text-[11px] mb-2">
                  فریک تنها با کاهش درصد بارگیری (افزایش جایگاه‌های آزاد اکسترکتنت) کو-استخراج می‌شود؛ بلید EW نیز از موازنه آهن مدار و نه به‌صورت عدد ثابت محاسبه می‌گردد:
                </p>
                <div className="bg-slate-900 p-3 rounded-lg font-mono text-purple-300 text-xs border border-slate-750 my-2 space-y-1 dir-ltr text-left">
                  <div>[Fe³⁺]_LO = [Fe³⁺]_PLS × 0.0153 × ((100 - %ML) ÷ 20)²</div>
                  <div>Fe_net (kg/h) = Q_org × ([Fe³⁺]_LO,شستشو - [Fe³⁺]_SO)</div>
                  <div>Q_EWB = 1.856 + 0.32 × Fe_net   [m³/h]</div>
                  <div>[Fe³⁺]_spent = Fe_net ÷ Q_EWB</div>
                </div>
              </div>

              <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 mb-2">
                  <Atom className="w-4 h-4" />
                  <span>کنترل منگنز و نسبت Fe/Mn در الکترولیت برگشتی</span>
                </h3>
                <p className="text-slate-400 text-[11px] mb-2">
                  منگنز فقط از راه کشیدگی مکانیکی فاز آبی به الکترولیت می‌رسد. در نسبت Fe/Mn کمتر از ۷، اکسیداسیون منگنز به Mn³⁺ و پرمنگنات فعال می‌شود (رسوب MnO₂ روی آند):
                </p>
                <div className="bg-slate-900 p-3 rounded-lg font-mono text-cyan-300 text-xs border border-slate-750 my-2 space-y-1 dir-ltr text-left">
                  <div>[Mn]_spent = (Q_org × e × [Mn]_PLS × 0.307 × (1-η_wash) × κ) ÷ Q_EWB</div>
                  <div>Fe/Mn = ([Fe³⁺] + [Fe²⁺])_spent ÷ [Mn]_spent</div>
                  <div>Mn³⁺ = Mn × 0.1667 × (7 - Fe/Mn)   و   MnO₄⁻ = 0.72 × Mn³⁺</div>
                </div>
              </div>

              <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4" />
                  <span>الکتروشیمی سلول‌های کانونشنال الکترووینینگ و موازنه ردوکس</span>
                </h3>
                <ul className="list-disc list-inside space-y-1.5 pr-2">
                  <li>
                    <strong className="text-white">جریان کاتدی (۴۰٪ دبی):</strong> احیای مس و واکنش اتلافی احیای فریک:
                    <div className="font-mono text-emerald-400 my-1 dir-ltr text-left">Cu²⁺ + 2e⁻ → Cu⁰ &nbsp;|&nbsp; Fe³⁺ + e⁻ → Fe²⁺</div>
                    <div className="font-mono text-emerald-400 my-1 dir-ltr text-left">CE (%) = 100 - 9.24 × (1 - e^(-0.9 × [Fe³⁺]_spent))   (کالیبره مرجع)</div>
                  </li>
                  <li>
                    <strong className="text-white">قانون فارادی و انرژی (وابسته به kFactor ورودی):</strong>
                    <div className="font-mono text-emerald-400 my-1 dir-ltr text-left">m_cell (kg/h) = I(A) × kF(g/Ah) × CE/100 ÷ 1000</div>
                    <div className="font-mono text-emerald-400 my-1 dir-ltr text-left">E_spec (kWh/t) = V_cell × 1000 ÷ (kF × CE/100)</div>
                  </li>
                  <li>
                    <strong className="text-white">جریان آندی (۶۰٪ دبی):</strong> اکسیداسیون آب و اکسیداسیون فروس و منگنز:
                    <div className="font-mono text-emerald-400 my-1 dir-ltr text-left">2H₂O → O₂ + 4H⁺ + 4e⁻ &nbsp;|&nbsp; Fe²⁺ → Fe³⁺ + e⁻</div>
                    <div className="font-mono text-emerald-400 my-1 dir-ltr text-left">Mn²⁺ + 4H₂O → MnO₄⁻ + 8H⁺ + 5e⁻</div>
                  </li>
                  <li>
                    <strong className="text-white">واکنش اختلاط بالای سلول (Recombination Reaction):</strong>
                    <div className="font-mono text-purple-300 my-1 dir-ltr text-left">MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O</div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-850 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">مرجع مهندسی: Joseph Kafumbila, 2017, 2020, 2024, 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-copper-600 hover:bg-copper-500 text-white text-xs font-bold transition"
          >
            بستن راهنما
          </button>
        </div>
      </div>
    </div>
  );
};
