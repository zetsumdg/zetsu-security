import React from 'react';
import { ShieldAlert, Zap, Globe, Lock, Eye, Server } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: '1',
    title: 'Bouclier Temps Réel',
    description: 'Surveillance active des fichiers et processus. Bloque les ransomwares avant le chiffrement.',
    icon: ShieldAlert
  },
  {
    id: '2',
    title: 'Performance Maximale',
    description: 'Conçu pour les gamers et les pros. Mode silencieux intelligent qui libère vos ressources CPU.',
    icon: Zap
  },
  {
    id: '3',
    title: 'VPN Haut débit',
    description: 'Naviguez anonymement avec notre réseau mondial de serveurs chiffrés AES-256.',
    icon: Globe
  },
  {
    id: '4',
    title: 'Coffre-fort Numérique',
    description: 'Stockez vos mots de passe et documents sensibles dans un espace ultra-sécurisé.',
    icon: Lock
  },
  {
    id: '5',
    title: 'Anti-Tracking',
    description: 'Empêche les annonceurs et les sites web de collecter vos données personnelles.',
    icon: Eye
  },
  {
    id: '6',
    title: 'Pare-feu Intelligent',
    description: 'Filtre le trafic entrant et sortant pour stopper les intrusions réseau.',
    icon: Server
  }
];

const Features: React.FC = () => {
  return (
    <div id="features" className="py-24 bg-zetsu-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            L'Arsenal <span className="text-zetsu-primary">Complet</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Zetsu n'est pas juste un antivirus. C'est une suite complète d'outils cybernétiques conçus pour vous rendre invisible et invincible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="group p-8 bg-gray-800/30 rounded-2xl border border-gray-700 hover:border-zetsu-primary/50 transition-all duration-300 hover:bg-gray-800/50 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gray-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-gray-700 group-hover:border-zetsu-primary/30">
                <feature.icon className="w-8 h-8 text-zetsu-primary group-hover:text-zetsu-accent transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-zetsu-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;