'use client';
import React, { useState } from 'react';
import { useApp } from '@/lib/context';
import { Lesson } from '@/lib/types';
import QuizEngine from '@/components/quizzes/QuizEngine';
import DragDropActivity from '@/components/drag-drop/DragDropActivity';

interface LessonViewerProps {
  lesson: Lesson;
  onComplete?: () => void;
}

type LessonStep = 'story' | 'concept' | 'activity' | 'quiz' | 'reallife' | 'complete';

const STEPS: LessonStep[] = ['story', 'concept', 'activity', 'quiz', 'reallife', 'complete'];
const STEP_LABELS: Record<LessonStep, string> = {
  story: '📖 Story',
  concept: '💡 Concept',
  activity: '🎮 Activity',
  quiz: '❓ Quiz',
  reallife: '🌍 Real Life',
  complete: '🏆 Complete',
};
const STEP_COLORS: Record<LessonStep, string> = {
  story: '#4F9CF9',
  concept: '#FFD93D',
  activity: '#6BCB77',
  quiz: '#FF8C42',
  reallife: '#9B59B6',
  complete: '#1DD3B0',
};

export default function LessonViewer({ lesson, onComplete }: LessonViewerProps) {
  const { t, speak, completeLesson, addXP } = useApp();
  const [currentStep, setCurrentStep] = useState<LessonStep>('story');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [activityDone, setActivityDone] = useState(false);

  const stepIdx = STEPS.indexOf(currentStep);
  const progressPct = (stepIdx / (STEPS.length - 1)) * 100;

  const goNext = () => {
    const next = STEPS[stepIdx + 1];
    if (next) {
      setCurrentStep(next);
      if (next === 'complete') {
        completeLesson(lesson.id);
        addXP(lesson.xpReward);
      }
    }
  };

  const goPrev = () => {
    const prev = STEPS[stepIdx - 1];
    if (prev) setCurrentStep(prev);
  };

  // Drag-drop data based on subject
  const getDragDropData = () => {
    if (lesson.subject === 'math' && lesson.id === 'math-addition') {
      return {
        title: 'Apple Addition!',
        instruction: 'Drag the apples into Riya\'s basket to add them up!',
        items: [
          { id: 'basket-apple1', content: 'Apple', emoji: '🍎' },
          { id: 'basket-apple2', content: 'Apple', emoji: '🍎' },
          { id: 'basket-apple3', content: 'Apple', emoji: '🍎' },
          { id: 'basket-apple4', content: 'Apple', emoji: '🍎' },
          { id: 'basket-apple5', content: 'Apple', emoji: '🍎' },
        ],
        zones: [
          { id: 'basket', label: 'Riya\'s Basket 🧺', emoji: '🧺', color: '#4F9CF9', accepts: 'apple' },
        ],
      };
    }
    if (lesson.subject === 'math' && lesson.id === 'math-shapes') {
      return {
        title: 'Sort the Shapes!',
        instruction: 'Drag each shape to its correct category!',
        items: [
          { id: 'round-circle', content: 'Circle', emoji: '⭕' },
          { id: 'corners-square', content: 'Square', emoji: '🟦' },
          { id: 'corners-triangle', content: 'Triangle', emoji: '🔺' },
          { id: 'round-oval', content: 'Oval', emoji: '⬯' },
          { id: 'corners-rectangle', content: 'Rectangle', emoji: '▬' },
        ],
        zones: [
          { id: 'round', label: 'Round Shapes', emoji: '⭕', color: '#4F9CF9' },
          { id: 'corners', label: 'Shapes with Corners', emoji: '🔺', color: '#FF8C42' },
        ],
      };
    }
    if (lesson.subject === 'evs' && lesson.id === 'evs-animals') {
      return {
        title: 'Animal Habitat Sort!',
        instruction: 'Drag each animal to where it lives!',
        items: [
          { id: 'water-fish', content: 'Fish', emoji: '🐟' },
          { id: 'land-lion', content: 'Lion', emoji: '🦁' },
          { id: 'water-dolphin', content: 'Dolphin', emoji: '🐬' },
          { id: 'land-elephant', content: 'Elephant', emoji: '🐘' },
          { id: 'sky-eagle', content: 'Eagle', emoji: '🦅' },
          { id: 'sky-parrot', content: 'Parrot', emoji: '🦜' },
        ],
        zones: [
          { id: 'water', label: 'Water 🌊', emoji: '🌊', color: '#4F9CF9' },
          { id: 'land', label: 'Land 🌿', emoji: '🌿', color: '#6BCB77' },
          { id: 'sky', label: 'Sky ✈️', emoji: '✈️', color: '#FFD93D' },
        ],
      };
    }
    if (lesson.subject === 'english') {
      return {
        title: 'Build a Sentence!',
        instruction: 'Drag the words to make a correct sentence!',
        items: [
          { id: 'sentence-The', content: 'The', emoji: '📝' },
          { id: 'sentence-cat', content: 'cat', emoji: '🐱' },
          { id: 'sentence-is', content: 'is', emoji: '✨' },
          { id: 'sentence-happy', content: 'happy', emoji: '😊' },
        ],
        zones: [
          { id: 'sentence', label: 'Your Sentence', emoji: '📜', color: '#f093fb' },
        ],
      };
    }
    if (lesson.subject === 'hindi') {
      return {
        title: 'शब्द बनाओ!',
        instruction: 'अक्षरों को सही क्रम में खींचकर शब्द बनाओ!',
        items: [
          { id: 'seb-स', content: 'स', emoji: '' },
          { id: 'seb-े', content: 'े', emoji: '' },
          { id: 'seb-ब', content: 'ब', emoji: '' },
        ],
        zones: [
          { id: 'seb', label: 'सेब (Apple 🍎)', emoji: '🍎', color: '#FF8C42' },
        ],
      };
    }
    if (lesson.subject === 'kannada') {
      return {
        title: 'ಪದ ಮಾಡಿ!',
        instruction: 'ಅಕ್ಷರಗಳನ್ನು ಎಳೆದು ಪದ ಮಾಡಿ!',
        items: [
          { id: 'mavu-ಮ', content: 'ಮ', emoji: '' },
          { id: 'mavu-ಾ', content: 'ಾ', emoji: '' },
          { id: 'mavu-ವು', content: 'ವು', emoji: '' },
        ],
        zones: [
          { id: 'mavu', label: 'ಮಾವು (Mango 🥭)', emoji: '🥭', color: '#43e97b' },
        ],
      };
    }
    // Default
    return {
      title: 'Sort and Match!',
      instruction: 'Drag items to the correct category!',
      items: [
        { id: 'cat1-item1', content: 'Item 1', emoji: '📌' },
        { id: 'cat1-item2', content: 'Item 2', emoji: '📌' },
        { id: 'cat2-item3', content: 'Item 3', emoji: '📍' },
      ],
      zones: [
        { id: 'cat1', label: 'Group A', emoji: '🅰️', color: '#4F9CF9' },
        { id: 'cat2', label: 'Group B', emoji: '🅱️', color: '#6BCB77' },
      ],
    };
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', paddingBottom: 40 }}>
      {/* Lesson header */}
      <div style={{
        background: `linear-gradient(135deg, ${lesson.color}22, ${lesson.color}11)`,
        borderRadius: 24, padding: '24px 28px', marginBottom: 24,
        border: `2px solid ${lesson.color}33`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <span style={{ fontSize: '3rem' }}>{lesson.icon}</span>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#333' }}>{lesson.title}</h1>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="badge badge-blue">Grade 3</span>
              <span className="badge badge-green">+{lesson.xpReward} XP</span>
              <span className="badge" style={{ background: lesson.difficulty === 'easy' ? '#6BCB77' : lesson.difficulty === 'medium' ? '#FFD93D' : '#FF4757', color: lesson.difficulty === 'medium' ? '#333' : 'white' }}>
                {lesson.difficulty === 'easy' ? '⭐ Easy' : lesson.difficulty === 'medium' ? '⭐⭐ Medium' : '⭐⭐⭐ Hard'}
              </span>
            </div>
          </div>
        </div>

        {/* Step progress */}
        <div style={{ marginBottom: 12 }}>
          <div className="progress-bar-outer">
            <div className="progress-bar-inner" style={{ width: `${progressPct}%`, background: `linear-gradient(90deg, ${lesson.color}, #6BCB77)` }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {STEPS.map((step, i) => (
            <div key={step} style={{
              padding: '4px 12px', borderRadius: 50, fontSize: '0.8rem',
              fontWeight: 700, background: i <= stepIdx ? STEP_COLORS[step] : '#E2E8F0',
              color: i <= stepIdx ? 'white' : '#999',
              transition: 'all 0.3s ease',
            }}>
              {STEP_LABELS[step]}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="fun-card" style={{ padding: 32, minHeight: 400 }}>
        {currentStep === 'story' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: '2.5rem', animation: 'float 2s ease-in-out infinite' }}>{lesson.storyCharacter}</span>
              <div>
                <h2 style={{ fontWeight: 900, color: '#333', fontSize: '1.5rem' }}>📖 Story Time!</h2>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>Listen and follow along...</p>
              </div>
            </div>
            <div className="speech-bubble" style={{ marginLeft: 60 }}>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: '#444', fontWeight: 500 }}>
                {lesson.story}
              </p>
            </div>
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <button className="btn-fun btn-blue" onClick={() => speak(lesson.story)}>
                🔊 Read Story to Me
              </button>
            </div>
          </div>
        )}

        {currentStep === 'concept' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: '2.5rem' }}>💡</span>
              <h2 style={{ fontWeight: 900, color: '#333', fontSize: '1.5rem' }}>What Are We Learning?</h2>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #FFFBEB, #FFF9E6)',
              borderRadius: 20, padding: 24, border: '2px solid #FFD93D',
              marginBottom: 20,
            }}>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444', fontWeight: 500 }}>
                {lesson.concept}
              </p>
            </div>
            <button className="btn-fun btn-yellow" onClick={() => speak(lesson.concept)}>
              🔊 Explain to Me
            </button>
          </div>
        )}

        {currentStep === 'activity' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: '2.5rem' }}>🎮</span>
              <h2 style={{ fontWeight: 900, color: '#333', fontSize: '1.5rem' }}>Let's Do It!</h2>
            </div>
            {lesson.activityType === 'drag-drop' || lesson.activityType === 'match' ? (
              <DragDropActivity
                {...getDragDropData()}
                onComplete={(s) => { setActivityDone(true); }}
              />
            ) : lesson.activityType === 'simulation' ? (
              <SimulationActivity lesson={lesson} />
            ) : lesson.activityType === 'tracing' ? (
              <TracingActivity lesson={lesson} />
            ) : (
              <PuzzleActivity lesson={lesson} />
            )}
          </div>
        )}

        {currentStep === 'quiz' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: '2.5rem' }}>❓</span>
              <h2 style={{ fontWeight: 900, color: '#333', fontSize: '1.5rem' }}>Quiz Time!</h2>
            </div>
            <QuizEngine
              questions={lesson.quiz}
              onComplete={(score, total) => {
                setQuizScore(score);
              }}
            />
          </div>
        )}

        {currentStep === 'reallife' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: '2.5rem' }}>🌍</span>
              <h2 style={{ fontWeight: 900, color: '#333', fontSize: '1.5rem' }}>In Real Life!</h2>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #E8F8EA, #F0FFF4)',
              borderRadius: 20, padding: 24, border: '2px solid #6BCB77',
            }}>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}>
                {lesson.realLifeApplication}
              </p>
            </div>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <button className="btn-fun btn-green" onClick={() => speak(lesson.realLifeApplication)}>
                🔊 Tell Me!
              </button>
            </div>
          </div>
        )}

        {currentStep === 'complete' && (
          <div style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ fontSize: '5rem', marginBottom: 20, animation: 'bounce-in 0.5s ease-out' }}>🏆</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 8 }}>Lesson Complete!</h2>
            <p style={{ color: '#666', marginBottom: 24, fontSize: '1.1rem' }}>Fantastic work! You're a superstar learner!</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <div className="fun-card" style={{ padding: '16px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem' }}>⭐</div>
                <div style={{ fontWeight: 900, color: '#333' }}>Stars Earned</div>
                <div style={{ fontSize: '1.5rem', color: '#FFD93D', fontWeight: 900 }}>
                  {quizScore !== null ? (quizScore >= lesson.quiz.length * 0.8 ? 3 : quizScore >= lesson.quiz.length * 0.5 ? 2 : 1) : 3}
                </div>
              </div>
              <div className="fun-card" style={{ padding: '16px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem' }}>⚡</div>
                <div style={{ fontWeight: 900, color: '#333' }}>XP Earned</div>
                <div style={{ fontSize: '1.5rem', color: '#4F9CF9', fontWeight: 900 }}>+{lesson.xpReward}</div>
              </div>
              <div className="fun-card" style={{ padding: '16px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem' }}>🪙</div>
                <div style={{ fontWeight: 900, color: '#333' }}>Coins Earned</div>
                <div style={{ fontSize: '1.5rem', color: '#FF8C42', fontWeight: 900 }}>+10</div>
              </div>
            </div>
            {onComplete && (
              <button className="btn-fun btn-blue" style={{ marginTop: 24, fontSize: '1.1rem' }} onClick={onComplete}>
                🚀 Next Lesson!
              </button>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      {currentStep !== 'complete' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <button className="btn-fun" onClick={goPrev}
            disabled={stepIdx === 0}
            style={{
              background: stepIdx === 0 ? '#E2E8F0' : 'white',
              color: stepIdx === 0 ? '#999' : '#333', border: '2px solid #E2E8F0',
              cursor: stepIdx === 0 ? 'not-allowed' : 'pointer',
            }}>
            ← {t('back')}
          </button>
          <button className="btn-fun btn-blue" onClick={goNext}
            style={{ fontSize: '1rem' }}>
            {stepIdx === STEPS.length - 2 ? '🏁 Finish!' : `${t('next')} →`}
          </button>
        </div>
      )}
    </div>
  );
}

