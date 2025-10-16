// src/app/layout.tsx
import './globals.css';
// NOTE: Nous n'avons plus besoin d'importer les polices de Next.js
// car elles sont gérées via @font-face dans globals.css
// import { Inter, Montserrat } from 'next/font/google'; 

import { ThemeContext } from '@context/ThemeContext';
import { AuthProvider } from '@context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
// Les polices Next.js ne sont plus utilisées, nous pouvons vider la configuration
// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', weight: ['700', '900'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Nous ne faisons qu'activer la classe 'dark' ici
    // La police et les couleurs sont gérées par globals.css sur le body
    <html lang="fr" suppressHydrationWarning>
      {/* Le body reçoit ses styles de globals.css (background-color: var(--color-bg), color: var(--color-text), font-family: var(--font-sans))
      */}
      <body className="transition-colors duration-300"> 
        
        <ThemeContext>
          <Toaster position="top-right" toastOptions={{ style: { border: '1px solid var(--color-savoora-primary)' } }} />
          <AuthProvider>
            <Header/>
            {children}
            <Footer/>
          </AuthProvider>
        </ThemeContext>
      </body>
    </html>
  );
}