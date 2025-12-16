import React from 'react';

const TILES = [
    { s: 'SOL', p: '+8.4%', v: 100, c: 'bg-primary-green' },
    { s: 'BTC', p: '+2.1%', v: 90, c: 'bg-primary-green/80' },
    { s: 'ETH', p: '+1.2%', v: 80, c: 'bg-primary-green/60' },
    { s: 'JUP', p: '+12.5%', v: 70, c: 'bg-primary-green' },
    { s: 'BONK', p: '-4.2%', v: 60, c: 'bg-primary-red' },
    { s: 'WIF', p: '+15.3%', v: 55, c: 'bg-primary-green' },
    { s: 'PYTH', p: '-1.2%', v: 50, c: 'bg-primary-red/60' },
    { s: 'RNDR', p: '+5.4%', v: 45, c: 'bg-primary-green/70' },
    { s: 'HNT', p: '-2.1%', v: 40, c: 'bg-primary-red/70' },
    { s: 'RAY', p: '+3.1%', v: 35, c: 'bg-primary-green/50' },
];

export const Heatmap: React.FC = () => {
    return (
        <div className="h-full flex flex-col">
            <h2 className="text-xl font-bold mb-4">Market Heatmap (Solana)</h2>
            <div className="flex-1 bg-card border border-border rounded-xl p-4 relative overflow-hidden">
                <div className="flex flex-wrap h-full content-start">
                    {TILES.map((t, i) => (
                        <div 
                            key={i} 
                            style={{ 
                                width: `${Math.max(10, (t.v / 650) * 100)}%`, 
                                height: `${Math.max(20, (t.v / 650) * 100 * 2)}%` 
                            }} 
                            className={`p-1 flex-grow`}
                        >
                            <div className={`${t.c} w-full h-full rounded-lg flex flex-col items-center justify-center text-main hover:opacity-90 transition-opacity cursor-pointer border border-main/10`}>
                                <span className="font-bold text-sm md:text-lg">{t.s}</span>
                                <span className="text-xs font-semibold">{t.p}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};