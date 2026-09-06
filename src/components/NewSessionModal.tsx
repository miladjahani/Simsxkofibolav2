import React, { useState } from 'react';
import { ProcessFlowsheet, CircuitTopology, SimulationSession, SimulationInputs } from '../engine/types';
import { FLOWSHEET_METADATA, TOPOLOGY_METADATA } from '../data/referenceDatasets';
import { INDUSTRIAL_TEMPLATES, IndustrialTemplate } from '../data/templates';
import { PlusCircle, X, Sparkles, Sliders, CheckCircle2, Layers, Cpu, Wrench } from 'lucide-react';

interface NewSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSession: (session: SimulationSession) => void;
}

export const NewSessionModal: React.FC<NewSessionModalProps> = ({
  isOpen,
  onClose,
  onCreateSession
}) => {
  const [sessionName, setSessionName] = useState('سناریوی شبیه‌سازی جدید');
  const [sessionDesc, setSessionDesc] = useState('');
  const [selectedFlowsheet, setSelectedFlowsheet] = useState<ProcessFlowsheet>('A1');
  const [selectedTopology, setSelectedTopology] = useState<CircuitTopology>('2Ex1S');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('clean-slate');

  if (!isOpen) return null;

  const handleCreate = () => {
    const template = INDUSTRIAL_TEMPLATES.find((t) => t.id === selectedTemplateId) || INDUSTRIAL_TEMPLATES[0];

    const newInputs: SimulationInputs = {
      flowsheet: selectedFlowsheet,
      topology: selectedTopology,
      ...template.inputs
    };

    const newSession: SimulationSession = {
      id: `session_${Date.now()}`,
      name: sessionName.trim() || 'سناریوی بدون نام',
      description: sessionDesc.trim() || FLOWSHEET_METADATA[selectedFlowsheet].descriptionFa,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      inputs: newInputs,
      isCalculated: selectedTemplateId !== 'clean-slate'
    };

    onCreateSession(newSession);
    onClose();
  };

  const currentMeta = FLOWSHEET_METADATA[selectedFlowsheet];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-750 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn text-slate-100">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-copper-600/20 text-copper-400 flex items-center justify-center border border-copper-500/30">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">ایجاد سکشن / سناریوی جدید شبیه‌سازی</h2>
              <p className="text-xs text-slate-400">تعریف نام، نوع مدار هیدرومتالورژی و روش مقداردهی اولیه</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* 1. Case Name & Description */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              ۱. نام سکشن یا مطالعه موردی (Session Name):
            </label>
            <input
              type="text"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              placeholder="مثال: ارزیابی مدار هیپ‌لیچینگ فاز ۲"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-copper-500 text-xs"
            />
            <input
              type="text"
              value={sessionDesc}
              onChange={(e) => setSessionDesc(e.target.value)}
              placeholder="توضیح اختیاری (مثلاً: شرایط کانسار منگنزدار و بررسی اثر شستشو)"
              className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-1.5 text-slate-400 focus:outline-none focus:border-copper-500 text-[11px]"
            />
          </div>

          {/* 2. Flowsheet Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              ۲. نوع مدار فرایندی (Flowsheet Circuit Type - Figures 1 to 10):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-800 rounded-xl bg-slate-850">
              {Object.keys(FLOWSHEET_METADATA).map((key) => {
                const f = key as ProcessFlowsheet;
                const meta = FLOWSHEET_METADATA[f];
                const isSelected = selectedFlowsheet === f;
                return (
                  <div
                    key={f}
                    onClick={() => setSelectedFlowsheet(f)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition flex flex-col justify-between ${
                      isSelected
                        ? 'bg-copper-950/40 border-copper-500 shadow-sm'
                        : 'bg-slate-800/40 border-slate-750 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-white text-xs font-mono">{f}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-copper-400" />}
                    </div>
                    <div className="text-[11px] font-medium text-slate-200 line-clamp-1">{meta.titleFa}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-2 mt-1">{meta.descriptionFa}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Extraction Topology */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              ۳. آرایش طبقات استخراج و استریپینگ (Topology):
            </label>
            <select
              value={selectedTopology}
              onChange={(e) => setSelectedTopology(e.target.value as CircuitTopology)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-copper-300 focus:outline-none focus:border-copper-500 text-xs font-mono"
            >
              {Object.keys(TOPOLOGY_METADATA).map((top) => (
                <option key={top} value={top} className="bg-slate-900 text-white">
                  {TOPOLOGY_METADATA[top as CircuitTopology].titleFa}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Starting Template / Zero-Based */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>۴. شیوه مقداردهی اولیه داده‌ها:</span>
              <span className="text-slate-400 text-[11px] font-normal">شروع بدون پیش‌فرض یا بر مبنای الگو</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {INDUSTRIAL_TEMPLATES.map((tmpl) => {
                const isSel = selectedTemplateId === tmpl.id;
                return (
                  <div
                    key={tmpl.id}
                    onClick={() => {
                      setSelectedTemplateId(tmpl.id);
                      if (tmpl.id !== 'clean-slate') {
                        setSelectedFlowsheet(tmpl.recommendedFlowsheet);
                        setSelectedTopology(tmpl.recommendedTopology);
                      }
                    }}
                    className={`p-2.5 rounded-xl border cursor-pointer transition ${
                      isSel
                        ? 'bg-emerald-950/30 border-emerald-500 text-emerald-300 shadow-sm'
                        : 'bg-slate-800/40 border-slate-750 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-xs">{tmpl.titleFa}</span>
                      {isSel && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-2">{tmpl.descriptionFa}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-850 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs transition"
          >
            انصراف
          </button>
          <button
            onClick={handleCreate}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-copper-600 hover:bg-copper-500 text-white font-bold text-xs shadow-lg shadow-copper-900/40 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>ایجاد سکشن و شروع شبیه‌سازی</span>
          </button>
        </div>
      </div>
    </div>
  );
};
