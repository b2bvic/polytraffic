
import React, { useState, useCallback } from 'react';
import { Market, Outcome } from './types';
import { INITIAL_MARKETS } from './constants';
import Header from './components/Header';
import MarketCard from './components/MarketCard';
import TradeModal from './components/TradeModal';
import { WalletIcon } from './components/Icons';

const App: React.FC = () => {
  const [markets, setMarkets] = useState<Market[]>(INITIAL_MARKETS);
  const [userBalance, setUserBalance] = useState<number>(1000);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);

  const openTradeModal = useCallback((market: Market, outcome: Outcome) => {
    setSelectedMarket(market);
    setSelectedOutcome(outcome);
    setModalOpen(true);
  }, []);

  const closeTradeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedMarket(null);
    setSelectedOutcome(null);
  }, []);

  const handleBuyShares = useCallback((marketId: string, outcome: Outcome, amount: number, cost: number) => {
    if (userBalance < cost) {
      alert("Insufficient funds!");
      return;
    }

    setUserBalance(prev => prev - cost);
    setMarkets(prevMarkets => 
      prevMarkets.map(market => {
        if (market.id === marketId) {
          const newSharesUp = outcome === 'UP' ? market.sharesUp + amount : market.sharesUp;
          const newSharesDown = outcome === 'DOWN' ? market.sharesDown + amount : market.sharesDown;
          return { ...market, sharesUp: newSharesUp, sharesDown: newSharesDown };
        }
        return market;
      })
    );
    closeTradeModal();
  }, [userBalance, closeTradeModal]);

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Active Markets</h1>
            <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
                <WalletIcon className="h-6 w-6 text-brand-blue" />
                <span className="text-lg font-semibold text-white">${userBalance.toFixed(2)}</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map(market => (
            <MarketCard 
              key={market.id} 
              market={market}
              onTrade={openTradeModal}
            />
          ))}
        </div>
      </main>

      {modalOpen && selectedMarket && selectedOutcome && (
        <TradeModal
          market={selectedMarket}
          outcome={selectedOutcome}
          userBalance={userBalance}
          onClose={closeTradeModal}
          onBuy={handleBuyShares}
        />
      )}
    </div>
  );
};

export default App;
