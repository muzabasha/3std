'use client';
import React, { useEffect, useState } from 'react';
import { useApp } from '@/lib/context';
import { ALL_LESSONS } from '@/lib/data';

const SUBJECTS = [
  { id: 'math', label: 'Mathematics', icon: '🔢', color: '#667eea', bg: 'linear-gradient(135deg, #667eea, #764ba2)', description: 'Numbers, Addition, Shapes & More!', lessons: 4 },
  { id: 'english', label: 'English', icon: '📚', color: '#f093fb', bg: 'linear-gradient(135deg, #f093fb, #f5576c)', description: 'Vocabulary, Grammar & Stories!', lessons: 2 },
  { id: 'hindi', label: 'हिंदी', icon: '🕉️', color: '#FF8C42', bg: 'linear-gradient(135deg, #FF8C42, #FF4757)', description: 'स्वर, व्यंजन और शब्द निर्माण!', lessons: 2 },
  { id: 'kannada', label: 'ಕನ್ನಡ', icon: '🌺', color: '#43e97b', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)', description: 'ಸ್ವರ, ವ್ಯಂಜನ ಮತ್ತು ಪದ ರಚನೆ!', lessons: 2 },
  { id: 'evs', label: 'EVS', icon: '🌿', color: '#4facfe', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', description: 'Plants, Animals & Environment!', lessons: 2 },
  { id: 'gk', label: 'General Knowledge', icon: '🌏', color: '#fa709a', bg: 'linear-gradient(135deg, #fa709a, #fee140)', description: 'Solar System, Nature & More!', lessons: 1 },
];

const DAILY_CHALLENGES = [
  { icon: '🧮', title: 'Math Mania!', desc: 'Solve 5 addition problems', subject: 'math', points: 50 },
  { icon: '📝', title: 'Word Wizard', desc: 'Match 8 vocabulary words', subject: 'english', points: 40 },
  { icon: '🌱', title: 'Plant Explorer', desc: 'Learn about plant parts', subject: 'evs', points: 45 },
];

const ACHIEVEMENTS = [
  { icon: '🔢', label: 'Math Explorer', color: '#667eea' },
  { icon: '📝', label: 'Word Builder', color: '#f093fb' },
  { icon: '🔬', label: 'Sci Detective', color: '#4facfe' },
  { icon: '🌟', label: 'Quiz Star', color: '#FFD93D' },
];

const HEROES = ['🦁', '🐯', '🦊', '🐻', '🦄', '🐲'];

export default function HomePage() {
  const { t, student, speak, language } = useApp();
  const [greeting, setGreeting] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    setGreeting(greet);
    setVisible(true);
    const interval = setInterval(() => setHeroIndex(i => (i + 1) % HEROES.length), 2000);
    return () => clearInterval(interval);
  }, []);

  const completedCount = student.completedLessons.length;
  const totalLessons = ALL_LESSONS.length;
  const progressPct = Math.round((completedCount / totalLessons) * 100);

  return (
    <div style={{ background: 'linear-gradient(180deg, #F0F8FF 0%, #E8F4FD 100%)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #4F9CF9 0%, #667eea 40%, #9B59B6 100%)',
        padding: '60px 24px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 80 + i * 40,
            height: 80 + i * 40,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.1)',
            top: `${-20 + i * 10}%`,
            right: `${-5 + i * 3}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
          }} />
        ))}

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ color: 'white', opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease', maxWidth: 600 }}>
            <div style={{
              display: 'inline-block', background: 'rgba(255,255,255,0.2)',
              padding: '6px 16px', borderRadius: 50, marginBottom: 16,
              fontSize: '0.9rem', fontWeight: 700,
            }}>
              🎓 CBSE Grade 3 • NEP 2020 Aligned
            </div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.2,
              marginBottom: 16, textShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}>
              {t('appName')} 🚀
            </h1>
            <p style={{ fontSize: '1.3rem', opacity: 0.9, marginBottom: 8, fontWeight: 500 }}>
              {greeting}, {student.name}! 👋
            </p>
            <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: 32 }}>
              {t('tagline')}
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="/subjects" className="btn-fun" style={{
                background: 'white', color: '#4F9CF9',
                fontSize: '1.1rem', padding: '16px 32px',
              }}>
                📚 {t('start')}
              </a>
              <button onClick={() => speak(`${greeting} ${student.name}! ${t('tagline')}`)}
                className="btn-fun"
                style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid rgba(255,255,255,0.5)' }}>
                🔊 {t('voiceOn')}
              </button>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 20, marginTop: 32, flexWrap: 'wrap' }}>
              {[
                { icon: '⭐', value: student.stars, label: t('stars') },
                { icon: '🪙', value: student.coins, label: t('coins') },
                { icon: '🔥', value: student.streakDays, label: t('streak') },
                { icon: '⚡', value: student.xp, label: 'XP' },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: 'rgba(255,255,255,0.2)', borderRadius: 16,
                  padding: '12px 20px', textAlign: 'center', backdropFilter: 'blur(10px)',
                }}>
                  <div style={{ fontSize: '1.5rem' }}>{stat.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: '1.3rem' }}>{stat.value}</div>
                  <div style={{ opacity: 0.8, fontSize: '0.8rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Animated character */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '8rem', animation: 'float 2s ease-in-out infinite',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
              transition: 'opacity 0.3s ease',
            }}>
              {HEROES[heroIndex]}
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)', borderRadius: 20,
              padding: '16px 24px', marginTop: 16, backdropFilter: 'blur(10px)',
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', opacity: 0.9 }}>Level {student.level} Learner</div>
              <div style={{ marginTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 4, opacity: 0.8 }}>
                  <span>Progress</span>
                  <span>{progressPct}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: 50, height: 10 }}>
                  <div style={{
                    height: '100%', borderRadius: 50,
                    background: 'linear-gradient(90deg, #FFD93D, #6BCB77)',
                    width: `${progressPct}%`, transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <svg style={{ position: 'absolute', bottom: -1, left: 0, right: 0, width: '100%' }} viewBox="0 0 1440 60" fill="none">
          <path d="M0,30 C360,60 720,0 1080,30 L1440,30 L1440,60 L0,60 Z" fill="#F0F8FF" />
        </svg>
      </section>

      {/* Daily Challenge */}
      <section style={{ padding: '40px 24px 0', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #FF8C42, #FFD93D)',
          borderRadius: 24, padding: '24px 32px',
          display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
          boxShadow: '0 8px 32px rgba(255,140,66,0.3)',
        }}>
          <div style={{ fontSize: '3rem', animation: 'wiggle 1s ease-in-out infinite' }}>⚡</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: '1.3rem', color: 'white' }}>🎯 {t('dailyChallenge')}</div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem' }}>
              {DAILY_CHALLENGES[0].title}: {DAILY_CHALLENGES[0].desc}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '8px 16px', color: 'white', fontWeight: 700 }}>
              🌟 +{DAILY_CHALLENGES[0].points} XP
            </div>
            <a href={`/subjects/${DAILY_CHALLENGES[0].subject}`} className="btn-fun"
              style={{ background: 'white', color: '#FF8C42', fontWeight: 900 }}>
              Start Now! →
            </a>
          </div>
        </div>
      </section>

      {/* Subject Cards */}
      <section style={{ padding: '48px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#333' }}>📗 {t('subjects')}</h2>
            <p style={{ color: '#888', marginTop: 4 }}>Choose a subject to start learning!</p>
          </div>
          <a href="/subjects" className="btn-fun btn-blue">View All →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {SUBJECTS.map((sub, i) => {
            const subLessons = ALL_LESSONS.filter(l => l.subject === sub.id);
            const subCompleted = subLessons.filter(l => student.completedLessons.includes(l.id)).length;
            const subPct = Math.round((subCompleted / subLessons.length) * 100);
            return (
              <a key={sub.id} href={`/subjects/${sub.id}`} style={{ textDecoration: 'none' }}>
                <div className="fun-card" style={{
                  background: 'white', overflow: 'hidden',
                  animation: `bounce-in 0.4s ease-out ${i * 0.1}s both`,
                }}>
                  {/* Card top */}
                  <div style={{
                    background: sub.bg, padding: '24px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <div style={{ fontSize: '3rem', animation: 'float 2.5s ease-in-out infinite' }}>{sub.icon}</div>
                    <div style={{ textAlign: 'right', color: 'white' }}>
                      <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{subCompleted}/{subLessons.length} done</div>
                      <div style={{ fontWeight: 900, fontSize: '1.5rem' }}>{subPct}%</div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: 6, background: '#E2E8F0' }}>
                    <div style={{ height: '100%', background: sub.bg, width: `${subPct}%`, transition: 'width 1s ease' }} />
                  </div>
                  {/* Card body */}
                  <div style={{ padding: '16px 20px' }}>
                    <h3 style={{ fontWeight: 800, fontSize: '1.2rem', color: '#333', marginBottom: 4 }}>{sub.label}</h3>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: 12 }}>{sub.description}</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span className="badge badge-blue">{sub.lessons} Lessons</span>
                      {subCompleted > 0 && <span className="badge badge-green">✅ {subCompleted} Done</span>}
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Achievements */}
      <section style={{ padding: '0 24px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#333', marginBottom: 24 }}>🏅 Recent Achievements</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {student.badges.map((badgeId, i) => {
            const badge = ACHIEVEMENTS[i % ACHIEVEMENTS.length];
            return (
              <div key={badgeId} className="fun-card" style={{
                padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12,
                animation: `bounce-in 0.4s ease-out ${i * 0.1}s both`,
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: '50%',
                  background: badge.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', flexShrink: 0,
                }}>{badge.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#333', fontSize: '0.95rem' }}>{badge.label}</div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>Earned! ⭐</div>
                </div>
              </div>
            );
          })}
          <div className="fun-card" style={{
            padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12,
            border: '2px dashed #E2E8F0',
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: '50%',
              background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
            }}>🔒</div>
            <div>
              <div style={{ fontWeight: 700, color: '#999', fontSize: '0.95rem' }}>Next Badge</div>
              <div style={{ color: '#bbb', fontSize: '0.8rem' }}>Keep learning!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#333', color: 'white', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🚀</div>
        <div style={{ fontWeight: 900, fontSize: '1.3rem', marginBottom: 4 }}>FunLearn Lab</div>
        <div style={{ opacity: 0.6, fontSize: '0.9rem' }}>
          CBSE Grade 3 • NEP 2020 Aligned • Multilingual Learning Platform
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Mathematics', 'English', 'Hindi', 'Kannada', 'EVS', 'General Knowledge'].map(s => (
            <span key={s} style={{ opacity: 0.7, fontSize: '0.85rem' }}>{s}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
