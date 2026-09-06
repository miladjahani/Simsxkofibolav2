import React, { useState, useEffect, useMemo } from 'react';
import { SimulationInputs, SimulationResults, SimulationSession, ProcessFlowsheet } from './engine/types';
import { runSimulation } from './engine/simulationEngine';
import { FLOWSHEET_METADATA } from './data/referenceDatasets';
import { INDUSTRIAL_TEMPLATES } from './data/templates';
import { GoogleHeader } from './components/GoogleHeader';
import { KpiCards } from './components/KpiCards';
import { ParameterInputs } from './components/ParameterInputs';
import { FlowsheetDiagram } from './components/FlowsheetDiagram';
import { StreamTable } from './components/StreamTable';
import { ScenarioComparator } from './components/ScenarioComparator';
import { HelpCenter } from './components/HelpCenter';
import { NewSessionModal } from './components/NewSessionModal';
import { ReportPrintView } from './components/ReportPrintView';
import { 
  Sliders, 
  LayoutGrid, 
  Table, 
  BarChart2, 
  HelpCircle, 
  Droplet, 
  Play, 
  Plus, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';

const STORAGE_KEY = 'sim_sxew_cu_v7_sessions';

export function App() {
  // Load sessions from localStorage or initialize with a clean-slate default session
  const [sessions, setSessions] = useState<SimulationSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading sessions:', e);
    }
    // Default initial session: Clean slate based on user request (no hardcoded forced defaults)
    const initialTmpl = INDUSTRIAL_TEMPLATES[0];
    return [
      {
        id: 'session_init_1',
        name: 'مطالعه موردی ۱ (سکشن جدید)',
        description: 'سکشن خام جهت ورود اطلاعات کارخانه و شبیه‌سازی موازنه مس',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        inputs: {
          flowsheet: 'A1',
          topology: '2Ex1S',
          ...initialTmpl.inputs
        },
        isCalculated: false
      }
    ];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => sessions[0]?.id || 'session_init_1');
  const [activeView, setActiveView] = useState<'inputs' | 'flowsheet' | 'streams' | 'comparator' | 'help'>('inputs');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  // Sync sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Error saving sessions to localStorage:', e);
    }
  }, [sessions]);

  // Current active session
  const activeSession = useMemo(() => {
    return sessions.find((s) => s.id === activeSessionId) || sessions[0];
  }, [sessions, activeSessionId]);

  // Handle inputs change for active session
  const handleUpdateInputs = (updated: Partial<SimulationInputs>) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            updatedAt: new Date().toISOString(),
            isCalculated: true,
            inputs: {
              ...s.inputs,
              ...updated
            }
          };
        }
        return s;
      })
    );
  };

  // Reset to benchmark reference
  const handleResetBenchmark = () => {
    const stdTmpl = INDUSTRIAL_TEMPLATES.find((t) => t.id === 'heap-leach-standard') || INDUSTRIAL_TEMPLATES[1];
    handleUpdateInputs({
      ...stdTmpl.inputs
    });
  };

  // Clear all fields
  const handleClearFields = () => {
    const cleanTmpl = INDUSTRIAL_TEMPLATES[0];
    handleUpdateInputs({
      ...cleanTmpl.inputs
    });
  };

  // Switch flowsheet
  const handleSelectFlowsheet = (fs: ProcessFlowsheet) => {
    handleUpdateInputs({ flowsheet: fs });
  };

  // Session management handlers
  const handleCreateSession = (newSession: SimulationSession) => {
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  const handleRenameSession = (id: string, newName: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name: newName, updatedAt: new Date().toISOString() } : s))
    );
  };

  const handleDuplicateSession = (id: string) => {
    const target = sessions.find((s) => s.id === id);
    if (!target) return;
    const duplicated: SimulationSession = {
      ...target,
      id: `session_${Date.now()}`,
      name: `${target.name} (رونوشت)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSessions((prev) => [duplicated, ...prev]);
    setActiveSessionId(duplicated.id);
  };

  const handleDeleteSession = (id: string) => {
    if (sessions.length <= 1) return;
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (activeSessionId === id) {
      const remaining = sessions.filter((s) => s.id !== id);
      setActiveSessionId(remaining[0]?.id || '');
    }
  };

  // Simulation engine execution
  const results: SimulationResults = useMemo(() => {
    // If inputs are essentially empty or zero, provide a safe fallback calculation
    const inputsToRun: SimulationInputs = {
      ...activeSession.inputs,
      plsFlow: activeSession.inputs.plsFlow || 1000,
      plsCu: activeSession.inputs.plsCu || 2.5
    };
    return runSimulation(inputsToRun);
  }, [activeSession]);

  const isFeedEmpty = activeSession.inputs.plsFlow === 0 || activeSession.inputs.plsCu === 0;

  // Exports
  const handleExportCsv = () => {
    const header = ['شناسه جریان', 'نام جریان', 'فاز', 'دبی (m3/h)', 'مس (g/L)', 'آهن۳ (g/L)', 'آهن۲ (g/L)', 'منگنز (g/L)', 'اسید (g/L)'].join(',');
    const rows = results.streams.map((s) => [
      `"${s.id}"`,
      `"${s.name}"`,
      `"${s.phase}"`,
      s.flow.toFixed(2),
      s.cu.toFixed(4),
      s.fe3.toFixed(4),
      s.fe2.toFixed(4),
      s.mn.toFixed(4),
      s.acid.toFixed(2)
    ].join(',')).join('\n');

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(`${header}\n${rows}`);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `${activeSession.name}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(sessions, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `SimSXEWCu_Projects_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080a0e] text-slate-100 selection:bg-copper-500 selection:text-white">
      {/* Google Workspace Style Top Header */}
      <GoogleHeader
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewSession={() => setIsNewModalOpen(true)}
        onRenameSession={handleRenameSession}
        onDuplicateSession={handleDuplicateSession}
        onDeleteSession={handleDeleteSession}
        onOpenHelp={() => setIsHelpOpen(true)}
        onExportCsv={handleExportCsv}
        onExportJson={handleExportJson}
        onPrint={() => setIsPrintOpen(true)}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 space-y-4 pb-20 md:pb-6">
        {/* If user started from a clean-slate zero session, show gentle guide */}
        {isFeedEmpty && (
          <div className="p-3 sm:p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold block text-white text-sm">سکشن خام و آماده ورود داده‌های میدانی</span>
                <span>
                  داده‌های دبی خوراک یا عیار مس در این سکشن صفر است. می‌توانید داده‌های کارخانه خود را در فرم زیر وارد کنید یا یکی از الگوهای صنعتی را بارگذاری نمایید.
                </span>
              </div>
            </div>
            <button
              onClick={handleResetBenchmark}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shrink-0 transition"
            >
              بارگذاری مقادیر کارخانه مرجع
            </button>
          </div>
        )}

        {/* Top KPI Cards Summary */}
        <KpiCards results={results} />

        {/* View Switcher Tabs (Desktop & Tablet) */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveView('inputs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeView === 'inputs'
                  ? 'bg-copper-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>تنظیمات و ورود داده‌ها</span>
            </button>

            <button
              onClick={() => setActiveView('flowsheet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeView === 'flowsheet'
                  ? 'bg-copper-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>دیاگرام فرآیندی (PFD)</span>
            </button>

            <button
              onClick={() => setActiveView('streams')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeView === 'streams'
                  ? 'bg-copper-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>موازنه جریان‌ها</span>
            </button>

            <button
              onClick={() => setActiveView('comparator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeView === 'comparator'
                  ? 'bg-copper-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>مقایسه ۱۰ سناریو</span>
            </button>

            <button
              onClick={() => setActiveView('help')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeView === 'help'
                  ? 'bg-copper-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>راهنمای صفر تا صد</span>
            </button>
          </div>
        </div>

        {/* View Contents */}
        {activeView === 'inputs' && (
          <div className="space-y-4">
            <ParameterInputs
              inputs={activeSession.inputs}
              onChange={handleUpdateInputs}
              onResetBenchmark={handleResetBenchmark}
              onClearFields={handleClearFields}
            />
            <FlowsheetDiagram results={results} />
          </div>
        )}

        {activeView === 'flowsheet' && <FlowsheetDiagram results={results} />}
        {activeView === 'streams' && <StreamTable streams={results.streams} />}
        {activeView === 'comparator' && (
          <ScenarioComparator currentInputs={activeSession.inputs} onSelectFlowsheet={handleSelectFlowsheet} />
        )}
        {activeView === 'help' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
            <HelpCenter isOpen={true} onClose={() => setActiveView('inputs')} initialTab="parameters" />
          </div>
        )}

        {/* Specific Consumptions Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
            <Droplet className="w-4 h-4 text-emerald-400" />
            <span>شاخص‌های مصرف ویژه معرف‌ها، انرژی و موازنه آب مدار (Specific Consumptions)</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
            <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1 font-sans text-[11px]">مصرف آب دمین در EW</span>
              <span className="text-white font-bold text-base">{results.deminWaterConsumption.toFixed(2)}</span>
              <span className="text-slate-500 text-[10px] block mt-0.5">m³/t Cu</span>
            </div>

            <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1 font-sans text-[11px]">مصرف آب خام مدار</span>
              <span className="text-white font-bold text-base">{results.rawWaterConsumption.toFixed(2)}</span>
              <span className="text-slate-500 text-[10px] block mt-0.5">m³/t Cu</span>
            </div>

            <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1 font-sans text-[11px]">مصرف اسید در EW</span>
              <span className="text-white font-bold text-base">{results.acidConsumption.toFixed(3)}</span>
              <span className="text-slate-500 text-[10px] block mt-0.5">t H₂SO₄/t Cu</span>
            </div>

            <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1 font-sans text-[11px]">مصرف کبالت سولفات</span>
              <span className="text-white font-bold text-base">{results.cobaltConsumption.toFixed(3)}</span>
              <span className="text-slate-500 text-[10px] block mt-0.5">kg Co/t Cu</span>
            </div>

            <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1 font-sans text-[11px]">اتلاف اکسترکتنت Lix</span>
              <span className="text-amber-400 font-bold text-base">{results.extractantLost.toFixed(2)}</span>
              <span className="text-slate-500 text-[10px] block mt-0.5">kg/t Cu</span>
            </div>

            <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1 font-sans text-[11px]">اتلاف رقیق‌ساز نفتی</span>
              <span className="text-amber-400 font-bold text-base">{results.diluentLost.toFixed(1)}</span>
              <span className="text-slate-500 text-[10px] block mt-0.5">kg/t Cu</span>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar (Google Mobile App style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 px-3 py-1.5 flex items-center justify-around text-[10px]">
        <button
          onClick={() => setActiveView('inputs')}
          className={`flex flex-col items-center gap-1 ${activeView === 'inputs' ? 'text-copper-400 font-bold' : 'text-slate-400'}`}
        >
          <Sliders className="w-4 h-4" />
          <span>تنظیمات</span>
        </button>

        <button
          onClick={() => setActiveView('flowsheet')}
          className={`flex flex-col items-center gap-1 ${activeView === 'flowsheet' ? 'text-copper-400 font-bold' : 'text-slate-400'}`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>دیاگرام</span>
        </button>

        <button
          onClick={() => setActiveView('streams')}
          className={`flex flex-col items-center gap-1 ${activeView === 'streams' ? 'text-copper-400 font-bold' : 'text-slate-400'}`}
        >
          <Table className="w-4 h-4" />
          <span>جریان‌ها</span>
        </button>

        <button
          onClick={() => setActiveView('comparator')}
          className={`flex flex-col items-center gap-1 ${activeView === 'comparator' ? 'text-copper-400 font-bold' : 'text-slate-400'}`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>سناریوها</span>
        </button>

        <button
          onClick={() => setIsHelpOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-copper-400"
        >
          <HelpCircle className="w-4 h-4" />
          <span>راهنما</span>
        </button>
      </nav>

      {/* Modals */}
      <NewSessionModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onCreateSession={handleCreateSession}
      />

      <HelpCenter
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        initialTab="manual"
      />

      <ReportPrintView
        session={activeSession}
        results={results}
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
      />
    </div>
  );
}

export default App;
