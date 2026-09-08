export type Language = 'it' | 'en';

export interface TranslationDict {
  appName: string;
  tagline: string;
  streak: string;
  level: string;
  xpPoints: string;
  
  // Goals
  goalsTitle: string;
  goalsSubtitle: string;
  goals: {
    fat_loss: { title: string; desc: string };
    toning: { title: string; desc: string };
    strength: { title: string; desc: string };
    mobility: { title: string; desc: string };
    wellness: { title: string; desc: string };
  };

  // Steps
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  summaryTitle: string;

  // Levels
  intensityTitle: string;
  level1: string;
  level2: string;
  level3: string;

  // Duration & Count
  durationTitle: string;
  exerciseCountTitle: string;
  countStandard: string;
  countCustom: string;
  customHelper: string;
  min: string;
  max: string;

  // Equipment
  equipmentTitle: string;
  equipmentSubtitle: string;
  onlyBodyweightBtn: string;
  onlyBodyweightTag: string;
  toolsCountTag: string;
  bodyweightNote: string;
  pullUpBarNote: string;
  randomTools: string;
  maxToolsWarning: string;

  // Muscle Groups
  muscleFocusTitle: string;
  fullBodyBtnTitle: string;
  fullBodyBtnDesc: string;
  fullBodyActive: string;
  fullBodyInactive: string;
  selectSpecificMuscles: string;
  allMusclesActive: string;
  customMuscles: string;

  // Summary Card
  summaryGoal: string;
  summaryLevel: string;
  summaryMuscles: string;
  summaryGear: string;
  summaryDuration: string;
  summaryExercises: string;
  summaryActionHint: string;

  // Roll button
  rollDiceBtn: string;
  rollingTitle: string;
  rollingSubtitle: string;

  // Workout Preview
  generatedResult: string;
  timerRoll: string;
  gearRoll: string;
  totalRounds: string;
  totalExercises: string;
  yourCircuit: string;
  watchDemo: string;
  saveWorkoutBtn: string;
  savedToast: string;
  alreadySavedToast: string;
  startWorkoutBtn: string;
  regenerateBtn: string;

  // Warmup & Cooldown
  warmupSection: string;
  cooldownSection: string;
  warmupDesc: string;
  cooldownDesc: string;
  durationLabel: string;
  instructionsLabel: string;

  // Demo Modal
  demoModalTitle: string;
  muscleLabel: string;
  difficultyLabel: string;
  equipmentLabel: string;
  techniqueTips: string;
  commonMistakes: string;
  propsAdvice: string;
  openYoutubeBtn: string;
  searchYoutubeBtn: string;
  closeBtn: string;

  // Timer
  roundLabel: string;
  preparePhase: string;
  workPhase: string;
  restPhase: string;
  nextExercise: string;
  endOfRound: string;
  skipBtn: string;
  pauseBtn: string;
  resumeBtn: string;
  exitTimer: string;

  // Finish
  greatJob: string;
  workoutCompleted: string;
  timeSpent: string;
  xpEarned: string;
  healthSyncStatus: string;
  seeProfileBtn: string;

  // Library & Saved
  libraryTitle: string;
  tabExercises: string;
  tabSavedWorkouts: string;
  filterAll: string;
  filterFitness: string;
  filterStretching: string;
  searchPlaceholder: string;
  noExercisesFound: string;
  noSavedFound: string;
  noSavedSub: string;
  repeatBtn: string;
  removeBtn: string;
  savedOn: string;

  // Profile
  profileTitle: string;
  monthlyChallenge: string;
  activeMissions: string;
  unlockedTrophies: string;
  unlockableSkins: string;
  syncSettings: string;
  workoutHistory: string;
  noHistory: string;

  // Tutorial
  tutorialTitle: string;
  tutorialSubtitle: string;
  tutorialStep1Title: string;
  tutorialStep1Desc: string;
  tutorialStep2Title: string;
  tutorialStep2Desc: string;
  tutorialStep3Title: string;
  tutorialStep3Desc: string;
  tutorialStep4Title: string;
  tutorialStep4Desc: string;
  tutorialStartBtn: string;
  tutorialReopen: string;

  // Safety
  safetyBanner: string;
  safetyModalTitle: string;
  safetyModalContent: string;
  safetyGotIt: string;

