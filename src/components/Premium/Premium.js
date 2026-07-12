import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, Sparkles, Zap, Brain, Globe, Star } from 'lucide-react';

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 29.99,
    period: 'month',
    color: 'from-slate-600 to-slate-700',
    popular: false,
    features: ['All stories & scenarios', 'AI pronunciation feedback', 'Unlimited conversations', 'Basic analytics', 'Community access']
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 199.99,
    originalPrice: 359.88,
    period: 'year',
    color: 'from-amber-500 to-orange-600',
    popular: true,
    badge: 'Save 44%',
    features: ['Everything in Monthly', 'Advanced AI Memory', '3D Pronunciation model', 'Life Scanner unlimited', 'Priority support', 'Download for offline', 'Family sharing (4 users)']
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: 499.99,
    originalPrice: 999.99,
    period: 'once',
    color: 'from-violet-500 to-purple-600',
    popular: false,
    badge: 'Best Value',
    features: ['Everything forever', 'All future updates', 'VIP community badge', '1-on-1 AI tutoring', 'Custom learning paths', 'Certificate program', 'Beta feature access']
  }
];

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [showTrialModal, setShowTrialModal] = useState(false);

  return (
    <div className="screen-container px-5 py-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
          <Crown className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Upgrade to Premium</h1>
        <p className="text-ea-gray">Unlock your full potential</p>
      </div>

      <div className="space-y-4 mb-8">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`w-full rounded-2xl border-2 text-left relative overflow-hidden ${selectedPlan === plan.id ? 'border-ea-gold bg-amber-500/10' : 'border-ea-darker bg-ea-card'}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-ea-gold text-white text-xs font-bold px-3 py-1 rounded-bl-xl">Most Popular</div>
            )}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-2xl">${plan.price}</div>
                  <div className="text-ea-gray text-xs">/{plan.period}</div>
                </div>
              </div>
              {plan.originalPrice && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-ea-gray line-through text-sm">${plan.originalPrice}</span>
                  {plan.badge && <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full">{plan.badge}</span>}
                </div>
              )}
              <div className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-ea-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            {selectedPlan === plan.id && <div className="bg-ea-gold text-white text-center py-3 font-bold">Selected</div>}
          </button>
        ))}
      </div>

      <button onClick={() => setShowTrialModal(true)} className="w-full py-4 bg-gradient-to-r from-ea-gold to-ea-orange text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5" />
        Start Free Trial (7 Days)
      </button>

      {showTrialModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-ea-card rounded-3xl p-6 max-w-sm w-full border border-ea-darker">
            <div className="text-center">
              <Crown className="w-16 h-16 text-ea-gold mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Start Your Free Trial</h2>
              <p className="text-ea-gray text-sm mb-6">Get 7 days of full Premium access. Cancel anytime.</p>
              <button className="w-full py-3 bg-ea-gold text-white rounded-xl font-bold mb-2">Start 7-Day Free Trial</button>
              <button onClick={() => setShowTrialModal(false)} className="w-full py-3 text-ea-gray">Maybe Later</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premium;
