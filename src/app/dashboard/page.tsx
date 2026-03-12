'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { ALL_LESSONS } from '@/lib/data';

const CLASS_DATA = {
  students: [
    { name: 'Yasmeen', avatar: '👧', xp: 150, completed: 3, streak: 5 },
    { name: 'Priya', avatar: '👧', xp: 220, completed: 5, streak: 7 },
    { name: 'Ravi', avatar: '👦', xp: 80, completed: 2, streak: 2 },
    { name: 'Meena', avatar: '👩', xp: 310, completed: 7, streak: 10 },
    { name: 'Kiran', avatar: '🧑', xp: 190, completed: 4, streak: 6 },
  ],
  topicsStruggling: ['Multiplication', 'Hindi Vowels', 'Shapes'],
  topicsExcelling: ['Addition', 'EVS Plants', 'Solar System'],
};

const WEEKLY_PARENT_DATA = [
  { day: 'Mon', minutes: 25 },
  { day: 'Tue', minutes: 30 },
  { day: 'Wed', minutes: 15 },
  { day: 'Thu', minutes: 40 },
  { day: 'Fri', minutes: 35 },
  { day: 'Sat', minutes: 20 },
  { day: 'Sun', minutes: 10 },
];

export default function DashboardPage() {
  const { student, activeView, setActiveView, t } = useApp();
  const [selectedSubject, setSelectedSubject] = useState('all');

  const completedLessons = ALL_LESSONS.filter(l => student.completedLessons.includes(l.id));
  const inProgressLessons = ALL_LESSONS.filter(l => !student.completedLessons.includes(l.id)).slice(0, 3);
  const totalPct = Math.round((student.completedLessons.length / ALL_LESSONS.length) * 100);

  const subjectProgress = ['math', 'english', 'hindi', 'kannada', 'evs', 'gk'].map(sub => {
    const subLessons = ALL_LESSONS.filter(l => l.subject === sub);
    const done = subLessons.filter(l => student.completedLessons.includes(l.id)).length;
    return { subject: sub, total: subLessons.length, done, pct: Math.round((done / subLessons.length) * 100) };
  });

  const subjectLabels: Record<string, { label: string; icon: string; color: string }> = {
    math: { label: 'Mathematics', icon: '🔢', color: '#667eea' },
    english: { label: 'English', icon: '📚', color: '#f093fb' },
    hindi: { label: 'हिंदी', icon: '🕉️', color: '#FF8C42' },
    kannada: { label: 'ಕನ್ನಡ', icon: '🌺', color: '#43e97b' },
    evs: { label: 'EVS', icon: '🌿', color: '#4facfe' },
    gk: { label: 'GK', icon: '🌏', color: '#fa709a' },
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0F8FF, #E8F4FD)', padding: '32px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#333', marginBottom: 12 }}>📊 Dashboard</h1>
          {/* View Switcher */}
          <div style={{ display: 'inline-flex', gap: 4, background: '#E2E8F0', borderRadius: 50, padding: 4 }}>
            {(['student', 'teacher', 'parent'] as const).map(view => (
              <button key={view} onClick={() => setActiveView(view)}
                style={{
                  padding: '10px 24px', borderRadius: 50, border: 'none',
                  background: activeView === view ? 'white' : 'transparent',
                  color: activeView === view ? '#4F9CF9' : '#666',
                  fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease',
                  boxShadow: activeView === view ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                  fontSize: '0.95rem',
                }}>
                {view === 'student' ? `${student.avatar} ${t('student')}` : view === 'teacher' ? `👩‍🏫 ${t('teacher')}` : `👨‍👩‍👧 ${t('parent')}`}
              </button>
            ))}
          </div>
        </div>

        {/* STUDENT DASHBOARD */}
        {activeView === 'student' && (
          <div>
            {/* Welcome Card */}
            <div style={{
              background: 'linear-gradient(135deg, #4F9CF9, #9B59B6)',
              borderRadius: 24, padding: '28px 32px', marginBottom: 28,
              display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap',
              color: 'white',
            }}>
              <div style={{ fontSize: '4rem', animation: 'float 2s ease-in-out infinite' }}>{student.avatar}</div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: 4 }}>Hello, {student.name}! 👋</h2>
                <p style={{ opacity: 0.9, marginBottom: 12 }}>Level {student.level} Learner • {student.streakDays} Day Streak 🔥</p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[
                    { v: student.stars, icon: '⭐', label: 'Stars' },
                    { v: student.coins, icon: '🪙', label: 'Coins' },
                    { v: student.xp, icon: '⚡', label: 'XP' },
                    { v: student.completedLessons.length, icon: '✅', label: 'Done' },
                  ].map(s => (
                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '8px 16px', textAlign: 'center' }}>
                      <div>{s.icon} <strong>{s.v}</strong></div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ marginBottom: 8, fontSize: '0.9rem', opacity: 0.9 }}>Overall Progress</div>
                <div style={{ fontSize: '3rem', fontWeight: 900 }}>{totalPct}%</div>
              </div>
            </div>

            {/* Subject Progress */}
            <h2 style={{ fontWeight: 900, color: '#333', fontSize: '1.5rem', marginBottom: 16 }}>📚 Subject Progress</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 32 }}>
              {subjectProgress.map(sub => {
                const meta = subjectLabels[sub.subject];
                return (
                  <div key={sub.subject} className="fun-card" style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: '1.5rem' }}>{meta.icon}</span>
                        <span style={{ fontWeight: 700, color: '#333' }}>{meta.label}</span>
                      </div>
                      <span style={{ fontWeight: 900, color: meta.color, fontSize: '1.1rem' }}>{sub.pct}%</span>
                    </div>
                    <div className="progress-bar-outer">
                      <div className="progress-bar-inner" style={{ width: `${sub.pct}%`, background: meta.color }} />
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#888', marginTop: 6 }}>{sub.done}/{sub.total} lessons</div>
                  </div>
                );
              })}
            </div>

            {/* Recent & Next lessons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, flexWrap: 'wrap' }}>
              <div>
                <h3 style={{ fontWeight: 800, color: '#333', marginBottom: 16 }}>✅ Completed Lessons</h3>
                {completedLessons.length > 0 ? completedLessons.map(l => (
                  <div key={l.id} style={{
                    display: 'flex', gap: 12, padding: '12px 16px', background: '#E8F8EA',
                    borderRadius: 12, marginBottom: 8, alignItems: 'center',
                    border: '1px solid #6BCB77',
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>{l.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#333', fontSize: '0.9rem' }}>{l.title}</div>
                      <div style={{ color: '#6BCB77', fontSize: '0.8rem' }}>Completed ✓</div>
                    </div>
                    <span style={{ fontSize: '1.2rem' }}>✅</span>
                  </div>
                )) : <p style={{ color: '#888', fontSize: '0.9rem' }}>No completed lessons yet. Start learning!</p>}
              </div>
              <div>
                <h3 style={{ fontWeight: 800, color: '#333', marginBottom: 16 }}>🚀 Up Next</h3>
                {inProgressLessons.map(l => (
                  <a key={l.id} href={`/subjects/${l.subject}/${l.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      display: 'flex', gap: 12, padding: '12px 16px', background: 'white',
                      borderRadius: 12, marginBottom: 8, alignItems: 'center',
                      border: '2px solid #E2E8F0', cursor: 'pointer', transition: 'all 0.2s ease',
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{l.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, color: '#333', fontSize: '0.9rem' }}>{l.title}</div>
                        <div style={{ color: '#888', fontSize: '0.8rem' }}>+{l.xpReward} XP</div>
                      </div>
                      <span style={{ color: '#4F9CF9', fontWeight: 700, fontSize: '0.8rem' }}>Start →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TEACHER DASHBOARD */}
        {activeView === 'teacher' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
              {[
                { icon: '👥', value: 5, label: 'Total Students', color: '#4F9CF9' },
                { icon: '📚', value: 22, label: 'Active Lessons', color: '#6BCB77' },
                { icon: '⭐', value: '84%', label: 'Avg. Score', color: '#FFD93D' },
                { icon: '🔥', value: '6.2', label: 'Avg. Streak (days)', color: '#FF8C42' },
              ].map(stat => (
                <div key={stat.label} className="fun-card" style={{ textAlign: 'center', padding: 20 }}>
                  <div style={{ fontSize: '2rem', marginBottom: 6 }}>{stat.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: '2rem', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* Class leaderboard */}
              <div className="fun-card" style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 800, color: '#333', marginBottom: 16 }}>🏆 Class Leaderboard</h3>
                {CLASS_DATA.students.sort((a, b) => b.xp - a.xp).map((s, i) => (
                  <div key={s.name} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
                    borderBottom: i < CLASS_DATA.students.length - 1 ? '1px solid #F0F0F0' : 'none',
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: i === 0 ? '#FFD93D' : i === 1 ? '#A8A9AD' : i === 2 ? '#CD7F32' : '#E2E8F0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 900, color: i < 3 ? '#333' : '#888', fontSize: '0.9rem',
                    }}>{i + 1}</div>
                    <span style={{ fontSize: '1.3rem' }}>{s.avatar}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#333', fontSize: '0.95rem' }}>{s.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>{s.completed} lessons • 🔥{s.streak}d</div>
                    </div>
                    <div style={{ fontWeight: 900, color: '#4F9CF9' }}>{s.xp} XP</div>
                  </div>
                ))}
              </div>

              {/* Topic analysis */}
              <div>
                <div className="fun-card" style={{ padding: 24, marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 800, color: '#333', marginBottom: 16 }}>📈 Topics Students Excel At</h3>
                  {CLASS_DATA.topicsExcelling.map(topic => (
                    <div key={topic} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span style={{ fontSize: '1rem' }}>✅</span>
                      <span style={{ fontWeight: 700, color: '#333' }}>{topic}</span>
                      <div style={{ flex: 1, height: 8, background: '#E2E8F0', borderRadius: 50, overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 50, background: '#6BCB77', width: '80%' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="fun-card" style={{ padding: 24 }}>
                  <h3 style={{ fontWeight: 800, color: '#333', marginBottom: 16 }}>⚠️ Topics Needing Help</h3>
                  {CLASS_DATA.topicsStruggling.map(topic => (
                    <div key={topic} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span style={{ fontSize: '1rem' }}>⚠️</span>
                      <span style={{ fontWeight: 700, color: '#333' }}>{topic}</span>
                      <div style={{ flex: 1, height: 8, background: '#E2E8F0', borderRadius: 50, overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 50, background: '#FF8C42', width: '40%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PARENT DASHBOARD */}
        {activeView === 'parent' && (
          <div>
            <div className="fun-card" style={{
              padding: '28px', marginBottom: 28,
              background: 'linear-gradient(135deg, #43e97b11, #38f9d711)',
              border: '2px solid #43e97b44',
            }}>
              <h2 style={{ fontWeight: 900, color: '#333', marginBottom: 4 }}>👨‍👩‍👧 Your Child's Progress</h2>
              <p style={{ color: '#888', marginBottom: 20 }}>Last 7 days learning summary for {student.name}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
                {[
                  { icon: '⏰', value: '175 min', label: 'This Week', color: '#4F9CF9' },
                  { icon: '📚', value: student.completedLessons.length, label: 'Lessons Done', color: '#6BCB77' },
                  { icon: '⭐', value: student.stars, label: 'Stars Earned', color: '#FFD93D' },
                  { icon: '🔥', value: `${student.streakDays} days`, label: 'Learning Streak', color: '#FF4757' },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center', padding: '16px', background: 'white', borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{s.icon}</div>
                    <div style={{ fontWeight: 900, fontSize: '1.5rem', color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly learning chart */}
            <div className="fun-card" style={{ padding: 24, marginBottom: 24 }}>
              <h3 style={{ fontWeight: 800, color: '#333', marginBottom: 20 }}>📈 Weekly Learning Time (minutes)</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 140 }}>
                {WEEKLY_PARENT_DATA.map(d => (
                  <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontWeight: 700, color: '#4F9CF9', fontSize: '0.85rem' }}>{d.minutes}m</div>
                    <div style={{
                      width: '100%', maxWidth: 40,
                      height: `${(d.minutes / 40) * 100}px`,
                      background: 'linear-gradient(180deg, #4F9CF9, #667eea)',
                      borderRadius: '8px 8px 0 0',
                      minHeight: 10,
                    }} />
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#888' }}>{d.day}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subjects detail */}
            <div className="fun-card" style={{ padding: 24 }}>
              <h3 style={{ fontWeight: 800, color: '#333', marginBottom: 16 }}>📚 Subject Performance</h3>
              {subjectProgress.map(sub => {
                const meta = subjectLabels[sub.subject];
                return (
                  <div key={sub.subject} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: '1.3rem', width: 32 }}>{meta.icon}</span>
                    <span style={{ fontWeight: 700, color: '#333', width: 100, fontSize: '0.9rem' }}>{meta.label}</span>
                    <div style={{ flex: 1, height: 12, background: '#E2E8F0', borderRadius: 50, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 50, background: meta.color, width: `${sub.pct}%`, transition: 'width 1s ease' }} />
                    </div>
                    <span style={{ fontWeight: 900, color: meta.color, width: 48, textAlign: 'right' }}>{sub.pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
