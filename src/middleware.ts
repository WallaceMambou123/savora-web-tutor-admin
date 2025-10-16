// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes publiques (accessibles à tous, même déconnectés)
const PUBLIC_FILE = /\.(.*)$/; 
const PUBLIC_PATHS = ['/login', '/register', '/']; 

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Ne pas exécuter pour les fichiers statiques ou les chemins publics
  if (
    pathname.includes('.') || 
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') // Laisse les API gérer leur propre auth
  ) {
    return NextResponse.next();
  }
  
  // Récupérer le token d'accès
  const accessToken = request.cookies.get('access_token')?.value;

  // 2. Si l'utilisateur n'a pas de token et essaie d'accéder à une page protégée
  if (!accessToken) {
    const loginUrl = new URL('/login', request.url);
    // Redirige l'utilisateur vers la page de connexion
    return NextResponse.redirect(loginUrl);
  }

  // NOTE: La vérification du rôle (Admin vs Tuteur vs Élève) est laissée à l'AuthGuard
  // et aux composants côté client pour des raisons de simplicité de cette architecture.
  // Une vérification du rôle plus stricte nécessiterait un endpoint API léger.

  return NextResponse.next();
}

// Limiter l'exécution du middleware à ces chemins
export const config = {
  matcher: [
    /*
     * Matcher toutes les requêtes, SAUF celles commençant par:
     * - _next/ (fichiers next.js internes)
     * - api/ (routes API)
     * - fichiers statiques
     */
    '/((?!_next|api|static|favicon.ico|assets).*)',
  ],
};