import React, { useState } from 'react';
import { SimulationInputs, ProcessFlowsheet, CircuitTopology } from '../engine/types';
import { FLOWSHEET_METADATA, TOPOLOGY_METADATA } from '../data/referenceDatasets';
import { PARAMETERS_ENCYCLOPEDIA } from '../data/parametersGuide';
import { Sliders, FlaskConical, Cpu, Sparkles, HelpCircle, RefreshCcw, CheckCircle, Info } from 'lucide-react';

interface ParameterInputsProps {
  inputs: SimulationInputs;
  onChange: (updated: Partial<SimulationInputs>) => void;
  onResetBenchmark: () => void;
  onClearFields: () => void;
}

export const ParameterInputs: React.FC<ParameterInputsProps> = ({
  inputs,
  onChange,
  onResetBenchmark,
  onClearFields
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'sx' | 'ew' | 'wash'>('feed');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const meta = FLOWSHEET_METADATA[inputs.flowsheet];

  const getParamInfo = (id: string) => {
    return PARAMETERS_ENCYCLOPEDIA.find((p) => p.id === id);
  };

  const renderFieldWithInfo = (
    label: string,
    id: string,
    value: number,
    onChangeVal: (val: number) => void,
    unit: string,
    step: string = '1',
    min: number = 0,
    accent: string = 'text-white'
  ) => {
    const info = getParamInfo(id);
    const isTooltipOpen = activeTooltip === id;

    return (
      <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800 relative flex flex-col justify-between">
        <div className="flex items-center justify-between gap-1 mb-1">
          <label className="text-slate-300 text-[11px] font-medium truncate">{label}</label>
          {info && (
            <button
              type="button"
              onClick={() => setActiveTooltip(isTooltipOpen ? null : id)}
              className="text-slate-500 hover:text-copper-400 p-0.5 rounded transition"
              title="مشاهده راهنمای متالورژیکی و محدوده مجاز"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Tooltip Popup */}
        {isTooltipOpen && info && (
          <div className="absolute top-9 left-2 right-2 z-30 p-3 bg-slate-900 border border-copper-500/50 rounded-xl shadow-2xl text-[11px] space-y-1.5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-850 pb-1">
              <span className="font-bold text-copper-400">{info.nameFa}</span>
              <button
                onClick={() => setActiveTooltip(null)}
                className="text-slate-400 hover:text-white text-xs px-1"
              >
                &times;
              </button>
            </div>
            <p className="text-slate-300 leading-normal">{info.descriptionFa}</p>
            <div className="text-[10px] text-emerald-400 font-mono bg-slate-950 px-2 py-0.5 rounded">
              دامنه صنعتی: {info.typicalRange}
            </div>
            <div className="text-[10px] text-slate-400">
              <strong>اثر:</strong> {info.metallurgicalImpactFa}
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <input
            type="number"
            inputMode="decimal"
            step={step}
            min={min}
            value={value === 0 ? '' : value}
            placeholder="0.0"
            onChange={(e) => {
              const v = e.target.value === '' ? 0 : parseFloat(e.target.value);
              onChangeVal(isNaN(v) ? 0 : v);
            }}
            className={`w-full bg-slate-800 ${accent} px-2.5 py-1 rounded-lg border border-slate-700 font-mono text-xs sm:text-sm font-bold focus:outline-none focus:border-copper-500`}
          />
          <span className="text-slate-400 text-[10px] font-mono whitespace-nowrap">{unit}</span>
        </div>

        {value === 0 && (
          <span className="text-[10px] text-amber-500/80 mt-1 block">مقدار وارد نشده</span>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl">
      {/* Top Banner: Active Flowsheet and Fast Actions */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-copper-500 animate-pulse"></span>
            <h2 className="text-sm sm:text-base font-bold text-white">{meta.titleFa}</h2>
            <span className="text-[10px] font-mono text-copper-400 bg-slate-800 px-1.5 py-0.5 rounded border border-copper-500/20">
              {inputs.flowsheet}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{meta.descriptionFa}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Topology Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400">آرایش استخراج:</span>
            <select
              value={inputs.topology}
              onChange={(e) => onChange({ topology: e.target.value as CircuitTopology })}
              className="bg-slate-800 border border-slate-700 text-xs text-copper-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-copper-500 font-mono"
            >
              {Object.keys(TOPOLOGY_METADATA).map((top) => (
                <option key={top} value={top} className="bg-slate-900 text-slate-200">
                  {TOPOLOGY_METADATA[top as CircuitTopology].titleFa}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onResetBenchmark}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-copper-600/20 text-copper-300 border border-copper-500/30 hover:bg-copper-600/30 transition"
            title="بارگذاری مقادیر استاندارد کارخانه‌ای اکسل کافومبیلا"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>مقادیر مرجع کارخانه</span>
          </button>

          <button
            onClick={onClearFields}
            className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white border border-slate-700 transition"
            title="پاکسازی فیلدها و ورود داده‌ها از صفر"
          >
            <RefreshCcw className="w-3 h-3" />
            <span>خام‌سازی</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-3 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
            activeTab === 'feed'
              ? 'bg-copper-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>۱. خوراک و شیمی PLS</span>
        </button>

        <button
          onClick={() => setActiveTab('sx')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
            activeTab === 'sx'
              ? 'bg-copper-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>۲. استخراج حلالی (SX)</span>
        </button>

        <button
          onClick={() => setActiveTab('ew')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
            activeTab === 'ew'
              ? 'bg-copper-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>۳. الکترووینینگ (EW)</span>
        </button>

        {meta.hasWashStage && (
          <button
            onClick={() => setActiveTab('wash')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'wash'
                ? 'bg-copper-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>۴. شستشو / اسکراب آهن</span>
          </button>
        )}
      </div>

      {/* Tab Panels */}
      {activeTab === 'feed' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {renderFieldWithInfo('دبی PLS', 'plsFlow', inputs.plsFlow, (v) => onChange({ plsFlow: v }), 'm³/h', '50', 0)}
          {renderFieldWithInfo('عیار مس [Cu]', 'plsCu', inputs.plsCu, (v) => onChange({ plsCu: v }), 'g/L', '0.1', 0, 'text-amber-400 font-black')}
          {renderFieldWithInfo('فریک [Fe³⁺]', 'plsFe3', inputs.plsFe3, (v) => onChange({ plsFe3: v }), 'g/L', '0.05', 0)}
          {renderFieldWithInfo('فروس [Fe²⁺]', 'plsFe2', inputs.plsFe2, (v) => onChange({ plsFe2: v }), 'g/L', '0.1', 0)}
          {renderFieldWithInfo('منگنز [Mn]', 'plsMn', inputs.plsMn, (v) => onChange({ plsMn: v }), 'g/L', '0.1', 0)}
          {renderFieldWithInfo('اسید آزاد خوراک', 'plsAcid', inputs.plsAcid, (v) => onChange({ plsAcid: v }), 'g/L', '0.5', 0, 'text-emerald-400')}
        </div>
      )}

      {activeTab === 'sx' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {renderFieldWithInfo('درصد لودینگ هدف (%ML)', 'targetPercentML', inputs.targetPercentML, (v) => onChange({ targetPercentML: v }), '%', '1', 50, 'text-emerald-400')}
          {renderFieldWithInfo('نسبت دبی آلی به آبی (O/A)', 'ratioOA', inputs.ratioOA, (v) => onChange({ ratioOA: v }), 'O/A', '0.05', 0.5)}
          
          <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block mb-1">راندمان اختلاط طبقه E1</span>
            <div className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-mono font-bold">
              95% (استاندارد Cytec)
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">بر مبنای رفرنس M. Soderstrom</span>
          </div>

          <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block mb-1">راندمان اختلاط طبقات بعد</span>
            <div className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-mono font-bold">
              97% E2 / 95% S
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">ستلر با کشیدگی ۲ لیتر در مترمکعب</span>
          </div>
        </div>
      )}

      {activeTab === 'ew' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {renderFieldWithInfo('نسبت تولید کل به اسکونجر', 'cuPrScavengerRatio', inputs.cuPrScavengerRatio, (v) => onChange({ cuPrScavengerRatio: v }), 'نسبت', '0.1', 3)}
          {renderFieldWithInfo('دانسیته جریان', 'currentDensity', inputs.currentDensity, (v) => onChange({ currentDensity: v }), 'A/m²', '10', 100)}
          {renderFieldWithInfo('مساحت فعال کاتد', 'cathodeArea', inputs.cathodeArea, (v) => onChange({ cathodeArea: v }), 'm²', '0.01', 1)}
          {renderFieldWithInfo('تعداد کاتد در هر سلول', 'cathodesPerCell', inputs.cathodesPerCell, (v) => onChange({ cathodesPerCell: Math.round(v) }), 'عدد', '1', 10)}
          {renderFieldWithInfo('سرعت سطحی کاتد', 'cathodeVelocity', inputs.cathodeVelocity, (v) => onChange({ cathodeVelocity: v }), 'm³/h.m²', '0.01', 0.01)}
        </div>
      )}

      {activeTab === 'wash' && meta.hasWashStage && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {renderFieldWithInfo('نسبت O/A شستشو', 'washStageOA', inputs.washStageOA, (v) => onChange({ washStageOA: v }), 'O/A', '5', 10)}
          
          {meta.washType === 'launder' &&
            renderFieldWithInfo('درصد بای‌پاس لندر فاز آلی', 'washBypass', inputs.washBypass, (v) => onChange({ washBypass: v }), '%', '5', 0)
          }

          {(meta.washType === 'mixer-settler-acid' || meta.washType === 'mixer-settler-diluted-ewb') &&
            renderFieldWithInfo('راندمان اسکراب آهن فریک', 'feScrubbingEff', inputs.feScrubbingEff, (v) => onChange({ feScrubbingEff: v }), '%', '5', 10, 'text-amber-400')
          }
        </div>
      )}
    </div>
  );
};
