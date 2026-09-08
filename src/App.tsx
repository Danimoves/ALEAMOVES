import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dices, 
  Play, 
  Settings, 
  RotateCcw, 
  Dumbbell, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Pause, 
  SkipForward, 
  Trophy, 
  Activity,
  Library,
  ArrowLeft,
  Search,
  Youtube,
  Layers,
  User,
  Flame,
  Award,
  Bell,
  Heart,
  TrendingUp,
  Sparkles,
  Music,
  Bookmark,
  BookmarkCheck,
  HelpCircle,
  ShieldAlert,
  Trash2,
  Info,
  Target,
  Sparkle,
  Globe
} from 'lucide-react';

import { 
  GoalType, 
  ExerciseItem, 
  WorkoutData, 
  SavedWorkout, 
  ProfileData, 
  WorkoutLog 
} from './types';
import { EXERCISE_DATABASE } from './data/exerciseDatabase';
import { 
  COLORS, 
  EQUIPMENT_ITEMS, 
  MUSCLE_GROUPS, 
  TIMER_OPTIONS, 
  INITIAL_PROFILE, 
  MISSIONS_LIST, 
  MONTHLY_CHALLENGES, 
  DICE_SKINS, 
  BADGES_LIST 
} from './data/appConstants';
import { Language, TRANSLATIONS } from './data/translations';
import { getWarmupRoutine, getCooldownRoutine, RoutineBlock } from './data/warmupCooldown';
import { WorkoutMusicPlayer } from './components/WorkoutMusicPlayer';
import { CURATED_PLAYLISTS } from './data/musicPlaylists';
import { workoutAudio } from './utils/workoutAudio';
import { DemonstrationModal } from './components/DemonstrationModal';
import { TutorialModal } from './components/TutorialModal';
import { SafetyModal } from './components/SafetyModal';
import { DaniMovesFooter } from './components/DaniMovesFooter';
import { STRETCHING_EXERCISES, getStretchingExercisesForWorkout } from './data/stretchingDatabase';

