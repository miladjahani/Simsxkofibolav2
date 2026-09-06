import React, { useState } from 'react';
import { SimulationSession, ProcessFlowsheet } from '../engine/types';
import { 
  Plus, 
  HelpCircle, 
  Download, 
  Cloud, 
  Edit3, 
  Trash2, 
  Copy, 
  Layers, 
  Check, 
  Printer, 
  FileSpreadsheet
} from 'lucide-react';
import { FLOWSHEET_METADATA } from '../data/referenceDatasets';

interface GoogleHeaderProps {
  sessions: SimulationSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onRenameSession: (id: string, newName: string) => void;
  onDuplicateSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onOpenHelp: () => void;
  onExportCsv: () => void;
  onExportJson: () => void;
  onPrint: () => void;
}

export const GoogleHeader: React.FC<GoogleHeaderProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onRenameSession,
  onDuplicateSession,
  onDeleteSession,
  onOpenHelp,
  onExportCsv,
  onExportJson,
  onPrint
}) => {
  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitleValue, setEditTitleValue] = useState(activeSession?.name || '');

  const handleSaveTitle = () => {
    if (activeSession && editTitleValue.trim()) {
      onRenameSession(activeSession.id, editTitleValue.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40">
      {/* Top Google Workspace App Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Left / Start: Brand + Editable Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-copper-600 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-copper-900/30">
            Cu
          </div>
          <div>
            <div className="flex items-center gap-2">
              {isEditingTitle ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={editTitleValue}
                    onChange={(e) => setEditTitleValue(e.target.value)}
                    onBlur={handleSaveTitle}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                    autoFocus
                    className="bg-slate-800 text-white font-bold text-sm px-2 py-0.5 rounded border border-copper-500 focus:outline-none"
                  />
                  <button onClick={handleSaveTitle} className="p-1 text-emerald-400 hover:text-emerald-300">
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setEditTitleValue(activeSession?.name || '');
                    setIsEditingTitle(true);
                  }}
                  className="group flex items-center gap-1.5 cursor-pointer hover:bg-slate-800/80 px-2 py-0.5 rounded transition"
                  title="کلیک جهت ویرایش نام سکشن"
                >
                  <span className="font-bold text-sm sm:text-base text-white tracking-tight">
                    {activeSession?.name || 'SimSXEWCu Pro'}
                  </span>
                  <Edit3 className="w-3 h-3 text-slate-500 group-hover:text-copper-400 transition" />
                </div>
              )}

              <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">
                <span>ذخیره ابری/محلی</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
              <span>مدار:</span>
              <span className="text-copper-400 font-semibold font-mono">
                {activeSession?.inputs?.flowsheet} ({FLOWSHEET_METADATA[activeSession?.inputs?.flowsheet]?.titleFa})
              </span>
              <span>&bull;</span>
              <span className="font-mono text-slate-300">{activeSession?.inputs?.topology}</span>
            </div>
          </div>
        </div>

        {/* Right / End: Google Style Tools */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2">
          <button
            onClick={onNewSession}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-copper-600 hover:bg-copper-500 text-white text-xs font-bold shadow-md shadow-copper-900/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>سکشن جدید</span>
          </button>

          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition"
            title="مرکز جامع راهنمای پارامترها و مستندات صفر تا صد"
          >
            <HelpCircle className="w-4 h-4 text-copper-400" />
            <span className="hidden sm:inline">راهنمای جامع</span>
          </button>

          <div className="relative group">
            <button
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>خروجی</span>
            </button>
            <div className="absolute left-0 mt-1 w-44 bg-slate-850 border border-slate-750 rounded-xl shadow-2xl py-1 hidden group-hover:block z-50 text-xs">
              <button
                onClick={onExportCsv}
                className="w-full px-3 py-2 text-right hover:bg-slate-800 flex items-center gap-2 text-slate-200"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>خروجی CSV اکسل</span>
              </button>
              <button
                onClick={onExportJson}
                className="w-full px-3 py-2 text-right hover:bg-slate-800 flex items-center gap-2 text-slate-200"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>ذخیره فایل پروژه (JSON)</span>
              </button>
              <button
                onClick={onPrint}
                className="w-full px-3 py-2 text-right hover:bg-slate-800 flex items-center gap-2 text-slate-200"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>چاپ گزارش فنی مهندسی</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Google Sheets / Browser Style Multi-Section Bar */}
      <div className="bg-slate-950 border-t border-slate-800/80 px-3 sm:px-5 py-1 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
          <span className="text-[10px] text-slate-500 font-semibold pl-2">سکشن‌ها:</span>
          {sessions.map((s) => {
            const isActive = s.id === activeSessionId;
            return (
              <div
                key={s.id}
                onClick={() => onSelectSession(s.id)}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition border ${
                  isActive
                    ? 'bg-slate-850 text-white border-copper-500/60 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <span className="truncate max-w-[140px]">{s.name}</span>
                <span className="text-[10px] font-mono text-copper-400 bg-slate-800 px-1 rounded">
                  {s.inputs.flowsheet}
                </span>

                {/* Actions inside Tab */}
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicateSession(s.id);
                    }}
                    className="p-0.5 hover:text-copper-400 text-slate-500"
                    title="کپی کردن سکشن"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {sessions.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(s.id);
                      }}
                      className="p-0.5 hover:text-rose-400 text-slate-500"
                      title="حذف سکشن"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          <button
            onClick={onNewSession}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-copper-400 border border-dashed border-slate-750 text-xs transition ml-2"
            title="افزودن سکشن جدید"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="text-[11px]">افزودن</span>
          </button>
        </div>
      </div>
    </header>
  );
};
