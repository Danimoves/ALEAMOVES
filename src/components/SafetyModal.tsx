import React from 'react';
import { X, ShieldAlert, HeartPulse, Check } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.safetyModalTitle}
    >
      <div 
        className="bg-[#0F0F12] border-2 border-orange-500/40 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-[0_0_50px_rgba(249,115,22,0.25)] relative text-white my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-orange-400">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase italic tracking-tight text-white">
                {t.safetyModalTitle}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 text-zinc-400 hover:text-white transition-all active:scale-90 cursor-pointer"
            aria-label={t.closeBtn}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-2xl bg-orange-950/20 border border-orange-500/30 flex items-start gap-3">
            <HeartPulse size={20} className="text-orange-400 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-300 font-medium leading-relaxed">
              {t.safetyModalContent}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-cyan-400">
              {lang === 'it' ? "Consigli per un allenamento sicuro:" : "Guidelines for Safe Workouts:"}
            </h4>
            <ul className="text-xs text-zinc-400 space-y-1.5 list-disc pl-4 font-medium">
              <li>{lang === 'it' ? "Esegui sempre il riscaldamento dinamico proposto prima del circuito." : "Always complete the dynamic warm-up before beginning the main circuit."}</li>
              <li>{lang === 'it' ? "Mantieni una respirazione fluida e non andare mai in apnea prolungata." : "Keep breathing steady and avoid holding your breath during exertion."}</li>
              <li>{lang === 'it' ? "Privilegia sempre la corretta postura e il controllo rispetto alla velocità." : "Prioritize good technique and control over raw speed or repetitions."}</li>
              <li>{lang === 'it' ? "Bevi acqua regolarmente per mantenere una corretta idratazione." : "Stay hydrated before, during, and after your session."}</li>
            </ul>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase italic tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg"
        >
          <span>{t.safetyGotIt}</span>
          <Check size={18} />
        </button>
      </div>
    </div>
  );
};
