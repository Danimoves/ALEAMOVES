export type GoalType = 'fat_loss' | 'toning' | 'strength' | 'mobility' | 'wellness';

export interface ExerciseItem {
  name: string;
  muscle: string;
  level: number;
  groupId: string;
  category?: 'fitness' | 'stretching';
  equipment?: string;
  youtubeUrl?: string;
  propsUsage?: string;
}

export interface CircuitExercise {
  name: string;
  muscle: string;
  equipment: string;
  level: number;
  directYoutubeUrl?: string;
  propsUsage?: string;
}

export interface TimerConfig {
  work: number;
  rest: number;
  label: string;
}

export interface WorkoutData {
  timer: TimerConfig;
  equipment: string;
  equipments: string[];
  circuit: CircuitExercise[];
  totalRounds: number;
  goal?: GoalType;
}

export interface SavedWorkout {
  id: string;
  savedAt: string;
  goal: GoalType;
  totalTime: number;
  intensity: number;
  equipment: string;
  equipments: string[];
  timer: TimerConfig;
  circuit: CircuitExercise[];
  totalRounds: number;
}

export interface WorkoutLog {
  id: string;
  date: string;
  duration: number;
  intensity: number;
  equipment: string;
  exercisesCount: number;
  xpEarned: number;
}

export interface ProfileData {
  username: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  healthSync: boolean;
  pushEnabled: boolean;
  selectedDiceSkin: string;
  history: WorkoutLog[];
  unlockedBadges: string[];
  completedMissions: string[];
}