  // Footer & Identity
  brandFooter: string;
  officialChannels: string;
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  it: {
    appName: "ALEAMOVES",
    tagline: "Workout Dice Engine • Movimento Intelligente",
    streak: "Streak",
    level: "Livello",
    xpPoints: "Punti XP",

    goalsTitle: "1. Scegli il tuo obiettivo",
    goalsSubtitle: "Personalizza il focus e l'approccio dell'allenamento",
    goals: {
      fat_loss: {
        title: "Dimagrimento & Condizionamento",
        desc: "Alta intensità cardio, consumo calorico e resistenza metabolica"
      },
      toning: {
        title: "Tonificazione & Definizione",
        desc: "Definizione muscolare, ritmo sostenuto e controllo posturale"
      },
      strength: {
        title: "Forza & Ipertrofia",
        desc: "Potenza muscolare, tensione continua e sovraccarichi controllati"
      },
      mobility: {
        title: "Allungamento, Mobilità & Stretching Olistico",
        desc: "Flessibilità articolare, decompressione, posture yoga ed allungamento olistico profondo"
      },
      wellness: {
        title: "Energia & Benessere",
        desc: "Movimento quotidiano, vitalità e attivazione totale"
      }
    },

    step1: "1. Obiettivo",
    step2: "2. Intensità & Livello",
    step3: "3. Focus Muscolare",
    step4: "4. Attrezzatura",
    step5: "5. Durata & Numero Esercizi",
    summaryTitle: "6. Riepilogo Scelte",

    intensityTitle: "2. Intensità & Livello di Difficoltà",
    level1: "Base (Principiante)",
    level2: "Pro (Intermedio)",
    level3: "Elite (Avanzato)",

    durationTitle: "Durata Totale dell'Allenamento",
    exerciseCountTitle: "Numero di Esercizi nel Circuito",
    countStandard: "Standard (6 Esercizi)",
    countCustom: "Personalizzato",
    customHelper: "Seleziona quanti esercizi comporranno ogni giro del circuito (3 - 10):",
    min: "Min 3",
    max: "Max 10",

    equipmentTitle: "4. Attrezzatura Disponibile",
    equipmentSubtitle: "Seleziona 'Corpo libero (nessun attrezzo)' da solo, oppure combina fino a 3 attrezzi:",
    onlyBodyweightBtn: "Solo Corpo Libero",
    onlyBodyweightTag: "🤸‍♂️ 100% CORPO LIBERO",
    toolsCountTag: "ATTREZZI",
    bodyweightNote: "Corpo libero (nessun attrezzo) genera esclusivamente movimenti a terra senza carichi.",
    pullUpBarNote: "Per abilitare trazioni e calisthenics alla sbarra, seleziona 'Corpo libero (nessun attrezzo)' + 'Sbarra Trazioni'.",
    randomTools: "Attrezzatura Casuale (Dadi)",
    maxToolsWarning: "Massimo 3 attrezzi contemporaneamente!",

    muscleFocusTitle: "3. Focus Muscolare",
    fullBodyBtnTitle: "FULL BODY (TUTTO IL CORPO)",
    fullBodyBtnDesc: "Attiva tutti i 7 distretti muscolari con 1 click",
    fullBodyActive: "ATTIVO ✓",
    fullBodyInactive: "ALLENA TUTTO",
    selectSpecificMuscles: "Oppure seleziona distretti muscolari mirati:",
    allMusclesActive: "🔥 FULL BODY ATTIVO",
    customMuscles: "DISTRETTI SELEZIONATI",

    summaryGoal: "Obiettivo",
    summaryLevel: "Intensità",
    summaryMuscles: "Distretti",
    summaryGear: "Attrezzatura",
    summaryDuration: "Durata",
    summaryExercises: "N° Esercizi",
    summaryActionHint: "Pronto? Clicca il pulsante sotto per lanciare i dadi e creare il tuo circuito!",

    rollDiceBtn: "LANCIA I DADI",
    rollingTitle: "Lancio dei Dadi in corso...",
    rollingSubtitle: "Generazione del circuito personalizzato con riscaldamento & stretching",

    generatedResult: "Risultato Generato",
    timerRoll: "Tempo Lavoro / Pausa",
    gearRoll: "Attrezzatura Assegnata",
    totalRounds: "Round Totali",
    totalExercises: "Esercizi nel Circuito",
    yourCircuit: "Il Tuo Circuito",
    watchDemo: "Guarda dimostrazione",
    saveWorkoutBtn: "Salva Allenamento",
    savedToast: "⭐ Allenamento salvato con successo ne 'I miei allenamenti'!",
    alreadySavedToast: "ℹ️ Questo allenamento è già presente nei tuoi preferiti!",
    startWorkoutBtn: "Inizia Workout!",
    regenerateBtn: "Rigenera con i Dadi",

    warmupSection: "Riscaldamento Dinamico Guidato (Pre-Workout)",
    cooldownSection: "Defaticamento & Stretching Guidato (Post-Workout)",
    warmupDesc: "Prepara muscoli, articolazioni e sistema cardiovascolare.",
    cooldownDesc: "Favorisce il recupero muscolare, decomprime la colonna e normalizza il battito.",
    durationLabel: "Durata consigliata",
    instructionsLabel: "Esecuzione",

    demoModalTitle: "Dimostrazione & Tecnica Esercizio",
    muscleLabel: "Distretto Muscolare",
    difficultyLabel: "Livello",
    equipmentLabel: "Attrezzatura",
    techniqueTips: "Punti Chiave d'Esecuzione",
    commonMistakes: "Errori Comuni da Evitare",
    propsAdvice: "Consigli Props & Flessibilità (Blocchi/Elastici)",
    openYoutubeBtn: "Guarda Video Tutorial su YouTube",
    searchYoutubeBtn: "Cerca Tutorial su YouTube",
    closeBtn: "Chiudi",

    roundLabel: "ROUND",
    preparePhase: "Preparati",
    workPhase: "Lavoro",
    restPhase: "Riposo",
    nextExercise: "Prossimo esercizio",
    endOfRound: "Fine del Round",
    skipBtn: "Salta",
    pauseBtn: "Pausa",
    resumeBtn: "Riprendi",
    exitTimer: "Pausa & Riepilogo",

    greatJob: "Grandioso!",
    workoutCompleted: "Allenamento Completato con Successo",
    timeSpent: "Tempo Totale",
    xpEarned: "XP Guadagnati",
    healthSyncStatus: "Sincronizzato con Apple Health / Google Fit",
    seeProfileBtn: "Vedi Profilo & Progressi",

    libraryTitle: "Libreria & I Miei Allenamenti",
    tabExercises: "Tutti gli Esercizi",
    tabSavedWorkouts: "I miei allenamenti",
    filterAll: "Tutti",
    filterFitness: "💪 Forza & Fitness",
    filterStretching: "🧘 Allungamento & Mobilità Olistica",
    searchPlaceholder: "Cerca esercizio per nome...",
    noExercisesFound: "Nessun esercizio corrisponde ai criteri di ricerca.",
    noSavedFound: "Nessun allenamento salvato nei preferiti.",
    noSavedSub: "Genera un circuito nella schermata principale e clicca 'Salva Allenamento' per ritrovarlo e ripeterlo quando vuoi!",
    repeatBtn: "Ripeti Workout",
    removeBtn: "Rimuovi",
    savedOn: "Salvato il",

    profileTitle: "Profilo & Gamification",
    monthlyChallenge: "Sfida Mensile",
    activeMissions: "Missioni Attive",
    unlockedTrophies: "Trofei Sbloccati",
    unlockableSkins: "Skin Dadi Personalizzabili",
    syncSettings: "Impostazioni Sincronizzazione",
    workoutHistory: "Storico Sessioni",
    noHistory: "Nessun allenamento completato finora.",

    tutorialTitle: "Come Funziona ALEAMOVES",
    tutorialSubtitle: "Guida rapida in 4 semplici passaggi",
    tutorialStep1Title: "1. Scegli Obiettivo & Parametri",
    tutorialStep1Desc: "Seleziona il tuo obiettivo (Dimagrimento, Tonificazione, Forza, Mobilità), l'intensità (L1-L3), i distretti muscolari e l'attrezzatura.",
    tutorialStep2Title: "2. Lancia i Dadi Digitali",
    tutorialStep2Desc: "Premi 'LANCIA I DADI' per generare all'istante un circuito su misura con tempi di lavoro/pausa, riscaldamento e defaticamento inclusi.",
    tutorialStep3Title: "3. Dimostrazioni & Timer Integrato",
    tutorialStep3Desc: "Consulta la tecnica di ogni movimento con 'Guarda dimostrazione' e segui i countdown vocali con le playlist musicali dedicate.",
    tutorialStep4Title: "4. Salva, Ripeti & Guadagna XP",
    tutorialStep4Desc: "Salva i tuoi circuiti preferiti per ripeterli in ogni momento, sblocca nuovi trofei e mantieni attiva la tua streak!",
    tutorialStartBtn: "Inizia ad Allenarti!",
    tutorialReopen: "Tutorial & Aiuto",

    safetyBanner: "Avviso di sicurezza: Interrompi immediatamente in caso di dolore o malessere e consulta un medico prima di iniziare.",
    safetyModalTitle: "Informazioni di Sicurezza & Salute",
    safetyModalContent: "ALEAMOVES è uno strumento digitale per la generazione e gestione di circuiti di allenamento funzionale. Le routine proposte non costituiscono diagnosi medica o prescrizione riabilitativa. Ascolta sempre il tuo corpo: interrompi l'attività in presenza di dolore acuto, vertigini, affanno eccessivo o segnali anomali, e rivolgiti a un medico o chinesiologo qualificato.",
    safetyGotIt: "Ho Capito",

    brandFooter: "ALEAMOVES • Creato con cura da DaniMoves",
    officialChannels: "Canali & Community Ufficiale DaniMoves"
  },
  en: {
    appName: "ALEAMOVES",
    tagline: "Workout Dice Engine • Intelligent Motion",
    streak: "Streak",
    level: "Level",
    xpPoints: "XP Points",

    goalsTitle: "1. Choose your goal",
    goalsSubtitle: "Customize training focus and metabolic approach",
    goals: {
      fat_loss: {
        title: "Fat Loss & Conditioning",
        desc: "High-intensity cardio, calorie burn and metabolic endurance"
      },
      toning: {
        title: "Toning & Definition",
        desc: "Muscle definition, sustained pace and posture control"
      },
      strength: {
        title: "Strength & Hypertrophy",
        desc: "Muscular power, mechanical tension and controlled resistance"
      },
      mobility: {
        title: "Stretching & Holistic Mobility",
        desc: "Muscle flexibility, yoga poses, spinal decompression and joint health"
      },
      wellness: {
        title: "Energy & Daily Wellness",
        desc: "Daily functional movement, vitality and overall activation"
      }
    },

    step1: "1. Goal",
    step2: "2. Intensity & Level",
    step3: "3. Muscle Focus",
    step4: "4. Equipment",
    step5: "5. Duration & Exercise Count",
    summaryTitle: "6. Choices Summary",

    intensityTitle: "2. Intensity & Difficulty Level",
    level1: "Base (Beginner)",
    level2: "Pro (Intermediate)",
    level3: "Elite (Advanced)",

    durationTitle: "Total Workout Duration",
    exerciseCountTitle: "Number of Circuit Exercises",
    countStandard: "Standard (6 Exercises)",
    countCustom: "Custom",
    customHelper: "Select how many exercises to include per round (3 - 10):",
    min: "Min 3",
    max: "Max 10",

    equipmentTitle: "4. Available Equipment",
    equipmentSubtitle: "Choose 'Bodyweight (No equipment)' alone, or combine up to 3 tools:",
    onlyBodyweightBtn: "Solo Bodyweight",
    onlyBodyweightTag: "🤸‍♂️ 100% BODYWEIGHT",
    toolsCountTag: "TOOLS",
    bodyweightNote: "Bodyweight (No equipment) generates strictly floor movements without weights.",
    pullUpBarNote: "To enable pull-ups and bar calisthenics, select 'Bodyweight (No equipment)' + 'Pull-Up Bar'.",
    randomTools: "Random Equipment (Dice)",
    maxToolsWarning: "Maximum 3 tools selected at once!",

    muscleFocusTitle: "3. Muscle Focus",
    fullBodyBtnTitle: "FULL BODY WORKOUT",
    fullBodyBtnDesc: "Activate all 7 muscle groups with 1 click",
    fullBodyActive: "ACTIVE ✓",
    fullBodyInactive: "TRAIN ALL",
    selectSpecificMuscles: "Or select targeted muscle groups:",
    allMusclesActive: "🔥 FULL BODY ACTIVE",
    customMuscles: "SELECTED GROUPS",

    summaryGoal: "Goal",
    summaryLevel: "Intensity",
    summaryMuscles: "Muscle Groups",
    summaryGear: "Equipment",
    summaryDuration: "Duration",
    summaryExercises: "N° Exercises",
    summaryActionHint: "Ready? Tap the button below to roll the dice and generate your circuit!",

    rollDiceBtn: "ROLL THE DICE",
    rollingTitle: "Rolling the Dice...",
    rollingSubtitle: "Generating custom circuit with warm-up & stretching included",

    generatedResult: "Generated Result",
    timerRoll: "Work / Rest Intervals",
    gearRoll: "Assigned Gear",
    totalRounds: "Total Rounds",
    totalExercises: "Circuit Exercises",
    yourCircuit: "Your Circuit",
    watchDemo: "Watch demonstration",
    saveWorkoutBtn: "Save Workout",
    savedToast: "⭐ Workout saved successfully to 'My Saved Workouts'!",
    alreadySavedToast: "ℹ️ This workout is already saved in your favorites!",
    startWorkoutBtn: "Start Workout!",
    regenerateBtn: "Re-roll with Dice",

    warmupSection: "Guided Dynamic Warm-Up (Pre-Workout)",
    cooldownSection: "Guided Cool-Down & Stretching (Post-Workout)",
    warmupDesc: "Prepares muscles, joints, and cardiovascular system for action.",
    cooldownDesc: "Promotes muscle recovery, decompresses the spine, and normalizes heart rate.",
    durationLabel: "Recommended duration",
    instructionsLabel: "Execution",

    demoModalTitle: "Exercise Demonstration & Technique",
    muscleLabel: "Target Muscle",
    difficultyLabel: "Level",
    equipmentLabel: "Equipment",
    techniqueTips: "Key Form & Cues",
    commonMistakes: "Common Mistakes to Avoid",
    propsAdvice: "Props & Flexibility Guidance (Blocks/Bands)",
    openYoutubeBtn: "Watch Video Tutorial on YouTube",
    searchYoutubeBtn: "Search on YouTube",
    closeBtn: "Close",

    roundLabel: "ROUND",
    preparePhase: "Get Ready",
    workPhase: "Work",
    restPhase: "Rest",
    nextExercise: "Next Exercise",
    endOfRound: "End of Round",
    skipBtn: "Skip",
    pauseBtn: "Pause",
    resumeBtn: "Resume",
    exitTimer: "Pause & Summary",

    greatJob: "Great Job!",
    workoutCompleted: "Workout Completed Successfully",
    timeSpent: "Total Time",
    xpEarned: "XP Earned",
    healthSyncStatus: "Synced with Apple Health / Google Fit",
    seeProfileBtn: "View Profile & Progress",

    libraryTitle: "Exercise Library & Saved Workouts",
    tabExercises: "All Exercises",
    tabSavedWorkouts: "My Saved Workouts",
    filterAll: "All",
    filterFitness: "💪 Strength & Fitness",
    filterStretching: "🧘 Stretching & Holistic Mobility",
    searchPlaceholder: "Search exercise by name...",
    noExercisesFound: "No exercises match your search query.",
    noSavedFound: "No saved workouts in favorites.",
    noSavedSub: "Generate a circuit on the main screen and tap 'Save Workout' to replay it anytime!",
    repeatBtn: "Repeat Workout",
    removeBtn: "Remove",
    savedOn: "Saved on",

    profileTitle: "Profile & Gamification",
    monthlyChallenge: "Monthly Challenge",
    activeMissions: "Active Missions",
    unlockedTrophies: "Unlocked Trophies",
    unlockableSkins: "Custom Dice Skins",
    syncSettings: "Sync Settings",
    workoutHistory: "Workout History",
    noHistory: "No completed workouts yet.",

    tutorialTitle: "How ALEAMOVES Works",
    tutorialSubtitle: "Quick 4-step walkthrough",
    tutorialStep1Title: "1. Choose Goal & Settings",
    tutorialStep1Desc: "Pick your goal (Fat Loss, Toning, Strength, Mobility), intensity level (L1-L3), muscle groups and gear.",
    tutorialStep2Title: "2. Roll the Digital Dice",
    tutorialStep2Desc: "Tap 'ROLL THE DICE' to generate an instant personalized circuit with work/rest intervals, warm-up and cool-down.",
    tutorialStep3Title: "3. Demos & Audio Timer",
    tutorialStep3Desc: "Check form tips using 'Watch demonstration' and follow audio countdowns with curated high-energy music playlists.",
    tutorialStep4Title: "4. Save, Repeat & Level Up",
    tutorialStep4Desc: "Save favorite circuits to replay anytime, unlock trophies, and keep your daily workout streak burning!",
    tutorialStartBtn: "Start Training!",
    tutorialReopen: "Tutorial & Help",

    safetyBanner: "Safety notice: Stop immediately if you experience pain or illness and consult a medical professional.",
    safetyModalTitle: "Health & Safety Notice",
    safetyModalContent: "ALEAMOVES is a digital tool for generating functional fitness workouts. Suggested routines do not constitute medical diagnosis or physical therapy. Always listen to your body: stop exercise if you experience acute pain, dizziness, severe shortness of breath, or unusual discomfort, and seek guidance from a physician or certified fitness specialist.",
    safetyGotIt: "Got It",

    brandFooter: "ALEAMOVES • Crafted with care by DaniMoves",
    officialChannels: "DaniMoves Official Channels & Community"
  }
};
