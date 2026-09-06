import React, { useState } from 'react';
import { SimulationResults, StreamData } from '../engine/types';
import { Info, ZoomIn, Eye, Sparkles } from 'lucide-react';

interface FlowsheetDiagramProps {
  results: SimulationResults;
}

export const FlowsheetDiagram: React.FC<FlowsheetDiagramProps> = ({ results }) => {
  const [selectedStream, setSelectedStream] = useState<StreamData | null>(null);

  const getStreamById = (id: string): StreamData | undefined => {
    return results.streams.find((s) => s.id === id);
  };

  const pls = getStreamById('s_pls');
  const raf = getStreamById('s_raf_final');
  const lo = getStreamById('s_lo');
  const lot = getStreamById('s_lo_tank');
  const so = getStreamById('s_so');
  const adel = getStreamById('s_adel');
  const spel = getStreamById('s_spel');
  const ewb = getStreamById('s_ewb');
  const washIn = getStreamById('s_wash_in');
  const wsos = getStreamById('s_wsos');

  const hasWash = !!washIn;
  const hasRecirc = results.flowsheet === 'A2' || results.flowsheet === 'B2' || results.flowsheet === 'C2' || results.flowsheet === 'D2' || results.flowsheet === 'E2';

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl relative overflow-hidden">
      {/* Title & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>دیاگرام شماتیک جریان فرایندی (Process Flow Diagram - PFD)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            برای مشاهده داده‌های تفکیکی هر خط جریان، بر روی آن کلیک کنید.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-amber-500 rounded"></span>
            <span className="text-slate-300">فاز آلی (Organic)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-blue-500 rounded"></span>
            <span className="text-slate-300">فاز آبی (Aqueous)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-emerald-500 border border-dashed rounded"></span>
            <span className="text-slate-300">الکترولیت مس (Electrolyte)</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="w-full overflow-x-auto bg-[#070a0f] rounded-xl border border-slate-800/80 p-2 relative">
        <svg
          viewBox="0 0 1000 480"
          className="w-full min-w-[880px] h-auto font-sans select-none"
        >
          <defs>
            {/* Markers */}
            <marker id="arrow-org" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
            </marker>
            <marker id="arrow-aq" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
            </marker>
            <marker id="arrow-el" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
            </marker>
            <marker id="arrow-recirc" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#ec4899" />
            </marker>
          </defs>

          {/* 1. Feed PLS to Extraction */}
          <path
            d="M 20 120 L 100 120"
            stroke="#38bdf8"
            strokeWidth="3"
            markerEnd="url(#arrow-aq)"
            className="cursor-pointer hover:stroke-white transition"
            onClick={() => pls && setSelectedStream(pls)}
          />
          <text x="30" y="105" fill="#38bdf8" fontSize="11" fontWeight="bold">خوراک PLS</text>
          <text x="30" y="135" fill="#94a3b8" fontSize="9" fontFamily="monospace">
            {pls ? `${pls.flow.toFixed(0)} m³/h | ${pls.cu.toFixed(2)} g/L Cu` : ''}
          </text>

          {/* 2. Extraction Stage Block (E1 + E2) */}
          <rect x="100" y="70" width="160" height="150" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="180" y="95" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
            مرحله استخراج (Extraction)
          </text>
          <text x="180" y="115" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontFamily="monospace">
            {results.topology}
          </text>
          <rect x="115" y="130" width="60" height="40" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <text x="145" y="155" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">E1 / P</text>
          <rect x="185" y="130" width="60" height="40" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <text x="215" y="155" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">E2</text>
          <text x="180" y="195" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
            راندمان استخراج: {results.extractionEff.toFixed(1)}%
          </text>

          {/* Raffinate leaving Extraction */}
          <path
            d="M 260 170 L 320 170 L 320 270 L 100 270"
            stroke="#38bdf8"
            strokeWidth="3"
            markerEnd="url(#arrow-aq)"
            className="cursor-pointer hover:stroke-white transition"
            onClick={() => raf && setSelectedStream(raf)}
          />
          <text x="210" y="290" fill="#38bdf8" fontSize="11" fontWeight="bold">رافینیت نهایی به پوند/لیچ</text>
          <text x="210" y="305" fill="#94a3b8" fontSize="9" fontFamily="monospace">
            {raf ? `${raf.flow.toFixed(0)} m³/h | ${raf.cu.toFixed(3)} g/L Cu` : ''}
          </text>

          {/* 3. Loaded Organic from Extraction to ACT / LOT */}
          <path
            d="M 260 100 L 330 100"
            stroke="#f59e0b"
            strokeWidth="3"
            markerEnd="url(#arrow-org)"
            className="cursor-pointer hover:stroke-white transition"
            onClick={() => lo && setSelectedStream(lo)}
          />
          <text x="265" y="90" fill="#f59e0b" fontSize="10" fontWeight="bold">آلی باردار E1</text>

          {/* Coalescer & LOT Tanks Block */}
          <rect x="330" y="75" width="110" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="385" y="98" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">مخازن کوالسر و LOT</text>
          <text x="385" y="115" fill="#cbd5e1" fontSize="9" textAnchor="middle">کاهش کشیدگی فاز آبی</text>
          <text x="385" y="140" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            Cu/Fe: {results.cuFeOrganicExEn.toFixed(0)}
          </text>

          {/* 4. Wash / Scrub Stage (if active) or direct line to Stripping */}
          {hasWash ? (
            <>
              {/* Line from LOT to Wash */}
              <path
                d="M 440 110 L 490 110"
                stroke="#f59e0b"
                strokeWidth="3"
                markerEnd="url(#arrow-org)"
                className="cursor-pointer hover:stroke-white transition"
                onClick={() => lot && setSelectedStream(lot)}
              />

              {/* Wash Block */}
              <rect x="490" y="70" width="130" height="110" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
              <text x="555" y="93" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">
                مرحله شستشو / اسکراب
              </text>
              <text x="555" y="110" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                {results.flowsheet.startsWith('E') ? 'اسکراب با بلید EW' : results.flowsheet.startsWith('D') ? 'اسکراب با آب اسیدی' : 'شستشو با آب خام'}
              </text>
              <text x="555" y="135" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">
                حذف منگنز و آهن
              </text>

              {/* Wash Feed In */}
              <path
                d="M 555 20 L 555 70"
                stroke="#38bdf8"
                strokeWidth="2.5"
                markerEnd="url(#arrow-aq)"
                className="cursor-pointer hover:stroke-white transition"
                onClick={() => washIn && setSelectedStream(washIn)}
              />
              <text x="565" y="45" fill="#38bdf8" fontSize="9" fontWeight="bold">خوراک شستشو</text>

              {/* WSOS out */}
              <path
                d="M 555 180 L 555 240 L 400 240"
                stroke="#38bdf8"
                strokeWidth="2.5"
                markerEnd="url(#arrow-aq)"
                className="cursor-pointer hover:stroke-white transition"
                onClick={() => wsos && setSelectedStream(wsos)}
              />
              <text x="490" y="235" fill="#38bdf8" fontSize="9">خروجی شستشو (WSOS)</text>

              {/* Washed Organic to Stripping */}
              <path
                d="M 620 110 L 680 110"
                stroke="#f59e0b"
                strokeWidth="3"
                markerEnd="url(#arrow-org)"
              />
              <text x="630" y="100" fill="#f59e0b" fontSize="9" fontWeight="bold">آلی شسته‌شده</text>
            </>
          ) : (
            <>
              {/* Direct line from LOT to Stripping */}
              <path
                d="M 440 110 L 680 110"
                stroke="#f59e0b"
                strokeWidth="3"
                markerEnd="url(#arrow-org)"
                className="cursor-pointer hover:stroke-white transition"
                onClick={() => lot && setSelectedStream(lot)}
              />
              <text x="530" y="100" fill="#f59e0b" fontSize="10" fontWeight="bold">فاز آلی باردار (LO)</text>
            </>
          )}

          {/* 5. Stripping Stage Block */}
          <rect x="680" y="70" width="130" height="130" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="745" y="95" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
            مرحله استریپینگ
          </text>
          <text x="745" y="115" fill="#cbd5e1" fontSize="11" textAnchor="middle">Stripping Stage</text>
          <text x="745" y="145" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
            راندمان استریپینگ: {results.strippingEff.toFixed(1)}%
          </text>
          <text x="745" y="165" fill="#f59e0b" fontSize="9" textAnchor="middle">
            انتقال مس: {results.netTransfer.toFixed(3)} g/L/%
          </text>

          {/* Stripped Organic Return Line to Extraction */}
          <path
            d="M 745 70 L 745 35 L 180 35 L 180 70"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeDasharray="5,3"
            markerEnd="url(#arrow-org)"
            className="cursor-pointer hover:stroke-white transition"
            onClick={() => so && setSelectedStream(so)}
          />
          <text x="460" y="28" fill="#f59e0b" fontSize="10" fontWeight="bold">
            بازگشت فاز آلی عاری‌شده (SO: {so ? `${so.cu.toFixed(2)} g/L` : ''})
          </text>

          {/* 6. Advance Electrolyte from Stripping to EW */}
          <path
            d="M 810 110 L 860 110 L 860 180"
            stroke="#10b981"
            strokeWidth="3.5"
            markerEnd="url(#arrow-el)"
            className="cursor-pointer hover:stroke-white transition"
            onClick={() => adel && setSelectedStream(adel)}
          />
          <text x="825" y="95" fill="#10b981" fontSize="10" fontWeight="bold">الکترولیت پیش‌رونده</text>
          <text x="825" y="130" fill="#94a3b8" fontSize="8" fontFamily="monospace">
            {adel ? `${adel.cu.toFixed(1)} g/L Cu` : ''}
          </text>

          {/* 7. Electrowinning Cell Blocks */}
          <rect x="760" y="240" width="220" height="150" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
          <text x="870" y="265" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
            مدار الکترووینینگ مس (Cu EW)
          </text>

          {/* Scavenger Cells Box */}
          <rect x="780" y="280" width="85" height="50" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
          <text x="822" y="300" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">سلول روبارگیر</text>
          <text x="822" y="315" fill="#94a3b8" fontSize="9" textAnchor="middle">Scavenger ({results.numScavengerCells.toFixed(1)})</text>

          {/* Commercial Cells Box */}
          <rect x="880" y="280" width="85" height="50" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
          <text x="922" y="300" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">سلول تجاری</text>
          <text x="922" y="315" fill="#94a3b8" fontSize="9" textAnchor="middle">Commercial ({results.numCommercialCells.toFixed(1)})</text>

          {/* Cathode Output */}
          <rect x="835" y="345" width="80" height="30" rx="4" fill="#ea580c" />
          <text x="875" y="365" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">
            {results.totalCuProduction.toFixed(2)} t/h کاتد
          </text>

          {/* 8. Spent Electrolyte Return Line from EW to Stripping */}
          <path
            d="M 760 310 L 680 310 L 680 200"
            stroke="#10b981"
            strokeWidth="3"
            markerEnd="url(#arrow-el)"
            className="cursor-pointer hover:stroke-white transition"
            onClick={() => spel && setSelectedStream(spel)}
          />
          <text x="640" y="280" fill="#10b981" fontSize="10" fontWeight="bold">الکترولیت برگشتی (Spent)</text>
          <text x="640" y="295" fill="#94a3b8" fontSize="8" fontFamily="monospace">
            {spel ? `${spel.cu.toFixed(1)} g/L Cu | ${spel.acid.toFixed(0)} g/L Ac` : ''}
          </text>

          {/* 9. EW Bleed (EWB) */}
          <path
            d="M 870 390 L 870 430 L 600 430"
            stroke="#ec4899"
            strokeWidth="2.5"
            markerEnd="url(#arrow-recirc)"
            className="cursor-pointer hover:stroke-white transition"
            onClick={() => ewb && setSelectedStream(ewb)}
          />
          <text x="730" y="425" fill="#ec4899" fontSize="10" fontWeight="bold">
            بلید الکترولیت (EWB: {ewb ? `${ewb.flow.toFixed(2)} m³/h` : ''})
          </text>

          {/* Recirculation to E1 if active */}
          {hasRecirc && (
            <>
              <path
                d="M 600 430 L 150 430 L 150 220"
                stroke="#ec4899"
                strokeWidth="2.5"
                strokeDasharray="4,3"
                markerEnd="url(#arrow-recirc)"
              />
              <text x="350" y="445" fill="#ec4899" fontSize="10" fontWeight="bold" textAnchor="middle">
                بازچرخانی بلید EWB به ورودی استخراج E1 (افزایش ریکاوری)
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Stream Inspector Card when a stream is clicked */}
      {selectedStream && (
        <div className="mt-4 p-3.5 rounded-xl bg-slate-800 border border-slate-700 animate-fadeIn flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${selectedStream.phase === 'organic' ? 'bg-amber-500' : 'bg-blue-400'}`}></span>
              <h4 className="text-sm font-bold text-white">{selectedStream.name}</h4>
              <span className="text-xs text-slate-400 font-mono">({selectedStream.nameEn})</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">{selectedStream.descriptionFa}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-750 font-mono">
            <div>
              <span className="text-slate-400">دبی: </span>
              <span className="text-white font-bold">{selectedStream.flow.toFixed(1)} m³/h</span>
            </div>
            <div>
              <span className="text-slate-400">مس: </span>
              <span className="text-amber-400 font-bold">{selectedStream.cu.toFixed(3)} g/L</span>
            </div>
            <div>
              <span className="text-slate-400">آهن(III): </span>
              <span className="text-white">{selectedStream.fe3.toFixed(4)} g/L</span>
            </div>
            <div>
              <span className="text-slate-400">آهن(II): </span>
              <span className="text-white">{selectedStream.fe2.toFixed(3)} g/L</span>
            </div>
            <div>
              <span className="text-slate-400">منگنز: </span>
              <span className="text-white">{selectedStream.mn.toFixed(3)} g/L</span>
            </div>
            <div>
              <span className="text-slate-400">اسید: </span>
              <span className="text-emerald-400">{selectedStream.acid.toFixed(1)} g/L</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
