'use client';
import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';

export default function CelebrationOverlay() {
  const { celebrationVisible, t } = useApp();
  const [confettiPieces, setConfettiPieces] = useState<{ id: number; x: number; color: string; delay: number; size: number }[]>([]);

  useEffect(() => {
    if (celebrationVisible) {
      const colors = ['#4F9CF9', '#FFD93D', '#6BCB77', '#FF8C42', '#FF6B9D', '#9B59B6', '#1DD3B0'];
      setConfettiPieces(
        Array.from({ length: 30 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2,
          size: Math.random() * 12 + 8,
        }))
      );
    }
  }, [celebrationVisible]);

  if (!celebrationVisible) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      {/* Confetti */}
      {confettiPieces.map(piece => (
        <div key={piece.id} style={{
          position: 'absolute',
          left: `${piece.x}%`,
          top: '-20px',
          width: piece.size,
          height: piece.size,
          background: piece.color,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          animation: `confetti-fall ${2 + piece.delay}s ease-in forwards`,
          animationDelay: `${piece.delay * 0.1}s`,
        }} />
      ))}

      {/* Central celebration message */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center', pointerEvents: 'none',
      }}>
        <div style={{ fontSize: '5rem', marginBottom: 16, animation: 'bounce-in 0.5s ease-out' }}>🎉</div>
        <div className="celebration-text">
          {t('celebration')}
        </div>
        <div style={{
          marginTop: 16, display: 'flex', gap: 16, justifyContent: 'center',
          fontSize: '2rem',
          animation: 'float 1s ease-in-out infinite',
        }}>
          ⭐ ⭐ ⭐
        </div>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
