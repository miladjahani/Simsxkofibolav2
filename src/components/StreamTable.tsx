import React, { useState } from 'react';
import { StreamData } from '../engine/types';
import { Search, Filter, Copy, Check } from 'lucide-react';

interface StreamTableProps {
  streams: StreamData[];
}

export const StreamTable: React.FC<StreamTableProps> = ({ streams }) => {
  const [filterPhase, setFilterPhase] = useState<'all' | 'aqueous' | 'organic'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredStreams = streams.filter((s) => {
    const matchesPhase = filterPhase === 'all' || s.phase === filterPhase;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPhase && matchesSearch;
  });

  const handleCopy = () => {
    const header = ['نام جریان', 'دبی (m3/h)', 'مس (g/L)', 'آهن۳ (g/L)', 'آهن۲ (g/L)', 'منگنز (g/L)', 'اسید (g/L)', 'بار جرمی مس (kg/h)'].join('\t');
    const rows = filteredStreams.map((s) => [
      s.name,
      s.flow.toFixed(2),
      s.cu.toFixed(3),
      s.fe3.toFixed(4),
      s.fe2.toFixed(3),
      s.mn.toFixed(3),
      s.acid.toFixed(1),
      (s.flow * s.cu).toFixed(1)
    ].join('\t')).join('\n');

    navigator.clipboard.writeText(`${header}\n${rows}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>جدول تفکیکی موازنه مواد و جریان‌ها (Mass Balance Streams)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            غلظت عناصر و دبی تمامی جریان‌های هیدرومتالورژی فاز آبی و آلی مدار
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            <input
              type="text"
              placeholder="جستجوی جریان..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg pr-8 pl-3 py-1.5 focus:outline-none focus:border-copper-500 w-full sm:w-44"
            />
          </div>

          {/* Filter Phase */}
          <div className="flex items-center rounded-lg bg-slate-800 border border-slate-700 p-0.5 text-xs font-medium">
            <button
              onClick={() => setFilterPhase('all')}
              className={`px-2 py-1 rounded ${filterPhase === 'all' ? 'bg-copper-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              همه
            </button>
            <button
              onClick={() => setFilterPhase('aqueous')}
              className={`px-2 py-1 rounded ${filterPhase === 'aqueous' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              فاز آبی
            </button>
            <button
              onClick={() => setFilterPhase('organic')}
              className={`px-2 py-1 rounded ${filterPhase === 'organic' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              فاز آلی
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition"
            title="کپی در حافظه کلیپ‌بورد جهت الصاق به اکسل"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'کپی شد' : 'کپی'}</span>
          </button>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-right text-xs">
          <thead className="bg-slate-850 text-slate-400 font-semibold border-b border-slate-800">
            <tr>
              <th className="p-3">نام و مشخصات جریان</th>
              <th className="p-3 text-center">فاز</th>
              <th className="p-3 text-left font-mono">دبی (m³/h)</th>
              <th className="p-3 text-left font-mono text-amber-400">مس Cu (g/L)</th>
              <th className="p-3 text-left font-mono">Fe³⁺ (g/L)</th>
              <th className="p-3 text-left font-mono">Fe²⁺ (g/L)</th>
              <th className="p-3 text-left font-mono">Mn (g/L)</th>
              <th className="p-3 text-left font-mono text-emerald-400">اسید Ac (g/L)</th>
              <th className="p-3 text-left font-mono text-copper-300">بار مس (kg/h)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredStreams.map((stream) => {
              const cuMassFlow = (stream.flow * stream.cu).toFixed(1);
              return (
                <tr key={stream.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-sans font-medium text-white">
                    <div>{stream.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{stream.nameEn}</div>
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded font-sans ${
                        stream.phase === 'organic'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {stream.phase === 'organic' ? 'آلی' : 'آبی'}
                    </span>
                  </td>
                  <td className="p-3 text-left text-white">{stream.flow.toFixed(2)}</td>
                  <td className="p-3 text-left font-bold text-amber-400">{stream.cu.toFixed(3)}</td>
                  <td className="p-3 text-left text-slate-300">{stream.fe3.toFixed(4)}</td>
                  <td className="p-3 text-left text-slate-300">{stream.fe2.toFixed(3)}</td>
                  <td className="p-3 text-left text-slate-300">{stream.mn.toFixed(3)}</td>
                  <td className="p-3 text-left text-emerald-400">{stream.acid.toFixed(1)}</td>
                  <td className="p-3 text-left font-bold text-copper-300">{cuMassFlow}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
