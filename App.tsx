import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Downloads from './components/Downloads';
import SoftwareDetail from './components/SoftwareDetail';
import AdminDashboard from './components/AdminDashboard';
import ProductPage from './components/ProductPage';
import SupportPage from './components/SupportPage';
import LegalPage from './components/LegalPage';
import Contact from './components/Contact';
import { Software } from './types';
import { db, initialSoftwareSeed } from './services/db';
import { Loader2, MapPin, X } from 'lucide-react';

type ViewState = 
  | 'home' | 'downloads' | 'detail' | 'admin' 
  // Products
  | 'product-windows' | 'product-macos' | 'product-android' | 'product-ios'
  // Support
  | 'support-help' | 'support-kb' | 'support-status' | 'contact'
  // Legal
  | 'legal-privacy' | 'legal-terms' | 'legal-cookies';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedSoftware, setSelectedSoftware] = useState<Software | null>(null);
  const [softwares, setSoftwares] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Visitor ID state to update location later
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);

  // Load data from Firebase
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        let data = await db.getAll();
        
        // Seed DB if empty for demo purposes
        if (data.length === 0) {
          console.log("Database empty, seeding initial data...");
          await Promise.all(initialSoftwareSeed.map(s => db.create(s)));
          data = await db.getAll();
        }
        
        setSoftwares(data);
      } catch (e) {
        console.error("Error loading softwares:", e);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Track Visitor IP and Location (IP Based initially)
  useEffect(() => {
    const trackVisitor = async () => {
      // Check if we already logged this session
      const storedId = sessionStorage.getItem('zetsu_visitor_id');
      if (storedId) {
        setVisitorId(storedId);
        return;
      }

      try {
        // Switch to geojs.io which is very CORS friendly
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        
        if (!response.ok) {
           throw new Error(`GeoAPI error: ${response.status}`);
        }

        const data = await response.json();

        // Log initial IP based data
        const newId = await db.logVisitor({
          ip: data.ip,
          city: data.city,
          country: data.country,
          countryCode: data.country_code,
          isp: data.organization_name || data.organization || 'Unknown',
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        });

        if (newId) {
          sessionStorage.setItem('zetsu_visitor_id', newId);
          setVisitorId(newId);
          // Show location prompt after a small delay to not be annoying immediately
          setTimeout(() => setShowLocationPrompt(true), 3000);
        }

        console.log("Visitor logged successfully");

      } catch (error) {
        // Silent fail (adblockers might block ip apis)
        console.log("Analytics tracking skipped:", error);
      }
    };

    trackVisitor();
  }, []);

  // Handler for precise location consent
  const handleEnableLocation = () => {
    if (!visitorId) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Success
          await db.updateVisitor(visitorId, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            locationMethod: 'GPS'
          });
          setShowLocationPrompt(false);
          alert("Localisation optimisée activée. Merci.");
        },
        (error) => {
          // Error or Denied
          // Improved logging to avoid [object Object]
          console.error(`Geolocation error (${error.code}): ${error.message}`);
          
          // Optionally notify the user for clearer feedback
          // if (error.code === error.PERMISSION_DENIED) { ... }
          
          setShowLocationPrompt(false);
        },
        { 
          enableHighAccuracy: true, 
          timeout: 10000, // 10s timeout
          maximumAge: 0 
        }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      setShowLocationPrompt(false);
    }
  };

  const navigateTo = (newView: string) => {
    setView(newView as ViewState);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSoftware = (software: Software) => {
    setSelectedSoftware(software);
    navigateTo('detail');
  };

  // Full page loader for initial data fetch
  if (loading && softwares.length === 0) {
    return (
      <div className="min-h-screen bg-zetsu-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-zetsu-accent animate-spin mb-4" />
        <h2 className="text-xl font-bold tracking-widest">INITIALISATION ZETSU...</h2>
      </div>
    );
  }

  // Helper to determine active generic view for Navbar highlighting
  const currentNavView = (['home', 'downloads', 'detail'].includes(view) ? view : 'home') as 'home' | 'downloads';

  return (
    <div className="min-h-screen bg-zetsu-900 text-white selection:bg-zetsu-accent selection:text-zetsu-900 font-sans">
      {view !== 'admin' && <Navbar onNavigate={(v) => navigateTo(v)} currentView={currentNavView} />}
      
      <main>
        {view === 'home' && (
          <>
            <Hero onNavigate={() => navigateTo('downloads')} />
            <Features />
            <Pricing />
          </>
        )}

        {view === 'downloads' && (
          <Downloads 
            softwareList={softwares} 
            onSelectSoftware={handleSelectSoftware} 
          />
        )}

        {view === 'detail' && selectedSoftware && (
          <SoftwareDetail 
            software={selectedSoftware} 
            onBack={() => navigateTo('downloads')} 
          />
        )}

        {view === 'admin' && (
          <AdminDashboard 
            softwares={softwares} 
            setSoftwares={setSoftwares}
            onLogout={() => navigateTo('home')}
          />
        )}

        {/* Product Pages */}
        {view === 'product-windows' && <ProductPage type="windows" onNavigate={() => navigateTo('downloads')} />}
        {view === 'product-macos' && <ProductPage type="macos" onNavigate={() => navigateTo('downloads')} />}
        {view === 'product-android' && <ProductPage type="android" onNavigate={() => navigateTo('downloads')} />}
        {view === 'product-ios' && <ProductPage type="ios" onNavigate={() => navigateTo('downloads')} />}

        {/* Support Pages */}
        {view === 'support-help' && <SupportPage view="help" />}
        {view === 'support-kb' && <SupportPage view="kb" />}
        {view === 'support-status' && <SupportPage view="status" />}
        {view === 'contact' && <Contact />}

        {/* Legal Pages */}
        {view === 'legal-privacy' && <LegalPage type="privacy" />}
        {view === 'legal-terms' && <LegalPage type="terms" />}
        {view === 'legal-cookies' && <LegalPage type="cookies" />}
      </main>
      
      {view !== 'admin' && <Footer onNavigate={(v) => navigateTo(v)} />}

      {/* Location Consent Widget */}
      {showLocationPrompt && view !== 'admin' && (
        <div className="fixed bottom-4 right-4 max-w-sm bg-gray-800/95 backdrop-blur-md border border-zetsu-accent/30 p-4 rounded-xl shadow-2xl z-50 animate-fade-in-up">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-zetsu-accent">
              <MapPin size={18} />
              <span className="font-bold text-sm">Optimisation Serveur</span>
            </div>
            <button 
              onClick={() => setShowLocationPrompt(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-gray-300 text-xs mb-3 leading-relaxed">
            Autorisez la géolocalisation pour trouver le serveur Zetsu le plus proche et améliorer votre vitesse de téléchargement.
          </p>
          <div className="flex gap-2">
            <button 
              onClick={handleEnableLocation}
              className="flex-1 bg-zetsu-primary hover:bg-blue-600 text-white text-xs font-bold py-2 rounded transition-colors"
            >
              Autoriser
            </button>
            <button 
              onClick={() => setShowLocationPrompt(false)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-2 rounded transition-colors"
            >
              Refuser
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;