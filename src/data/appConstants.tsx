import React from 'react';
import { ProfileData } from '../types';

// --- CONFIGURAZIONE COLORI NEON ---
export const COLORS = {
  bg: '#050505',
  cardBg: '#0F0F12',
  border: '#1E1E24',
  lightBlue: '#00F0FF',    
  purple: '#A855F7',       
  fuchsia: '#FF00FF',      
  violetPink: '#E879F9',   
  white: '#FFFFFF',
  textSecondary: '#94A3B8',
  green: '#10B981',
  orange: '#F97316'
};

export const KettlebellIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path
      d="M8.5 7.5V5.5C8.5 3.84315 9.84315 2.5 11.5 2.5H12.5C14.1569 2.5 15.5 3.84315 15.5 5.5V7.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M12 7.5C7.30558 7.5 3.5 11.3056 3.5 16C3.5 19.3137 6.18629 22 9.5 22H14.5C17.8137 22 20.5 19.3137 20.5 16C20.5 11.3056 16.6944 7.5 12 7.5Z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="14.5" r="1.5" fill="currentColor" />
  </svg>
);

export const BenchIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path
      d="M3 12H21"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M5 12V20M19 12V20"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M3 20H7M17 20H21"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M9 12L15 20"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

export const SbarraIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path
      d="M2 6.5H22"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M2 6.5L4 9M22 6.5L20 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M6 6.5V17M18 6.5V17"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M4 17H8M16 17H20"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M6 13.5L10.5 6.5M18 13.5L13.5 6.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M10 6.5V9.5M14 6.5V9.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.85"
    />
  </svg>
);

export const EQUIPMENT_ITEMS = [
  { id: 'Bodyweight', label: 'Corpo libero (nessun attrezzo)', labelEn: 'Bodyweight (No equipment)', icon: '🤸‍♂️', tag: 'No Attrezzi', description: 'Calisthenics a terra • Nessun carico' },
  { id: 'Sbarra', label: 'Sbarra Trazioni', labelEn: 'Pull-Up Bar', icon: <SbarraIcon className="text-emerald-400" size={26} />, tag: 'Pull-Up Bar', description: 'Trazioni, Muscle-Up & Core' },
  { id: 'Manubri', label: 'Manubri', labelEn: 'Dumbbells', icon: '🏋️‍♂️', tag: 'Dumbbells', description: 'Coppia manubri' },
  { id: 'Kettlebell', label: 'Kettlebell', labelEn: 'Kettlebell', icon: <KettlebellIcon className="text-purple-400" size={26} />, tag: 'Kettlebell', description: 'Giri, Swing & Press' },
  { id: 'Bilanciere', label: 'Bilanciere', labelEn: 'Barbell', icon: '🏋️', tag: 'Barbell', description: 'Sollevamenti olimpici & base' },
  { id: 'TRX', label: 'TRX Suspended', labelEn: 'TRX Suspension', icon: '🎗️', tag: 'Sospensione', description: 'Cinghie calisthenics' },
  { id: 'Elastico Tubolare', label: 'Elastico Tubolare', labelEn: 'Resistance Tube', icon: '〰️', tag: 'Tubolare', description: 'Bande con maniglie' },
  { id: 'Elastico Circolare', label: 'Elastico Loop Band', labelEn: 'Loop Band', icon: '⭕', tag: 'Loop Band', description: 'Fasce ad anello' },
  { id: 'Panca', label: 'Panca Fitness', labelEn: 'Workout Bench', icon: <BenchIcon className="text-cyan-400" size={26} />, tag: 'Panca', description: 'Piana, Inclinata & Dips' },
  { id: 'Plyo Box', label: 'Plyo Box', labelEn: 'Plyo Box', icon: '📦', tag: 'Box Jump', description: 'Salti, Step Up & Elevazioni' },
  { id: 'Corda per saltare', label: 'Corda per Saltare', labelEn: 'Jump Rope', icon: '🪢', tag: 'Jump Rope', description: 'Salto della corda & Double Unders' },
  { id: 'Blocchi Yoga', label: 'Blocchi Yoga & Props', labelEn: 'Yoga Blocks & Props', icon: '🧱', tag: 'Props & Yoga', description: 'Mattoncini yoga & supporti per allungamento assistito' }
];

