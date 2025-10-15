import type { Metadata } from 'next';
import React from 'react';
import '../styles/global.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import HomePage from '../app/(public)/page';


export const metadata: Metadata = {
  title: 'Web Tutor Admin',
  description: 'Administration Web Tutor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <div style={{ minHeight: '80vh' }}><HomePage /></div>
        <Footer />
      </body>
    </html>
  );
}

