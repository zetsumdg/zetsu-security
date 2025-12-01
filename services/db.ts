import { Software, VisitorLog } from '../types';

const BASE_URL = 'https://zetsu-4e871-default-rtdb.firebaseio.com';

export const db = {
  getAll: async (): Promise<Software[]> => {
    try {
      const res = await fetch(`${BASE_URL}/softwares.json`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      
      if (!data) return [];
      
      // Convert Firebase object { key: val } to Array [ {id: key, ...val} ]
      return Object.keys(data).map(key => ({
        ...data[key],
        id: key
      }));
    } catch (error) {
      console.error("Firebase fetch error:", error);
      return [];
    }
  },

  create: async (software: Omit<Software, 'id'>) => {
    try {
      const res = await fetch(`${BASE_URL}/softwares.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(software)
      });
      const data = await res.json();
      return data.name; // returns the new ID
    } catch (error) {
      console.error("Firebase create error:", error);
      throw error;
    }
  },

  update: async (id: string, software: Partial<Software>) => {
    try {
      // Don't send the ID in the body
      const { id: _, ...rest } = software;
      
      await fetch(`${BASE_URL}/softwares/${id}.json`, {
        method: 'PATCH', // PATCH updates only provided fields
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rest)
      });
    } catch (error) {
      console.error("Firebase update error:", error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      await fetch(`${BASE_URL}/softwares/${id}.json`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error("Firebase delete error:", error);
      throw error;
    }
  },

  // --- Visitor Logging ---

  logVisitor: async (visitorData: Omit<VisitorLog, 'id'>): Promise<string | null> => {
    try {
      const res = await fetch(`${BASE_URL}/visitors.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...visitorData, locationMethod: 'IP' })
      });
      const data = await res.json();
      return data.name; // Return the Firebase ID
    } catch (error) {
      // Fail silently for analytics to not disrupt user experience
      console.error("Visitor log error:", error);
      return null;
    }
  },

  updateVisitor: async (id: string, data: Partial<VisitorLog>) => {
    try {
      await fetch(`${BASE_URL}/visitors/${id}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error("Visitor update error:", error);
    }
  },

  getVisitors: async (): Promise<VisitorLog[]> => {
    try {
      const res = await fetch(`${BASE_URL}/visitors.json`);
      if (!res.ok) return []; // Return empty if node doesn't exist yet
      const data = await res.json();
      
      if (!data) return [];
      
      // Convert and sort by timestamp (newest first)
      return Object.keys(data)
        .map(key => ({ ...data[key], id: key }))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (error) {
      console.error("Fetch visitors error:", error);
      return [];
    }
  }
};

// Initial Seed Data for when DB is empty
export const initialSoftwareSeed: Omit<Software, 'id'>[] = [
  {
    name: 'Zetsu Antivirus Pro',
    tagline: 'Protection virale de nouvelle génération',
    shortDescription: 'Notre solution phare. Détecte et neutralise les virus, malwares, et spywares en temps réel grâce à l\'analyse heuristique IA.',
    fullDescription: 'Zetsu Antivirus Pro redéfinit la sécurité personnelle. Contrairement aux antivirus traditionnels basés sur des signatures, Zetsu utilise le moteur "Neural Core" pour analyser le comportement des logiciels en temps réel. Il est capable de stopper les attaques "Zero-Day" avant même qu\'elles ne soient répertoriées. Son interface minimaliste cache une puissance de feu redoutable contre les menaces modernes.',
    version: '4.2.1',
    size: '145 MB',
    lastUpdate: '12 Octobre 2023',
    iconName: 'ShieldAlert',
    downloadUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
    features: ['Scanner en temps réel', 'Protection Anti-Ransomware', 'Isolation Sandbox', 'Nettoyage automatique'],
    requirements: {
      os: 'Windows 10/11, macOS 12+',
      ram: '4 GB minimum',
      storage: '2 GB d\'espace libre'
    }
  },
  {
    name: 'Zetsu Ghost VPN',
    tagline: 'Anonymat total et sans frontières',
    shortDescription: 'Naviguez sans laisser de trace. Chiffrement militaire et serveurs ultra-rapides dans 90 pays.',
    fullDescription: 'Zetsu Ghost VPN crée un tunnel chiffré impénétrable entre votre appareil et Internet. Que vous soyez sur un Wi-Fi public ou chez vous, vos données restent privées. Nous appliquons une politique stricte de "No-Logs" : nous ne savons pas ce que vous faites, et personne d\'autre ne le peut.',
    version: '2.5.0',
    size: '65 MB',
    lastUpdate: '28 Septembre 2023',
    iconName: 'Globe',
    downloadUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1470',
    features: ['Chiffrement AES-256', 'Kill Switch automatique', 'Serveurs P2P dédiés', 'Protocole WireGuard'],
    requirements: {
      os: 'Windows, macOS, iOS, Android',
      ram: '2 GB',
      storage: '200 MB'
    }
  },
  {
    name: 'Zetsu KeyVault',
    tagline: 'Gérez vos secrets en toute sécurité',
    shortDescription: 'Un coffre-fort numérique pour vos mots de passe, cartes bancaires et documents sensibles.',
    fullDescription: 'Ne retenez plus jamais un mot de passe complexe. Zetsu KeyVault génère, stocke et remplit automatiquement vos identifiants avec une sécurité de niveau bancaire. Seul votre mot de passe maître (que nous ne stockons pas) peut déverrouiller votre coffre.',
    version: '1.8.4',
    size: '45 MB',
    lastUpdate: '05 Novembre 2023',
    iconName: 'Lock',
    downloadUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=2070',
    features: ['Générateur de mots de passe forts', 'Partage sécurisé', 'Authentification biométrique', 'Scanner de fuites de données'],
    requirements: {
      os: 'Toutes plateformes (Extension navigateur incluse)',
      ram: '1 GB',
      storage: '100 MB'
    }
  },
  {
    name: 'Zetsu System Boost',
    tagline: 'Optimisation PC intelligente',
    shortDescription: 'Nettoyez les fichiers inutiles et boostez les performances de votre machine pour le gaming.',
    fullDescription: 'Votre PC ralentit ? Zetsu System Boost identifie les goulots d\'étranglement, nettoie le registre, supprime les fichiers temporaires et optimise les processus d\'arrière-plan pour libérer toute la puissance de votre matériel, idéal pour les sessions de jeu intenses.',
    version: '3.1.2',
    size: '30 MB',
    lastUpdate: '15 Août 2023',
    iconName: 'Zap',
    downloadUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?auto=format&fit=crop&q=80&w=2070',
    features: ['Nettoyeur de registre', 'Optimiseur de RAM', 'Mode Jeu', 'Mise à jour de pilotes'],
    requirements: {
      os: 'Windows 10/11',
      ram: '4 GB',
      storage: '500 MB'
    }
  }
];