'use client';
import React, { useState } from 'react';
import { QuizQuestion } from '@/lib/types';
import { useApp } from '@/lib/context';

interface QuizEngineProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
}

export default function QuizEngine({ questions, onComplete }: QuizEngineProps) {
  const { t, speak, addStars, addCoins } = useApp();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;
  const finalProgress = complete ? 100 : progress;

  const handleSelect = (optionIndex: number) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    setShowFeedback(true);
    const isCorrect = optionIndex === q.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
      speak(t('correctAnswer'));
      addCoins(5);
    } else {
      speak(t('wrongAnswer'));
    }
    setTimeout(handleNext, 2000);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setComplete(true);
      const finalScore = score + (selected === q.correctIndex ? 1 : 0);
      const stars = finalScore >= questions.length * 0.9 ? 3 : finalScore >= questions.length * 0.6 ? 2 : 1;
      addStars(stars);
      onComplete(finalScore, questions.length);
    } else {
      setCurrent(prev => prev + 1);
      setSelected(null);
      setAnswered(false);
      setShowFeedback(false);
    }
  };

  if (complete) {
    const pct = Math.round((score / questions.length) * 100);
    const stars = score >= questions.length * 0.9 ? 3 : score >= questions.length * 0.6 ? 2 : 1;
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '5rem', marginBottom: 16, animation: 'bounce-in 0.5s ease-out' }}>
          {pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : '💪'}
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#333', marginBottom: 8 }}>{t('quizComplete')}</h2>
        <div style={{ fontSize: '1.1rem', color: '#666', marginBottom: 24 }}>{t('yourScore')}: {score}/{questions.length}</div>
        
        <div style={{
          display: 'inline-block', padding: '24px 48px',
          background: 'linear-gradient(135deg, #4F9CF9, #667eea)',
          borderRadius: 24, marginBottom: 24, color: 'white',
        }}>
          <div style={{ fontSize: '4rem', fontWeight: 900 }}>{pct}%</div>
          <div style={{ fontSize: '1rem', opacity: 0.9 }}>Accuracy</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
          {[1, 2, 3].map(i => (
            <span key={i} style={{
              fontSize: '2.5rem',
              filter: i <= stars ? 'none' : 'grayscale(1)',
              animation: i <= stars ? 'sparkle 1s ease-in-out infinite' : 'none',
            }}>⭐</span>
          ))}
        </div>

        <div style={{
          padding: '16px 24px', background: '#F0FFF4', borderRadius: 16,
          border: '2px solid #6BCB77', marginBottom: 20, display: 'inline-block',
        }}>
          <span style={{ color: '#276837', fontWeight: 700 }}>
            🌟 Earned {stars} stars • 🪙 +{score * 5} coins!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Progress */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontWeight: 700, color: '#666' }}>
          <span>Question {current + 1} of {questions.length}</span>
          <span>Score: {score} ✅</span>
        </div>
        <div className="progress-bar-outer">
          <div className="progress-bar-inner" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question card */}
      <div className="fun-card" style={{ padding: 28, marginBottom: 20, background: 'linear-gradient(135deg, #E8F4FD, #EBF8FF)' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 12, textAlign: 'center' }}>{q.emoji || '🤔'}</div>
        <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#333', textAlign: 'center', lineHeight: 1.4 }}>
          {q.question}
        </p>
        <button onClick={() => speak(q.question)}
          style={{
            display: 'block', margin: '12px auto 0',
            padding: '6px 16px', borderRadius: 50, border: '2px solid #4F9CF9',
            background: 'transparent', color: '#4F9CF9', fontWeight: 700,
            cursor: 'pointer', fontSize: '0.85rem',
          }}>
          🔊 Hear Question
        </button>
      </div>

      {/* Options */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {q.options.map((option, i) => {
          let className = 'quiz-option';
          if (answered) {
            if (i === q.correctIndex) className += ' correct';
            else if (i === selected) className += ' wrong';
          }
          const letters = ['A', 'B', 'C', 'D'];
          return (
            <button key={i} className={className} onClick={() => handleSelect(i)}
              style={{ cursor: answered ? 'default' : 'pointer', width: '100%' }}>
              <span style={{
                width: 32, height: 32, borderRadius: '50%', background: '#4F9CF9',
                color: 'white', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: '0.9rem',
              }}>{letters[i]}</span>
              <span style={{ fontWeight: 700, fontSize: '1rem' }}>{option}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div style={{
          marginTop: 16, padding: 16, borderRadius: 16,
          background: selected === q.correctIndex ? '#E8F8EA' : '#FFEAEA',
          border: `2px solid ${selected === q.correctIndex ? '#6BCB77' : '#FF4757'}`,
          animation: 'bounce-in 0.3s ease-out',
        }}>
          <p style={{ fontWeight: 700, fontSize: '1rem', color: selected === q.correctIndex ? '#276837' : '#c0392b' }}>
            {selected === q.correctIndex ? '✅ ' + t('correctAnswer') : '❌ ' + t('wrongAnswer')}
          </p>
          <p style={{ fontSize: '0.9rem', color: '#555', marginTop: 4 }}>{q.explanation}</p>
        </div>
      )}
    </div>
  );
}
