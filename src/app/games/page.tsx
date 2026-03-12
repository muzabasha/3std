'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/context';

const MINI_GAMES = [
  {
    id: 'balloon-pop',
    title: 'Balloon Pop Math!',
    icon: '🎈',
    description: 'Pop the balloon with the correct answer!',
    subject: 'math',
    color: '#667eea',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
  },
  {
    id: 'word-match',
    title: 'Word Match Game',
    icon: '🃏',
    description: 'Match words to their pictures!',
    subject: 'english',
    color: '#f093fb',
    bg: 'linear-gradient(135deg, #f093fb, #f5576c)',
  },
  {
    id: 'planet-puzzle',
    title: 'Planet Order Puzzle',
    icon: '🪐',
    description: 'Put the planets in the right order!',
    subject: 'gk',
    color: '#fa709a',
    bg: 'linear-gradient(135deg, #fa709a, #fee140)',
  },
  {
    id: 'animal-sort',
    title: 'Animal Habitat Sort',
    icon: '🦁',
    description: 'Send animals to their homes!',
    subject: 'evs',
    color: '#4facfe',
    bg: 'linear-gradient(135deg, #4facfe, #00f2fe)',
  },
  {
    id: 'shape-builder',
    title: 'Shape Builder',
    icon: '🔷',
    description: 'Build shapes using pieces!',
    subject: 'math',
    color: '#1DD3B0',
    bg: 'linear-gradient(135deg, #1DD3B0, #4F9CF9)',
  },
  {
    id: 'hindi-word-builder',
    title: 'Hindi Word Builder',
    icon: '🔤',
    description: 'Build Hindi words from letters!',
    subject: 'hindi',
    color: '#FF8C42',
    bg: 'linear-gradient(135deg, #FF8C42, #FF4757)',
  },
];

// Balloon Pop Game Component
function BalloonPopGame() {
  const { speak, addCoins } = useApp();
  const problems = [
    { q: '3 + 4 = ?', answer: 7, options: [5, 6, 7, 8] },
    { q: '5 + 3 = ?', answer: 8, options: [6, 7, 8, 9] },
    { q: '9 - 4 = ?', answer: 5, options: [4, 5, 6, 7] },
    { q: '2 × 4 = ?', answer: 8, options: [6, 8, 10, 12] },
    { q: '10 - 3 = ?', answer: 7, options: [6, 7, 8, 9] },
  ];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [popped, setPopped] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const handlePop = (val: number) => {
    setPopped(val);
    const isRight = val === problems[idx].answer;
    if (isRight) { setScore(s => s + 1); speak('Pop! Correct!'); addCoins(5); }
    else speak('Oops! Try the next one!');
    setTimeout(() => {
      if (idx + 1 >= problems.length) setDone(true);
      else { setIdx(i => i + 1); setPopped(null); }
    }, 1000);
  };

  const colors = ['#FF6B9D', '#4F9CF9', '#FFD93D', '#6BCB77'];

  if (done) return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <div style={{ fontSize: '5rem', marginBottom: 16 }}>🏆</div>
      <h3 style={{ fontSize: '2rem', fontWeight: 900 }}>Game Over!</h3>
      <p style={{ fontSize: '1.3rem', color: '#666' }}>Score: {score}/{problems.length}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
        {[...Array(score)].map((_, i) => <span key={i} style={{ fontSize: '2rem' }}>⭐</span>)}
      </div>
      <button className="btn-fun btn-blue" style={{ marginTop: 20 }} onClick={() => { setIdx(0); setScore(0); setDone(false); setPopped(null); }}>
        🔄 Play Again
      </button>
    </div>
  );

  const p = problems[idx];
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ background: 'linear-gradient(135deg, #E8F4FD, #EBF8FF)', borderRadius: 20, padding: '20px', marginBottom: 24 }}>
        <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: 8 }}>Question {idx + 1}/{problems.length} • Score: {score}</div>
        <div style={{ fontSize: '2rem', fontWeight: 900, color: '#333' }}>{p.q}</div>
      </div>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        {p.options.map((opt, i) => (
          <button key={opt} onClick={() => handlePop(opt)}
            style={{
              width: 80, height: 80, borderRadius: '50%', border: 'none',
              background: popped === opt ? (opt === p.answer ? '#6BCB77' : '#FF4757') : colors[i % colors.length],
              color: 'white', fontSize: '1.3rem', fontWeight: 900, cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              transform: popped === opt ? 'scale(0.5)' : 'scale(1)',
              transition: 'all 0.3s ease',
            }}>
            {popped === opt ? (opt === p.answer ? '🎉' : '💥') : `🎈\n${opt}`}
          </button>
        ))}
      </div>
    </div>
  );
}

