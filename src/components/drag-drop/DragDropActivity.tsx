'use client';
import React, { useState, useRef } from 'react';
import { useApp } from '@/lib/context';

interface DragItem {
  id: string;
  content: string;
  emoji?: string;
  zone?: string;
}

interface DropZone {
  id: string;
  label: string;
  emoji?: string;
  color: string;
  accepts?: string;
}

interface DragDropActivityProps {
  title: string;
  instruction: string;
  items: DragItem[];
  zones: DropZone[];
  onComplete: (score: number) => void;
}

export default function DragDropActivity({ title, instruction, items, zones, onComplete }: DragDropActivityProps) {
  const { speak } = useApp();
  const [itemStates, setItemStates] = useState<DragItem[]>(items);
  const [dragId, setDragId] = useState<string | null>(null);
  const [hoverZone, setHoverZone] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleDragStart = (id: string) => {
    setDragId(id);
    speak(items.find(i => i.id === id)?.content || '');
  };

  const handleDrop = (zoneId: string) => {
    if (!dragId) return;
    setItemStates(prev => prev.map(item =>
      item.id === dragId ? { ...item, zone: zoneId } : item
    ));
    setDragId(null);
    setHoverZone(null);
  };

  const removeFromZone = (itemId: string) => {
    setItemStates(prev => prev.map(item =>
      item.id === itemId ? { ...item, zone: undefined } : item
    ));
  };

  const checkAnswers = () => {
    const correct = itemStates.filter(item => item.zone === item.id.split('-')[0]).length;
    setScore(correct);
    setCompleted(true);
    onComplete(correct);
    speak(`Great job! You got ${correct} out of ${items.length} correct!`);
  };

  const availableItems = itemStates.filter(item => !item.zone);

  if (completed) {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎊</div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#333', marginBottom: 8 }}>Activity Complete!</h3>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>You scored {score} out of {items.length}!</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
          {[...Array(Math.min(score, 3))].map((_, i) => (
            <span key={i} style={{ fontSize: '2rem' }}>⭐</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #E8F4FD, #EBF8FF)',
        borderRadius: 20, padding: '20px', marginBottom: 24,
        border: '2px solid #4F9CF9',
      }}>
        <h3 style={{ fontWeight: 800, fontSize: '1.2rem', color: '#333', marginBottom: 8 }}>{title}</h3>
        <p style={{ color: '#555', fontSize: '1rem' }}>🎯 {instruction}</p>
        <button onClick={() => speak(instruction)}
          style={{
            marginTop: 8, padding: '6px 14px', borderRadius: 50,
            background: '#4F9CF9', color: 'white', border: 'none',
            cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
          }}>🔊 Read Instructions</button>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Source items */}
        <div style={{ flex: '1', minWidth: 200 }}>
          <h4 style={{ fontWeight: 700, color: '#666', marginBottom: 12, fontSize: '0.9rem', textTransform: 'uppercase' }}>
            📦 Items to Sort
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {availableItems.map(item => (
              <div key={item.id}
                className="drag-item"
                draggable
                onDragStart={() => handleDragStart(item.id)}
                style={{
                  padding: '10px 16px', borderRadius: 12,
                  background: 'white', border: '2px solid #E2E8F0',
                  fontWeight: 700, fontSize: '1rem', cursor: 'grab',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  display: 'flex', alignItems: 'center', gap: 6,
                  transform: dragId === item.id ? 'scale(1.1) rotate(3deg)' : 'none',
                  opacity: dragId === item.id ? 0.7 : 1,
                }}>
                {item.emoji && <span>{item.emoji}</span>}
                <span>{item.content}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Drop zones */}
        <div style={{ flex: '2', minWidth: 300 }}>
          <h4 style={{ fontWeight: 700, color: '#666', marginBottom: 12, fontSize: '0.9rem', textTransform: 'uppercase' }}>
            🗂️ Drop Here
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            {zones.map(zone => {
              const zoneItems = itemStates.filter(item => item.zone === zone.id);
              return (
                <div key={zone.id}
                  onDragOver={(e) => { e.preventDefault(); setHoverZone(zone.id); }}
                  onDragLeave={() => setHoverZone(null)}
                  onDrop={() => handleDrop(zone.id)}
                  style={{
                    minHeight: 100, borderRadius: 16, padding: 12,
                    border: `3px dashed ${hoverZone === zone.id ? '#4F9CF9' : '#CBD5E0'}`,
                    background: hoverZone === zone.id ? '#EBF4FF' : zoneItems.length > 0 ? '#F0FFF4' : '#F8F9FA',
                    transition: 'all 0.2s ease',
                    borderColor: zoneItems.length > 0 ? '#6BCB77' : undefined,
                    borderStyle: zoneItems.length > 0 ? 'solid' : 'dashed',
                  }}>
                  <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <div style={{ fontSize: '1.5rem' }}>{zone.emoji}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#555' }}>{zone.label}</div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {zoneItems.map(item => (
                      <div key={item.id}
                        onClick={() => removeFromZone(item.id)}
                        style={{
                          padding: '6px 12px', borderRadius: 10,
                          background: zone.color, color: 'white',
                          fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 4,
                        }}>
                        {item.emoji} {item.content} ×
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {itemStates.filter(i => i.zone).length === items.length && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button className="btn-fun btn-green" onClick={checkAnswers}
            style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
            ✅ Check My Answers!
          </button>
        </div>
      )}
    </div>
  );
}
