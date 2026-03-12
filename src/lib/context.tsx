'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Student, DashboardView } from './types';
import { translations } from './translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  student: Student;
  updateStudent: (updates: Partial<Student>) => void;
  activeView: DashboardView;
  setActiveView: (view: DashboardView) => void;
  voiceEnabled: boolean;
  toggleVoice: () => void;
  speak: (text: string) => void;
  addXP: (amount: number) => void;
  addStars: (count: number) => void;
  addCoins: (count: number) => void;
  completeLesson: (lessonId: string) => void;
  celebrationVisible: boolean;
  showCelebration: () => void;
  currentSubject: string;
  setCurrentSubject: (s: string) => void;
}

const defaultStudent: Student = {
  id: 'student-1',
  name: 'Yasmeen',
  avatar: '🧒',
  xp: 150,
  level: 3,
  stars: 12,
  coins: 45,
  badges: ['math-explorer', 'word-builder'],
  completedLessons: [],
  streakDays: 5,
  language: 'english',
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('english');
  const [student, setStudent] = useState<Student>(defaultStudent);
  const [activeView, setActiveView] = useState<DashboardView>('student');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [celebrationVisible, setCelebrationVisible] = useState(false);
  const [currentSubject, setCurrentSubject] = useState('');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setStudent(prev => ({ ...prev, language: lang }));
  };

  const translate = (key: string): string => {
    return translations[language]?.[key] || translations.english[key] || key;
  };

  const speak = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined') return;
    try {
      const utter = new SpeechSynthesisUtterance(text);
      const langMap: Record<Language, string> = { english: 'en-IN', hindi: 'hi-IN', kannada: 'kn-IN' };
      utter.lang = langMap[language];
      utter.rate = 0.85;
      utter.pitch = 1.1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.log('Speech not available');
    }
  };

  const toggleVoice = () => setVoiceEnabled(prev => !prev);

  const addXP = (amount: number) => {
    setStudent(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const addStars = (count: number) => {
    setStudent(prev => ({ ...prev, stars: prev.stars + count }));
  };

  const addCoins = (count: number) => {
    setStudent(prev => ({ ...prev, coins: prev.coins + count }));
  };

  const updateStudent = (updates: Partial<Student>) => {
    setStudent(prev => ({ ...prev, ...updates }));
  };

  const completeLesson = (lessonId: string) => {
    setStudent(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return { ...prev, completedLessons: [...prev.completedLessons, lessonId] };
    });
    addXP(25);
    addCoins(10);
    showCelebration();
  };

  const showCelebration = () => {
    setCelebrationVisible(true);
    setTimeout(() => setCelebrationVisible(false), 3500);
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage, t: translate, student, updateStudent,
      activeView, setActiveView, voiceEnabled, toggleVoice, speak,
      addXP, addStars, addCoins, completeLesson,
      celebrationVisible, showCelebration, currentSubject, setCurrentSubject
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
