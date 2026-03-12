export type Language = 'english' | 'hindi' | 'kannada';
export type Subject = 'math' | 'english' | 'hindi' | 'kannada' | 'evs' | 'gk';
export type DashboardView = 'student' | 'teacher' | 'parent';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  emoji?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subject: Subject;
  icon: string;
  color: string;
  story: string;
  storyCharacter: string;
  concept: string;
  activityType: 'drag-drop' | 'puzzle' | 'simulation' | 'match' | 'tracing';
  quiz: QuizQuestion[];
  realLifeApplication: string;
  xpReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  subject?: Subject;
  condition: string;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  stars: number;
  coins: number;
  badges: string[];
  completedLessons: string[];
  streakDays: number;
  language: Language;
}

export interface DragItem {
  id: string;
  content: string;
  emoji?: string;
  category?: string;
}

export interface DropZone {
  id: string;
  label: string;
  accepts?: string;
  filled?: DragItem;
}

export interface GameState {
  score: number;
  lives: number;
  level: number;
  isComplete: boolean;
  timeLeft?: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  color: string;
  bgColor: string;
}
