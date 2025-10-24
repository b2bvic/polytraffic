
import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Market, Outcome, GeminiAnalysis } from '../types';
import getGeminiAnalysis from '../services/geminiService';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, SparklesIcon, XCircleIcon } from './Icons';

interface MarketCardProps {
  market: Market;
  onTrade: (market: Market, outcome: Outcome) => void;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, onTrade }) => {
  const { id, websiteName, faviconUrl, description, historicalData, sharesUp, sharesDown, websiteUrl } = market;

  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [analysis, setAnalysis] = useState<GeminiAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalShares = sharesUp + sharesDown;
  const priceUp = totalShares > 0 ? sharesUp / totalShares : 0.5;
  const priceDown = totalShares > 0 ? sharesDown / totalShares : 0.5;

  const percentUp = (priceUp * 100).toFixed(0);

  const handleGetAnalysis = async () => {
    setIsLoadingAnalysis(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await getGeminiAnalysis(websiteName, websiteUrl);
      setAnalysis(result);
    } catch (err) {
      setError("Could not fetch analysis. Please try again.");
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  const sentimentColor = useMemo(() => {
    if (!analysis) return 'bg-gray-600';
    switch (analysis.prediction) {
      case 'INCREASING': return 'bg-brand-green';
      case 'DECREASING': return 'bg-brand-red';
      default: return 'bg-gray-500';
    }
  }, [analysis]);
  
  const sentimentText = useMemo(() => {
    if (!analysis) return '';
    switch (analysis.prediction) {
      case 'INCREASING': return 'AI Predicts: UP';
      case 'DECREASING': return 'AI Predicts: DOWN';
      default: return 'AI Predicts: NEUTRAL';
    }
  }, [analysis]);

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-brand-blue/30 hover:ring-1 hover:ring-brand-blue/50">
      <div className="p-5">
        <div className="flex items-center space-x-3 mb-4">
          <img src={faviconUrl} alt={`${websiteName} favicon`} className="h-8 w-8 rounded-md" />
          <h2 className="text-xl font-bold text-white">{websiteName}</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4 h-10">{description}</p>
      </div>

      <div className="h-32 -mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historicalData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id={`colorTraffic-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }} />
            <Area type="monotone" dataKey="traffic" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill={`url(#colorTraffic-${id})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="p-5 bg-gray-800/50 mt-4">
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
          <div className="bg-brand-green h-2.5 rounded-full" style={{ width: `${percentUp}%` }}></div>
        </div>
        
        <div className="flex justify-between space-x-3 mb-5">
          <button onClick={() => onTrade(market, 'UP')} className="w-full flex items-center justify-between p-3 bg-brand-green/10 text-brand-green rounded-lg hover:bg-brand-green/20 transition-colors duration-200">
            <div className="flex items-center space-x-2">
              <ArrowTrendingUpIcon className="h-5 w-5" />
              <span className="font-semibold">UP</span>
            </div>
            <span className="font-bold text-lg">${priceUp.toFixed(2)}</span>
          </button>
          <button onClick={() => onTrade(market, 'DOWN')} className="w-full flex items-center justify-between p-3 bg-brand-red/10 text-brand-red rounded-lg hover:bg-brand-red/20 transition-colors duration-200">
             <div className="flex items-center space-x-2">
              <ArrowTrendingDownIcon className="h-5 w-5" />
              <span className="font-semibold">DOWN</span>
            </div>
            <span className="font-bold text-lg">${priceDown.toFixed(2)}</span>
          </button>
        </div>
        
        <div className="mt-2">
          {analysis && (
            <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
               <div className="flex justify-between items-center mb-2">
                  <div className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${sentimentColor}`}>{sentimentText}</div>
                   <button onClick={() => setAnalysis(null)} className="text-gray-500 hover:text-white">
                      <XCircleIcon className="h-5 w-5" />
                   </button>
               </div>
              <p className="text-gray-300 text-sm">{analysis.analysis}</p>
            </div>
          )}
          {error && <p className="text-brand-red text-sm text-center mb-2">{error}</p>}
          <button 
            onClick={handleGetAnalysis} 
            disabled={isLoadingAnalysis}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-brand-blue/20 text-brand-blue rounded-lg hover:bg-brand-blue/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <SparklesIcon className={`h-5 w-5 ${isLoadingAnalysis ? 'animate-spin' : ''}`} />
              <span className="font-semibold">{isLoadingAnalysis ? 'Analyzing...' : 'Ask Gemini for Analysis'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
