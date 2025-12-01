import React from 'react';
import { Monitor, Smartphone, Apple, Command, Download, Check, Shield } from 'lucide-react';

interface ProductPageProps {
  type: 'windows' | 'macos' | 'android' | 'ios';
  onNavigate: (view: 'downloads') => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ type, onNavigate }) => {
  const content = {
    windows: {
      title: 'Zetsu pour Windows',
      subtitle: 'Protection ultime pour PC & Gaming',
      description: 'Léger, rapide et impitoyable contre les menaces. Optimisé pour Windows 10 et 11 avec un mode jeu dédié.',
      icon: Monitor,
      features: [
        'Protection Anti-Ransomware en temps réel',
        'Mode Jeu sans interruption',
        'Nettoyage de registre intégré',
        'Pare-feu bidirectionnel intelligent'
      ],
      color: 'text-blue-500'
    },
    macos: {
      title: 'Zetsu pour macOS',
      subtitle: 'Design élégant, Sécurité robuste',
      description: 'Conçu nativement pour les puces Apple Silicon. Une protection invisible qui respecte l\'écosystème Mac.',
      icon: Command,
      features: [
        'Optimisé pour puces M1/M2/M3',
        'Protection Time Machine',
        'Bloqueur de traqueurs Safari',
        'Analyse des fichiers en temps réel'
      ],
      color: 'text-gray-300'
    },
    android: {
      title: 'Zetsu Mobile pour Android',
      subtitle: 'Sécurisez votre vie mobile',
      description: 'Protection contre les applications malveillantes, le vol de données et les réseaux Wi-Fi dangereux.',
      icon: Smartphone,
      features: [
        'Scanner d\'applications instantané',
        'Antivol avec géolocalisation',
        'Verrouillage d\'applications (App Lock)',
        'Optimiseur de batterie'
      ],
      color: 'text-green-500'
    },
    ios: {
      title: 'Zetsu Mobile pour iOS',
      subtitle: 'Confidentialité renforcée pour iPhone',
      description: 'Protégez votre identité numérique et naviguez en toute sécurité sur votre iPhone et iPad.',
      icon: Apple,
      features: [
        'Protection Web Anti-Phishing',
        'Vérificateur de mises à jour iOS',
        'Coffre-fort photo sécurisé',
        'Moniteur de fuites de mots de passe'
      ],
      color: 'text-gray-200'
    }
  };

  const data = content[type];
  const Icon = data.icon;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-zetsu-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="flex-1 space-y-6">
            <div className={`w-20 h-20 rounded-2xl bg-gray-800 flex items-center justify-center border border-gray-700 ${data.color}`}>
              <Icon size={48} />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white">{data.title}</h1>
            <p className="text-2xl text-zetsu-accent">{data.subtitle}</p>
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
              {data.description}
            </p>
            <div className="pt-4 flex gap-4">
              <button 
                onClick={() => onNavigate('downloads')}
                className="bg-zetsu-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
              >
                <Download size={20} />
                Télécharger
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-gray-800 to-zetsu-900 rounded-full flex items-center justify-center border border-gray-800 shadow-2xl">
              <Shield className="w-48 h-48 text-zetsu-primary/20 absolute animate-pulse-slow" />
              <Icon className={`w-32 h-32 ${data.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`} />
              
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-4 h-4 bg-zetsu-accent rounded-full animate-bounce"></div>
              <div className="absolute bottom-20 left-10 w-6 h-6 bg-blue-600 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {data.features.map((feature, idx) => (
            <div key={idx} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex items-start gap-4">
              <div className="p-2 bg-zetsu-accent/10 rounded-lg shrink-0">
                <Check className="w-6 h-6 text-zetsu-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{feature}</h3>
                <p className="text-gray-400 text-sm">Fonctionnalité exclusive incluse dans la version {type}.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;