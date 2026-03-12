'use client';
import React from 'react';
import { ALL_LESSONS } from '@/lib/data';
import LessonViewer from '@/components/LessonViewer';
import { use } from 'react';

interface PageProps { params: Promise<{ subject: string; lessonId: string }> }

export default function LessonPage({ params }: PageProps) {
  const { subject, lessonId } = use(params);
  const lesson = ALL_LESSONS.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔍</div>
        <h2 style={{ fontSize: '1.5rem', color: '#333' }}>Lesson not found!</h2>
        <a href={`/subjects/${subject}`} className="btn-fun btn-blue" style={{ marginTop: 20, display: 'inline-flex' }}>
          ← Back to Subject
        </a>
      </div>
    );
  }

  const subjectLessons = ALL_LESSONS.filter(l => l.subject === subject);
  const currentIdx = subjectLessons.findIndex(l => l.id === lessonId);
  const nextLesson = subjectLessons[currentIdx + 1];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0F8FF, #E8F4FD)', padding: '24px 24px 60px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <a href={`/subjects/${subject}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: '#4F9CF9', textDecoration: 'none', fontWeight: 700, marginBottom: 24,
        }}>← Back to Lessons</a>
        <LessonViewer
          lesson={lesson}
          onComplete={() => {
            if (nextLesson) {
              window.location.href = `/subjects/${subject}/${nextLesson.id}`;
            } else {
              window.location.href = `/subjects/${subject}`;
            }
          }}
        />
      </div>
    </div>
  );
}
