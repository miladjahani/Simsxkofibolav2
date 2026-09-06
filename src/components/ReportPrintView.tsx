import React from 'react';
import { SimulationResults, SimulationSession } from '../engine/types';
import { FLOWSHEET_METADATA, TOPOLOGY_METADATA } from '../data/referenceDatasets';
import { X, Printer } from 'lucide-react';

interface ReportPrintViewProps {
  session: SimulationSession;
  results: SimulationResults;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportPrintView: React.FC<ReportPrintViewProps> = ({
  session,
  results,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const meta = FLOWSHEET_METADATA[session.inputs.flowsheet];
  const topo = TOPOLOGY_METADATA[session.inputs.topology];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        {/* Actions Bar (hidden on print) */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-100 print:hidden">
          <div className="font-bold text-sm text-slate-800">پیش‌نمایش گزارش فنی مهندسی متالورژی مس</div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-copper-600 hover:bg-copper-700 text-white text-xs font-bold transition shadow"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ گزارش / ذخیره PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Body */}
        <div className="p-6 sm:p-8 overflow-y-auto font-sans text-xs space-y-5 print:p-0 print:overflow-visible">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-black text-slate-900">گزارش شبیه‌سازی موازنه جرم و الکتروشیمی مدار SX-EW مس</h1>
              <p className="text-xs text-slate-600 mt-1">پلتفرم مهندسی SimSXEWCu Pro v7.0 &bull; الگوریتم موازنه جوزف کافومبیلا</p>
            </div>
            <div className="text-left font-mono text-[11px] text-slate-600">
              <div>تاریخ: {new Date().toLocaleDateString('fa-IR')}</div>
              <div>ساعت: {new Date().toLocaleTimeString('fa-IR')}</div>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 block text-[10px]">نام پروژه / مطالعه موردی:</span>
              <span className="font-bold text-slate-900 text-xs">{session.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">پیکربندی فرایندی مدار:</span>
              <span className="font-bold text-slate-900 text-xs font-mono">{meta.titleFa}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">آرایش طبقات استخراج:</span>
              <span className="font-bold text-slate-900 text-xs font-mono">{topo.titleFa}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">اکسترکتنت فعال:</span>
              <span className="font-bold text-slate-900 text-xs font-mono">Lix984N ({results.extractantVolPercent.toFixed(2)}% v/v)</span>
            </div>
          </div>

          {/* Key Metallurgical Performance Indicators */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2">
              ۱. شاخص‌های کلیدی عملکرد متالورژیکی (Key Performance Indicators)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
              <div className="p-2 rounded border border-slate-200 bg-slate-50">
                <span className="text-slate-500 block font-sans text-[10px]">ریکاوری سراسری مس (Global Recovery):</span>
                <span className="font-bold text-slate-900 text-sm">{results.globalRecovery.toFixed(2)}%</span>
              </div>
              <div className="p-2 rounded border border-slate-200 bg-slate-50">
                <span className="text-slate-500 block font-sans text-[10px]">تولید کل مس کاتدی:</span>
                <span className="font-bold text-slate-900 text-sm">{results.totalCuProduction.toFixed(3)} t/h</span>
              </div>
              <div className="p-2 rounded border border-slate-200 bg-slate-50">
                <span className="text-slate-500 block font-sans text-[10px]">نسبت Cu/Fe در فاز آلی باردار:</span>
                <span className="font-bold text-slate-900 text-sm">{results.cuFeOrganicExEn.toFixed(1)}</span>
              </div>
              <div className="p-2 rounded border border-slate-200 bg-slate-50">
                <span className="text-slate-500 block font-sans text-[10px]">راندمان استخراج مس (Extraction Eff):</span>
                <span className="font-bold text-slate-900 text-sm">{results.extractionEff.toFixed(2)}%</span>
              </div>
              <div className="p-2 rounded border border-slate-200 bg-slate-50">
                <span className="text-slate-500 block font-sans text-[10px]">راندمان استریپینگ مس (Stripping Eff):</span>
                <span className="font-bold text-slate-900 text-sm">{results.strippingEff.toFixed(2)}%</span>
              </div>
              <div className="p-2 rounded border border-slate-200 bg-slate-50">
                <span className="text-slate-500 block font-sans text-[10px]">نسبت Fe/Mn در الکترولیت برگشتی:</span>
                <span className="font-bold text-slate-900 text-sm">{results.feMnSpentElectrolyte.toFixed(2)}</span>
              </div>
              <div className="p-2 rounded border border-slate-200 bg-slate-50">
                <span className="text-slate-500 block font-sans text-[10px]">مصرف ویژه انرژی الکترووینینگ (DC):</span>
                <span className="font-bold text-slate-900 text-sm">{results.energyConsumption.toFixed(0)} kWh/t</span>
              </div>
              <div className="p-2 rounded border border-slate-200 bg-slate-50">
                <span className="text-slate-500 block font-sans text-[10px]">ولتاژ سلول / توان مدار EW:</span>
                <span className="font-bold text-slate-900 text-sm">{results.cellVoltage.toFixed(2)} V / {results.totalEnergyMW.toFixed(2)} MW</span>
              </div>
            </div>
          </div>

          {/* Wash & Impurity Removal Performance (flowsheets with wash/scrub) */}
          {(results.washWaterFlow > 0 || results.mnWashEfficiency > 0 || results.feScrubEfficiency > 0) && (
            <div>
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2">
                ۱-الف. عملکرد شستشو و اسکراب ناخالصی‌ها (Wash & Scrub Performance)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                <div className="p-2 rounded border border-slate-200 bg-slate-50">
                  <span className="text-slate-500 block font-sans text-[10px]">دبی آب شستشو / اسکراب:</span>
                  <span className="font-bold text-slate-900">{results.washWaterFlow.toFixed(2)} m³/h</span>
                </div>
                <div className="p-2 rounded border border-slate-200 bg-slate-50">
                  <span className="text-slate-500 block font-sans text-[10px]">راندمان شستشوی منگنز (Entrainment Wash):</span>
                  <span className="font-bold text-slate-900">{results.mnWashEfficiency.toFixed(1)}%</span>
                </div>
                <div className="p-2 rounded border border-slate-200 bg-slate-50">
                  <span className="text-slate-500 block font-sans text-[10px]">راندمان اسکراب آهن فریک:</span>
                  <span className="font-bold text-slate-900">{results.feScrubEfficiency.toFixed(1)}%</span>
                </div>
                <div className="p-2 rounded border border-slate-200 bg-slate-50">
                  <span className="text-slate-500 block font-sans text-[10px]">آهن خالص ورودی به الکترولیت:</span>
                  <span className="font-bold text-slate-900">{results.feNetToElectrolyte.toFixed(2)} kg Fe/h</span>
                </div>
              </div>
            </div>
          )}

          {/* Specific Consumptions */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2">
              ۲. مصارف ویژه مواد و انرژی (Specific Reagent & Utility Consumptions)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              <div className="p-2 rounded border border-slate-200">
                <span className="text-slate-500 block font-sans text-[10px]">مصرف آب دمین در EW:</span>
                <span className="font-bold">{results.deminWaterConsumption.toFixed(2)} m³/t Cu</span>
              </div>
              <div className="p-2 rounded border border-slate-200">
                <span className="text-slate-500 block font-sans text-[10px]">مصرف آب خام مدار:</span>
                <span className="font-bold">{results.rawWaterConsumption.toFixed(2)} m³/t Cu</span>
              </div>
              <div className="p-2 rounded border border-slate-200">
                <span className="text-slate-500 block font-sans text-[10px]">مصرف اسید در EW:</span>
                <span className="font-bold">{results.acidConsumption.toFixed(3)} t H₂SO₄/t Cu</span>
              </div>
              <div className="p-2 rounded border border-slate-200">
                <span className="text-slate-500 block font-sans text-[10px]">مصرف کبالت سولفات:</span>
                <span className="font-bold">{results.cobaltConsumption.toFixed(3)} kg Co/t Cu</span>
              </div>
            </div>
          </div>

          {/* Mass Balance Streams Table */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2">
              ۳. جدول تفکیکی موازنه مواد و مشخصات جریان‌ها
            </h2>
            <table className="w-full text-right text-[11px] border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold">
                <tr>
                  <th className="p-2 border border-slate-200">جریان فرآیندی</th>
                  <th className="p-2 border border-slate-200 text-center font-mono">دبی (m³/h)</th>
                  <th className="p-2 border border-slate-200 text-center font-mono">Cu (g/L)</th>
                  <th className="p-2 border border-slate-200 text-center font-mono">Fe³⁺ (g/L)</th>
                  <th className="p-2 border border-slate-200 text-center font-mono">Fe²⁺ (g/L)</th>
                  <th className="p-2 border border-slate-200 text-center font-mono">Mn (g/L)</th>
                  <th className="p-2 border border-slate-200 text-center font-mono">اسید (g/L)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {results.streams.map((s) => (
                  <tr key={s.id}>
                    <td className="p-2 border border-slate-200 font-sans font-medium">{s.name}</td>
                    <td className="p-2 border border-slate-200 text-center">{s.flow.toFixed(1)}</td>
                    <td className="p-2 border border-slate-200 text-center font-bold">{s.cu.toFixed(3)}</td>
                    <td className="p-2 border border-slate-200 text-center">{s.fe3.toFixed(4)}</td>
                    <td className="p-2 border border-slate-200 text-center">{s.fe2.toFixed(3)}</td>
                    <td className="p-2 border border-slate-200 text-center">{s.mn.toFixed(3)}</td>
                    <td className="p-2 border border-slate-200 text-center">{s.acid.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signoff block */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-slate-600 text-[11px]">
            <div>تأییدیه متالورژیکی: مهندسی هیدرومتالورژی و استخراج مس</div>
            <div>نرم‌افزار محاسباتی صنعتی SimSXEWCu Pro v7.0</div>
          </div>
        </div>
      </div>
    </div>
  );
};
