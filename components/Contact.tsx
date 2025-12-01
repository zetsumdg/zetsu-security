import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  if (sent) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-zetsu-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Message Envoyé !</h2>
          <p className="text-gray-400 mb-6">Merci de nous avoir contactés. Notre équipe vous répondra sous 24h.</p>
          <button 
            onClick={() => setSent(false)}
            className="text-zetsu-accent hover:underline"
          >
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-zetsu-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-400">Une question ? Un partenariat ? Nous sommes à votre écoute.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info Side */}
          <div className="space-y-8">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-start gap-4">
              <Mail className="w-6 h-6 text-zetsu-accent shrink-0" />
              <div>
                <h3 className="text-white font-bold mb-1">Email</h3>
                <p className="text-gray-400 text-sm mb-2">Pour le support général et les questions.</p>
                <a href="mailto:contact@zetsu-security.com" className="text-zetsu-primary hover:text-white transition-colors">contact@zetsu-security.com</a>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-start gap-4">
              <Phone className="w-6 h-6 text-zetsu-accent shrink-0" />
              <div>
                <h3 className="text-white font-bold mb-1">Téléphone</h3>
                <p className="text-gray-400 text-sm mb-2">Lundi - Vendredi, 9h - 18h CET.</p>
                <p className="text-white font-mono">+33 1 23 45 67 89</p>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-start gap-4">
              <MapPin className="w-6 h-6 text-zetsu-accent shrink-0" />
              <div>
                <h3 className="text-white font-bold mb-1">Siège Social</h3>
                <p className="text-gray-400 text-sm">
                  Zetsu Security Inc.<br />
                  12 Rue de la Cybersécurité<br />
                  75001 Paris, France
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Prénom</label>
                  <input required type="text" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-zetsu-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Nom</label>
                  <input required type="text" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-zetsu-primary focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input required type="email" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-zetsu-primary focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Sujet</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-zetsu-primary focus:outline-none">
                  <option>Support Technique</option>
                  <option>Facturation</option>
                  <option>Partenariat / Presse</option>
                  <option>Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea required rows={4} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-zetsu-primary focus:outline-none"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-zetsu-primary to-cyan-600 text-white font-bold py-4 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;