import React from 'react';
import { LifeBuoy, Book, Activity, Search, Server, Wifi, Database, CheckCircle, AlertTriangle } from 'lucide-react';

interface SupportPageProps {
  view: 'help' | 'kb' | 'status';
}

const SupportPage: React.FC<SupportPageProps> = ({ view }) => {
  if (view === 'status') {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-zetsu-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Activity className="w-16 h-16 text-zetsu-accent mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">État des Services Zetsu</h1>
            <p className="text-gray-400">Suivi en temps réel de nos infrastructures mondiales.</p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8 flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="text-lg font-bold text-green-400">Tous les systèmes sont opérationnels</h3>
              <p className="text-sm text-green-300/70">Dernière mise à jour : il y a 2 minutes</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { name: 'API Principale', icon: Server, status: 'operational' },
              { name: 'Serveurs VPN (Europe)', icon: Wifi, status: 'operational' },
              { name: 'Serveurs VPN (Asie)', icon: Wifi, status: 'degraded' },
              { name: 'Serveurs VPN (Amériques)', icon: Wifi, status: 'operational' },
              { name: 'Base de données des menaces', icon: Database, status: 'operational' },
              { name: 'Portail Client', icon: LifeBuoy, status: 'operational' },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between border border-gray-700">
                <div className="flex items-center gap-4">
                  <item.icon className="text-gray-400" size={20} />
                  <span className="text-white font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.status === 'operational' ? (
                    <>
                      <span className="text-sm text-green-500">Opérationnel</span>
                      <CheckCircle size={16} className="text-green-500" />
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-yellow-500">Performance dégradée</span>
                      <AlertTriangle size={16} className="text-yellow-500" />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'kb') {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-zetsu-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Book className="w-16 h-16 text-zetsu-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Base de Connaissances</h1>
            <div className="relative max-w-xl mx-auto">
              <input 
                type="text" 
                placeholder="Rechercher un article..." 
                className="w-full bg-gray-800 border border-gray-600 rounded-full py-3 px-6 pl-12 text-white focus:ring-2 focus:ring-zetsu-primary focus:outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Installation & Démarrage', count: 12 },
              { title: 'Configuration du VPN', count: 8 },
              { title: 'Gestion du compte', count: 5 },
              { title: 'Résolution des problèmes', count: 15 },
              { title: 'Facturation & Abonnements', count: 6 },
              { title: 'Sécurité Mobile', count: 9 },
            ].map((cat, idx) => (
              <div key={idx} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-750 border border-gray-700 hover:border-zetsu-primary/50 transition-colors cursor-pointer group">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-zetsu-primary transition-colors">{cat.title}</h3>
                <p className="text-gray-400 text-sm">{cat.count} articles disponibles</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default: Help Center
  return (
    <div className="pt-24 pb-16 min-h-screen bg-zetsu-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <LifeBuoy className="w-16 h-16 text-zetsu-accent mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Comment pouvons-nous vous aider ?</h1>
          <p className="text-xl text-gray-400">Notre équipe d'experts est disponible 24/7 pour vous assister.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 text-center hover:-translate-y-1 transition-transform">
            <Book className="w-10 h-10 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Documentation</h3>
            <p className="text-gray-400 mb-6">Consultez nos guides détaillés pour installer et configurer Zetsu.</p>
            <button className="text-zetsu-accent font-semibold hover:underline">Accéder aux guides</button>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 text-center hover:-translate-y-1 transition-transform">
            <Activity className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Forum Communautaire</h3>
            <p className="text-gray-400 mb-6">Rejoignez la discussion avec d'autres utilisateurs et experts.</p>
            <button className="text-zetsu-accent font-semibold hover:underline">Voir le forum</button>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 text-center hover:-translate-y-1 transition-transform">
            <LifeBuoy className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Support Premium</h3>
            <p className="text-gray-400 mb-6">Pour les abonnés Pro et Omni, obtenez une assistance prioritaire.</p>
            <button className="text-zetsu-accent font-semibold hover:underline">Ouvrir un ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;