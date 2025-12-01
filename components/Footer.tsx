import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-zetsu-900 border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-zetsu-accent" />
              <span className="text-white font-bold text-lg">ZETSU</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Protection cybernétique de nouvelle génération. Nous sécurisons ce qui compte le plus pour vous dans un monde connecté.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><button onClick={() => onNavigate('product-windows')} className="hover:text-zetsu-accent transition-colors text-left">Windows</button></li>
              <li><button onClick={() => onNavigate('product-macos')} className="hover:text-zetsu-accent transition-colors text-left">macOS</button></li>
              <li><button onClick={() => onNavigate('product-android')} className="hover:text-zetsu-accent transition-colors text-left">Android</button></li>
              <li><button onClick={() => onNavigate('product-ios')} className="hover:text-zetsu-accent transition-colors text-left">iOS</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><button onClick={() => onNavigate('support-help')} className="hover:text-zetsu-accent transition-colors text-left">Centre d'aide</button></li>
              <li><button onClick={() => onNavigate('support-kb')} className="hover:text-zetsu-accent transition-colors text-left">Base de connaissances</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-zetsu-accent transition-colors text-left">Contact</button></li>
              <li><button onClick={() => onNavigate('support-status')} className="hover:text-zetsu-accent transition-colors text-left">État du service</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><button onClick={() => onNavigate('legal-privacy')} className="hover:text-zetsu-accent transition-colors text-left">Confidentialité</button></li>
              <li><button onClick={() => onNavigate('legal-terms')} className="hover:text-zetsu-accent transition-colors text-left">Conditions d'utilisation</button></li>
              <li><button onClick={() => onNavigate('legal-cookies')} className="hover:text-zetsu-accent transition-colors text-left">Cookies</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Zetsu Security Inc. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 items-center">
            <button 
              onClick={() => onNavigate('admin')}
              className="text-gray-700 hover:text-gray-500 transition-colors text-xs uppercase font-bold tracking-wider"
            >
              Accès Administrateur
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;