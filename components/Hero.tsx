import React from 'react';
import { ShieldCheck, Lock, Cpu } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: 'downloads') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative overflow-hidden pt-20 lg:pt-28 pb-16 lg:pb-32">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-zetsu-accent/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 backdrop-blur-sm mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm text-gray-300 font-medium">Version 4.0 avec Moteur IA Gemini</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          Sécurité Ultime pour <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zetsu-accent to-zetsu-primary">
            L'Ère Numérique
          </span>
        </h1>

        <p className="max-w-2xl text-xl text-gray-400 mb-10 leading-relaxed">
          Zetsu combine une heuristique avancée et l'intelligence artificielle pour bloquer les menaces avant qu'elles n'atteignent votre système. Rapide, léger, impénétrable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button 
            onClick={() => onNavigate('downloads')}
            className="bg-white text-zetsu-900 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            Téléchargement Gratuit
          </button>
          <button className="bg-transparent border border-gray-600 text-white hover:border-zetsu-accent hover:text-zetsu-accent font-semibold py-4 px-8 rounded-lg text-lg transition-all flex items-center justify-center gap-2">
            <Cpu className="w-5 h-5" />
            Voir la Démo
          </button>
        </div>

        {/* Stats / Trust indicators */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-gray-400 border-t border-gray-800 pt-8 w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <Lock className="w-8 h-8 text-zetsu-accent mb-2" />
            <span className="text-2xl font-bold text-white">10M+</span>
            <span className="text-sm">Menaces Bloquées/Jour</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-8 h-8 text-zetsu-primary mb-2" />
            <span className="text-2xl font-bold text-white">99.9%</span>
            <span className="text-sm">Taux de Détection</span>
          </div>
          <div className="flex flex-col items-center">
            <Cpu className="w-8 h-8 text-purple-500 mb-2" />
            <span className="text-2xl font-bold text-white">0%</span>
            <span className="text-sm">Impact Performance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;