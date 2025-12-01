import React from 'react';
import { Scale, FileText, Cookie } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
}

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const content = {
    privacy: {
      title: 'Politique de Confidentialité',
      icon: FileText,
      lastUpdated: '15 Octobre 2023',
      text: `Chez Zetsu, la confidentialité n'est pas une option, c'est notre fondation.

1. COLLECTE DE DONNÉES
Nous ne collectons que le strict nécessaire pour faire fonctionner nos services. Nous ne vendons jamais vos données à des tiers.

2. LOGS VPN
Zetsu opère sous une politique stricte de "Zero-Logs". Cela signifie que nous n'enregistrons pas :
- Votre adresse IP d'origine
- Les sites que vous visitez
- La durée de vos sessions
- La bande passante utilisée

3. DONNÉES DE PAIEMENT
Les paiements sont traités par des processeurs sécurisés (Stripe/PayPal). Zetsu n'a jamais accès à vos numéros de carte bancaire complets.

4. SÉCURITÉ
Toutes nos infrastructures sont chiffrées. Même en cas de saisie physique de nos serveurs, aucune donnée utilisateur ne peut être extraite grâce à notre architecture RAM-only.`
    },
    terms: {
      title: 'Conditions d\'Utilisation',
      icon: Scale,
      lastUpdated: '1er Septembre 2023',
      text: `Bienvenue sur Zetsu. En utilisant nos logiciels, vous acceptez les conditions suivantes :

1. LICENCE
Nous vous accordons une licence limitée, non exclusive et révocable pour utiliser le logiciel Zetsu à des fins personnelles ou professionnelles selon votre abonnement.

2. USAGE INTERDIT
Vous ne devez pas utiliser Zetsu pour :
- Des activités illégales
- Diffuser des malwares
- Violer des droits d'auteur
- Attaquer des infrastructures réseau

3. RÉSILIATION
Nous nous réservons le droit de suspendre votre compte sans préavis en cas de violation de ces termes.

4. LIMITATION DE RESPONSABILITÉ
Zetsu est fourni "tel quel". Bien que nous visons l'excellence, nous ne pouvons garantir une protection à 100% contre toutes les menaces futures inconnues.`
    },
    cookies: {
      title: 'Politique des Cookies',
      icon: Cookie,
      lastUpdated: '20 Juin 2023',
      text: `Cette page explique comment nous utilisons les cookies sur le site zetsu-security.com.

1. QU'EST-CE QU'UN COOKIE ?
Un petit fichier texte stocké sur votre appareil pour améliorer votre expérience de navigation.

2. COOKIES ESSENTIELS
Nécessaires au fonctionnement du site (panier d'achat, connexion espace client). Ils ne peuvent pas être désactivés.

3. COOKIES ANALYTIQUES
Nous utilisons des outils anonymisés pour comprendre comment le site est utilisé et l'améliorer.

4. GESTION
Vous pouvez désactiver les cookies non-essentiels dans les paramètres de votre navigateur ou via notre bandeau de consentement.`
    }
  };

  const data = content[type];
  const Icon = data.icon;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-zetsu-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-700 pb-8">
            <div className="p-3 bg-zetsu-900 rounded-lg border border-gray-700">
              <Icon className="w-8 h-8 text-zetsu-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{data.title}</h1>
              <p className="text-gray-400 text-sm mt-1">Dernière mise à jour : {data.lastUpdated}</p>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none text-gray-300">
            <div className="whitespace-pre-wrap font-sans leading-relaxed">
              {data.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;