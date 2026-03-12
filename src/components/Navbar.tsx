'use client';
import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';

export default function Navbar() {
  const { t, language, setLanguage, student, voiceEnabled, toggleVoice, speak, setCurrentSubject } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const langs = [
    { code: 'english', label: 'English', flag: '🇬🇧' },
    { code: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'kannada', label: 'ಕನ್ನಡ', flag: '🌺' },
  ] as const;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(255,255,255,0.95)' : 'linear-gradient(135deg, #4F9CF9, #667eea)',
      backdropFilter: 'blur(20px)',
      boxShadow: scrolled ? '0 4px 30px rgba(79,156,249,0.2)' : 'none',
      transition: 'all 0.3s ease',
      padding: '0 24px',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          onClick={() => { window.location.href = '/'; setCurrentSubject(''); }}>
          <div style={{ fontSize: 36, animation: 'float 3s ease-in-out infinite' }}>🚀</div>
          <div>
            <div style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 900, fontSize: '1.3rem',
              color: scrolled ? '#4F9CF9' : 'white',
              letterSpacing: '-0.5px',
            }}>{t('appName')}</div>
            <div style={{ fontSize: '0.65rem', color: scrolled ? '#666' : 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
              CBSE Grade 3 • NEP 2020
            </div>
          </div>
        </div>

        {/* Center Nav */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {[
            { href: '/', icon: '🏠', label: t('home'), target: '_self' },
            { href: '/subjects', icon: '📚', label: t('subjects'), target: '_self' },
            { href: '/games', icon: '🎮', label: t('games'), target: '_self' },
            { href: '/rewards', icon: '🏆', label: t('rewards'), target: '_self' },
            { href: '/dashboard', icon: '📊', label: t('dashboard'), target: '_self' },
            { href: 'https://scholar-sparkle-web.lovable.app', icon: '👩‍🏫', label: t('resourcePerson'), target: '_blank' },
          ].map((item) => (
            <a key={item.href} href={item.href} target={item.target} rel={item.target === '_blank' ? 'noopener noreferrer' : undefined} className="nav-link"
              style={{ color: scrolled ? '#444' : 'white', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* LanguageSelector */}
          <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 50, padding: '4px 8px' }}>
            {langs.map(lang => (
              <button key={lang.code}
                onClick={() => { setLanguage(lang.code); speak(lang.label); }}
                style={{
                  padding: '4px 10px', borderRadius: 50, border: 'none',
                  cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                  backgroundColor: language === lang.code ? 'white' : 'transparent',
                  color: language === lang.code ? '#4F9CF9' : (scrolled ? '#444' : 'white'),
                  transition: 'all 0.2s ease',
                }}>
                {lang.flag} {lang.code === 'english' ? 'EN' : lang.code === 'hindi' ? 'HI' : 'KN'}
              </button>
            ))}
          </div>

          {/* Voice toggle */}
          <button onClick={toggleVoice} title={voiceEnabled ? t('voiceOff') : t('voiceOn')}
            style={{
              width: 40, height: 40, borderRadius: '50%', border: 'none',
              background: voiceEnabled ? '#6BCB77' : '#E2E8F0',
              cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease', boxShadow: voiceEnabled ? '0 4px 12px rgba(107,203,119,0.4)' : 'none',
            }}>
            {voiceEnabled ? '🔊' : '🔇'}
          </button>

          {/* Student avatar */}
          <div onClick={() => { window.location.href = '/dashboard'; }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.2)', borderRadius: 50,
              padding: '6px 14px', cursor: 'pointer',
            }}>
            <span style={{ fontSize: '1.3rem' }}>{student.avatar}</span>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: scrolled ? '#333' : 'white' }}>{student.name}</div>
              <div style={{ fontSize: '0.65rem', color: scrolled ? '#FFD93D' : '#FFD93D' }}>⭐ {student.stars} • 🪙 {student.coins}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
