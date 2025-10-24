
import React, { useState, useMemo, useEffect } from 'react';
import { Market, Outcome } from '../types';

interface TradeModalProps {
  market: Market;
  outcome: Outcome;
  userBalance: number;
  onClose: () => void;
  onBuy: (marketId: string, outcome: Outcome, amount: number, cost: number) => void;
}

const TradeModal: React.FC<TradeModalProps> = ({ market, outcome, userBalance, onClose, onBuy }) => {
  const [shares, setShares] = useState<string>('10');

  const totalShares = market.sharesUp + market.sharesDown;
  const price = useMemo(() => {
    if (outcome === 'UP') {
      return totalShares > 0 ? market.sharesUp / totalShares : 0.5;
    }
    return totalShares > 0 ? market.sharesDown / totalShares : 0.5;
  }, [market, outcome, totalShares]);

  const numShares = parseInt(shares, 10) || 0;
  const totalCost = numShares * price;
  const canAfford = userBalance >= totalCost;

  const handleBuy = () => {
    if (numShares > 0 && canAfford) {
      onBuy(market.id, outcome, numShares, totalCost);
    }
  };
  
  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
        onClose();
       }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const outcomeColor = outcome === 'UP' ? 'text-brand-green' : 'text-brand-red';
  const outcomeBg = outcome === 'UP' ? 'bg-brand-green/10' : 'bg-brand-red/10';
  const buttonBg = outcome === 'UP' ? 'bg-brand-green hover:bg-brand-green/90' : 'bg-brand-red hover:bg-brand-red/90';

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Buy Shares</h2>
            <p className="text-gray-400">{market.websiteName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>

        <div className={`p-4 rounded-lg mb-6 ${outcomeBg}`}>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-white">Your Position:</span>
            <span className={`font-bold text-lg ${outcomeColor}`}>{outcome === 'UP' ? 'Traffic UP' : 'Traffic DOWN'}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-gray-300">Current Price:</span>
            <span className="font-mono text-white">${price.toFixed(2)} / share</span>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="shares" className="block text-sm font-medium text-gray-300 mb-2">Number of Shares</label>
          <input
            type="number"
            id="shares"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            min="1"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white text-lg focus:ring-brand-blue focus:border-brand-blue"
            placeholder="e.g., 100"
          />
        </div>

        <div className="bg-gray-900/50 p-4 rounded-lg mb-6 space-y-2">
          <div className="flex justify-between text-gray-300">
            <span>Total Cost:</span>
            <span className="font-mono text-white">${totalCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Your Balance:</span>
            <span className="font-mono text-white">${userBalance.toFixed(2)}</span>
          </div>
          <hr className="border-gray-700 my-2" />
          <div className="flex justify-between text-white font-semibold">
            <span>Remaining Balance:</span>
            <span className={`font-mono ${canAfford ? 'text-white' : 'text-brand-red'}`}>${(userBalance - totalCost).toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleBuy}
          disabled={!canAfford || numShares <= 0}
          className={`w-full p-3 rounded-lg text-white font-bold text-lg transition-colors duration-200 ${buttonBg} disabled:bg-gray-600 disabled:cursor-not-allowed`}
        >
          Buy {numShares} Shares
        </button>
      </div>
    </div>
  );
};

export default TradeModal;
