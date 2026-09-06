import React from 'react';
import { SimulationResults } from '../engine/types';
import { TrendingUp, Zap, ShieldCheck, Activity, Layers, Flame } from 'lucide-react';

interface KpiCardsProps {
  results: SimulationResults;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ results }) => {
  const cards = [
    {
      title: 'ریکاوری کل مس (Global Recovery)',
      value: `${results.globalRecovery.toFixed(2)}%`,
      subtext: `راندمان استخراج مس: ${results.extractionEff.toFixed(2)}%`,
      icon: TrendingUp,
      color: 'from-amber-500/20 to-copper-600/10 text-copper-400 border-copper-500/30',
      badge: results.globalRecovery >= 90 ? 'بهینه صنعتی' : 'مدار پایه'
    },
    {
      title: 'تولید مس کاتدی (Cu Production)',
      value: `${results.totalCuProduction.toFixed(3)} t/h`,
      subtext: `${(results.totalCuProduction * 24).toFixed(1)} تن در شبانه‌روز (تجاری: ${results.commercialCuProduction.toFixed(2)} | اسکونجر: ${results.scavengerCuProduction.toFixed(2)})`,
      icon: Zap,
      color: 'from-blue-500/20 to-indigo-600/10 text-blue-400 border-blue-500/30',
      badge: `${results.totalCuProduction > 2.0 ? 'بزرگ‌مقیاس' : 'متوسط'}`
    },
    {
      title: 'غلظت اکسترکتنت و ماکزیمم لودینگ',
      value: `${results.extractantVolPercent.toFixed(2)}% v/v`,
      subtext: `ماکزیمم لودینگ: ${results.maxLoading.toFixed(2)} g/L | انتقال خالص: ${results.netTransfer.toFixed(3)} g/L/%`,
      icon: Layers,
      color: 'from-emerald-500/20 to-teal-600/10 text-emerald-400 border-emerald-500/30',
      badge: 'Lix984N'
    },
    {
      title: 'نسبت Cu/Fe در فاز آلی باردار',
      value: `${results.cuFeOrganicExEn.toFixed(1)}`,
      subtext: `مس LO: ${results.loCuExEn.toFixed(3)} g/L | آهن LO: ${(results.loFeExEn * 1000).toFixed(1)} mg/L`,
      icon: ShieldCheck,
      color: results.cuFeOrganicExEn >= 900 
        ? 'from-purple-500/20 to-pink-600/10 text-purple-400 border-purple-500/30'
        : 'from-yellow-500/20 to-amber-600/10 text-yellow-400 border-yellow-500/30',
      badge: results.cuFeOrganicExEn >= 900 ? 'کاتد Grade A عالی' : 'نیاز به اسکرابینگ'
    },
    {
      title: 'نسبت Fe/Mn در الکترولیت برگشتی',
      value: `${results.feMnSpentElectrolyte.toFixed(2)}`,
      subtext: results.mno4SpentElectrolyte > 0.01 
        ? `پرمنگنات فعال: ${results.mno4SpentElectrolyte.toFixed(3)} g/L (Mn3+: ${results.mn3SpentElectrolyte.toFixed(3)} g/L)`
        : `حالت احیا شده (بدون رسوب MnO2 رو آند)`,
      icon: Activity,
      color: results.feMnSpentElectrolyte >= 7.0 
        ? 'from-emerald-500/20 to-green-600/10 text-emerald-400 border-emerald-500/30'
        : 'from-rose-500/20 to-red-600/10 text-rose-400 border-rose-500/30',
      badge: results.feMnSpentElectrolyte >= 7.0 ? 'محافظت آند مطلوب' : 'هشدار خورندگی آند'
    },
    {
      title: 'مصرف ویژه انرژی الکترووینینگ (DC)',
      value: `${results.energyConsumption.toFixed(0)} kWh/t`,
      subtext: `${results.cellVoltage.toFixed(2)} V | ${results.totalEnergyMW.toFixed(2)} MW | ${Math.round(results.numCommercialCells + results.numScavengerCells)} سلول | بلید: ${results.ewbFlow.toFixed(2)} m³/h`,
      icon: Flame,
      color: 'from-orange-500/20 to-rose-600/10 text-orange-400 border-orange-500/30',
      badge: `کاتد: ${results.ceCommercial.toFixed(1)}% CE`
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-3.5 rounded-xl bg-gradient-to-b ${card.color} bg-slate-900/60 border backdrop-blur-sm relative overflow-hidden flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[11px] font-medium text-slate-400 truncate">{card.title}</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
                  {card.badge}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1 font-mono">
                {card.value}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              {card.subtext}
            </div>
          </div>
        );
      })}
    </div>
  );
};
