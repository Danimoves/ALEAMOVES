import React, { useState } from 'react';
import { X, Dices, Flame, Sparkles, Play, ShieldAlert, ArrowRight, Check } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  lang: Language;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose, onComplete, lang }) => {
  const [step, setStep] = useState<number>(0);
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];

  const stepsData = [
    {
      icon: <Sparkles size={32} className="text-cyan-400" />,
      title: t.tutorialStep1Title,
      desc: t.tutorialStep1Desc,
      tag: "STEP 1/4"
    },
    {
      icon: <Dices size={32} className="text-fuchsia-400" />,
      title: t.tutorialStep2Title,
      desc: t.tutorialStep2Desc,
      tag: "STEP 2/4"
    },
    {
      icon: <Play size={32} className="text-green-400" />,
      title: t.tutorialStep3Title,
      desc: t.tutorialStep3Desc,
      tag: "STEP 3/4"
    },
    {
      icon: <Flame size={32} className="text-orange-400" />,
      title: t.tutorialStep4Title,
      desc: t.tutorialStep4Desc,
      tag: "STEP 4/4"
    }
  ];

  const handleNext = () => {
    if (step < stepsData.length - 1) {
      setStep(s => s + 1);
    } else {
      localStorage.setItem('aleamoves_tutorial_seen', 'true');
      onComplete?.();
      onClose();
    }
  };

  const handleFinish = () => {
    localStorage.setItem('aleamoves_tutorial_seen', 'true');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleFinish}
      role="dialog"
      aria-modal="true"
      aria-label={t.tutorialTitle}
    >
      <div 
        className="bg-[#0F0F12] border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-[0_0_50px_rgba(0,240,255,0.25)] relative text-white my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/30">
              {stepsData[step].tag}
            </span>
          </div>
          <button
            onClick={handleFinish}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 text-zinc-400 hover:text-white transition-all active:scale-90 cursor-pointer"
            aria-label={t.closeBtn}
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Visual Content */}
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-20 h-20 rounded-3xl bg-white/5 border-2 border-white/10 flex items-center justify-center mb-6 shadow-xl">
            {stepsData[step].icon}
          </div>
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-white mb-3">
            {stepsData[step].title}
          </h3>
          <p className="text-sm text-zinc-300 font-medium leading-relaxed max-w-xs">
            {stepsData[step].desc}
          </p>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 my-6">
          {stepsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${step === i ? 'w-8 bg-cyan-400 shadow-[0_0_10px_#00F0FF]' : 'w-2 bg-zinc-700'}`}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="py-4 px-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-black text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
            >
              Indietro
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-black text-sm uppercase italic tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            {step === stepsData.length - 1 ? (
              <>
                <span>{t.tutorialStartBtn}</span>
                <Check size={18} />
              </>
            ) : (
              <>
                <span>Avanti</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
