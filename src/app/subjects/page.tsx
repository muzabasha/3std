'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { ALL_LESSONS } from '@/lib/data';

const SUBJECTS = [
  { id: 'math', label: 'Mathematics', icon: '🔢', bg: 'linear-gradient(135deg, #667eea, #764ba2)', emoji: '📐' },
  { id: 'english', label: 'English', icon: '📚', bg: 'linear-gradient(135deg, #f093fb, #f5576c)', emoji: '✏️' },
  { id: 'hindi', label: 'हिंदी', icon: '🕉️', bg: 'linear-gradient(135deg, #FF8C42, #FF4757)', emoji: '🔤' },
  { id: 'kannada', label: 'ಕನ್ನಡ', icon: '🌺', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)', emoji: '🌿' },
  { id: 'evs', label: 'EVS', icon: '🌿', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', emoji: '🔬' },
  { id: 'gk', label: 'General Knowledge', icon: '🌏', bg: 'linear-gradient(135deg, #fa709a, #fee140)', emoji: '🌍' },
];

export default function SubjectsPage() {
  const { t, student } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'math', 'english', 'hindi', 'kannada', 'evs', 'gk'];
  const filteredLessons = activeFilter === 'all' ? ALL_LESSONS : ALL_LESSONS.filter(l => l.subject === activeFilter);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0F8FF, #E8F4FD)', padding: '32px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: '4rem', marginBottom: 16, animation: 'float 2s ease-in-out infinite' }}>📚</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#333', marginBottom: 8 }}>All Subjects</h1>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>Choose a subject and start your learning adventure!</p>
        </div>

        {/* Subject Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, marginBottom: 48 }}>
          {SUBJECTS.map((sub, i) => {
            const subLessons = ALL_LESSONS.filter(l => l.subject === sub.id);
            const subCompleted = subLessons.filter(l => student.completedLessons.includes(l.id)).length;
            return (
              <a key={sub.id} href={`/subjects/${sub.id}`} style={{ textDecoration: 'none' }}>
                <div className="fun-card" style={{ overflow: 'hidden', animation: `bounce-in 0.4s ease-out ${i * 0.1}s both` }}>
                  <div style={{ background: sub.bg, padding: '32px 24px', display: 'flex', gap: 20, alignItems: 'center' }}>
                    <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))', animation: 'float 2s ease-in-out infinite' }}>
                      {sub.icon}
                    </div>
                    <div style={{ color: 'white' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: 4 }}>{sub.label}</h3>
                      <div style={{ opacity: 0.9, fontSize: '0.95rem' }}>{subLessons.length} lessons available</div>
                      <div style={{ marginTop: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 50, padding: '4px 12px', display: 'inline-block', fontSize: '0.85rem', fontWeight: 700 }}>
                        {subCompleted}/{subLessons.length} completed
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.9rem', color: '#888' }}>Click to explore →</div>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', background: sub.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                    }}>{sub.emoji}</div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* All Lessons */}
        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#333', marginBottom: 20 }}>All Lessons</h2>
        
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 20px', borderRadius: 50, border: '2px solid',
                borderColor: activeFilter === f ? '#4F9CF9' : '#E2E8F0',
                background: activeFilter === f ? '#4F9CF9' : 'white',
                color: activeFilter === f ? 'white' : '#666',
                fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
                transition: 'all 0.2s ease',
              }}>
              {f === 'all' ? '⚡ All' : SUBJECTS.find(s => s.id === f)?.icon + ' ' + SUBJECTS.find(s => s.id === f)?.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filteredLessons.map((lesson, i) => {
            const isCompleted = student.completedLessons.includes(lesson.id);
            return (
              <a key={lesson.id} href={`/subjects/${lesson.subject}/${lesson.id}`} style={{ textDecoration: 'none' }}>
                <div className="fun-card" style={{
                  padding: 20,
                  animation: `bounce-in 0.3s ease-out ${i * 0.05}s both`,
                  opacity: 1,
                }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: lesson.color + '22', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0,
                    }}>{lesson.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontWeight: 800, color: '#333', fontSize: '1rem', marginBottom: 4 }}>{lesson.title}</h4>
                        {isCompleted && <span style={{ fontSize: '1.2rem' }}>✅</span>}
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <span className="badge" style={{ background: lesson.color + '22', color: lesson.color, fontSize: '0.75rem' }}>
                          {lesson.difficulty}
                        </span>
                        <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>+{lesson.xpReward} XP</span>
                        <span className="badge" style={{ background: '#F8F9FA', color: '#666', fontSize: '0.75rem' }}>
                          {lesson.quiz.length} Q
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
