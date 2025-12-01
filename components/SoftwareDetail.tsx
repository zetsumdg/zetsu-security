import React from 'react';
import { ArrowLeft, Download, ShieldCheck, Cpu, HardDrive, Monitor, Calendar, FileBox } from 'lucide-react';
import { Software } from '../types';
import { getIconComponent } from '../utils/iconMap';

interface SoftwareDetailProps {
  software: Software;
  onBack: () => void;
}

const SoftwareDetail: React.FC<SoftwareDetailProps> = ({ software, onBack }) => {
  const Icon = getIconComponent(software.iconName);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-zetsu-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour au catalogue
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-zetsu-800 rounded-2xl flex items-center justify-center border border-gray-700 shadow-lg shrink-0">
                <Icon className="w-12 h-12 text-zetsu-accent" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{software.name}</h1>
                <p className="text-xl text-zetsu-primary mb-4">{software.tagline}</p>
                <div className="flex gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Stable</span>
                  <span className="px-2 py-0.5 bg-gray-800 rounded text-gray-300">v{software.version}</span>
                </div>
              </div>
            </div>

            {/* Hero Image / Screenshot */}
            {software.imageUrl && (
              <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl relative group">
                <img 
                  src={software.imageUrl} 
                  alt={`${software.name} preview`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zetsu-900/80 to-transparent"></div>
              </div>
            )}

            <div className="bg-gray-800/30 border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">À propos</h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-8 whitespace-pre-line">
                {software.fullDescription}
              </p>
              
              <h3 className="text-xl font-bold text-white mb-4">Fonctionnalités Clés</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {software.features && software.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-300">
                    <ShieldCheck className="w-5 h-5 text-zetsu-accent mr-3 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl sticky top-24">
              <a 
                href={software.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-zetsu-primary to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 mb-4"
              >
                <Download className="w-6 h-6" />
                Télécharger Gratuitement
              </a>
              <p className="text-center text-xs text-gray-500 mb-6">
                Lien externe sécurisé.
              </p>

              <div className="space-y-4 border-t border-gray-700 pt-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-2"><FileBox size={16}/> Taille</span>
                  <span className="text-white font-medium">{software.size}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-2"><Calendar size={16}/> Mise à jour</span>
                  <span className="text-white font-medium">{software.lastUpdate}</span>
                </div>
                 <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-2"><Monitor size={16}/> Platforme</span>
                  <span className="text-white font-medium">{software.requirements.os}</span>
                </div>
              </div>
            </div>

            {/* Requirements Card */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Configuration Requise</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                    <Monitor className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                        <span className="block text-gray-400">Système d'exploitation</span>
                        <span className="text-white">{software.requirements.os}</span>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                        <span className="block text-gray-400">Processeur / RAM</span>
                        <span className="text-white">{software.requirements.ram}</span>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <HardDrive className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                        <span className="block text-gray-400">Espace disque</span>
                        <span className="text-white">{software.requirements.storage}</span>
                    </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SoftwareDetail;