// Word Match Game
function WordMatchGame() {
  const { speak } = useApp();
  const pairs = [
    { word: 'CAT', emoji: '🐱' },
    { word: 'DOG', emoji: '🐶' },
    { word: 'BIRD', emoji: '🐦' },
    { word: 'FISH', emoji: '🐟' },
    { word: 'TREE', emoji: '🌳' },
    { word: 'FLOWER', emoji: '🌸' },
  ];
  const [matched, setMatched] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (item: string) => {
    if (matched.includes(item)) return;
    if (!selected) { setSelected(item); return; }
    const sWord = selected.startsWith('word-') ? selected.replace('word-', '') : null;
    const sEmoji = selected.startsWith('emoji-') ? selected.replace('emoji-', '') : null;
    const iWord = item.startsWith('word-') ? item.replace('word-', '') : null;
    const iEmoji = item.startsWith('emoji-') ? item.replace('emoji-', '') : null;
    const wordKey = sWord || iWord;
    const emojiKey = sEmoji || iEmoji;
    if (wordKey && emojiKey && wordKey === emojiKey) {
      setMatched(prev => [...prev, `word-${wordKey}`, `emoji-${emojiKey}`]);
      speak(`${wordKey}!`);
    }
    setSelected(null);
  };

  const done = matched.length === pairs.length * 2;

  return (
    <div>
      {done ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>🏆</div>
          <h3 style={{ fontSize: '2rem', fontWeight: 900 }}>All Matched!</h3>
          <button className="btn-fun btn-blue" style={{ marginTop: 20 }} onClick={() => setMatched([])}>
            🔄 Play Again
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <h4 style={{ fontWeight: 700, color: '#666', marginBottom: 16, textAlign: 'center' }}>Words</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pairs.map(p => (
                <button key={`word-${p.word}`} onClick={() => handleSelect(`word-${p.word}`)}
                  style={{
                    padding: '12px 20px', borderRadius: 12, border: '3px solid',
                    borderColor: matched.includes(`word-${p.word}`) ? '#6BCB77' : selected === `word-${p.word}` ? '#4F9CF9' : '#E2E8F0',
                    background: matched.includes(`word-${p.word}`) ? '#E8F8EA' : selected === `word-${p.word}` ? '#EBF4FF' : 'white',
                    fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer',
                    textDecoration: matched.includes(`word-${p.word}`) ? 'line-through' : 'none',
                    color: matched.includes(`word-${p.word}`) ? '#6BCB77' : '#333',
                  }}>
                  {p.word}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, color: '#666', marginBottom: 16, textAlign: 'center' }}>Pictures</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[...pairs].sort(() => Math.random() - 0.5).map(p => (
                <button key={`emoji-${p.word}`} onClick={() => handleSelect(`emoji-${p.word}`)}
                  style={{
                    padding: '12px 20px', borderRadius: 12, border: '3px solid',
                    borderColor: matched.includes(`emoji-${p.word}`) ? '#6BCB77' : selected === `emoji-${p.word}` ? '#4F9CF9' : '#E2E8F0',
                    background: matched.includes(`emoji-${p.word}`) ? '#E8F8EA' : selected === `emoji-${p.word}` ? '#EBF4FF' : 'white',
                    fontSize: '1.8rem', cursor: 'pointer',
                    opacity: matched.includes(`emoji-${p.word}`) ? 0.5 : 1,
                  }}>
                  {p.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Planet Order Game 
function PlanetOrderGame() {
  const { speak } = useApp();
  const correct = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
  const emojis: Record<string, string> = { Mercury: '⚫', Venus: '🟤', Earth: '🌍', Mars: '🔴', Jupiter: '🟠', Saturn: '🪐', Uranus: '🔵', Neptune: '💙' };
  const [order, setOrder] = useState(() => [...correct].sort(() => Math.random() - 0.5));
  const [checked, setChecked] = useState(false);
  const isCorrect = order.join(',') === correct.join(',');

  const move = (from: number, to: number) => {
    const newOrder = [...order];
    const [item] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, item);
    setOrder(newOrder);
    setChecked(false);
  };

  return (
    <div>
      <p style={{ fontWeight: 600, color: '#666', marginBottom: 16, textAlign: 'center' }}>
        Drag or click ↑↓ to arrange planets from Sun outward!
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {order.map((planet, i) => (
          <div key={planet} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 16px', borderRadius: 12, background: 'white',
            border: '2px solid', borderColor: checked ? (planet === correct[i] ? '#6BCB77' : '#FF4757') : '#E2E8F0',
            transition: 'all 0.2s ease',
          }}>
            <span style={{ fontWeight: 900, color: '#888', width: 24 }}>{i + 1}.</span>
            <span style={{ fontSize: '1.5rem' }}>{emojis[planet]}</span>
            <span style={{ fontWeight: 700, flex: 1 }}>{planet}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => i > 0 && move(i, i - 1)} disabled={i === 0}
                style={{ width: 28, height: 28, borderRadius: 8, border: '2px solid #E2E8F0', background: 'white', cursor: i > 0 ? 'pointer' : 'not-allowed', opacity: i === 0 ? 0.4 : 1 }}>↑</button>
              <button onClick={() => i < order.length - 1 && move(i, i + 1)} disabled={i === order.length - 1}
                style={{ width: 28, height: 28, borderRadius: 8, border: '2px solid #E2E8F0', background: 'white', cursor: i < order.length - 1 ? 'pointer' : 'not-allowed', opacity: i === order.length - 1 ? 0.4 : 1 }}>↓</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button className="btn-fun btn-blue" onClick={() => { setChecked(true); speak(isCorrect ? 'Excellent! Correct order!' : 'Not quite, try again!'); }}>
          ✅ Check Order
        </button>
        {checked && isCorrect && (
          <div style={{ marginTop: 16, padding: 16, background: '#E8F8EA', borderRadius: 16 }}>
            <p style={{ fontWeight: 700, color: '#276837', fontSize: '1.2rem' }}>🏆 Perfect! You know the planets!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Hindi Word Builder game
function HindiWordBuilderGame() {
  const { speak } = useApp();
  const words = [
    { letters: ['स', 'े', 'ब'], answer: 'सेब', meaning: 'Apple 🍎' },
    { letters: ['ग', 'ा', 'य'], answer: 'गाय', meaning: 'Cow 🐄' },
    { letters: ['घ', 'र'], answer: 'घर', meaning: 'House 🏠' },
    { letters: ['फ', 'ल'], answer: 'फल', meaning: 'Fruit 🍓' },
  ];
  const [wordIdx, setWordIdx] = useState(0);
  const [built, setBuilt] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const w = words[wordIdx];
  const builtWord = built.join('');

  const addLetter = (letter: string) => setBuilt(prev => [...prev, letter]);
  const clear = () => setBuilt([]);

  const check = () => {
    if (builtWord === w.answer) {
      speak(w.answer);
      setScore(s => s + 1);
      setTimeout(() => {
        if (wordIdx + 1 < words.length) { setWordIdx(i => i + 1); setBuilt([]); }
      }, 1000);
    } else {
      speak('Try again!');
      setBuilt([]);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: 8 }}>{w.meaning.split(' ')[1]}</div>
      <div style={{ fontWeight: 700, color: '#888', marginBottom: 20 }}>{w.meaning} — Build the word!</div>
      
      <div style={{
        minHeight: 60, borderRadius: 16, border: '3px dashed #4F9CF9',
        background: '#EBF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 8, padding: 12, marginBottom: 20, fontSize: '2rem', fontWeight: 900,
      }}>
        {built.length > 0 ? built.map((l, i) => (
          <span key={i} style={{ color: '#4F9CF9' }}>{l}</span>
        )) : <span style={{ color: '#B0C4DE', fontSize: '1rem' }}>Click letters below...</span>}
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
        {w.letters.map((letter, i) => (
          <button key={i} onClick={() => addLetter(letter)}
            style={{
              width: 64, height: 64, borderRadius: 16, border: '3px solid #4F9CF9',
              background: 'white', fontSize: '2rem', fontWeight: 900, cursor: 'pointer',
              fontFamily: 'serif',
              boxShadow: '0 4px 16px rgba(79,156,249,0.2)',
              transition: 'all 0.2s ease',
            }}>
            {letter}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button className="btn-fun" style={{ background: '#E2E8F0', color: '#666' }} onClick={clear}>🗑️ Clear</button>
        <button className="btn-fun btn-green" onClick={check}>✅ Check</button>
      </div>

      <div style={{ marginTop: 16, color: '#888' }}>Score: {score}/{words.length}</div>
    </div>
  );
}

export default function GamesPage() {
  const { t } = useApp();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const activeGameData = MINI_GAMES.find(g => g.id === activeGame);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0F8FF, #E8F4FD)', padding: '32px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: '4rem', marginBottom: 16, animation: 'float 2s ease-in-out infinite' }}>🎮</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#333', marginBottom: 8 }}>Mini Games!</h1>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>Learn through play! Choose a game and start having fun!</p>
        </div>

        {activeGame ? (
          <div>
            <button onClick={() => setActiveGame(null)} className="btn-fun" style={{ background: 'white', color: '#333', border: '2px solid #E2E8F0', marginBottom: 24 }}>
              ← Back to Games
            </button>
            <div className="fun-card" style={{ padding: 32 }}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ fontSize: '3rem', marginBottom: 8 }}>{activeGameData?.icon}</div>
                <h2 style={{ fontWeight: 900, color: '#333', fontSize: '1.5rem' }}>{activeGameData?.title}</h2>
              </div>
              {activeGame === 'balloon-pop' && <BalloonPopGame />}
              {activeGame === 'word-match' && <WordMatchGame />}
              {activeGame === 'planet-puzzle' && <PlanetOrderGame />}
              {activeGame === 'hindi-word-builder' && <HindiWordBuilderGame />}
              {(activeGame === 'animal-sort' || activeGame === 'shape-builder') && (
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <div style={{ fontSize: '4rem', marginBottom: 16 }}>🚀</div>
                  <p style={{ color: '#666', fontSize: '1.1rem' }}>
                    This game is available in the EVS/Math lesson! Go learn first, then come back!
                  </p>
                  <a href="/subjects" className="btn-fun btn-blue" style={{ marginTop: 20, display: 'inline-flex' }}>
                    📚 Go to Lessons
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {MINI_GAMES.map((game, i) => (
              <div key={game.id} className="fun-card" style={{ overflow: 'hidden', cursor: 'pointer', animation: `bounce-in 0.4s ease-out ${i * 0.1}s both` }}
                onClick={() => setActiveGame(game.id)}>
                <div style={{ background: game.bg, padding: '32px', textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', animation: 'float 2s ease-in-out infinite', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))' }}>
                    {game.icon}
                  </div>
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#333', marginBottom: 4 }}>{game.title}</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: 12 }}>{game.description}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span className="badge badge-blue">{game.subject}</span>
                    <span className="badge badge-green">🎮 Play</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