export const MUSCLE_GROUPS = [
  { id: 'lower', label: 'Lower Body', labelIt: 'Gambe & Glutei', icon: '🦵' },
  { id: 'chest', label: 'Petto', labelIt: 'Petto', icon: '👕' },
  { id: 'back', label: 'Dorso', labelIt: 'Dorso', icon: '👐' },
  { id: 'shoulders', label: 'Spalle', labelIt: 'Spalle', icon: '💪' },
  { id: 'biceps', label: 'Bicipiti', labelIt: 'Bicipiti', icon: '🦾' },
  { id: 'triceps', label: 'Tricipiti', labelIt: 'Tricipiti', icon: '⚡' },
  { id: 'abs', label: 'Addome & Core', labelIt: 'Addome & Core', icon: '🧱' }
];

export const TIMER_OPTIONS = [
  { work: 20, rest: 10, label: '20" / 10"' },
  { work: 30, rest: 15, label: '30" / 15"' },
  { work: 40, rest: 20, label: '40" / 20"' },
  { work: 45, rest: 15, label: '45" / 15"' },
  { work: 50, rest: 10, label: '50" / 10"' }
];

export const INITIAL_PROFILE: ProfileData = {
  username: "DaniMover_Elite",
  avatar: "🔥",
  level: 2,
  xp: 150,
  streak: 3,
  healthSync: true,
  pushEnabled: false,
  selectedDiceSkin: 'classic_neon',
  history: [
    {
      id: 'mock-1',
      date: '2026-06-19',
      duration: 20,
      intensity: 2,
      equipment: 'Kettlebell',
      exercisesCount: 6,
      xpEarned: 120
    }
  ],
  unlockedBadges: ['first_roll', 'streak_3'],
  completedMissions: ['daily_1']
};

export const MISSIONS_LIST = [
  { id: 'daily_1', title: 'Lancio d\'Inizio', description: 'Genera ed esegui il tuo primo allenamento.', xp: 50 },
  { id: 'daily_2', title: 'Power Session 30', description: 'Completa un workout da almeno 30 minuti.', xp: 100 },
  { id: 'daily_3', title: 'Modalità Elite', description: 'Allena una sessione a intensità L3.', xp: 150 }
];

export const MONTHLY_CHALLENGES = {
  title: "Sfida Mensile",
  description: "Raggiungi 500 XP complessivi questo mese",
  targetXP: 500
};

export const DICE_SKINS = [
  { id: 'classic_neon', name: 'Cyber Neon (Standard)', color: 'linear-gradient(45deg, #A855F7, #FF00FF)' },
  { id: 'emerald_laser', name: 'Azzurro Laser', color: 'linear-gradient(45deg, #00F0FF, #00B2FF)' },
  { id: 'lava_glow', name: 'Lava Glow (Premium)', color: 'linear-gradient(45deg, #EF4444, #F97316)' }
];

export const BADGES_LIST = [
  { id: 'first_roll', name: 'Primo Lancio', icon: '🎲', desc: 'Hai completato il tuo primo workout ALEAMOVES' },
  { id: 'streak_3', name: 'Costanza Neon', icon: '🔥', desc: 'Raggiungi una streak di 3 giorni di allenamento' },
  { id: 'level_five', name: 'Atleta Elite', icon: '👑', desc: 'Raggiungi il livello 5' },
  { id: 'emom_master', name: 'EMOM Master', icon: '⏱️', desc: 'Completa una sessione EMOM da almeno 20 minuti' }
];
