import React from 'react';
import { X, Youtube, Activity, ShieldCheck, Dumbbell, Zap, AlertCircle, Sparkles, ExternalLink } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { STRETCHING_EXERCISES } from '../data/stretchingDatabase';

interface DemonstrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseName: string;
  muscle: string;
  level: number;
  equipment: string;
  lang: Language;
  directYoutubeUrl?: string;
  propsUsage?: string;
}

export const DemonstrationModal: React.FC<DemonstrationModalProps> = ({
  isOpen,
  onClose,
  exerciseName,
  muscle,
  level,
  equipment,
  lang,
  directYoutubeUrl,
  propsUsage
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];
  const isItalian = lang === 'it';

  // Find in stretching database if applicable
  const cleanName = exerciseName.toLowerCase().trim();
  const stretchingMatch = STRETCHING_EXERCISES.find(s => 
    cleanName.includes(s.name.toLowerCase().split('(')[0].trim()) ||
    s.name.toLowerCase().includes(cleanName) ||
    (s.nameEn && cleanName.includes(s.nameEn.toLowerCase().split('(')[0].trim())) ||
    cleanName.includes(s.id.replace(/_/g, ' '))
  );

  const getDifficultyLabel = () => {
    if (level === 1) return t.level1;
    if (level === 2) return t.level2;
    return t.level3;
  };

  const primaryVideoUrl = directYoutubeUrl || (stretchingMatch ? stretchingMatch.youtubeUrl : null);

  const getYoutubeSearchUrl = () => {
    if (stretchingMatch?.youtubeQuery) {
      return `https://www.youtube.com/results?search_query=${encodeURIComponent(stretchingMatch.youtubeQuery)}`;
    }
    const diffTag = level === 1 ? 'beginner' : level === 2 ? 'intermediate' : 'advanced';
    const equipTag = equipment && equipment !== 'Bodyweight' ? equipment : 'bodyweight';
    const searchTerms = `${exerciseName} ${equipTag} ${diffTag} tutorial form execution fitness`;
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerms)}`;
  };

  // Standard cues or specific stretching cues
  const getCuesForExercise = () => {
    if (stretchingMatch) {
      return {
        tips: isItalian ? stretchingMatch.tipsIt : stretchingMatch.tipsEn,
        mistakes: isItalian ? stretchingMatch.mistakesIt : stretchingMatch.mistakesEn,
        props: isItalian ? stretchingMatch.propsUsageIt : stretchingMatch.propsUsageEn
      };
    }

    const name = exerciseName.toLowerCase();
    
    if (name.includes('squat') || name.includes('affondi') || name.includes('lunge') || name.includes('jump')) {
      return isItalian ? {
        tips: [
          "Mantieni il petto aperto e la schiena neutrale durante tutta l'escursione.",
          "Distribuisci il carico su tutto il piede, con enfasi sui talloni e mesopiede.",
          "Ginocchia in linea con le punte dei piedi; espira durante la risalita."
        ],
        mistakes: [
          "Lasciare che le ginocchia collassino verso l'interno (valgo).",
          "Incurvare la zona lombare o sollevare i talloni da terra."
        ],
        props: undefined
      } : {
        tips: [
          "Keep chest proud and spine neutral throughout the entire range of motion.",
          "Distribute weight evenly across feet, driving through midfoot and heels.",
          "Track knees in line with toes; exhale powerfully on the ascent."
        ],
        mistakes: [
          "Knee caving inward (valgus collapse).",
          "Rounding the lower back or lifting heels off the floor."
        ],
        props: undefined
      };
    }

    if (name.includes('push up') || name.includes('press') || name.includes('dips') || name.includes('fly')) {
      return isItalian ? {
        tips: [
          "Attiva glutei e addome per mantenere il corpo in una linea rigida e dritta.",
          "Gomiti inclinati a 45° rispetto al busto, non eccessivamente aperti.",
          "Scapole addotte in discesa; spingi forte allontanando il pavimento."
        ],
        mistakes: [
          "Far cedere il bacino verso il basso (iperlordosi compensatoria).",
          "Alzare le spalle verso le orecchie perdendo il controllo scapolare."
        ],
        props: undefined
      } : {
        tips: [
          "Brace core and squeeze glutes to keep the body in a solid straight line.",
          "Tuck elbows at roughly a 45° angle relative to the torso.",
          "Retract shoulder blades on descent; push floor away forcefully on press."
        ],
        mistakes: [
          "Sagging hips or hyperextending the lower back.",
          "Shrugging shoulders up toward the ears, losing scapular depression."
        ],
        props: undefined
      };
    }

    if (name.includes('pull') || name.includes('row') || name.includes('chin') || name.includes('trazioni')) {
      return isItalian ? {
        tips: [
          "Inizia sempre il movimento deprimendo e adducendo le scapole.",
          "Tira guidando con i gomiti verso il bacino, non tirando solo di bicipiti.",
          "Espira nel punto di massima contrazione dorsale e controlla la fase negativa."
        ],
        mistakes: [
          "Dondolarsi o usare lo slancio (kipping non controllato).",
          "Non completare l'estensione delle braccia nella fase di discesa."
        ],
        props: undefined
      } : {
        tips: [
          "Initiate every pull by depressing and retracting shoulder blades first.",
          "Drive elbows down and back toward hips rather than pulling only with arms.",
          "Exhale at peak contraction; maintain a slow, controlled eccentric phase."
        ],
        mistakes: [
          "Excessive swinging or uncontrolled kipping.",
          "Failing to reach full dead hang extension at the bottom."
        ],
        props: undefined
      };
    }

    // Generic functional default
    return isItalian ? {
      tips: [
        "Mantieni il core sempre contratto e la colonna vertebrale allineata.",
        "Respira con ritmo costante: inspira nella fase eccentrica, espira nello sforzo concentrico.",
        "Esegui il movimento in modo controllato senza scatti bruschi."
      ],
      mistakes: [
        "Trattenere il respiro (manovra di Valsalva prolungata).",
        "Privilegiare la velocità a scapito della qualità tecnica dell'escursione."
      ],
      props: undefined
    } : {
      tips: [
        "Keep core braced and spine neutral through every single repetition.",
        "Maintain steady breathing: inhale during lowering phase, exhale during exertion.",
        "Perform the movement with smooth control rather than jerky momentum."
      ],
      mistakes: [
        "Holding your breath under load.",
        "Rushing repetitions at the expense of proper technique and full range of motion."
      ],
      props: undefined
    };
  };

  const cues = getCuesForExercise();
  const effectivePropsUsage = propsUsage || cues.props;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.demoModalTitle}
    >
      <div 
        className="bg-[#0F0F12] border-2 border-fuchsia-500/40 rounded-3xl p-6 w-full max-w-lg shadow-[0_0_50px_rgba(255,0,255,0.25)] relative text-white my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
                {t.demoModalTitle}
              </span>
              {stretchingMatch && (
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <Sparkles size={10} />
                  <span>Stretching & Mobilità</span>
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase italic tracking-tight text-white drop-shadow">
              {exerciseName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 text-zinc-400 hover:text-white transition-all active:scale-90 cursor-pointer"
            aria-label={t.closeBtn}
          >
            <X size={20} />
          </button>
        </div>

        {/* Badges / Specs */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="p-2.5 rounded-2xl bg-zinc-900/70 border border-white/5 flex flex-col items-center text-center">
            <Activity size={16} className="text-cyan-400 mb-1" />
            <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">{t.muscleLabel}</span>
            <span className="text-xs font-black uppercase italic text-white mt-0.5 truncate w-full">{muscle}</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-zinc-900/70 border border-white/5 flex flex-col items-center text-center">
            <Zap size={16} className="text-fuchsia-400 mb-1" />
            <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">{t.difficultyLabel}</span>
            <span className="text-xs font-black uppercase italic text-fuchsia-300 mt-0.5">{getDifficultyLabel()}</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-zinc-900/70 border border-white/5 flex flex-col items-center text-center">
            <Dumbbell size={16} className="text-purple-400 mb-1" />
            <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">{t.equipmentLabel}</span>
            <span className="text-xs font-black uppercase italic text-white mt-0.5 truncate w-full">{equipment || 'Bodyweight'}</span>
          </div>
        </div>

        {/* Props Guidance for Flexibility if available */}
        {effectivePropsUsage && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-4 flex items-start gap-2.5">
            <Sparkles size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 mb-1">
                {t.propsAdvice}
              </h4>
              <p className="text-xs text-amber-100/90 leading-relaxed font-medium">
                {effectivePropsUsage}
              </p>
            </div>
          </div>
        )}

        {/* Technical Form Tips */}
        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-1">
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-cyan-500/20">
            <div className="flex items-center gap-2 mb-2 text-cyan-400">
              <ShieldCheck size={18} />
              <h4 className="text-xs font-black uppercase tracking-wider">{t.techniqueTips}</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-300 font-medium">
              {cues.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-red-500/20">
            <div className="flex items-center gap-2 mb-2 text-red-400">
              <AlertCircle size={18} />
              <h4 className="text-xs font-black uppercase tracking-wider">{t.commonMistakes}</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-300 font-medium">
              {cues.mistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Video Tutorial CTA buttons */}
        <div className="flex flex-col gap-2.5">
          {primaryVideoUrl ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={primaryVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-2xl bg-[#FF0000] hover:bg-[#CC0000] text-white font-black text-xs uppercase italic tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg shadow-red-950/50"
              >
                <Youtube size={20} className="text-white fill-white" />
                <span>{t.openYoutubeBtn}</span>
                <ExternalLink size={14} className="opacity-70" />
              </a>
              <a
                href={getYoutubeSearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                title={t.searchYoutubeBtn}
              >
                <span>{t.searchYoutubeBtn}</span>
              </a>
            </div>
          ) : (
            <a
              href={getYoutubeSearchUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#FF0000] hover:bg-[#CC0000] text-white font-black text-xs uppercase italic tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg shadow-red-950/50"
            >
              <Youtube size={20} className="text-white fill-white" />
              <span>{t.openYoutubeBtn}</span>
              <ExternalLink size={14} className="opacity-70" />
            </a>
          )}
          
          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-black text-xs uppercase italic tracking-wider transition-all active:scale-95 cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

