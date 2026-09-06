import React from 'react';
import { ProcessFlowsheet, SimulationInputs } from '../engine/types';
import { runSimulation } from '../engine/simulationEngine';
import { FLOWSHEET_METADATA } from '../data/referenceDatasets';
import { BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';

interface ScenarioComparatorProps {
  currentInputs: SimulationInputs;
  onSelectFlowsheet: (f: ProcessFlowsheet) => void;
}

export const ScenarioComparator: React.FC<ScenarioComparatorProps> = ({
  currentInputs,
  onSelectFlowsheet
}) => {
  const flowsheets: ProcessFlowsheet[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E1', 'E2'];

  const resultsList = flowsheets.map((fs) => {
    const res = runSimulation({ ...currentInputs, flowsheet: fs });
    return {
      fs,
      meta: FLOWSHEET_METADATA[fs],
      res
    };
  });

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span>مقایسه جامع سناریوهای ده‌گانه (Multi-Scenario Comparison)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            ارزیابی هم‌زمان شاخص‌های ریکاوری، خلوص فاز آلی و مصارف ویژه در ۱۰ آرایش مختلف برای شرایط خوراک جاری
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-right text-xs">
          <thead className="bg-slate-850 text-slate-400 font-semibold border-b border-slate-800">
            <tr>
              <th className="p-3">مدار و پیکربندی</th>
              <th className="p-3 text-center font-mono">ریکاوری کل (%)</th>
              <th className="p-3 text-center font-mono text-purple-300">نسبت Cu/Fe در آلی</th>
              <th className="p-3 text-center font-mono text-emerald-400">تولید مس (t/h)</th>
              <th className="p-3 text-center font-mono text-blue-300">بلید EW (m³/h)</th>
              <th className="p-3 text-center font-mono">مصرف اسید (t/t Cu)</th>
              <th className="p-3 text-center font-mono">آب دمین (m³/t Cu)</th>
              <th className="p-3 text-center font-mono">کبالت (kg/t Cu)</th>
              <th className="p-3 text-center">انتخاب و اعمال</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {resultsList.map(({ fs, meta, res }) => {
              const isCurrent = fs === currentInputs.flowsheet;
              return (
                <tr
                  key={fs}
                  className={`hover:bg-slate-800/50 transition cursor-pointer ${
                    isCurrent ? 'bg-copper-950/30 border-r-4 border-r-copper-500' : ''
                  }`}
                  onClick={() => onSelectFlowsheet(fs)}
                >
                  <td className="p-3 font-sans">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono">
                        {fs}
                      </span>
                      <span className="font-medium text-slate-200 truncate max-w-xs">{meta.titleFa}</span>
                    </div>
                  </td>
                  <td className="p-3 text-center font-bold text-white">
                    <span
                      className={`px-2 py-0.5 rounded ${
                        res.globalRecovery >= 91
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {res.globalRecovery.toFixed(2)}%
                    </span>
                  </td>
                  <td className="p-3 text-center font-bold text-purple-300">
                    <span
                      className={`px-2 py-0.5 rounded ${
                        res.cuFeOrganicExEn >= 900
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {res.cuFeOrganicExEn.toFixed(0)}
                    </span>
                  </td>
                  <td className="p-3 text-center font-bold text-emerald-400">
                    {res.totalCuProduction.toFixed(3)}
                  </td>
                  <td className="p-3 text-center text-blue-300">
                    {res.ewbFlow.toFixed(2)}
                  </td>
                  <td className="p-3 text-center text-slate-300">
                    {res.acidConsumption.toFixed(3)}
                  </td>
                  <td className="p-3 text-center text-slate-300">
                    {res.deminWaterConsumption.toFixed(2)}
                  </td>
                  <td className="p-3 text-center text-slate-300">
                    {res.cobaltConsumption.toFixed(3)}
                  </td>
                  <td className="p-3 text-center font-sans">
                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-copper-400 bg-copper-500/10 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>فعال</span>
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFlowsheet(fs);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded transition"
                      >
                        <span>سوییچ</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