export default function App() {
  const [view, setView] = useState<string>('setup'); // setup, rolling, workout-preview, timer, finish, library, profile
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('aleamoves_lang');
    return (saved === 'en' || saved === 'it') ? saved : 'it';
  });

  const t = TRANSLATIONS[lang];

  // Parametri di configurazione del workout
  const [selectedGoal, setSelectedGoal] = useState<GoalType>('fat_loss');
  const [totalTime, setTotalTime] = useState<number>(20);
  const [intensity, setIntensity] = useState<number>(1);
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>(['Bodyweight']);
  const [activeMuscles, setActiveMuscles] = useState<string[]>([
    'lower', 'chest', 'back', 'shoulders', 'biceps', 'triceps', 'abs'
  ]);
  const [exerciseCountMode, setExerciseCountMode] = useState<string>('dice'); 
  const [customExerciseCount, setCustomExerciseCount] = useState<number>(6);
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modali & Overlays
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(() => {
    return localStorage.getItem('aleamoves_tutorial_seen') !== 'true';
  });
  const [isSafetyOpen, setIsSafetyOpen] = useState<boolean>(false);
  const [selectedDemoExercise, setSelectedDemoExercise] = useState<{
    name: string;
    muscle: string;
    level: number;
    equipment: string;
    directYoutubeUrl?: string;
    propsUsage?: string;
  } | null>(null);

  // Tab Libreria ('exercises' | 'saved') e Categoria ('all' | 'fitness' | 'stretching')
  const [libraryTab, setLibraryTab] = useState<'exercises' | 'saved'>('exercises');
  const [libraryCategory, setLibraryCategory] = useState<'all' | 'fitness' | 'stretching'>('all');

  // Allenamenti Salvati
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>(() => {
    const saved = localStorage.getItem('aleamoves_saved_workouts');
    return saved ? JSON.parse(saved) : [];
  });

  // Profilo e Gamification
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('aleamoves_profile') || localStorage.getItem('danimoves_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  // Notifiche Toast
  const [toastMessage, setToastMessage] = useState<string>("");

  // Playlist Musicale
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>(() => {
    const saved = localStorage.getItem('aleamoves_music_playlist') || localStorage.getItem('danimoves_music_playlist');
    return saved || 'beast_mode';
  });

  // Timer State
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState<number>(0);
  const [timerStatus, setTimerStatus] = useState<string>('work'); 
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentRound, setCurrentRound] = useState<number>(1);

  // Warmup & Cooldown routines calcolate
  const warmupRoutine = useMemo<RoutineBlock>(() => {
    return getWarmupRoutine(intensity, selectedEquipments, lang);
  }, [intensity, selectedEquipments, lang]);

  const cooldownRoutine = useMemo<RoutineBlock>(() => {
    return getCooldownRoutine(intensity, selectedEquipments, lang);
  }, [intensity, selectedEquipments, lang]);

  // Sincronizzazione persistenza
  useEffect(() => {
    localStorage.setItem('aleamoves_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('aleamoves_saved_workouts', JSON.stringify(savedWorkouts));
  }, [savedWorkouts]);

  useEffect(() => {
    localStorage.setItem('aleamoves_lang', lang);
  }, [lang]);

  // Lista completa esercizi per la libreria (Fitness + Allungamento/Mobilità Olistica)
  const fullExerciseList = useMemo<ExerciseItem[]>(() => {
    const list: ExerciseItem[] = [];

    // 1. Esercizi Fitness & Condizionamento
    Object.entries(EXERCISE_DATABASE).forEach(([group, levels]) => {
      Object.entries(levels).forEach(([lvl, exercises]) => {
        exercises.forEach(ex => {
          if (!list.find(item => item.name === ex && item.level === parseInt(lvl))) {
            const muscleLabel = group === 'bodyweight_mixed' 
              ? (lang === 'it' ? 'Corpo Libero Misto' : 'Mixed Bodyweight')
              : MUSCLE_GROUPS.find(m => m.id === group)?.[lang === 'it' ? 'labelIt' : 'label'] || 'Full Body';
            
            list.push({
              name: ex,
              muscle: muscleLabel,
              level: parseInt(lvl),
              groupId: group,
              category: 'fitness',
              equipment: 'Bodyweight'
            });
          }
        });
      });
    });

    // 2. Esercizi Allungamento, Mobilità & Stretching Olistico (con Props & Link YouTube)
    STRETCHING_EXERCISES.forEach(s => {
      const muscleObj = MUSCLE_GROUPS.find(m => m.id === s.muscleId);
      const muscleLabel = lang === 'it' 
        ? (muscleObj?.labelIt || s.muscle) 
        : (muscleObj?.label || s.muscle);
      const exName = lang === 'it' ? s.name : (s.nameEn || s.name);

      list.push({
        name: exName,
        muscle: muscleLabel,
        level: s.level,
        groupId: s.muscleId,
        category: 'stretching',
        equipment: s.equipment,
        youtubeUrl: s.youtubeUrl,
        propsUsage: lang === 'it' ? s.propsUsageIt : s.propsUsageEn
      });
    });

    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [lang]);

  const filteredExercises = useMemo<ExerciseItem[]>(() => {
    return fullExerciseList.filter(ex => {
      // Filtro per categoria (Tutti, Fitness, Stretching)
      if (libraryCategory === 'fitness' && ex.category !== 'fitness') return false;
      if (libraryCategory === 'stretching' && ex.category !== 'stretching') return false;

      // Filtro di ricerca per nome, muscolo o attrezzo
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        ex.name.toLowerCase().includes(q) ||
        ex.muscle.toLowerCase().includes(q) ||
        (ex.equipment && ex.equipment.toLowerCase().includes(q))
      );
    });
  }, [fullExerciseList, searchQuery, libraryCategory]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  const toggleLanguage = () => {
    const nextLang = lang === 'it' ? 'en' : 'it';
    setLang(nextLang);
    showToast(nextLang === 'it' ? "🇮🇹 Lingua: Italiano" : "🇬🇧 Language: English");
  };

  // Helper per riconoscere se un esercizio include pesi, sovraccarichi o attrezzi esterni
  const hasEquipmentOrWeights = (exerciseName: string): boolean => {
    const nameLower = exerciseName.toLowerCase();
    const equipmentKeywords = [
      'bilanciere', 'barbell',
      'manubri', 'manubrio', 'dumbbell',
      'kettlebell', 'kb',
      'sovraccarico', 'appesantiti', 'appesantito', 'weighted', 'zavorra', 'zavorrato',
      'disco', 'dischi', 'plate',
      'sbarra', 'pull up', 'pull-up', 'pullup', 'chin up', 'chin-up', 'chinup', 'muscle up', 'muscle-up', 'muscleup',
      'toes to bar', 'dead hang', 'hanging', 'skin the cat', 'front lever', 'back lever', 'straight bar',
      'corda', 'rope', 'skip', 'jump rope', 'double under', 'triple under',
      'plyo box', 'su box', 'da box', 'su plyo box', 'box jump', 'box step', 'box plank', 'box pike', 'box dips', 'feet-on-box', 'hands elevated box',
      'panca', 'bench', 'su panca',
      'trx', 'suspension',
      'banded', 'con elastico', 'elastico', 'elastici',
      'blocco', 'blocchi', 'yoga block', 'mattoncino', 'cinghia', 'strap',
      'ab wheel', 'rotella',
      'stipite', 'porta', 'door', 'doorframe', 'asciugamano', 'towel',
      'sedia', 'chair', 'tavolo', 'table', 'mobile', 'furniture'
    ];
    return equipmentKeywords.some(keyword => nameLower.includes(keyword));
  };

  // Helper per riconoscere esercizi alla sbarra
  const isBarExercise = (exerciseName: string): boolean => {
    const nameLower = exerciseName.toLowerCase();
    return (
      nameLower.includes('sbarra') || 
      nameLower.includes('pull up') || 
      nameLower.includes('pull-up') || 
      nameLower.includes('pullup') || 
      nameLower.includes('chin up') || 
      nameLower.includes('chin-up') || 
      nameLower.includes('chinup') || 
      nameLower.includes('muscle up') || 
      nameLower.includes('muscle-up') || 
      nameLower.includes('muscleup') || 
      nameLower.includes('toes to bar') || 
      nameLower.includes('dead hang') || 
      nameLower.includes('skin the cat') || 
      nameLower.includes('front lever') || 
      nameLower.includes('back lever') || 
      nameLower.includes('hanging') ||
      nameLower.includes('straight bar')
    );
  };

  // Funzione helper per verificare la compatibilità di un esercizio
  const isExerciseCompatible = (exerciseName: string, equipment: string, userEquipments: string[] = selectedEquipments): boolean => {
    const nameLower = exerciseName.toLowerCase();
    const isBar = isBarExercise(exerciseName);
    
    // REGOLA MANDATORIA: Gli esercizi alla sbarra richiedono CONTEMPORANEAMENTE sia "Bodyweight" sia "Sbarra"
    const isBarAllowed = userEquipments.includes('Bodyweight') && userEquipments.includes('Sbarra');

    if (isBar && !isBarAllowed) {
      return false;
    }

    if (equipment === 'Sbarra') {
      if (!isBarAllowed) return false;
      return isBar;
    }

    if (isBar && equipment !== 'Sbarra' && equipment !== 'Bodyweight') {
      return false;
    }

    // Regole Corda per Saltare
    const isRopeExercise = nameLower.includes('corda') || nameLower.includes('rope') || nameLower.includes('under') || nameLower.includes('skip');
    if (equipment === 'Corda per saltare') return isRopeExercise;
    if (isRopeExercise && equipment !== 'Corda per saltare') return false;

    // Regole Plyo Box
    const isBoxExercise = nameLower.includes('plyo box') || nameLower.includes('box jump') || nameLower.includes('su box') || nameLower.includes('su plyo box') || nameLower.includes('da box') || nameLower.includes('box ');
    if (equipment === 'Plyo Box') return isBoxExercise;
    if (isBoxExercise && equipment !== 'Plyo Box') return false;

    // Regole Panca
    const isBenchExercise = nameLower.includes('panca') || nameLower.includes('bench');
    if (equipment === 'Panca') {
      return isBenchExercise || (
        !nameLower.includes('bilanciere') && 
        !nameLower.includes('kettlebell') && 
        !nameLower.includes('trx') && 
        !nameLower.includes('corda') && 
        !nameLower.includes('rope') &&
        !isBar &&
        !nameLower.includes('box')
      );
    }
    if (isBenchExercise && equipment !== 'Panca' && equipment !== 'Manubri' && equipment !== 'Bilanciere') {
      return false;
    }

    // Regole TRX
    if (equipment === 'TRX') return nameLower.includes('trx');
    if (nameLower.includes('trx') && equipment !== 'TRX') return false;

    // Regole Elastici
    const isBandEquipment = equipment === 'Elastico Tubolare' || equipment === 'Elastico Circolare';
    const isBandExercise = nameLower.includes('banded') || nameLower.includes('band') || nameLower.includes('elastico');
    
    if (isBandEquipment) {
      return isBandExercise || (
        !nameLower.includes('bilanciere') && 
        !nameLower.includes('barbell') && 
        !nameLower.includes('dumbbell') && 
        !nameLower.includes('manubri') && 
        !nameLower.includes('kettlebell') && 
        !nameLower.includes('trx') &&
        !nameLower.includes('corda') &&
        !nameLower.includes('rope') &&
        !isBar &&
        !nameLower.includes('box')
      );
    }
    if (isBandExercise && !isBandEquipment) return false;

    // Regole Blocchi Yoga & Props
    const isYogaBlock = equipment === 'Blocchi Yoga';
    const isYogaBlockExercise = nameLower.includes('blocco') || nameLower.includes('blocchi') || nameLower.includes('yoga block') || nameLower.includes('mattoncino');
    if (isYogaBlock) {
      return isYogaBlockExercise || (
        !nameLower.includes('bilanciere') &&
        !nameLower.includes('barbell') &&
        !nameLower.includes('dumbbell') &&
        !nameLower.includes('manubri') &&
        !nameLower.includes('kettlebell') &&
        !nameLower.includes('trx') &&
        !nameLower.includes('corda') &&
        !isBar
      );
    }
    if (isYogaBlockExercise && !isYogaBlock) return false;

    // Regole Kettlebell
    if (equipment === 'Kettlebell') {
      return nameLower.includes('kettlebell') || nameLower.includes('kb') || (
        !nameLower.includes('bilanciere') && 
        !nameLower.includes('barbell') && 
        !nameLower.includes('dumbbell') && 
        !nameLower.includes('manubri') && 
        !nameLower.includes('banded') && 
        !nameLower.includes('band') && 
        !nameLower.includes('elastico') && 
        !nameLower.includes('trx') &&
        !nameLower.includes('corda') &&
        !nameLower.includes('rope') &&
        !isBar
      );
    }
    if ((nameLower.includes('kettlebell') || nameLower.includes('kb')) && equipment !== 'Kettlebell') return false;

    // Regole Manubri
    if (equipment === 'Manubri') {
      return nameLower.includes('manubri') || nameLower.includes('dumbbell') || (
        !nameLower.includes('bilanciere') && 
        !nameLower.includes('barbell') && 
        !nameLower.includes('kettlebell') && 
        !nameLower.includes('banded') && 
        !nameLower.includes('band') && 
        !nameLower.includes('elastico') && 
        !nameLower.includes('trx') &&
        !nameLower.includes('corda') &&
        !nameLower.includes('rope') &&
        !isBar
      );
    }
    if ((nameLower.includes('manubri') || nameLower.includes('dumbbell')) && equipment !== 'Manubri') return false;

    // Regole Bilanciere
    if (equipment === 'Bilanciere') {
      return nameLower.includes('bilanciere') || nameLower.includes('barbell') || (
        !nameLower.includes('manubri') && 
        !nameLower.includes('dumbbell') && 
        !nameLower.includes('kettlebell') && 
        !nameLower.includes('banded') && 
        !nameLower.includes('band') && 
        !nameLower.includes('elastico') && 
        !nameLower.includes('trx') &&
        !nameLower.includes('corda') &&
        !nameLower.includes('rope') &&
        !isBar
      );
    }
    if ((nameLower.includes('bilanciere') || nameLower.includes('barbell')) && equipment !== 'Bilanciere') return false;

    // Regole Bodyweight (A Corpo Libero)
    if (equipment === 'Bodyweight') {
      if (isBar) return isBarAllowed;
      if (hasEquipmentOrWeights(exerciseName)) return false;
      return true;
    }

    return true;
  };

  const toggleEquipment = (equipId: string) => {
    if (selectedEquipments.includes(equipId)) {
      if (selectedEquipments.length === 1) {
        if (equipId !== 'Bodyweight') {
          setSelectedEquipments(['Bodyweight']);
          showToast(lang === 'it' ? "🤸‍♂️ Modalità 'Corpo libero (nessun attrezzo)' attivata!" : "🤸‍♂️ 'Bodyweight (No equipment)' activated!");
        } else {
          showToast(lang === 'it' ? "🤸‍♂️ 'Corpo libero' è già selezionato come unico attrezzo!" : "🤸‍♂️ 'Bodyweight' is already selected!");
        }
        return;
      }
      const next = selectedEquipments.filter(id => id !== equipId);
      setSelectedEquipments(next);
    } else {
      if (selectedEquipments.length >= 3) {
        showToast(t.maxToolsWarning);
        return;
      }
      const next = [...selectedEquipments, equipId];
      setSelectedEquipments(next);
    }
  };

  const selectOnlyBodyweight = () => {
    setSelectedEquipments(['Bodyweight']);
    showToast(lang === 'it' ? "🤸‍♂️ Selezionato SOLO 'Corpo libero (nessun attrezzo)'" : "🤸‍♂️ Selected 100% Solo Bodyweight");
  };

  const rollRandomEquipments = () => {
    const count = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...EQUIPMENT_ITEMS].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, count).map(e => e.id);
    setSelectedEquipments(picked);
    showToast(`🎲 ${t.randomTools}: ${picked.join(' + ')}`);
  };

  const toggleFullBody = () => {
    if (activeMuscles.length === MUSCLE_GROUPS.length) {
      setActiveMuscles([]);
      showToast(lang === 'it' ? "Distretti muscolari deselezionati" : "Muscle groups cleared");
    } else {
      setActiveMuscles(MUSCLE_GROUPS.map(m => m.id));
      showToast(t.allMusclesActive);
    }
  };

  // Generazione del workout guidata dall'obiettivo e dai vincoli
  const generateWorkout = () => {
    let targetMuscles = activeMuscles;
    if (targetMuscles.length === 0) {
      targetMuscles = MUSCLE_GROUPS.map(m => m.id);
      setActiveMuscles(targetMuscles);
    }

    const currentEquipments = selectedEquipments.length > 0 ? selectedEquipments : ['Bodyweight'];
    if (selectedEquipments.length === 0) {
      setSelectedEquipments(['Bodyweight']);
    }

    // Check reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rollDuration = prefersReducedMotion ? 400 : 1200;

    setIsRolling(true);
    setTimeout(() => {
      // Scegli timer opzioni adatte all'obiettivo
      let timerDice = TIMER_OPTIONS[Math.floor(Math.random() * TIMER_OPTIONS.length)];
      if (selectedGoal === 'fat_loss') {
        const fatLossTimers = [{ work: 30, rest: 15, label: '30" / 15"' }, { work: 40, rest: 20, label: '40" / 20"' }, { work: 45, rest: 15, label: '45" / 15"' }];
        timerDice = fatLossTimers[Math.floor(Math.random() * fatLossTimers.length)];
      } else if (selectedGoal === 'strength') {
        const strengthTimers = [{ work: 45, rest: 30, label: '45" / 30"' }, { work: 40, rest: 20, label: '40" / 20"' }, { work: 50, rest: 25, label: '50" / 25"' }];
        timerDice = strengthTimers[Math.floor(Math.random() * strengthTimers.length)];
      } else if (selectedGoal === 'mobility') {
        const mobilityTimers = [{ work: 45, rest: 15, label: '45" / 15"' }, { work: 50, rest: 10, label: '50" / 10"' }, { work: 60, rest: 15, label: '60" / 15"' }];
        timerDice = mobilityTimers[Math.floor(Math.random() * mobilityTimers.length)];
      }

      const count = exerciseCountMode === 'dice' ? 6 : customExerciseCount;
      let circuit: any[] = [];
      const isOnlyBodyweight = currentEquipments.length === 1 && currentEquipments[0] === 'Bodyweight';

      // LOGICA SPECIALE: Se l'obiettivo è Mobilità & Allungamento, estrai rigorosamente dalla libreria di Stretching/Yoga
      if (selectedGoal === 'mobility') {
        const stretchPool = getStretchingExercisesForWorkout(intensity, targetMuscles, currentEquipments);
        const shuffledStretches = [...stretchPool].sort(() => 0.5 - Math.random());
        let picked = shuffledStretches.slice(0, count);

        // Se la selezione è inferiore a count, completa con altri esercizi di stretching compatibili
        if (picked.length < count) {
          const fallbackPool = STRETCHING_EXERCISES.filter(s => {
            if (isOnlyBodyweight && s.equipment !== 'Bodyweight') return false;
            return !picked.some(p => p.id === s.id);
          });
          const shuffledFallback = [...fallbackPool].sort(() => 0.5 - Math.random());
          picked = [...picked, ...shuffledFallback.slice(0, count - picked.length)];
        }

        circuit = picked.map(s => {
          const muscleObj = MUSCLE_GROUPS.find(m => m.id === s.muscleId);
          const muscleName = lang === 'it' 
            ? (muscleObj?.labelIt || s.muscle) 
            : (muscleObj?.label || s.muscle);
          const exName = lang === 'it' ? s.name : (s.nameEn || s.name);
          return {
            name: exName,
            muscle: muscleName,
            equipment: s.equipment,
            level: s.level,
            directYoutubeUrl: s.youtubeUrl,
            propsUsage: lang === 'it' ? s.propsUsageIt : s.propsUsageEn
          };
        });
      } else {
        // Workout standard di fitness / condizionamento / forza
        let usedNames = new Set<string>();
        let attempts = 0;
        while (circuit.length < count && attempts < 160) {
          const muscleId = targetMuscles[circuit.length % targetMuscles.length];
          const assignedEquipment = currentEquipments[circuit.length % currentEquipments.length];
          
          const rawPool = EXERCISE_DATABASE[muscleId as keyof typeof EXERCISE_DATABASE]?.[intensity as 1 | 2 | 3] || [];
          let compatiblePool = rawPool.filter(ex => isExerciseCompatible(ex, assignedEquipment, currentEquipments));
          
          if (compatiblePool.length === 0) {
            for (const altEquip of currentEquipments) {
              const altPool = rawPool.filter(ex => isExerciseCompatible(ex, altEquip, currentEquipments));
              if (altPool.length > 0) {
                compatiblePool = altPool;
                break;
              }
            }
          }
          
          if (compatiblePool.length === 0) {
            compatiblePool = rawPool.filter(ex => currentEquipments.some(eq => isExerciseCompatible(ex, eq, currentEquipments)));
          }

          if (compatiblePool.length === 0) {
            compatiblePool = rawPool.filter(ex => isExerciseCompatible(ex, 'Bodyweight', ['Bodyweight']));
          }
          
          const activePool = compatiblePool.length > 0 ? compatiblePool : rawPool;
          if (activePool.length > 0) {
            const availableExercises = activePool.filter(ex => !usedNames.has(ex));
            const chosenEx = (availableExercises.length > 0 ? availableExercises : activePool)[
              Math.floor(Math.random() * (availableExercises.length > 0 ? availableExercises.length : activePool.length))
            ];
            
            if (!usedNames.has(chosenEx) || attempts > 90) {
              const actualEquipment = isBarExercise(chosenEx) ? 'Sbarra' : assignedEquipment;
              const muscleObj = MUSCLE_GROUPS.find(m => m.id === muscleId);
              const muscleName = lang === 'it' ? (muscleObj?.labelIt || 'Full Body') : (({ lower: 'LOWER BODY', chest: 'CHEST', back: 'BACK', shoulders: 'SHOULDERS', biceps: 'BICEPS', triceps: 'TRICEPS', abs: 'ABS & CORE' } as Record<string,string>)[muscleId] || muscleObj?.label || 'Full Body');
              
              circuit.push({
                name: chosenEx,
                muscle: muscleName,
                equipment: actualEquipment,
                level: intensity
              });
              usedNames.add(chosenEx);
            }
          }
          attempts++;
        }
      }

      if (circuit.length === 0) {
        if (selectedGoal === 'mobility') {
          circuit.push({
            name: lang === 'it' ? 'Posizione del Fanciullo (Child\'s Pose)' : 'Child\'s Pose (Balasana)',
            muscle: 'Full Body',
            equipment: 'Bodyweight',
            level: 1,
            directYoutubeUrl: 'https://www.youtube.com/watch?v=2MJGg-dUKh0'
          });
        } else {
          circuit.push({ name: 'Squat a Corpo Libero', muscle: 'Lower Body', equipment: 'Bodyweight', level: intensity });
        }
      }

      // GARANZIA ASSOLUTA SOLO CORPO LIBERO: Nessun attrezzo né peso se selezionato solo Bodyweight
      if (isOnlyBodyweight) {
        const pureBodyweightFallbacks = selectedGoal === 'mobility' ? [
          'Posizione del Fanciullo (Child\'s Pose)',
          'Gatto-Mucca a Terra (Cat-Cow Pose)',
          'Cane a Faccia in Giù (Downward-Facing Dog)',
          'Allungamento Ischiocrurali da Seduti (Paschimottanasana)',
          'Posizione del Cobra (Bhujangasana)',
          'Torsione Spinale Supina (Supta Matsyendrasana)'
        ] : [
          'Squat a Corpo Libero', 'Push Up Standard a Terra', 'Affondi Alternati a Terra',
          'Plank Classico a Terra', 'Superman a Terra', 'Crunch a Terra a Corpo Libero',
          'Glute Bridge a Terra', 'Pike Push Up a Terra (Base)', 'Mountain Climbers a Terra', 'Burpees Basic a Terra'
        ];
        circuit = circuit.map((item, idx) => {
          if (hasEquipmentOrWeights(item.name)) {
            const fallbackName = pureBodyweightFallbacks[idx % pureBodyweightFallbacks.length];
            return {
              ...item,
              name: fallbackName,
              equipment: 'Bodyweight'
            };
          }
          return {
            ...item,
            equipment: 'Bodyweight'
          };
        });
      }

      const secondsPerSet = timerDice.work + timerDice.rest;
      const secondsPerCircuit = circuit.length * secondsPerSet;
      const totalRounds = Math.max(1, Math.floor((totalTime * 60) / (secondsPerCircuit || 1)));

      const equipmentSummary = currentEquipments.map(eq => {
        const found = EQUIPMENT_ITEMS.find(e => e.id === eq);
        return lang === 'it' ? (found?.label || eq) : (found?.labelEn || eq);
      }).join(' + ');

      setWorkoutData({ 
        timer: timerDice, 
        equipment: equipmentSummary, 
        equipments: currentEquipments, 
        circuit, 
        totalRounds,
        goal: selectedGoal
      });
      setIsRolling(false);
      setView('workout-preview');
    }, rollDuration);
  };

  const startWorkout = () => {
    setView('timer');
    setTimeLeft(10);
    setTimerStatus('prepare');
    setIsActive(true);
    setCurrentExerciseIdx(0);
    setCurrentRound(1);
  };

  // Salvataggio nei preferiti
  const handleSaveWorkout = () => {
    if (!workoutData) return;

    const isAlreadySaved = savedWorkouts.some(sw => 
      sw.circuit.length === workoutData.circuit.length &&
      sw.circuit.every((c, i) => c.name === workoutData.circuit[i]?.name) &&
      sw.timer.work === workoutData.timer.work &&
      sw.timer.rest === workoutData.timer.rest
    );

    if (isAlreadySaved) {
      showToast(t.alreadySavedToast);
      return;
    }

    const newSaved: SavedWorkout = {
      id: 'saved-' + Date.now(),
      savedAt: new Date().toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US'),
      goal: selectedGoal,
      totalTime,
      intensity,
      equipment: workoutData.equipment,
      equipments: workoutData.equipments,
      timer: workoutData.timer,
      circuit: workoutData.circuit,
      totalRounds: workoutData.totalRounds
    };

    setSavedWorkouts(prev => [newSaved, ...prev]);
    showToast(t.savedToast);
  };

  const handleRepeatSavedWorkout = (sw: SavedWorkout) => {
    setSelectedGoal(sw.goal);
    setTotalTime(sw.totalTime);
    setIntensity(sw.intensity);
    setSelectedEquipments(sw.equipments);
    setWorkoutData({
      timer: sw.timer,
      equipment: sw.equipment,
      equipments: sw.equipments,
      circuit: sw.circuit,
      totalRounds: sw.totalRounds,
      goal: sw.goal
    });
    setView('workout-preview');
    showToast(lang === 'it' ? `🔄 Allenamento caricato: ${sw.totalTime} Minuti` : `🔄 Loaded workout: ${sw.totalTime} Minutes`);
  };

  const handleDeleteSavedWorkout = (id: string) => {
    setSavedWorkouts(prev => prev.filter(w => w.id !== id));
    showToast(lang === 'it' ? "🗑 Allenamento rimosso dai preferiti." : "🗑 Workout removed from favorites.");
  };

  // Timer & completamento
  const handleWorkoutComplete = () => {
    const baseXP = totalTime * 5; 
    const intensityBonus = intensity * 15;
    const customCountBonus = exerciseCountMode === 'custom' ? 20 : 0;
    const totalXPEarned = baseXP + intensityBonus + customCountBonus;

    const newWorkoutLog: WorkoutLog = {
      id: 'workout-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      duration: totalTime,
      intensity: intensity,
      equipment: workoutData ? workoutData.equipment : 'Bodyweight',
      exercisesCount: workoutData ? workoutData.circuit.length : 6,
      xpEarned: totalXPEarned
    };

    let updatedXP = profile.xp + totalXPEarned;
    let updatedLevel = profile.level;
    const xpNeededForNextLevel = updatedLevel * 200;

    if (updatedXP >= xpNeededForNextLevel) {
      updatedXP -= xpNeededForNextLevel;
      updatedLevel += 1;
      showToast(`🌟 LEVEL UP! Lv. ${updatedLevel}!`);
    }

    let newStreak = profile.streak;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const lastWorkout = profile.history[0];

    if (lastWorkout) {
      if (lastWorkout.date === yesterday) {
        newStreak += 1;
      } else if (lastWorkout.date !== today) {
        newStreak = 1; 
      }
    } else {
      newStreak = 1;
    }

    let newlyUnlockedBadges = [...profile.unlockedBadges];
    if (!newlyUnlockedBadges.includes('first_roll')) {
      newlyUnlockedBadges.push('first_roll');
    }
    if (newStreak >= 3 && !newlyUnlockedBadges.includes('streak_3')) {
      newlyUnlockedBadges.push('streak_3');
      showToast("🏆 BADGE: Costanza Neon!");
    }
    if (updatedLevel >= 5 && !newlyUnlockedBadges.includes('level_five')) {
      newlyUnlockedBadges.push('level_five');
      showToast("🏆 BADGE: Atleta Elite!");
    }

    setProfile(prev => ({
      ...prev,
      xp: updatedXP,
      level: updatedLevel,
      streak: newStreak,
      history: [newWorkoutLog, ...prev.history],
      unlockedBadges: newlyUnlockedBadges
    }));

    workoutAudio.playVictoryFanfare();
    setView('finish');
  };

  const advanceWorkout = () => {
    if (!workoutData) return;
    if (currentExerciseIdx < workoutData.circuit.length - 1) {
      setCurrentExerciseIdx(prev => prev + 1);
      setTimerStatus('work');
      setTimeLeft(workoutData.timer.work);
      workoutAudio.playWorkStartCue();
    } else {
      if (currentRound < workoutData.totalRounds) {
        setCurrentRound(prev => prev + 1);
        setCurrentExerciseIdx(0);
        setTimerStatus('work');
        setTimeLeft(workoutData.timer.work);
        workoutAudio.playWorkStartCue();
      } else {
        setIsActive(false);
        handleWorkoutComplete();
      }
    }
  };

  const handlePhaseEnd = () => {
    if (!workoutData) return;
    if (timerStatus === 'prepare') {
      setTimerStatus('work');
      setTimeLeft(workoutData.timer.work);
      workoutAudio.playWorkStartCue();
    } else if (timerStatus === 'work') {
      if (workoutData.timer.rest > 0) {
        setTimerStatus('rest');
        setTimeLeft(workoutData.timer.rest);
        workoutAudio.playRestCue();
      } else {
        advanceWorkout();
      }
    } else if (timerStatus === 'rest') {
      advanceWorkout();
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      if (timeLeft === 3 || timeLeft === 2) {
        workoutAudio.playCountdownTick(880);
      } else if (timeLeft === 1) {
        workoutAudio.playCountdownTick(1046);
      }
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      handlePhaseEnd();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, timerStatus, currentExerciseIdx, currentRound]);

  const toggleHealthSync = () => {
    setProfile(prev => {
      const nextSync = !prev.healthSync;
      showToast(nextSync ? "💚 Apple Health & Google Fit Sincronizzato!" : "⚠️ Sincronizzazione Disattivata.");
      return { ...prev, healthSync: nextSync };
    });
  };

  const togglePushNotifications = () => {
    setProfile(prev => {
      const nextPush = !prev.pushEnabled;
      return { ...prev, pushEnabled: nextPush };
    });
  };

  const selectSkin = (skinId: string) => {
    setProfile(prev => ({ ...prev, selectedDiceSkin: skinId }));
    showToast(`🎨 Skin Dadi aggiornata!`);
  };

  // --- COMPONENTI UI ---

  const Header = () => (
    <div className="flex flex-col items-center pt-8 pb-4 px-4 w-full relative">
      {/* Top Right Controls (Language & Tutorial & Safety) */}
      <div className="absolute top-6 right-4 flex items-center gap-2">
        <button
          onClick={toggleLanguage}
          className="py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-400 font-black text-xs uppercase italic tracking-wider transition-all active:scale-90 flex items-center gap-1.5 cursor-pointer"
          title="Cambia lingua / Change language"
          aria-label="Toggle language"
        >
          <Globe size={14} />
          <span>{lang.toUpperCase()}</span>
        </button>
        <button
          onClick={() => setIsTutorialOpen(true)}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-fuchsia-400 transition-all active:scale-90 cursor-pointer"
          title={t.tutorialReopen}
          aria-label={t.tutorialReopen}
        >
          <HelpCircle size={18} />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <div 
          className="p-2.5 rounded-2xl rotate-12 shadow-[0_0_25px_rgba(168,85,247,0.5)]" 
          style={{ background: DICE_SKINS.find(s => s.id === profile.selectedDiceSkin)?.color || 'linear-gradient(45deg, #A855F7, #FF00FF)' }}
        >
          <Dices size={32} color="#FFF" strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase italic text-center leading-none">
          ALEA<span style={{ color: COLORS.lightBlue }}>MOVES</span>
        </h1>
      </div>
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-black text-center" style={{ color: COLORS.violetPink }}>
        {t.tagline}
      </p>
    </div>
  );

  const Navigation = () => (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent z-40 border-t border-white/5 backdrop-blur-lg">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <button 
          onClick={() => setView('setup')} 
          className="flex flex-col items-center gap-1 p-2 focus:outline-none cursor-pointer"
          style={{ color: view === 'setup' || view === 'workout-preview' || view === 'timer' ? COLORS.lightBlue : COLORS.textSecondary }}
          aria-label="Workout"
        >
          <Dices size={24} />
          <span className="text-[9px] uppercase font-black tracking-wider">Workout</span>
        </button>
        <button 
          onClick={() => setView('library')} 
          className="flex flex-col items-center gap-1 p-2 focus:outline-none cursor-pointer"
          style={{ color: view === 'library' ? COLORS.fuchsia : COLORS.textSecondary }}
          aria-label={t.tabExercises}
        >
          <Library size={24} />
          <span className="text-[9px] uppercase font-black tracking-wider">{lang === 'it' ? 'Libreria' : 'Library'}</span>
        </button>
        <button 
          onClick={() => setView('profile')} 
          className="flex flex-col items-center gap-1 p-2 focus:outline-none cursor-pointer"
          style={{ color: view === 'profile' ? COLORS.purple : COLORS.textSecondary }}
          aria-label={lang === 'it' ? 'Profilo' : 'Profile'}
        >
          <div className="relative">
            <User size={24} />
            {profile.streak > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping"></span>
            )}
          </div>
          <span className="text-[9px] uppercase font-black tracking-wider">{lang === 'it' ? 'Profilo' : 'Profile'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-24 text-white relative font-sans overflow-x-hidden" style={{ backgroundColor: COLORS.bg }}>
      
      {/* Toast Notifiche */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 p-4 rounded-2xl border-2 flex items-center gap-3 shadow-2xl backdrop-blur-xl bg-black/90 border-fuchsia-500 animate-in fade-in duration-200">
          <Sparkles color={COLORS.fuchsia} size={20} className="animate-spin" />
          <span className="text-xs font-black uppercase tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Modale Tutorial Onboarding */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        lang={lang}
      />

      {/* Modale Sicurezza & Salute */}
      <SafetyModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
        lang={lang}
      />

      {/* Modale Dimostrazione Esercizio Integrata */}
      {selectedDemoExercise && (
        <DemonstrationModal
          isOpen={!!selectedDemoExercise}
          onClose={() => setSelectedDemoExercise(null)}
          exerciseName={selectedDemoExercise.name}
          muscle={selectedDemoExercise.muscle}
          level={selectedDemoExercise.level}
          equipment={selectedDemoExercise.equipment}
          lang={lang}
        />
      )}

      {/* VIEW: SETUP (CONFIGURAZIONE A PASSI CHIARI) */}
      {view === 'setup' && (
        <div className="flex flex-col pb-12">
          <Header />
          
          <div className="max-w-md mx-auto px-6 space-y-8 w-full">
            
            {/* Quick Status Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-3xl bg-zinc-900/40 border border-white/5">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <Flame size={18} className="text-orange-500 animate-pulse" />
                  <span className="text-lg font-black italic">{profile.streak}</span>
                </div>
                <span className="text-[8px] uppercase tracking-widest text-zinc-500">{t.streak}</span>
              </div>
              <div className="flex flex-col items-center border-x border-white/5">
                <span className="text-lg font-black text-fuchsia-400 italic">Lv. {profile.level}</span>
                <span className="text-[8px] uppercase tracking-widest text-zinc-500">{t.level}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-black text-cyan-400 italic">{profile.xp}</span>
                <span className="text-[8px] uppercase tracking-widest text-zinc-500">{t.xpPoints}</span>
              </div>
            </div>

            {/* SEZIONE 1: SCEGLI IL TUO OBIETTIVO */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-fuchsia-500/20 text-fuchsia-400">
                    <Target size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-black uppercase italic tracking-wider text-white">
                      {t.goalsTitle}
                    </h2>
                    <p className="text-[10px] text-zinc-400 font-medium">{t.goalsSubtitle}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {(Object.keys(t.goals) as GoalType[]).map(goalKey => {
                  const isSelected = selectedGoal === goalKey;
                  const g = t.goals[goalKey];
                  return (
                    <button
                      key={goalKey}
                      type="button"
                      onClick={() => setSelectedGoal(goalKey)}
                      style={{
                        backgroundColor: isSelected ? 'rgba(255, 0, 255, 0.12)' : COLORS.cardBg,
                        borderColor: isSelected ? COLORS.fuchsia : COLORS.border
                      }}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all active:scale-98 cursor-pointer ${isSelected ? 'ring-1 ring-fuchsia-400/50 shadow-[0_0_20px_rgba(255,0,255,0.2)]' : ''}`}
                    >
                      <div className="flex-1 pr-3">
                        <h4 className="text-xs font-black uppercase italic text-white flex items-center gap-2">
                          {g.title}
                        </h4>
                        <p className="text-[10px] text-zinc-400 font-medium leading-snug mt-0.5">
                          {g.desc}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 transition-all ${isSelected ? 'bg-fuchsia-500 text-white' : 'border-2 border-zinc-700 text-transparent'}`}>
                        ✓
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SEZIONE 2: INTENSITÀ & LIVELLO */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Zap size={20} />
                </div>
                <h2 className="text-base font-black uppercase italic tracking-wider">
                  {t.intensityTitle}
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setIntensity(lvl)}
                    style={{ 
                      background: intensity === lvl ? `linear-gradient(to bottom right, ${COLORS.lightBlue}, ${COLORS.purple})` : COLORS.cardBg,
                      borderColor: intensity === lvl ? COLORS.lightBlue : COLORS.border,
                      color: intensity === lvl ? COLORS.white : COLORS.textSecondary
                    }}
                    className="py-4 rounded-2xl flex flex-col items-center border-2 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <span className="text-2xl font-black italic">L{lvl}</span>
                    <span className="text-[9px] uppercase font-black mt-1 opacity-90">
                      {lvl === 1 ? (lang === 'it' ? 'Base' : 'Base') : lvl === 2 ? (lang === 'it' ? 'Pro' : 'Pro') : (lang === 'it' ? 'Elite' : 'Elite')}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* SEZIONE 3: FOCUS MUSCOLARE */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                    <CheckCircle2 size={20} />
                  </div>
                  <h2 className="text-base font-black uppercase italic tracking-wider">
                    {t.muscleFocusTitle}
                  </h2>
                </div>
                <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${activeMuscles.length === MUSCLE_GROUPS.length ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-purple-500/20 text-purple-300 border-purple-500/40'}`}>
                  {activeMuscles.length === MUSCLE_GROUPS.length ? 'FULL BODY' : `${activeMuscles.length}/7`}
                </span>
              </div>

              {/* PULSANTE FULL BODY 1-CLICK */}
              <button
                type="button"
                onClick={toggleFullBody}
                style={{
                  background: activeMuscles.length === MUSCLE_GROUPS.length 
                    ? `linear-gradient(135deg, ${COLORS.fuchsia}, ${COLORS.purple})` 
                    : COLORS.cardBg,
                  borderColor: activeMuscles.length === MUSCLE_GROUPS.length ? COLORS.lightBlue : COLORS.border,
                  boxShadow: activeMuscles.length === MUSGROUPS_LENGTH ? `0 0 25px ${COLORS.fuchsia}66` : 'none'
                }}
                className="w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all active:scale-98 cursor-pointer shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔥</span>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-xs uppercase italic tracking-wide text-white">
                        {t.fullBodyBtnTitle}
                      </h3>
                      <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-white/20 uppercase tracking-widest text-white">
                        1-CLICK
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-300 font-medium mt-0.5">
                      {t.fullBodyBtnDesc}
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase italic transition-all shadow-md ${activeMuscles.length === MUSCLE_GROUPS.length ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400 border border-white/10'}`}>
                  {activeMuscles.length === MUSCLE_GROUPS.length ? t.fullBodyActive : t.fullBodyInactive}
                </div>
              </button>

              <div className="grid grid-cols-2 gap-2">
                {MUSCLE_GROUPS.map(group => {
                  const isSelected = activeMuscles.includes(group.id);
                  const label = lang === 'it' ? group.labelIt : ({ lower: 'LOWER BODY', chest: 'CHEST', back: 'BACK', shoulders: 'SHOULDERS', biceps: 'BICEPS', triceps: 'TRICEPS', abs: 'ABS & CORE' } as Record<string,string>)[group.id] || group.label;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setActiveMuscles(prev => prev.includes(group.id) ? prev.filter(i => i !== group.id) : [...prev, group.id])}
                      style={{ 
                        backgroundColor: isSelected ? 'rgba(0, 240, 255, 0.12)' : COLORS.cardBg,
                        borderColor: isSelected ? COLORS.lightBlue : COLORS.border
                      }}
                      className={`p-3 rounded-2xl text-left flex items-center justify-between border-2 transition-all shadow-sm active:scale-95 cursor-pointer ${isSelected ? 'ring-1 ring-cyan-400/40' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{group.icon}</span>
                        <span className="text-xs font-black uppercase italic tracking-tight">{label}</span>
                      </div>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[9px] font-black shadow">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SEZIONE 4: ATTREZZATURA (1 - 3 Attrezzi o Solo Corpo Libero) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
                    <Dumbbell size={20} />
                  </div>
                  <h2 className="text-base font-black uppercase italic tracking-wider">
                    {t.equipmentTitle}
                  </h2>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={selectOnlyBodyweight}
                    className="p-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 active:scale-90 transition-all cursor-pointer text-[10px] font-black uppercase px-2"
                  >
                    {t.onlyBodyweightBtn}
                  </button>
                  <button
                    type="button"
                    onClick={rollRandomEquipments}
                    className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-fuchsia-400 active:scale-90 transition-all cursor-pointer"
                    title={t.randomTools}
                  >
                    <Dices size={16} />
                  </button>
                </div>
              </div>
              
              <p className="text-[11px] text-zinc-400 font-medium">
                {t.equipmentSubtitle}
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {EQUIPMENT_ITEMS.map(equip => {
                  const isSelected = selectedEquipments.includes(equip.id);
                  const label = lang === 'it' ? equip.label : equip.labelEn;
                  return (
                    <button
                      key={equip.id}
                      type="button"
                      onClick={() => toggleEquipment(equip.id)}
                      style={{
                        backgroundColor: isSelected ? 'rgba(168, 85, 247, 0.15)' : COLORS.cardBg,
                        borderColor: isSelected ? COLORS.purple : COLORS.border
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left flex flex-col justify-between gap-2 transition-all active:scale-95 cursor-pointer relative overflow-hidden ${isSelected ? 'ring-1 ring-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.25)]' : ''}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="text-2xl h-8 w-8 flex items-center justify-center">{equip.icon}</div>
                        {isSelected ? (
                          <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-black shadow-md">
                            ✓
                          </span>
                        ) : (
                          <span className="text-[8px] font-black uppercase text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-white/5">
                            {equip.tag}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase italic tracking-tight text-white leading-snug">
                          {label}
                        </h4>
                        <p className="text-[9px] text-zinc-400 font-medium line-clamp-1 mt-0.5">
                          {lang === 'it' ? equip.description : ({ Bodyweight: 'Floor calisthenics • No external load', Sbarra: 'Pull-ups, muscle-ups & core', Manubri: 'Pair of dumbbells', Kettlebell: 'Swings, cleans & presses', Bilanciere: 'Olympic and foundational lifts', TRX: 'Suspension straps for bodyweight training', 'Elastico Tubolare': 'Resistance tubes with handles', 'Elastico Circolare': 'Loop resistance bands', Panca: 'Flat, incline & dips', 'Plyo Box': 'Jumps, step-ups & elevations', 'Corda per saltare': 'Jump rope & double unders'} as Record<string,string>)[equip.id] || equip.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Nota esplicativa per sbarra e corpo libero */}
              <div className="p-3 rounded-2xl bg-purple-950/20 border border-purple-500/20 text-[11px] text-zinc-300 flex items-start gap-2.5">
                <Info size={16} className="text-purple-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {t.pullUpBarNote}
                </span>
              </div>
            </section>

            {/* SEZIONE 5: DURATA & NUMERO ESERCIZI */}
            <section className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                    <Clock size={20} />
                  </div>
                  <h2 className="text-base font-black uppercase italic tracking-wider">
                    {t.durationTitle}
                  </h2>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[10, 15, 20, 30, 45, 60].map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTotalTime(m)}
                      style={{ 
                        background: totalTime === m ? `linear-gradient(to bottom right, ${COLORS.lightBlue}, ${COLORS.purple})` : COLORS.cardBg,
                        color: totalTime === m ? COLORS.bg : COLORS.white,
                        borderColor: totalTime === m ? COLORS.lightBlue : COLORS.border
                      }}
                      className="py-3 rounded-xl font-black text-base transition-all border-2 shadow-lg cursor-pointer"
                    >
                      {m}'
                    </button>
                  ))}
                </div>
              </div>

              {/* SCELTA NUMERO ESERCIZI (Standard vs Personalizzato) */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers size={18} className="text-fuchsia-400" />
                    <h3 className="text-xs font-black uppercase italic tracking-wider text-zinc-300">
                      {t.exerciseCountTitle}
                    </h3>
                  </div>
                </div>

                <div className="flex gap-2 p-1 bg-zinc-900/50 rounded-2xl border border-white/5">
                  <button 
                    type="button"
                    onClick={() => setExerciseCountMode('dice')}
                    className={`flex-1 py-2.5 rounded-xl font-black uppercase italic text-xs transition-all cursor-pointer ${exerciseCountMode === 'dice' ? 'bg-white text-black shadow-lg' : 'text-zinc-500'}`}
                  >
                    {t.countStandard}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setExerciseCountMode('custom')}
                    className={`flex-1 py-2.5 rounded-xl font-black uppercase italic text-xs transition-all cursor-pointer ${exerciseCountMode === 'custom' ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20' : 'text-zinc-500'}`}
                  >
                    {t.countCustom}
                  </button>
                </div>
                
                {exerciseCountMode === 'custom' && (
                  <div className="p-4 rounded-2xl bg-zinc-900/40 border border-fuchsia-500/30 space-y-3 animate-in fade-in duration-200">
                    <p className="text-[11px] text-zinc-400 font-medium">
                      {t.customHelper}
                    </p>
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{t.min}</span>
                      <span className="text-2xl font-black italic text-fuchsia-400">{customExerciseCount}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{t.max}</span>
                    </div>
                    <input 
                      type="range" 
                      min="3" 
                      max="10" 
                      value={customExerciseCount}
                      onChange={(e) => setCustomExerciseCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                      style={{ background: `linear-gradient(to right, ${COLORS.fuchsia} 0%, ${COLORS.fuchsia} ${(customExerciseCount-3)/7*100}%, #27272a ${(customExerciseCount-3)/7*100}%, #27272a 100%)` }}
                    />
                  </div>
                )}
              </div>
            </section>

            {/* SEZIONE 6: RIEPILOGO DELLE SCELTE */}
            <section className="p-5 rounded-3xl bg-zinc-900/60 border-2 border-cyan-500/30 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-cyan-400">
                <Sparkle size={18} />
                <h3 className="text-xs font-black uppercase italic tracking-wider">
                  {t.summaryTitle}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[9px] uppercase font-bold text-zinc-500 block">{t.summaryGoal}</span>
                  <span className="font-black text-white italic truncate block">{t.goals[selectedGoal].title}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[9px] uppercase font-bold text-zinc-500 block">{t.summaryLevel}</span>
                  <span className="font-black text-cyan-400 italic block">{lang === 'it' ? 'Livello' : 'Level'} {intensity}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[9px] uppercase font-bold text-zinc-500 block">{t.summaryGear}</span>
                  <span className="font-black text-purple-400 italic truncate block">
                    {selectedEquipments.length === 1 && selectedEquipments[0] === 'Bodyweight' ? (lang === 'it' ? 'Solo Corpo Libero' : 'Solo Bodyweight') : lang === 'it' ? `${selectedEquipments.length} Attrezzi` : `${selectedEquipments.length} Tools`}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[9px] uppercase font-bold text-zinc-500 block">{t.summaryDuration}</span>
                  <span className="font-black text-fuchsia-400 italic block">{totalTime} {lang === 'it' ? 'Minuti' : 'Minutes'} ({exerciseCountMode === 'dice' ? 6 : customExerciseCount} {lang === 'it' ? 'Es.' : 'Ex.'})</span>
                </div>
              </div>

              <p className="text-[10px] text-zinc-400 font-medium text-center pt-1">
                {t.summaryActionHint}
              </p>
            </section>

            {/* PULSANTE PRINCIPALE INEQUIVOCABILE: LANCIA I DADI */}
            <button
              id="roll-dice-btn"
              type="button"
              onClick={generateWorkout}
              style={{ background: `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.fuchsia})`, boxShadow: `0 0 35px ${COLORS.fuchsia}55` }}
              className="w-full text-white py-6 rounded-3xl font-black text-2xl flex items-center justify-center gap-4 uppercase italic active:scale-95 hover:brightness-110 transition-all cursor-pointer shadow-2xl"
              aria-label={t.rollDiceBtn}
            >
              <span>{t.rollDiceBtn}</span>
              <Dices size={30} />
            </button>

            {/* Footer con Identità & Sicurezza */}
            <DaniMovesFooter
              lang={lang}
              onOpenSafety={() => setIsSafetyOpen(true)}
            />

          </div>
        </div>
      )}

      {/* VIEW: ROLLING (ANIMAZIONE OVERLAY A TUTTO SCHERMO) */}
      {isRolling && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center">
          <div className="relative w-40 h-40 mb-8 animate-bounce flex items-center justify-center">
            <Dices className="w-full h-full text-cyan-400" />
            <div className="absolute inset-0 blur-3xl opacity-40 animate-pulse bg-fuchsia-500"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white italic uppercase mb-2 drop-shadow-[0_0_20px_rgba(0,240,255,0.7)]">
            {t.rollingTitle}
          </h2>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-6">
            {t.rollingSubtitle}
          </p>
          <div className="flex gap-3 justify-center">
             {[COLORS.lightBlue, COLORS.purple, COLORS.fuchsia].map((color, i) => (
               <div key={i} className="w-3.5 h-3.5 rounded-full animate-ping" style={{ backgroundColor: color, animationDelay: `${i * 0.25}s` }}></div>
             ))}
          </div>
        </div>
      )}

      {/* VIEW: WORKOUT PREVIEW (CON RISCALDAMENTO, CIRCUITO, DEFATICAMENTO & SALVA) */}
      {view === 'workout-preview' && workoutData && (
        <div className="min-h-screen text-white pb-36">
          <Header />
          <div className="max-w-md mx-auto px-6 space-y-6">
            
            {/* Header Box Risultato Generato */}
            <div style={{ backgroundColor: COLORS.cardBg, borderBottom: `4px solid ${COLORS.fuchsia}` }} className="rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10" style={{ background: COLORS.purple }}></div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-cyan-400">
                  {t.generatedResult}
                </span>
                <span className="text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40">
                  {t.goals[selectedGoal].title}
                </span>
              </div>
              <div className="flex justify-between items-end">
                 <div>
                   <p className="text-4xl sm:text-5xl font-black italic tracking-tighter">{workoutData.timer.label}</p>
                   <p className="text-[10px] font-black uppercase mt-1 opacity-60">{t.timerRoll}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-xl sm:text-2xl font-black uppercase italic text-fuchsia-400">{workoutData.equipment}</p>
                   <p className="text-[10px] font-black uppercase mt-1 opacity-60">{t.gearRoll}</p>
                 </div>
              </div>
              <div className="mt-5 pt-5 border-t border-white/5 flex justify-between font-black italic uppercase text-[11px] tracking-widest">
                 <span className="text-purple-400">{workoutData.totalRounds} {t.totalRounds}</span>
                 <span className="text-fuchsia-400">{workoutData.circuit.length} {t.totalExercises}</span>
              </div>
            </div>

            {/* SEZIONE RISCALDAMENTO DINAMICO (MANDATORIO & SEPARATO) */}
            <div className="p-5 rounded-3xl bg-zinc-900/60 border border-cyan-500/30 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
                  <h3 className="text-sm font-black uppercase italic tracking-wider text-cyan-400">
                    {warmupRoutine.title}
                  </h3>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  ~{warmupRoutine.durationMinutes}' Min
                </span>
              </div>
              <p className="text-[11px] text-zinc-300 font-medium">
                {warmupRoutine.description}
              </p>
              <div className="space-y-2 pt-2 border-t border-white/5">
                {warmupRoutine.exercises.map((ex, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <span className="text-xs font-black uppercase italic text-white block">{ex.name}</span>
                      <span className="text-[10px] text-zinc-400 font-medium block">{ex.instruction}</span>
                    </div>
                    <span className="text-[10px] font-black text-cyan-400 shrink-0">{ex.durationOrReps}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CIRCUITO PRINCIPALE */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black uppercase italic flex items-center gap-2.5">
                  <Activity size={20} style={{ color: COLORS.lightBlue }} /> {t.yourCircuit}
                </h3>
                <span className="text-[10px] font-black text-zinc-400 uppercase">
                  {workoutData.circuit.length} {lang === 'it' ? 'Movimenti' : 'Movements'}
                </span>
              </div>

              {workoutData.circuit.map((ex, i) => (
                <div key={i} style={{ backgroundColor: COLORS.cardBg }} className="p-4 rounded-2xl flex items-center justify-between gap-3 border border-white/5 shadow-lg">
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div 
                      style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.fuchsia})`, color: COLORS.white }} 
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-base shadow-lg shrink-0"
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-base uppercase italic tracking-tight leading-snug truncate">{ex.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] uppercase font-black opacity-80" style={{ color: COLORS.lightBlue }}>{ex.muscle}</span>
                        <span className="text-[8px] text-zinc-500 uppercase font-black">• {ex.equipment}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pulsante Guarda Dimostrazione */}
                  <button
                    type="button"
                    onClick={() => setSelectedDemoExercise(ex)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-400 active:scale-90 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    title={t.watchDemo}
                  >
                    <Youtube size={16} className="text-red-500" />
                    <span className="text-[10px] font-black uppercase tracking-wider hidden sm:inline">{lang === 'it' ? 'Demo' : 'Demo'}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* SEZIONE DEFATICAMENTO & STRETCHING (MANDATORIO & SEPARATO) */}
            <div className="p-5 rounded-3xl bg-zinc-900/60 border border-purple-500/30 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></div>
                  <h3 className="text-sm font-black uppercase italic tracking-wider text-purple-400">
                    {cooldownRoutine.title}
                  </h3>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  ~{cooldownRoutine.durationMinutes}' Min
                </span>
              </div>
              <p className="text-[11px] text-zinc-300 font-medium">
                {cooldownRoutine.description}
              </p>
              <div className="space-y-2 pt-2 border-t border-white/5">
                {cooldownRoutine.exercises.map((ex, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <span className="text-xs font-black uppercase italic text-white block">{ex.name}</span>
                      <span className="text-[10px] text-zinc-400 font-medium block">{ex.instruction}</span>
                    </div>
                    <span className="text-[10px] font-black text-purple-400 shrink-0">{ex.durationOrReps}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CURATED MUSIC PLAYLIST */}
            <div 
              style={{ backgroundColor: COLORS.cardBg }} 
              className="p-4 rounded-3xl border border-fuchsia-500/20 shadow-xl flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shrink-0"
                  style={{ background: CURATED_PLAYLISTS.find(p => p.id === selectedPlaylistId)?.coverGradient || 'linear-gradient(135deg, #FF00FF, #A855F7)' }}
                >
                  <Music size={20} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-fuchsia-400">
                      PLAYLIST
                    </span>
                    <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400">
                      {CURATED_PLAYLISTS.find(p => p.id === selectedPlaylistId)?.bpm}
                    </span>
                  </div>
                  <h4 className="text-xs font-black uppercase italic tracking-tight text-white truncate max-w-[170px]">
                    {CURATED_PLAYLISTS.find(p => p.id === selectedPlaylistId)?.name}
                  </h4>
                </div>
              </div>
              <a
                href={CURATED_PLAYLISTS.find(p => p.id === selectedPlaylistId)?.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#1DB954]/20 border border-[#1DB954]/40 hover:bg-[#1DB954] hover:text-black text-[#1DB954] transition-all cursor-pointer shrink-0"
                title="Spotify"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.306c-.216.355-.678.47-1.033.254-2.83-1.728-6.393-2.12-10.592-1.16-.407.093-.815-.164-.908-.57-.093-.408.163-.816.57-.909 4.606-1.053 8.563-.604 11.71 1.352.355.216.47.678.253 1.033zm1.474-3.276c-.272.443-.853.585-1.296.313-3.24-1.99-8.18-2.567-12.012-1.403-.497.152-1.025-.133-1.176-.63-.152-.498.133-1.026.63-1.177 4.385-1.332 9.827-.688 13.541 1.599.443.272.585.854.313 1.298zm.129-3.41c-3.885-2.307-10.29-2.52-14.004-1.393-.595.18-1.226-.162-1.407-.757-.18-.595.163-1.226.758-1.407 4.27-1.296 11.34-1.047 15.808 1.606.535.318.708 1.01.39 1.545-.318.536-1.01.71-1.545.392z"/>
                </svg>
              </a>
            </div>

            {/* BOTTONI DI AZIONE FISSI IN BASSO (SALVA ALLENAMENTO & START) */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/95 to-transparent z-50">
               <div className="max-w-md mx-auto flex gap-3">
                  <button 
                    onClick={() => setView('setup')}
                    style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}
                    className="p-5 rounded-3xl border-2 active:scale-90 transition-transform cursor-pointer"
                    title={t.regenerateBtn}
                  >
                    <RotateCcw size={24} color={COLORS.lightBlue} />
                  </button>

                  <button 
                    onClick={handleSaveWorkout}
                    style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.fuchsia }}
                    className="p-5 rounded-3xl border-2 text-fuchsia-400 active:scale-90 transition-transform cursor-pointer flex items-center justify-center"
                    title={t.saveWorkoutBtn}
                  >
                    <Bookmark size={24} />
                  </button>

                  <button 
                    onClick={startWorkout}
                    style={{ background: `linear-gradient(90deg, ${COLORS.fuchsia}, ${COLORS.violetPink})` }}
                    className="flex-1 text-white py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-3 uppercase italic shadow-[0_0_30px_rgba(255,0,255,0.35)] active:scale-95 transition-transform cursor-pointer"
                  >
                    <span>{t.startWorkoutBtn}</span>
                    <Play fill="white" size={20} />
                  </button>
               </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW: TIMER (SCHERMATA TIMER ATTIVA) */}
      {view === 'timer' && workoutData && (
        <div className="min-h-screen flex flex-col justify-between transition-all duration-700 pb-6" style={{ backgroundColor: timerStatus === 'rest' || timerStatus === 'prepare' ? '#0A0A0F' : '#000' }}>
          <div>
            <div className="w-full bg-zinc-900 h-2">
              <div 
                style={{ 
                  background: `linear-gradient(90deg, ${COLORS.lightBlue}, ${COLORS.fuchsia})`,
                  width: `${((currentExerciseIdx + (currentRound-1) * workoutData.circuit.length) / (workoutData.circuit.length * workoutData.totalRounds)) * 100}%` 
                }}
                className="h-full transition-all duration-300 shadow-[0_0_15px_#FF00FF]"
              ></div>
            </div>

            <div className="px-6 py-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setIsActive(false); setView('workout-preview'); }}
                  className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white active:scale-90 transition-all cursor-pointer"
                  title={t.exitTimer}
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="px-3.5 py-1.5 rounded-2xl font-black italic text-xs border-2" style={{ borderColor: timerStatus === 'rest' || timerStatus === 'prepare' ? COLORS.lightBlue : COLORS.fuchsia }}>
                  {t.roundLabel} {currentRound} / {workoutData.totalRounds}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsActive(!isActive)} 
                  className="p-3.5 rounded-2xl active:scale-90 transition-transform cursor-pointer shadow-lg"
                  style={{ 
                    backgroundColor: isActive ? 'rgba(255, 0, 255, 0.15)' : 'rgba(0, 240, 255, 0.2)',
                    border: `2px solid ${isActive ? COLORS.fuchsia : COLORS.lightBlue}`,
                    color: COLORS.white
                  }}
                  title={isActive ? t.pauseBtn : t.resumeBtn}
                >
                  {isActive ? <Pause size={20} /> : <Play size={20} />}
                </button>
              </div>
            </div>

            <WorkoutMusicPlayer 
              selectedPlaylistId={selectedPlaylistId}
              onSelectPlaylist={(pl) => {
                setSelectedPlaylistId(pl.id);
                localStorage.setItem('aleamoves_music_playlist', pl.id);
                showToast(`🎵 Playlist: ${pl.name}`);
              }}
              isTimerActive={isActive}
              timerStatus={timerStatus}
            />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-4 my-auto">
            <p className="text-lg sm:text-xl font-black tracking-[0.4em] uppercase italic mb-2 animate-pulse" style={{ color: timerStatus === 'rest' || timerStatus === 'prepare' ? COLORS.lightBlue : COLORS.fuchsia }}>
              {timerStatus === 'prepare' ? t.preparePhase : timerStatus === 'rest' ? t.restPhase : t.workPhase}
            </p>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase italic mb-3 leading-tight drop-shadow-xl max-w-lg">
              {timerStatus === 'prepare' ? t.preparePhase : workoutData.circuit[currentExerciseIdx]?.name}
            </h2>
            
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
               <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Dumbbell size={14} style={{ color: COLORS.purple }} />
                  <span className="text-[10px] font-black uppercase italic tracking-widest">{workoutData.equipment}</span>
               </div>
               
               {/* Pulsante Guarda Dimostrazione durante il timer */}
               {timerStatus === 'work' && workoutData.circuit[currentExerciseIdx] && (
                 <button 
                   onClick={() => setSelectedDemoExercise(workoutData.circuit[currentExerciseIdx])}
                   className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-fuchsia-400 bg-fuchsia-500/10 px-3 py-1 rounded-full border border-fuchsia-500/30 hover:bg-fuchsia-500/20 transition-all cursor-pointer"
                 >
                   <Youtube size={14} className="text-red-500" /> {t.watchDemo}
                 </button>
               )}
            </div>

            <div className="relative flex items-center justify-center">
               <div 
                 className="text-[8rem] sm:text-[11rem] md:text-[13rem] font-black leading-none tabular-nums animate-pulse select-none" 
                 style={{ 
                   color: timerStatus === 'rest' || timerStatus === 'prepare' ? COLORS.lightBlue : COLORS.white, 
                   textShadow: timerStatus === 'rest' || timerStatus === 'prepare' ? `0 0 50px ${COLORS.lightBlue}66` : `0 0 70px ${COLORS.fuchsia}99` 
                 }}
               >
                  {timeLeft}
               </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 bg-white/5 backdrop-blur-3xl border-t border-white/5 flex justify-between items-center rounded-3xl mx-4 shadow-2xl">
             <div className="text-left">
                <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-50">{t.nextExercise}</p>
                <p className="text-white font-black uppercase italic text-sm sm:text-base truncate max-w-[200px]" style={{ color: COLORS.violetPink }}>
                  {currentExerciseIdx < workoutData.circuit.length - 1 ? workoutData.circuit[currentExerciseIdx + 1]?.name : t.endOfRound}
                </p>
             </div>
             <button 
               onClick={handlePhaseEnd} 
               className="bg-white text-black p-3.5 sm:p-4 rounded-2xl shadow-xl active:scale-90 transition-transform cursor-pointer flex items-center gap-2 font-black text-xs uppercase italic"
             >
                <span>{t.skipBtn}</span> <SkipForward size={18} />
             </button>
          </div>
        </div>
      )}

      {/* VIEW: FINISH */}
      {view === 'finish' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center" style={{ backgroundColor: COLORS.bg }}>
          <div className="w-28 h-28 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_#FF00FF66]" style={{ background: `linear-gradient(45deg, ${COLORS.purple}, ${COLORS.fuchsia})` }}>
            <Trophy size={50} color="#FFF" />
          </div>
          <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter mb-3 leading-none text-center animate-bounce">
            {t.greatJob}
          </h1>
          <p className="font-black uppercase tracking-[0.3em] mb-6 text-sm" style={{ color: COLORS.lightBlue }}>
            {t.workoutCompleted}
          </p>
          
          <div style={{ backgroundColor: COLORS.cardBg }} className="rounded-3xl p-6 w-full max-w-sm mb-8 border-2 border-white/5 shadow-2xl space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-black italic mb-1 text-fuchsia-500">{totalTime}'</p>
                  <p className="text-[9px] uppercase font-black text-zinc-500 tracking-widest">{t.timeSpent}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black italic mb-1 text-cyan-400">Lv. {intensity}</p>
                  <p className="text-[9px] uppercase font-black text-zinc-500 tracking-widest">{t.summaryLevel}</p>
                </div>
             </div>
             <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs font-bold px-2">
                <span className="text-zinc-500 uppercase tracking-widest text-[10px]">{t.xpEarned}:</span>
                <span className="text-green-400 font-black">+{workoutData ? totalTime * 5 + intensity * 15 : 0} XP</span>
             </div>
          </div>

          <div className="w-full max-w-sm space-y-3">
            <button 
              onClick={handleSaveWorkout} 
              className="w-full p-4 rounded-2xl bg-zinc-900 border border-fuchsia-500/40 text-fuchsia-400 font-black text-sm uppercase italic flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Bookmark size={18} />
              <span>{t.saveWorkoutBtn}</span>
            </button>

            <button 
              onClick={() => setView('profile')} 
              style={{ background: `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.fuchsia})` }} 
              className="w-full text-white py-5 rounded-2xl font-black text-lg uppercase italic tracking-tighter flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform cursor-pointer"
            >
              <span>{t.seeProfileBtn}</span>
              <User size={22} />
            </button>
          </div>
        </div>
      )}

      {/* VIEW: LIBRARY & I MIEI ALLENAMENTI */}
      {view === 'library' && (
        <div className="min-h-screen flex flex-col pb-32" style={{ backgroundColor: COLORS.bg, color: COLORS.white }}>
          <div className="p-6 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <button onClick={() => setView('setup')} className="p-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform cursor-pointer">
                <ArrowLeft size={20} color={COLORS.lightBlue} />
              </button>
              <h1 className="text-xl font-black uppercase italic tracking-tight">{t.libraryTitle}</h1>
            </div>
          </div>

          {/* TAB SELECTOR: ESERCIZI vs I MIEI ALLENAMENTI */}
          <div className="px-6 mt-4">
            <div className="flex gap-2 p-1 bg-zinc-900/50 rounded-2xl border border-white/5">
              <button
                onClick={() => setLibraryTab('exercises')}
                className={`flex-1 py-3 rounded-xl font-black uppercase italic text-xs transition-all cursor-pointer ${libraryTab === 'exercises' ? 'bg-white text-black shadow-lg' : 'text-zinc-500'}`}
              >
                {t.tabExercises}
              </button>
              <button
                onClick={() => setLibraryTab('saved')}
                className={`flex-1 py-3 rounded-xl font-black uppercase italic text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${libraryTab === 'saved' ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20' : 'text-zinc-500'}`}
              >
                <Bookmark size={14} />
                <span>{t.tabSavedWorkouts} ({savedWorkouts.length})</span>
              </button>
            </div>
          </div>

          {/* TAB 1: ESERCIZI COMPLETI */}
          {libraryTab === 'exercises' && (
            <div className="flex-1 flex flex-col px-6 mt-4 space-y-4">
              {/* Categoria: Tutti / Fitness & Forza / Allungamento & Mobilità */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setLibraryCategory('all')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    libraryCategory === 'all'
                      ? 'bg-white text-black shadow-md'
                      : 'bg-zinc-900/80 text-zinc-400 border border-white/10 hover:text-white'
                  }`}
                >
                  {t.filterAll}
                </button>
                <button
                  type="button"
                  onClick={() => setLibraryCategory('fitness')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    libraryCategory === 'fitness'
                      ? 'bg-cyan-400 text-black shadow-md shadow-cyan-400/20'
                      : 'bg-zinc-900/80 text-zinc-400 border border-white/10 hover:text-white'
                  }`}
                >
                  {t.filterFitness}
                </button>
                <button
                  type="button"
                  onClick={() => setLibraryCategory('stretching')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    libraryCategory === 'stretching'
                      ? 'bg-fuchsia-500 text-white shadow-md shadow-fuchsia-500/20'
                      : 'bg-zinc-900/80 text-zinc-400 border border-white/10 hover:text-white'
                  }`}
                >
                  <Sparkles size={13} />
                  <span>{t.filterStretching}</span>
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 outline-none focus:border-purple-500 font-bold text-xs text-white placeholder-zinc-500"
                />
              </div>

              <div className="space-y-3 overflow-y-auto flex-1 pb-10">
                {filteredExercises.map((ex, i) => (
                  <div key={i} style={{ backgroundColor: COLORS.cardBg }} className="p-4 rounded-2xl border border-white/5 flex items-center justify-between gap-3 shadow-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-black uppercase italic tracking-tight text-white truncate">{ex.name}</h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/5" style={{ color: COLORS.lightBlue }}>{ex.muscle}</span>
                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-fuchsia-500/10" style={{ color: COLORS.fuchsia }}>{lang === 'it' ? 'Livello' : 'Level'} {ex.level}</span>
                        {ex.category === 'stretching' && (
                          <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                            {lang === 'it' ? 'Stretching / Yoga' : 'Stretching / Yoga'}
                          </span>
                        )}
                        {ex.equipment && ex.equipment !== 'Bodyweight' && (
                          <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            {ex.equipment}
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedDemoExercise({ 
                        name: ex.name, 
                        muscle: ex.muscle, 
                        level: ex.level, 
                        equipment: ex.equipment || 'Bodyweight',
                        directYoutubeUrl: ex.youtubeUrl,
                        propsUsage: ex.propsUsage
                      })} 
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-fuchsia-500 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      title={t.watchDemo}
                    >
                      <Youtube size={18} className="text-red-500" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-zinc-300">{lang === 'it' ? 'Demo' : 'Demo'}</span>
                    </button>
                  </div>
                ))}
                {filteredExercises.length === 0 && (
                  <div className="text-center text-zinc-500 py-12 italic text-xs">
                    {t.noExercisesFound}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: I MIEI ALLENAMENTI SALVATI */}
          {libraryTab === 'saved' && (
            <div className="flex-1 flex flex-col px-6 mt-4 space-y-4">
              {savedWorkouts.length === 0 ? (
                <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 text-center space-y-3 my-8">
                  <Bookmark className="mx-auto text-zinc-600 mb-2" size={36} />
                  <h3 className="text-sm font-black uppercase italic text-white">{t.noSavedFound}</h3>
                  <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-xs mx-auto">
                    {t.noSavedSub}
                  </p>
                  <button
                    onClick={() => setView('setup')}
                    className="mt-4 py-3 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-black text-xs uppercase italic tracking-wider cursor-pointer shadow-lg active:scale-95"
                  >
                    {lang === 'it' ? 'Crea Nuovo Circuito' : 'Create New Circuit'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto flex-1 pb-10">
                  {savedWorkouts.map((sw) => (
                    <div key={sw.id} style={{ backgroundColor: COLORS.cardBg }} className="p-5 rounded-3xl border border-fuchsia-500/20 shadow-xl space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300">
                              {t.goals[sw.goal]?.title || sw.goal}
                            </span>
                            <span className="text-[9px] text-zinc-500 font-bold">{t.savedOn} {sw.savedAt}</span>
                          </div>
                          <h3 className="text-base font-black uppercase italic tracking-tight text-white">
                            Workout {sw.totalTime}' Min • {sw.timer.label}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleDeleteSavedWorkout(sw.id)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/5 transition-all cursor-pointer"
                          title={t.removeBtn}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Lista anteprima esercizi */}
                      <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 block">
                          {lang === 'it' ? 'Circuito' : 'Circuit'} ({sw.circuit.length} {lang === 'it' ? 'esercizi' : 'exercises'}):
                        </span>
                        <div className="space-y-1">
                          {sw.circuit.map((ex, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs text-zinc-300 font-bold">
                              <span className="truncate pr-2">{idx + 1}. {ex.name}</span>
                              <button
                                onClick={() => setSelectedDemoExercise({ name: ex.name, muscle: ex.muscle, level: ex.level, equipment: ex.equipment })}
                                className="text-[9px] text-cyan-400 hover:underline shrink-0"
                              >
                                Demo
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pulsante Ripeti */}
                      <button
                        onClick={() => handleRepeatSavedWorkout(sw)}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-black text-xs uppercase italic tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg"
                      >
                        <Play size={14} fill="currentColor" />
                        <span>{t.repeatBtn}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* VIEW: PROFILE & GAMIFICATION */}
      {view === 'profile' && (
        <div className="min-h-screen flex flex-col pb-32">
          <div className="p-6 flex items-center justify-between border-b border-white/5 bg-zinc-900/20">
            <h1 className="text-xl font-black uppercase italic tracking-tight">{t.profileTitle}</h1>
            <div className="flex gap-2">
              <button onClick={toggleLanguage} className="py-1 px-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400 font-bold text-xs">
                {lang.toUpperCase()}
              </button>
            </div>
          </div>

          <div className="max-w-md mx-auto px-6 space-y-6 w-full mt-6">
            
            {/* User Main Card */}
            <div style={{ backgroundColor: COLORS.cardBg }} className="p-6 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-36 h-32 bg-purple-600/10 rounded-full blur-3xl"></div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-fuchsia-500 flex items-center justify-center text-3xl shadow-xl">
                  {profile.avatar}
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-tight">{profile.username}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[9px] font-black text-cyan-400 uppercase tracking-wider">{t.level} {profile.level}</span>
                    <span className="flex items-center gap-1 text-xs text-orange-500 font-bold">
                      <Flame size={14} className="animate-pulse" /> {profile.streak} {lang === 'it' ? 'Giorni' : 'Days'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Livello */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-zinc-400">
                  <span>{t.xpPoints} {profile.xp} / {profile.level * 200} XP</span>
                  <span className="text-white">{Math.round((profile.xp / (profile.level * 200)) * 100)}%</span>
                </div>
                <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"
                    style={{ width: `${Math.min((profile.xp / (profile.level * 200)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Sfida Mensile */}
            <div style={{ backgroundColor: COLORS.cardBg }} className="p-5 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-fuchsia-500 flex items-center gap-2">
                  <TrendingUp size={16} /> {MONTHLY_CHALLENGES.title}
                </h3>
                <span className="text-[9px] bg-fuchsia-500/10 px-2 py-0.5 rounded-full text-fuchsia-400 font-black">2026</span>
              </div>
              <p className="text-xs font-black mb-3">{MONTHLY_CHALLENGES.description}</p>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-zinc-500 font-bold">
                  <span>{lang === 'it' ? 'Progressi' : 'Progress'}</span>
                  <span className="text-white font-black">{Math.min(profile.xp, MONTHLY_CHALLENGES.targetXP)} / {MONTHLY_CHALLENGES.targetXP} XP</span>
                </div>
                <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-fuchsia-500 rounded-full"
                    style={{ width: `${Math.min((profile.xp / MONTHLY_CHALLENGES.targetXP) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Missioni Attive */}
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase italic tracking-wider text-purple-400 flex items-center gap-2">
                <Activity size={18} /> {t.activeMissions}
              </h3>
              <div className="space-y-2">
                {MISSIONS_LIST.map(m => {
                  const isCompleted = profile.completedMissions.includes(m.id);
                  return (
                    <div key={m.id} style={{ backgroundColor: COLORS.cardBg }} className="p-3.5 rounded-2xl border border-white/5 flex items-center justify-between">
                      <div className="flex-1 pr-3">
                        <h4 className="text-xs font-black uppercase italic flex items-center gap-2">
                          {m.title} {isCompleted && <span className="text-green-500 text-[10px]">✔</span>}
                        </h4>
                        <p className="text-[10px] text-zinc-500 font-medium mt-0.5">{m.description}</p>
                      </div>
                      <span className="text-xs font-black text-cyan-400 shrink-0">+{m.xp} XP</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Badge & Trofei */}
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase italic tracking-wider text-fuchsia-500 flex items-center gap-2">
                <Award size={18} /> {t.unlockedTrophies}
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {BADGES_LIST.map(b => {
                  const isUnlocked = profile.unlockedBadges.includes(b.id);
                  return (
                    <div 
                      key={b.id} 
                      style={{ 
                        backgroundColor: COLORS.cardBg, 
                        borderColor: isUnlocked ? COLORS.fuchsia : COLORS.border,
                        opacity: isUnlocked ? 1 : 0.4 
                      }} 
                      className="p-3.5 rounded-2xl border-2 flex flex-col items-center text-center gap-1.5 transition-all relative overflow-hidden"
                    >
                      {!isUnlocked && <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>}
                      <span className="text-3xl">{b.icon}</span>
                      <h4 className="text-[11px] font-black uppercase italic tracking-wide">{b.name}</h4>
                      <p className="text-[8px] text-zinc-500 font-bold leading-tight">{b.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Skin dei Dadi */}
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase italic tracking-wider text-cyan-400 flex items-center gap-2">
                <Layers size={18} /> {t.unlockableSkins}
              </h3>
              <div className="space-y-2">
                {DICE_SKINS.map(skin => {
                  const isSelected = profile.selectedDiceSkin === skin.id;
                  return (
                    <button
                      key={skin.id}
                      onClick={() => selectSkin(skin.id)}
                      style={{ backgroundColor: COLORS.cardBg }}
                      className={`w-full p-3.5 rounded-2xl border-2 flex items-center justify-between active:scale-98 transition-all cursor-pointer ${isSelected ? 'border-cyan-400' : 'border-zinc-800'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg" style={{ background: skin.color }}></div>
                        <span className="font-black text-xs uppercase italic">{skin.name}</span>
                      </div>
                      {isSelected ? (
                        <span className="text-[10px] font-black text-cyan-400">ATTIVA</span>
                      ) : (
                        <span className="text-[10px] font-bold text-zinc-500">SELEZIONA</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Impostazioni & Integrazioni */}
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase italic tracking-wider text-zinc-400 flex items-center gap-2">
                <Settings size={18} /> {t.syncSettings}
              </h3>
              <div style={{ backgroundColor: COLORS.cardBg }} className="p-4 rounded-3xl border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Heart size={18} className="text-red-500" />
                    <div>
                      <span className="block text-xs font-black uppercase italic">Apple Health / Google Fit</span>
                      <span className="text-[9px] text-zinc-500 font-medium block">{lang === 'it' ? 'Integrazione Calorie & Attività' : 'Activity & Calorie Sync'}</span>
                    </div>
                  </div>
                  <button 
                    onClick={toggleHealthSync} 
                    className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${profile.healthSync ? 'bg-green-500' : 'bg-zinc-800'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${profile.healthSync ? 'right-0.5' : 'left-0.5'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2.5">
                    <Bell size={18} className="text-fuchsia-500" />
                    <div>
                      <span className="block text-xs font-black uppercase italic">{lang === 'it' ? 'Notifiche Quotidiane' : 'Daily Reminders'}</span>
                      <span className="text-[9px] text-zinc-500 font-medium block">{lang === 'it' ? 'Mantieni la tua streak' : 'Keep your streak'}</span>
                    </div>
                  </div>
                  <button 
                    onClick={togglePushNotifications} 
                    className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${profile.pushEnabled ? 'bg-green-500' : 'bg-zinc-800'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${profile.pushEnabled ? 'right-0.5' : 'left-0.5'}`}></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Storico Sessioni */}
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase italic tracking-wider text-white">
                {t.workoutHistory}
              </h3>
              <div className="space-y-2">
                {profile.history.map(item => (
                  <div key={item.id} style={{ backgroundColor: COLORS.cardBg }} className="p-4 rounded-2xl border border-white/5 flex justify-between items-center shadow-lg">
                    <div className="text-left">
                      <span className="block text-[10px] font-bold text-zinc-500">{item.date}</span>
                      <span className="block text-sm font-black uppercase italic text-white mt-0.5">Workout {item.duration}' Min</span>
                      <div className="flex items-center gap-2 mt-0.5 text-[9px] font-bold text-zinc-400">
                        <span>L{item.intensity}</span>
                        <span>•</span>
                        <span>{item.equipment}</span>
                      </div>
                    </div>
                    <span className="font-black text-green-400 text-xs">+{item.xpEarned} XP</span>
                  </div>
                ))}
                {profile.history.length === 0 && (
                  <p className="text-center text-zinc-500 py-6 italic text-xs">{t.noHistory}</p>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Navigatore Fisso */}
      <Navigation />

      {/* Modale Dimostrazione Tecnica Esercizio & Tutorial YouTube */}
      {selectedDemoExercise && (
        <DemonstrationModal
          isOpen={!!selectedDemoExercise}
          onClose={() => setSelectedDemoExercise(null)}
          exerciseName={selectedDemoExercise.name}
          muscle={selectedDemoExercise.muscle}
          level={selectedDemoExercise.level}
          equipment={selectedDemoExercise.equipment}
          lang={lang}
          directYoutubeUrl={selectedDemoExercise.directYoutubeUrl}
          propsUsage={selectedDemoExercise.propsUsage}
        />
      )}

      {/* Modale Tutorial Iniziale */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => {
          setIsTutorialOpen(false);
          localStorage.setItem('aleamoves_tutorial_seen', 'true');
        }}
        lang={lang}
      />

      {/* Modale Avviso di Sicurezza & Salute */}
      <SafetyModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
        lang={lang}
      />
    </div>
  );
}

const MUSGROUPS_LENGTH = 7;
