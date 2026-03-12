'use client';
import React from 'react';
import { useApp } from '@/lib/context';
import { BADGES, ALL_LESSONS } from '@/lib/data';

export default function RewardsPage() {
  const { student, t } = useApp();
  const xpToNext = 100 - (student.xp % 100);
  const xpPct = ((student.xp % 100) / 100) * 100;

  const earnedBadges = BADGES.filter(b => student.badges.includes(b.id));
  const lockedBadges = BADGES.filter(b => !student.badges.includes(b.id));

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0F8FF, #E8F4FD)', padding: '32px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: '4rem', marginBottom: 16, animation: 'sparkle 2s ease-in-out infinite' }}>🏆</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#333', marginBottom: 8 }}>My Rewards!</h1>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>Keep learning to earn more badges and stars!</p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '⭐', value: student.stars, label: 'Stars', color: '#FFD93D', bg: '#FFFBEB' },
            { icon: '🪙', value: student.coins, label: 'Coins', color: '#FF8C42', bg: '#FFF3E0' },
            { icon: '⚡', value: student.xp, label: 'Total XP', color: '#4F9CF9', bg: '#EBF4FF' },
            { icon: '🔥', value: student.streakDays, label: 'Day Streak', color: '#FF4757', bg: '#FFEAEA' },
            { icon: '🎓', value: `Lv.${student.level}`, label: 'Level', color: '#9B59B6', bg: '#F3E8FF' },
            { icon: '📚', value: student.completedLessons.length, label: 'Lessons Done', color: '#6BCB77', bg: '#E8F8EA' },
          ].map(stat => (
            <div key={stat.label} className="fun-card" style={{ textAlign: 'center', padding: '20px 16px', background: stat.bg }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: stat.color + 'aa' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Level Progress */}
        <div className="fun-card" style={{ padding: '24px 28px', marginBottom: 32, background: 'linear-gradient(135deg, #EBF4FF, #E8F0FE)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontWeight: 800, color: '#333', fontSize: '1.2rem' }}>⚡ Level {student.level} Progress</h3>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>{xpToNext} XP to reach Level {student.level + 1}</p>
            </div>
            <div style={{
              width: 60, height: 60, borderRadius: '50%',
              background: 'linear-gradient(135deg, #4F9CF9, #9B59B6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 900, fontSize: '1.3rem',
            }}>{student.level}</div>
          </div>
          <div className="progress-bar-outer" style={{ height: 20 }}>
            <div className="progress-bar-inner" style={{ width: `${xpPct}%` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.85rem', color: '#888' }}>
            <span>{student.xp % 100} XP</span>
            <span>100 XP</span>
          </div>
        </div>

        {/* Earned Badges */}
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#333', marginBottom: 20 }}>🏅 My Badges ({earnedBadges.length})</h2>
        {earnedBadges.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
            {earnedBadges.map((badge, i) => (
              <div key={badge.id} className="fun-card" style={{
                padding: '24px 20px', textAlign: 'center',
                animation: `bounce-in 0.4s ease-out ${i * 0.1}s both`,
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%', margin: '0 auto 12px',
                  background: badge.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2.5rem', boxShadow: `0 8px 24px ${badge.color}66`,
                  animation: 'sparkle 2s ease-in-out infinite',
                }}>{badge.icon}</div>
                <div style={{ fontWeight: 800, color: '#333', marginBottom: 4 }}>{badge.name}</div>
                <div style={{ fontSize: '0.82rem', color: '#888' }}>{badge.description}</div>
                <div style={{ marginTop: 12 }}>
                  <span className="badge badge-gold">✨ Earned!</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', marginBottom: 40, background: 'white', borderRadius: 24, border: '2px dashed #E2E8F0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 8 }}>🔒</div>
            <p style={{ color: '#888', fontWeight: 600 }}>Complete lessons to earn your first badge!</p>
          </div>
        )}

        {/* Locked Badges */}
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#333', marginBottom: 20 }}>🔒 Locked Badges</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {lockedBadges.map((badge) => (
            <div key={badge.id} style={{
              padding: '24px 20px', textAlign: 'center', borderRadius: 24,
              background: 'white', border: '2px dashed #E2E8F0', opacity: 0.6,
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%', margin: '0 auto 12px',
                background: '#E8E8E8', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem', filter: 'grayscale(1)',
              }}>{badge.icon}</div>
              <div style={{ fontWeight: 700, color: '#999', marginBottom: 4 }}>{badge.name}</div>
              <div style={{ fontSize: '0.82rem', color: '#bbb' }}>{badge.condition}</div>
            </div>
          ))}
        </div>

        {/* Daily Streak Calendar */}
        <div className="fun-card" style={{ padding: '24px 28px' }}>
          <h3 style={{ fontWeight: 800, color: '#333', marginBottom: 16, fontSize: '1.2rem' }}>🔥 Daily Learning Streak</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {Array.from({ length: 14 }, (_, i) => {
              const isActive = i < student.streakDays;
              const isToday = i === student.streakDays - 1;
              return (
                <div key={i} style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: isActive ? 'linear-gradient(135deg, #FF8C42, #FFD93D)' : '#F0F0F0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', fontWeight: 700,
                  border: isToday ? '3px solid #FF4757' : '2px solid transparent',
                  boxShadow: isToday ? '0 4px 16px rgba(255,71,87,0.3)' : 'none',
                  transform: isToday ? 'scale(1.15)' : 'scale(1)',
                }}>
                  {isActive ? '🔥' : '○'}
                </div>
              );
            })}
          </div>
          <p style={{ marginTop: 16, color: '#888', fontSize: '0.9rem' }}>
            🔥 Keep up the streak! Come back tomorrow to continue your {student.streakDays}-day streak!
          </p>
        </div>
      </div>
    </div>
  );
}
