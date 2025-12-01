import React, { useState } from 'react';
import { Shield, Menu, X, Download, LayoutGrid } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'downloads') => void;
  currentView: 'home' | 'downloads' | 'detail';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'downloads', hash?: string) => {
    onNavigate(view);
    setIsOpen(false);
    if (hash && view === 'home') {
      setTimeout(() => {
        const element = document.querySelector(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-zetsu-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer" 
              onClick={() => handleNavClick('home')}
            >
              <Shield className="h-8 w-8 text-zetsu-accent" />
              <span className="text-white font-bold text-xl tracking-wider">ZETSU</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button 
                  onClick={() => handleNavClick('home')} 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'home' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                >
                  Accueil
                </button>
                <button 
                  onClick={() => handleNavClick('downloads')} 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${currentView === 'downloads' || currentView === 'detail' ? 'text-zetsu-accent' : 'text-gray-300 hover:text-white'}`}
                >
                  <LayoutGrid size={16} />
                  Logiciels
                </button>
                <button 
                  onClick={() => handleNavClick('home', '#features')} 
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Fonctionnalités
                </button>
                <button 
                  onClick={() => handleNavClick('home', '#pricing')} 
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Tarifs
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <button 
              onClick={() => handleNavClick('downloads')}
              className="bg-gradient-to-r from-zetsu-primary to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              <Download size={18} />
              Télécharger
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-zetsu-800 border-b border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <button onClick={() => handleNavClick('home')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Accueil</button>
             <button onClick={() => handleNavClick('downloads')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Logiciels</button>
            <button onClick={() => handleNavClick('home', '#features')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Fonctionnalités</button>
            <button onClick={() => handleNavClick('home', '#pricing')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Tarifs</button>
            <button 
              onClick={() => handleNavClick('downloads')}
              className="w-full mt-4 bg-gradient-to-r from-zetsu-primary to-cyan-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Télécharger Zetsu
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;