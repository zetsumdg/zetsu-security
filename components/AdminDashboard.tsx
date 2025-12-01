import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  TrendingUp,
  ShieldAlert,
  Download,
  Activity,
  Loader2,
  MapPin,
  Globe,
  Map,
  Navigation,
  Crosshair
} from 'lucide-react';
import { Software, VisitorLog } from '../types';
import { db } from '../services/db';
import { availableIcons, getIconComponent } from '../utils/iconMap';

interface AdminDashboardProps {
  softwares: Software[];
  setSoftwares: React.Dispatch<React.SetStateAction<Software[]>>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ softwares, setSoftwares, onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'users' | 'location'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [currentSoftware, setCurrentSoftware] = useState<Partial<Software>>({});
  const [loading, setLoading] = useState(false);
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);

  // Load Visitors data when admin loads or tab changes
  useEffect(() => {
    if (isAuthenticated) {
      const loadVisitors = async () => {
        const data = await db.getVisitors();
        setVisitors(data);
      };
      loadVisitors();
      
      // Auto refresh every 30s
      const interval = setInterval(loadVisitors, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, activeTab]);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Mot de passe incorrect (Indice: admin)');
    }
  };

  // CRUD Handlers
  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce logiciel ?')) {
      setLoading(true);
      try {
        await db.delete(id);
        setSoftwares(prev => prev.filter(s => s.id !== id));
      } catch (error) {
        alert("Erreur lors de la suppression");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (software: Software) => {
    setCurrentSoftware({ ...software });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentSoftware({
      name: '',
      tagline: '',
      shortDescription: '',
      fullDescription: '',
      version: '1.0.0',
      size: '0 MB',
      lastUpdate: new Date().toLocaleDateString(),
      iconName: 'ShieldAlert',
      downloadUrl: '',
      imageUrl: '',
      features: [],
      requirements: { os: 'Windows 10', ram: '4GB', storage: '1GB' }
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!currentSoftware.name) return;
    
    setLoading(true);
    try {
      if (currentSoftware.id) {
        // Update
        await db.update(currentSoftware.id, currentSoftware);
        setSoftwares(prev => prev.map(s => s.id === currentSoftware.id ? currentSoftware as Software : s));
      } else {
        // Create
        const newId = await db.create(currentSoftware as Omit<Software, 'id'>);
        const newSoftware = { ...currentSoftware, id: newId } as Software;
        setSoftwares(prev => [...prev, newSoftware]);
      }
      setIsEditing(false);
      setCurrentSoftware({});
    } catch (error) {
      alert("Erreur lors de la sauvegarde");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Stats Calculation
  const uniqueCountries = new Set(visitors.map(v => v.country)).size;
  const gpsVisitors = visitors.filter(v => v.locationMethod === 'GPS').length;

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zetsu-900 flex items-center justify-center px-4">
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Administration Zetsu</h2>
            <p className="text-gray-400 text-sm">Accès sécurisé réservé au personnel autorisé</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Code d'accès</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-zetsu-accent focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-zetsu-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Interface
  return (
    <div className="min-h-screen bg-zetsu-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <span className="text-xl font-bold text-white tracking-wider">ZETSU<span className="text-zetsu-accent">ADMIN</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-zetsu-primary/10 text-zetsu-primary' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <LayoutDashboard size={20} />
            Vue d'ensemble
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-zetsu-primary/10 text-zetsu-primary' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Package size={20} />
            Logiciels
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-zetsu-primary/10 text-zetsu-primary' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Users size={20} />
            Utilisateurs & Trafic
          </button>
          <button 
            onClick={() => setActiveTab('location')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'location' ? 'bg-zetsu-primary/10 text-zetsu-primary' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Map size={20} />
            Localisation
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/10 rounded-lg transition-colors">
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        {loading && (
          <div className="absolute inset-0 bg-zetsu-900/80 z-50 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-zetsu-accent animate-spin" />
          </div>
        )}
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white capitalize">{activeTab === 'overview' ? 'Tableau de Bord' : activeTab}</h1>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 text-sm">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               Système Opérationnel
             </div>
             <button onClick={onLogout} className="md:hidden p-2 text-gray-400"><LogOut size={20}/></button>
          </div>
        </header>

        {/* Tab Content: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Logiciels Actifs</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{softwares.length}</h3>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Package className="text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Visites Totales</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{visitors.length}</h3>
                  </div>
                  <div className="p-3 bg-red-500/10 rounded-lg">
                    <Activity className="text-red-500" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Pays Uniques</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{uniqueCountries}</h3>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <Globe className="text-purple-500" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Précision GPS</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{gpsVisitors}</h3>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <Crosshair className="text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Products */}
        {activeTab === 'products' && (
          <div>
            {!isEditing ? (
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="text" 
                      placeholder="Rechercher..." 
                      className="bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-zetsu-primary"
                    />
                  </div>
                  <button 
                    onClick={handleAddNew}
                    className="bg-zetsu-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Plus size={18} />
                    Ajouter un logiciel
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-gray-900/50 text-xs uppercase font-medium">
                      <tr>
                        <th className="px-6 py-4">Nom</th>
                        <th className="px-6 py-4">Version</th>
                        <th className="px-6 py-4">Taille</th>
                        <th className="px-6 py-4">Mise à jour</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {softwares.map((software) => {
                        const Icon = getIconComponent(software.iconName);
                        return (
                          <tr key={software.id} className="hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 text-white font-medium flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-zetsu-900 flex items-center justify-center border border-gray-600">
                                <Icon size={16} className="text-zetsu-accent" />
                              </div>
                              {software.name}
                            </td>
                            <td className="px-6 py-4">{software.version}</td>
                            <td className="px-6 py-4">{software.size}</td>
                            <td className="px-6 py-4">{software.lastUpdate}</td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => handleEdit(software)}
                                  className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                                >
                                  <Edit2 size={18} />
                                </button>
                                <button 
                                  onClick={() => handleDelete(software.id)}
                                  className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">{currentSoftware.id ? 'Modifier le logiciel' : 'Nouveau logiciel'}</h3>
                  <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Nom du produit</label>
                      <input 
                        type="text" 
                        value={currentSoftware.name || ''} 
                        onChange={e => setCurrentSoftware({...currentSoftware, name: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Version</label>
                      <input 
                        type="text" 
                        value={currentSoftware.version || ''} 
                        onChange={e => setCurrentSoftware({...currentSoftware, version: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Slogan (Tagline)</label>
                    <input 
                      type="text" 
                      value={currentSoftware.tagline || ''} 
                      onChange={e => setCurrentSoftware({...currentSoftware, tagline: e.target.value})}
                      className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white"
                    />
                  </div>

                  {/* Icon Selector */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Icône</label>
                    <div className="flex flex-wrap gap-2 bg-gray-900 border border-gray-600 rounded p-2">
                       {availableIcons.map(iconName => {
                         const Icon = getIconComponent(iconName);
                         const isSelected = currentSoftware.iconName === iconName;
                         return (
                           <button
                             key={iconName}
                             onClick={() => setCurrentSoftware({...currentSoftware, iconName: iconName})}
                             className={`p-2 rounded hover:bg-gray-700 transition-colors ${isSelected ? 'bg-zetsu-primary text-white ring-2 ring-offset-1 ring-offset-gray-900 ring-zetsu-primary' : 'text-gray-400'}`}
                             title={iconName}
                             type="button"
                           >
                             <Icon size={20} />
                           </button>
                         )
                       })}
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Description courte</label>
                    <textarea 
                      value={currentSoftware.shortDescription || ''} 
                      onChange={e => setCurrentSoftware({...currentSoftware, shortDescription: e.target.value})}
                      className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white h-16"
                    />
                  </div>

                   <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Description complète</label>
                    <textarea 
                      value={currentSoftware.fullDescription || ''} 
                      onChange={e => setCurrentSoftware({...currentSoftware, fullDescription: e.target.value})}
                      className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white h-32"
                    />
                  </div>

                  {/* Technical Specs */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Taille</label>
                      <input 
                        type="text" 
                        value={currentSoftware.size || ''} 
                        onChange={e => setCurrentSoftware({...currentSoftware, size: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div className="col-span-2">
                       <label className="block text-xs font-medium text-gray-400 mb-1">Dernière mise à jour</label>
                      <input 
                        type="text" 
                        value={currentSoftware.lastUpdate || ''} 
                        onChange={e => setCurrentSoftware({...currentSoftware, lastUpdate: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  {/* URLs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">URL de téléchargement</label>
                      <input 
                        type="text" 
                        value={currentSoftware.downloadUrl || ''} 
                        onChange={e => setCurrentSoftware({...currentSoftware, downloadUrl: e.target.value})}
                        placeholder="https://..."
                        className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">URL Image (Aperçu)</label>
                      <input 
                        type="text" 
                        value={currentSoftware.imageUrl || ''} 
                        onChange={e => setCurrentSoftware({...currentSoftware, imageUrl: e.target.value})}
                         placeholder="https://..."
                        className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3 border-t border-gray-700 mt-4">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                      type="button"
                    >
                      Annuler
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-4 py-2 bg-zetsu-primary hover:bg-blue-600 text-white rounded-lg flex items-center gap-2"
                      type="button"
                    >
                      {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

         {/* Tab Content: Users / Traffic */}
         {activeTab === 'users' && (
           <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
             <div className="p-6 border-b border-gray-700">
               <h3 className="text-xl font-bold text-white">Journal des Visiteurs</h3>
               <p className="text-gray-400 text-sm mt-1">Traçage IP en temps réel des connexions au portail Zetsu.</p>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm text-gray-400">
                 <thead className="bg-gray-900/50 text-xs uppercase font-medium">
                   <tr>
                     <th className="px-6 py-4">IP / FAI</th>
                     <th className="px-6 py-4">Localisation</th>
                     <th className="px-6 py-4">Pays</th>
                     <th className="px-6 py-4">Méthode</th>
                     <th className="px-6 py-4">Date</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-700">
                   {visitors.length === 0 ? (
                     <tr>
                       <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                         Aucune donnée de visite enregistrée.
                       </td>
                     </tr>
                   ) : (
                     visitors.map((visitor) => (
                       <tr key={visitor.id} className="hover:bg-gray-700/50 transition-colors">
                         <td className="px-6 py-4">
                           <div className="font-mono text-white mb-1">{visitor.ip}</div>
                           <div className="text-xs text-gray-500">{visitor.isp}</div>
                         </td>
                         <td className="px-6 py-4 flex items-center gap-2">
                            <MapPin size={14} className="text-zetsu-accent"/>
                            {visitor.city}
                         </td>
                         <td className="px-6 py-4">
                           <span className="inline-flex items-center gap-2 px-2 py-1 rounded bg-gray-700 text-gray-200 text-xs border border-gray-600">
                             {visitor.countryCode}
                           </span>
                           <span className="ml-2">{visitor.country}</span>
                         </td>
                         <td className="px-6 py-4">
                           {visitor.locationMethod === 'GPS' ? (
                             <span className="inline-flex items-center gap-1 text-green-400 bg-green-900/20 px-2 py-0.5 rounded text-xs border border-green-800">
                               <Crosshair size={12}/> GPS
                             </span>
                           ) : (
                             <span className="inline-flex items-center gap-1 text-gray-400 bg-gray-800 px-2 py-0.5 rounded text-xs">
                               <Globe size={12}/> IP
                             </span>
                           )}
                         </td>
                         <td className="px-6 py-4 text-xs font-mono">
                           {new Date(visitor.timestamp).toLocaleString('fr-FR')}
                         </td>
                       </tr>
                     ))
                   )}
                 </tbody>
               </table>
             </div>
           </div>
         )}

         {/* Tab Content: Location (New) */}
         {activeTab === 'location' && (
           <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Map className="text-zetsu-accent" />
                  Localisation Précise
                </h3>
                <p className="text-gray-400 text-sm">
                  Visualisez les visiteurs ayant donné leur consentement pour la géolocalisation haute précision.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {visitors.filter(v => v.locationMethod === 'GPS').length === 0 ? (
                   <div className="bg-gray-800/50 border border-gray-700 border-dashed rounded-xl p-12 text-center">
                     <Crosshair className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                     <h4 className="text-lg font-bold text-gray-400">Aucune donnée GPS disponible</h4>
                     <p className="text-gray-500 mt-2">Les visiteurs n'ont pas encore accepté la demande de géolocalisation.</p>
                   </div>
                ) : (
                  visitors.filter(v => v.locationMethod === 'GPS').map(visitor => (
                    <div key={visitor.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-500/10 rounded-full border border-green-500/20">
                          <Navigation className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-lg font-bold text-white">{visitor.ip}</span>
                            <span className="px-2 py-0.5 rounded text-xs bg-gray-700 text-gray-300">{visitor.country}</span>
                          </div>
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                             <MapPin size={14} className="text-zetsu-accent" />
                             {visitor.city} (Précision: ~{Math.round(visitor.accuracy || 0)}m)
                          </p>
                          <p className="text-xs text-gray-500 mt-1 font-mono">
                             Lat: {visitor.latitude?.toFixed(6)}, Long: {visitor.longitude?.toFixed(6)}
                          </p>
                        </div>
                      </div>
                      
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${visitor.latitude},${visitor.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-semibold shadow-lg shadow-blue-900/20"
                      >
                        <Map size={18} />
                        Voir sur la carte
                      </a>
                    </div>
                  ))
                )}
              </div>
           </div>
         )}
      </main>
    </div>
  );
};

export default AdminDashboard;