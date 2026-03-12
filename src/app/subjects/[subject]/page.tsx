'use client';
import React from 'react';
import { useApp } from '@/lib/context';
import { ALL_LESSONS } from '@/lib/data';
import { use } from 'react';

const SUBJECT_META: Record<string, { name: string; icon: string; bg: string; description: string; topics: string[] }> = {
  math: { name: 'Mathematics', icon: '🔢', bg: 'linear-gradient(135deg, #667eea, #764ba2)', description: 'Explore numbers, shapes, and mathematical concepts through fun activities!', topics: ['Numbers 1-1000', 'Addition', 'Subtraction', 'Multiplication', 'Division', 'Fractions', 'Shapes', 'Measurement', 'Money', 'Time'] },
  english: { name: 'English', icon: '📚', bg: 'linear-gradient(135deg, #f093fb, #f5576c)', description: 'Master vocabulary, grammar, and build amazing sentences!', topics: ['Vocabulary', 'Grammar', 'Sentence Building', 'Reading Comprehension', 'Story Sequencing'] },
  hindi: { name: 'हिंदी', icon: '🕉️', bg: 'linear-gradient(135deg, #FF8C42, #FF4757)', description: 'हिंदी भाषा सीखें - स्वर, व्यंजन, शब्द और वाक्य!', topics: ['स्वर (Vowels)', 'व्यंजन (Consonants)', 'शब्द निर्माण', 'वाक्य निर्माण', 'पठन अभ्यास'] },
  kannada: { name: 'ಕನ್ನಡ', icon: '🌺', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)', description: 'ಕನ್ನಡ ಭಾಷೆ ಕಲಿಯಿರಿ - ಸ್ವರ, ವ್ಯಂಜನ ಮತ್ತು ಪದ ರಚನೆ!', topics: ['ಸ್ವರಗಳು (Vowels)', 'ವ್ಯಂಜನಗಳು (Consonants)', 'ಪದ ರಚನೆ', 'ವಾಕ್ಯ ರಚನೆ', 'ಓದುವ ಅಭ್ಯಾಸ'] },
  evs: { name: 'Environmental Studies', icon: '🌿', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', description: 'Discover the amazing world of plants, animals, and our environment!', topics: ['Plants', 'Animals', 'Food', 'Water', 'Air', 'Community Helpers', 'Transport', 'Human Body'] },
  gk: { name: 'General Knowledge', icon: '🌏', bg: 'linear-gradient(135deg, #fa709a, #fee140)', description: 'Explore the solar system, nature, and amazing inventions!', topics: ['Solar System', 'Nature', 'Countries', 'Inventions'] },
};

interface PageProps { params: Promise<{ subject: string }> }

export default function SubjectPage({ params }: PageProps) {
  const { subject } = use(params);
  const { student } = useApp();
  const meta = SUBJECT_META[subject];
  const lessons = ALL_LESSONS.filter(l => l.subject === subject);
  if (!meta) return <div style={{ padding: 40, textAlign: 'center' }}>Subject not found</div>;

  const completedCount = lessons.filter(l => student.completedLessons.includes(l.id)).length;
  const progressPct = Math.round((completedCount / lessons.length) * 100);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0F8FF, #E8F4FD)' }}>
      {/* Hero */}
      <div style={{ background: meta.bg, padding: '48px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', color: 'white' }}>
          <a href="/subjects" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, display: 'inline-block', marginBottom: 20 }}>
            ← Back to Subjects
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ fontSize: '5rem', animation: 'float 2s ease-in-out infinite', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))' }}>{meta.icon}</div>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 8 }}>{meta.name}</h1>
              <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: 500, lineHeight: 1.5 }}>{meta.description}</p>
              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.9rem', opacity: 0.9 }}>
                  <span>{completedCount}/{lessons.length} lessons completed</span>
                  <span>{progressPct}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: 50, height: 12, width: 300, maxWidth: '100%' }}>
                  <div style={{ height: '100%', borderRadius: 50, background: '#6BCB77', width: `${progressPct}%`, transition: 'width 1s ease' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <svg style={{ position: 'absolute', bottom: -1, left: 0, width: '100%' }} viewBox="0 0 1440 60" fill="none">
          <path d="M0,30 C360,60 720,0 1080,30 L1440,30 L1440,60 L0,60 Z" fill="#F0F8FF" />
        </svg>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        {/* Topics covered */}
        <div className="fun-card" style={{ padding: 24, marginBottom: 32 }}>
          <h3 style={{ fontWeight: 800, color: '#333', marginBottom: 16 }}>📋 Topics Covered</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {meta.topics.map(topic => (
              <span key={topic} style={{
                padding: '6px 14px', borderRadius: 50, background: '#EBF4FF',
                color: '#4F9CF9', fontWeight: 700, fontSize: '0.85rem',
              }}>{topic}</span>
            ))}
          </div>
        </div>

        {/* Lessons */}
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#333', marginBottom: 20 }}>📖 Lessons</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {lessons.map((lesson, i) => {
            const isCompleted = student.completedLessons.includes(lesson.id);
            return (
              <a key={lesson.id} href={`/subjects/${subject}/${lesson.id}`} style={{ textDecoration: 'none' }}>
                <div className="fun-card" style={{ padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'center' }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 20, flexShrink: 0,
                    background: lesson.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem', border: `2px solid ${lesson.color}44`,
                  }}>{lesson.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <h4 style={{ fontWeight: 800, color: '#333', fontSize: '1.1rem' }}>{lesson.title}</h4>
                      {isCompleted && <span style={{ fontSize: '1.1rem' }}>✅</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span className="badge" style={{ background: lesson.color + '22', color: lesson.color }}>
                        {lesson.difficulty === 'easy' ? '⭐ Easy' : lesson.difficulty === 'medium' ? '⭐⭐ Medium' : '⭐⭐⭐ Hard'}
                      </span>
                      <span className="badge badge-blue">+{lesson.xpReward} XP</span>
                      <span className="badge" style={{ background: '#F8F9FA', color: '#666' }}>{lesson.quiz.length} Questions</span>
                      <span className="badge" style={{ background: '#FFF8E1', color: '#F5A623' }}>🎮 Interactive</span>
                    </div>
                  </div>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%', background: isCompleted ? '#6BCB77' : lesson.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                    fontSize: '1.2rem', flexShrink: 0,
                  }}>
                    {isCompleted ? '✓' : '→'}
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
