import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context';
import Navbar from '@/components/Navbar';
import CelebrationOverlay from '@/components/CelebrationOverlay';

export const metadata: Metadata = {
  title: 'FunLearn Lab – CBSE Grade 3 Experiential Learning Platform',
  description: 'Interactive educational platform for CBSE Grade 3 students. Learn Mathematics, English, Hindi, Kannada, EVS, and General Knowledge through games, stories, and activities. NEP 2020 aligned.',
  keywords: 'CBSE Grade 3, NEP 2020, educational games, Hindi learning, Kannada learning, Math games, EVS, interactive learning',
  openGraph: {
    title: 'FunLearn Lab – CBSE Grade 3',
    description: 'Learn through fun, stories, and games!',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AppProvider>
          <Navbar />
          <main style={{ paddingTop: 70, minHeight: '100vh' }}>
            {children}
          </main>
          <CelebrationOverlay />
        </AppProvider>
      </body>
    </html>
  );
}