// Mini simulation activities
function SimulationActivity({ lesson }: { lesson: Lesson }) {
  const { speak } = useApp();
  const [plantStage, setPlantStage] = useState(0);
  const [balloons, setBalloons] = useState([8, 5, 9, 7, 4].map((v, i) => ({ id: i, value: v, popped: false })));
  const [targetSum] = useState(8 - 3);

  if (lesson.id === 'evs-plants') {
    const stages = ['🌱', '🌿', '🌱', '🌵', '🌳'];
    const stageLabels = ['Seed', 'Sprout', 'Seedling', 'Young Plant', 'Full Plant'];
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '8rem', marginBottom: 16, animation: 'float 2s ease-in-out infinite' }}>
          {stages[plantStage]}
        </div>
        <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#333', marginBottom: 16 }}>
          Stage: {stageLabels[plantStage]}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['🌞 Give Sunlight', '💧 Water Plant', '🌱 Add Soil', '🌬️ Fresh Air'].map((action) => (
            <button key={action} className="btn-fun btn-green"
              onClick={() => { setPlantStage(prev => Math.min(prev + 1, 4)); speak(action.replace(/[^\w\s]/g, '')); }}>
              {action}
            </button>
          ))}
        </div>
        {plantStage === 4 && (
          <div style={{ marginTop: 24, padding: 16, background: '#E8F8EA', borderRadius: 16 }}>
            <p style={{ fontWeight: 700, color: '#276837', fontSize: '1.2rem' }}>
              🎉 Your plant is fully grown! Plants need love and care, just like us!
            </p>
          </div>
        )}
      </div>
    );
  }

  if (lesson.id === 'math-subtraction') {
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 16 }}>
          Yasmeen has 8 balloons. Pop 3 of them! (Click to pop 🎈)
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
          {balloons.map((b) => (
            <div key={b.id} onClick={() => {
              if (balloons.filter(x => x.popped).length < 3) {
                setBalloons(prev => prev.map(x => x.id === b.id ? { ...x, popped: true } : x));
              }
            }}
              style={{
                width: 60, height: 60, borderRadius: '50%',
                background: b.popped ? '#E2E8F0' : `hsl(${b.id * 60}, 80%, 60%)`,
                cursor: b.popped ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: b.popped ? '1.5rem' : '2rem',
                transition: 'all 0.3s ease', boxShadow: b.popped ? 'none' : '0 4px 16px rgba(0,0,0,0.2)',
                transform: b.popped ? 'scale(0.5)' : 'scale(1)',
              }}>
              {b.popped ? '💥' : '🎈'}
            </div>
          ))}
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#4F9CF9' }}>
          Remaining: {8 - balloons.filter(x => x.popped).length} balloons
        </div>
        {balloons.filter(x => x.popped).length === 3 && (
          <div style={{ marginTop: 16, padding: 16, background: '#E8F8EA', borderRadius: 16 }}>
            <p style={{ fontWeight: 700, color: '#276837' }}>🎉 8 - 3 = {8 - 3}! Correct!</p>
          </div>
        )}
      </div>
    );
  }

  if (lesson.id === 'gk-solar-system') {
    const planets = ['☀️', '🔵', '🟤', '🌍', '🔴', '🟠', '🟡', '🔵', '⚫'];
    const planetNames = ['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ position: 'relative', height: 200, marginBottom: 20, overflow: 'hidden' }}>
          {planets.map((p, i) => (
            <div key={i} style={{
              position: 'absolute', top: '50%',
              left: `${i * 11}%`,
              transform: 'translateY(-50%)',
              fontSize: i === 0 ? '3rem' : '1.5rem',
              animation: i > 0 ? `float ${2 + i * 0.3}s ease-in-out infinite` : 'sparkle 2s ease-in-out infinite',
              cursor: 'pointer',
            }}
              title={planetNames[i]}
              onClick={() => speak(planetNames[i])}>
              {p}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {planetNames.map((name, i) => (
            <button key={name} onClick={() => speak(name)}
              style={{
                padding: '8px 16px', borderRadius: 50, border: '2px solid #E2E8F0',
                background: 'white', cursor: 'pointer', fontWeight: 700,
                fontSize: '0.9rem',
              }}>
              {planets[i]} {name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎯</div>
      <p style={{ fontSize: '1.1rem', color: '#666', fontWeight: 600 }}>
        Interactive simulation for this lesson is loading...
      </p>
    </div>
  );
}

function TracingActivity({ lesson }: { lesson: Lesson }) {
  const letters = lesson.subject === 'hindi'
    ? ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं']
    : ['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಏ', 'ಐ', 'ಓ', 'ಔ', 'ಅಂ'];
  const { speak } = useApp();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      <p style={{ fontWeight: 600, color: '#666', marginBottom: 16 }}>
        Click on each letter to hear its pronunciation! 🔊
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {letters.map((letter, i) => (
          <button key={i} onClick={() => { setSelected(i); speak(letter); }}
            style={{
              width: 64, height: 64, borderRadius: 16, border: '3px solid',
              borderColor: selected === i ? '#4F9CF9' : '#E2E8F0',
              background: selected === i ? '#EBF4FF' : 'white',
              fontSize: '1.8rem', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'serif',
              transform: selected === i ? 'scale(1.15)' : 'scale(1)',
              boxShadow: selected === i ? '0 8px 24px rgba(79,156,249,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
            }}>
            {letter}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div style={{ marginTop: 20, padding: 20, background: '#EBF4FF', borderRadius: 16, border: '2px solid #4F9CF9' }}>
          <div style={{ fontSize: '4rem', marginBottom: 8 }}>{letters[selected]}</div>
          <button className="btn-fun btn-blue" onClick={() => speak(letters[selected])}>
            🔊 Pronounce Again
          </button>
        </div>
      )}
    </div>
  );
}

function PuzzleActivity({ lesson }: { lesson: Lesson }) {
  const { speak } = useApp();
  const puzzles = [
    { emoji: '🍎', question: '2 × ?= 6', answer: '3', options: ['2', '3', '4', '5'] },
    { emoji: '🎯', question: '? × 4 = 8', answer: '2', options: ['2', '3', '4', '6'] },
    { emoji: '🌟', question: '3 × 3 = ?', answer: '9', options: ['6', '7', '8', '9'] },
  ];
  const [current, setCurrent] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const p = puzzles[current];
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: 16 }}>{p.emoji}</div>
      <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#333', marginBottom: 24 }}>{p.question}</h3>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        {p.options.map(opt => (
          <button key={opt} onClick={() => {
            setChosen(opt);
            if (opt === p.answer) speak('Excellent! Correct!');
            else speak('Not quite, try again!');
            setTimeout(() => {
              if (current < puzzles.length - 1) { setCurrent(c => c + 1); setChosen(null); }
              else setDone(true);
            }, 1500);
          }}
            style={{
              width: 70, height: 70, borderRadius: 16, border: '3px solid',
              borderColor: chosen === opt ? (opt === p.answer ? '#6BCB77' : '#FF4757') : '#E2E8F0',
              background: chosen === opt ? (opt === p.answer ? '#E8F8EA' : '#FFEAEA') : 'white',
              fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>
            {opt}
          </button>
        ))}
      </div>
      {done && (
        <div style={{ marginTop: 24, padding: 16, background: '#E8F8EA', borderRadius: 16 }}>
          <p style={{ fontWeight: 700, color: '#276837', fontSize: '1.2rem' }}>🏆 Puzzle Complete! Amazing!</p>
        </div>
      )}
    </div>
  );
}
