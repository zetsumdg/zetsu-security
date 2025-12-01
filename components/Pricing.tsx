import React from 'react';
import { Check, X } from 'lucide-react';
import { PricingPlan } from '../types';

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Zetsu Core',
    price: '0€',
    features: [
      'Analyse antivirus basique',
      'Protection web standard',
      'Mises à jour automatiques',
      '1 Appareil'
    ]
  },
  {
    id: 'pro',
    name: 'Zetsu Prime',
    price: '29.99€',
    recommended: true,
    features: [
      'Tout de Core +',
      'Protection Ransomware IA',
      'VPN Illimité',
      'Pare-feu bidirectionnel',
      'Support prioritaire 24/7',
      '5 Appareils'
    ]
  },
  {
    id: 'ultimate',
    name: 'Zetsu Omni',
    price: '49.99€',
    features: [
      'Tout de Prime +',
      'Protection vol d\'identité',
      'Coffre-fort mots de passe',
      'Optimisation PC Gamer',
      'Assistant Zetsu Dédié',
      'Appareils illimités'
    ]
  }
];

const Pricing: React.FC = () => {
  return (
    <div id="pricing" className="py-24 bg-zetsu-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Sécurisez votre <span className="text-zetsu-accent">Avenir</span>
          </h2>
          <p className="text-gray-400">
            Des plans flexibles pour tous les besoins. Satisfait ou remboursé sous 30 jours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.recommended 
                  ? 'bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-zetsu-accent shadow-2xl shadow-zetsu-accent/10 transform md:-translate-y-4' 
                  : 'bg-gray-900 border border-gray-800'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zetsu-accent text-zetsu-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Recommandé
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-gray-500 ml-2">/an</span>
                </div>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className={`w-5 h-5 mr-3 ${plan.recommended ? 'text-zetsu-accent' : 'text-gray-500'}`} />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-lg font-bold transition-all ${
                plan.recommended
                  ? 'bg-zetsu-accent text-zetsu-900 hover:bg-cyan-400 shadow-lg shadow-zetsu-accent/20'
                  : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
              }`}>
                Choisir {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;