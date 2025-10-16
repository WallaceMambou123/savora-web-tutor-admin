// app/page.tsx
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function Home() {
  return (
    // Utilisation des classes de fond et de police configurées
    <main className="min-h-screen p-10 
                   
                   transition-colors duration-500 font-sans">
      
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-heading font-display text-savoora-primary">
          Savoora Admin - Thème Prêt
        </h1>
        <ThemeSwitcher />
      </div>

      <p className="text-lg font-sans mb-8">
        Police de corps de texte : Inter. Ce texte utilise `font-sans`.
      </p>

      {/* Test des couleurs fonctionnelles */}
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-savoora-success text-white">
            Cours Validé (Succès)
        </div>
        <div className="p-4 rounded-lg bg-savoora-warning text-gray-900">
            Tuteur en Attente (Attention)
        </div>
        <div className="p-4 rounded-lg bg-savoora-danger text-white">
            Transaction Échouée (Danger)
        </div>
      </div>
    </main>
  );
}