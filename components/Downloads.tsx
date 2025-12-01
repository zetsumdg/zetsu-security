import React from 'react';
import { Download, ChevronRight } from 'lucide-react';
import { Software } from '../types';
import { getIconComponent } from '../utils/iconMap';

interface DownloadsProps {
  softwareList: Software[];
  onSelectSoftware: (software: Software) => void;
}

const Downloads: React.FC<DownloadsProps> = ({ softwareList, onSelectSoftware }) => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-zetsu-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Centre de <span className="text-transparent bg-clip-text bg-gradient-to-r from-zetsu-accent to-zetsu-primary">Téléchargement</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Accédez à la suite complète des outils Zetsu. Protection, confidentialité et performance réunies en un seul endroit.
          </p>
        </div>

        {softwareList.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p>Aucun logiciel disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softwareList.map((software) => {
              const Icon = getIconComponent(software.iconName);
              return (
                <div 
                  key={software.id} 
                  className="bg-gray-800/40 border border-gray-700 rounded-2xl p-8 hover:border-zetsu-accent/50 transition-all duration-300 hover:bg-gray-800 hover:-translate-y-2 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-zetsu-900 rounded-xl flex items-center justify-center border border-gray-700 shadow-inner">
                      <Icon className="w-8 h-8 text-zetsu-primary" />
                    </div>
                    <span className="bg-gray-900 text-zetsu-accent text-xs font-bold px-3 py-1 rounded-full border border-gray-700">
                      v{software.version}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{software.name}</h3>
                  <p className="text-zetsu-primary text-sm font-medium mb-4">{software.tagline}</p>
                  <p className="text-gray-400 mb-8 flex-1">
                    {software.shortDescription}
                  </p>

                  <div className="flex flex-col gap-3 mt-auto">
                    <button 
                      onClick={() => onSelectSoftware(software)}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group"
                    >
                      Détails & Info
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a 
                      href={software.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-zetsu-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloads;