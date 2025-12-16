import React, { useState, useRef, useEffect } from 'react';
import { Activity, Zap, TrendingUp, ShieldAlert, Scan, Wallet, Bell, ChevronDown, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import { MarketCoin } from '../types';
import { DualRangeSlider } from '../components/DualRangeSlider';

const marketDataMock: MarketCoin[] = [
    {id: 1, name: 'Bitcoin', ticker: 'BTC', price: '$83,913.68', h1: '-0.28%', h24: '+2.57%', d7: '-12.39%', cap: '$1.67T', dexBuy: '$9.55M', dexSell: '$1.73M', dexFlow: 80, img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', trend: 'Bullish'},
    {id: 2, name: 'Ethereum', ticker: 'ETH', price: '$2,717.22', h1: '-0.45%', h24: '+1.17%', d7: '-13.77%', cap: '$327B', dexBuy: '$7.12M', dexSell: '$0', dexFlow: 95, img: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', trend: 'Bearish'},
    {id: 3, name: 'Tether', ticker: 'USDT', price: '$0.99', h1: '+0.03%', h24: '+0.06%', d7: '+0.01%', cap: '$184B', dexBuy: '$48.32M', dexSell: '$43.61M', dexFlow: 55, img: 'https://cryptologos.cc/logos/tether-usdt-logo.png', trend: 'Bullish'},
    {id: 4, name: 'XRP', ticker: 'XRP', price: '$1.91', h1: '-0.27%', h24: '+0.79%', d7: '-15.32%', cap: '$115B', dexBuy: '$2.41M', dexSell: '$250.14K', dexFlow: 70, img: 'https://cryptologos.cc/logos/xrp-xrp-logo.png', trend: 'Bearish'},
    {id: 5, name: 'BNB', ticker: 'BNB', price: '$817', h1: '+0.02%', h24: '+1.04%', d7: '-12.32%', cap: '$112B', dexBuy: '$11.82M', dexSell: '$9.84M', dexFlow: 60, img: 'https://cryptologos.cc/logos/bnb-bnb-logo.png', trend: 'Bearish'},
];

const mcapLabels = ['1k', '10k', '100k', '1M', '10M', '100M', '>100M'];
const ageOptions = ['< 1 day', '1 day', '7 days', '1 week', '1 month', '1 year', '> 1 year'];

export const Dashboard: React.FC = () => {
    const [timeFrame, setTimeFrame] = useState('1h');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [mcapMin, setMcapMin] = useState(2);
    const [mcapMax, setMcapMax] = useState(5);
    const [ageFrom, setAgeFrom] = useState('< 1 day');
    const [ageTo, setAgeTo] = useState('> 1 year');
    const popupRef = useRef<HTMLDivElement>(null);

    const toggleFilter = (filterName: string) => setActiveFilter(activeFilter === filterName ? null : filterName);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeFilter && !(event.target as Element).closest('.filter-wrapper')) {
                setActiveFilter(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeFilter]);

    const getChange = (coin: MarketCoin) => { if (timeFrame === '24h') return coin.h24; if (timeFrame === '7d') return coin.d7; return coin.h1; };
    const getPercentColor = (val: string) => val.includes('-') ? 'text-primary-red' : 'text-primary-green';

    return (
        <div className="flex flex-col gap-6 pb-20">
            {/* AI Pulse Grid */}
            <div className="w-full">
                <h3 className="text-lg font-semibold mb-4 text-text-light">AI Market Pulse</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-center gap-1">
                        <div className="flex items-center gap-2 text-xs text-text-medium mb-1"><Activity size={14} /> AI Market Sentiment</div>
                        <div className="text-[10px] text-text-dark font-medium">Sentiment score</div>
                        <div className="text-lg font-bold text-primary-green flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary-green text-main flex items-center justify-center text-xs font-bold shadow-[0_0_10px_rgba(38,211,86,0.3)]">62</div>
                            <span>Turning Bullish</span>
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-center gap-1">
                        <div className="flex items-center gap-2 text-xs text-text-medium mb-1"><Zap size={14} /> Smart Money Rotation</div>
                        <div className="text-[10px] text-text-dark font-medium">Top flow last 24h</div>
                        <div className="text-base font-bold text-text-light">Solana <span className="text-xs text-primary-green font-medium ml-1">+8% ecosystem flow</span></div>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-center gap-1">
                        <div className="flex items-center gap-2 text-xs text-text-medium mb-1"><TrendingUp size={14} /> Top Inflow Token</div>
                        <div className="flex justify-between items-center w-full font-semibold text-sm"><span>$Fartcoin</span><span className="text-primary-green">+$3.2M</span></div>
                        <div className="mt-1 flex justify-end"><span className="px-1.5 py-px rounded bg-primary-green/10 text-primary-green text-[10px] font-bold">Low Risk</span></div>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-center gap-1">
                        <div className="flex items-center gap-2 text-xs text-text-medium mb-1"><ShieldAlert size={14} /> Risk Levels</div>
                        <div className="text-base font-bold text-primary-red">3 Critical Alerts</div>
                        <button className="mt-1.5 w-full bg-primary-yellow/10 border border-primary-yellow/30 text-primary-yellow text-[10px] font-bold py-1 rounded-md hover:bg-primary-yellow hover:text-main transition-colors">View Alerts</button>
                    </div>
                </div>
            </div>

            {/* Middle Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Watchlist */}
                <div className="bg-card border border-border rounded-2xl p-4 flex flex-col h-full min-h-[220px]">
                    <h3 className="flex items-center gap-2 font-semibold mb-3">Watchlist</h3>
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="text-left text-text-dark text-xs"><th className="pb-2 font-medium">Coin</th><th className="pb-2 font-medium text-right">Price</th></tr></thead>
                            <tbody>
                                {[
                                    {ticker: 'BTC', price: '$82,000', img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'},
                                    {ticker: 'ETH', price: '$3,150', img: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'},
                                    {ticker: 'SOL', price: '$126.61', img: 'https://cryptologos.cc/logos/solana-sol-logo.png'},
                                    {ticker: 'AVAX', price: '$39.36', img: 'https://cryptologos.cc/logos/avalanche-avax-logo.png'}
                                ].map((t,i) => (
                                    <tr key={i} className="border-b border-border/50 last:border-0">
                                        <td className="py-2 flex items-center gap-2"><img src={t.img} className="w-5 h-5 rounded-full" /><span className="font-semibold">{t.ticker}</span></td>
                                        <td className="py-2 text-right">{t.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="w-full mt-2 border border-dashed border-border text-text-medium text-xs py-2 rounded-lg hover:border-text-light hover:text-text-light hover:bg-card-hover transition-colors flex items-center justify-center gap-1"><Plus size={14} /> Add Token</button>
                </div>

                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-2xl p-4 flex flex-col">
                    <h3 className="font-semibold mb-3">Quick Action</h3>
                    <div className="grid grid-cols-2 gap-2 h-full">
                        {[
                            { icon: <Scan size={24} className="text-primary-purple" />, label: 'Safe Scan' },
                            { icon: <Wallet size={24} className="text-primary-purple" />, label: 'Wallet Tracking' },
                            { icon: <Bell size={24} className="text-primary-purple" />, label: 'Smart AI Alert' },
                            { icon: <TrendingUp size={24} className="text-primary-purple" />, label: 'View Smart Money' }
                        ].map((a, i) => (
                            <div key={i} className="bg-card-hover rounded-xl flex flex-col items-center justify-center text-center p-3 cursor-pointer hover:bg-border transition-colors group border border-transparent hover:border-primary-purple/50">
                                {a.icon}
                                <span className="text-xs font-semibold mt-2 group-hover:text-white">{a.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trending Narratives */}
                <div className="bg-card border border-border rounded-2xl p-4 flex flex-col">
                    <h3 className="font-semibold mb-3">Trending Narratives</h3>
                    <div className="grid grid-cols-2 gap-2 h-full">
                        {['Meme', 'RWA', 'AI', 'Sol Ecosystem'].map((n, i) => (
                            <div key={i} className="bg-card-hover rounded-xl flex items-center justify-center p-2 text-sm font-semibold hover:bg-border hover:text-white cursor-pointer transition-colors border border-transparent hover:border-text-dark text-center">
                                {n}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Live Market Data */}
            <div className="bg-card border border-border rounded-2xl p-4 md:p-6 overflow-hidden">
                <h3 className="font-semibold text-lg mb-4">Live Market Data</h3>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-4 relative z-20">
                    <div className="filter-wrapper relative">
                        <div className={`filter-pill ${activeFilter === 'mcap' ? 'active' : ''}`} onClick={() => toggleFilter('mcap')}>All Caps <ChevronDown size={14} /></div>
                        {activeFilter === 'mcap' && (
                            <div className="filter-popup complex" ref={popupRef}>
                                <div className="font-semibold mb-3 text-[0.95rem] text-text-light">Market Cap Range</div>
                                <DualRangeSlider min={0} max={6} onChange={(min, max) => { setMcapMin(min); setMcapMax(max); }} />
                                <div className="flex justify-between text-xs text-text-light mt-[-10px] font-semibold"><span>{mcapLabels[mcapMin]}</span><span>{mcapLabels[mcapMax]}</span></div>
                                <div className="flex gap-2 mt-4">
                                    <button className="btn btn-outline flex-1 py-1.5 text-xs" onClick={() => setActiveFilter(null)}>Cancel</button>
                                    <button className="btn btn-green flex-1 py-1.5 text-xs" onClick={() => setActiveFilter(null)}>Apply</button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="filter-wrapper relative">
                        <div className={`filter-pill ${activeFilter === 'sector' ? 'active' : ''}`} onClick={() => toggleFilter('sector')}>Sectors <ChevronDown size={14} /></div>
                        {activeFilter === 'sector' && (
                            <div className="filter-popup" ref={popupRef}>
                                <ul className="flex flex-col gap-1">
                                    {['All', 'RWA', 'AI', 'Meme', 'DeFi', 'Gaming', 'DePIN'].map(s => (<li key={s} className="filter-list-item" onClick={() => setActiveFilter(null)}>{s}</li>))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="filter-wrapper relative">
                        <div className={`filter-pill ${activeFilter === 'chain' ? 'active' : ''}`} onClick={() => toggleFilter('chain')}>Chain <ChevronDown size={14} /></div>
                        {activeFilter === 'chain' && (
                            <div className="filter-popup" ref={popupRef}>
                                <ul className="flex flex-col gap-1">
                                    {['All', 'Solana', 'Ethereum', 'BNB Chain', 'Arbitrum', 'Bitcoin', 'Tron', 'Polygon'].map(c => (<li key={c} className="filter-list-item" onClick={() => setActiveFilter(null)}>{c}</li>))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="filter-wrapper relative">
                        <div className={`filter-pill ${activeFilter === 'age' ? 'active' : ''}`} onClick={() => toggleFilter('age')}>Age <ChevronDown size={14} /></div>
                        {activeFilter === 'age' && (
                            <div className="filter-popup complex" ref={popupRef}>
                                <div className="font-semibold mb-3 text-[0.95rem] text-text-light">Token Age Range</div>
                                <div className="flex gap-4 mb-4">
                                    <div className="flex-1">
                                        <label className="text-xs text-text-medium mb-1 block">From</label>
                                        <select className="w-full bg-main border border-border rounded-lg text-text-light p-2 text-sm outline-none" value={ageFrom} onChange={(e)=>setAgeFrom(e.target.value)}>
                                            {ageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs text-text-medium mb-1 block">To</label>
                                        <select className="w-full bg-main border border-border rounded-lg text-text-light p-2 text-sm outline-none" value={ageTo} onChange={(e)=>setAgeTo(e.target.value)}>
                                            {ageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="btn btn-outline flex-1 py-1.5 text-xs" onClick={() => setActiveFilter(null)}>Cancel</button>
                                    <button className="btn btn-green flex-1 py-1.5 text-xs" onClick={() => setActiveFilter(null)}>Apply</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto min-h-[300px]">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{minWidth: '120px'}}># Name <div className="inline-flex flex-col ml-1 align-middle opacity-60 hover:opacity-100 cursor-pointer"><ArrowUp size={8} /><ArrowDown size={8} /></div></th>
                                <th>Price <div className="inline-flex flex-col ml-1 align-middle opacity-60 hover:opacity-100 cursor-pointer"><ArrowUp size={8} /><ArrowDown size={8} /></div></th>
                                <th style={{width: '80px'}}>
                                    <div className="relative inline-flex items-center gap-1 cursor-pointer hover:text-text-light" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                        {timeFrame} <ChevronDown size={12} />
                                        {dropdownOpen && (
                                            <div className="absolute top-full right-0 bg-card border border-border rounded-md p-1 z-50 min-w-[80px] shadow-lg">
                                                {['1h', '24h', '7d'].map(tf => (
                                                    <div key={tf} className={`px-3 py-1.5 text-xs text-text-medium hover:bg-card-hover hover:text-text-light rounded cursor-pointer ${timeFrame === tf ? 'text-primary-green font-bold' : ''}`} onClick={(e) => { e.stopPropagation(); setTimeFrame(tf); setDropdownOpen(false); }}>
                                                        {tf} %
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </th>
                                <th>MCap <div className="inline-flex flex-col ml-1 align-middle opacity-60 hover:opacity-100 cursor-pointer"><ArrowUp size={8} /><ArrowDown size={8} /></div></th>
                                <th>DEX Buys</th>
                                <th>DEX Sells</th>
                                <th>DEX Flows</th>
                                <th>AI Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marketDataMock.map((coin) => {
                                const changeVal = getChange(coin);
                                return (
                                    <tr key={coin.id}>
                                        <td style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                            <span className="text-text-medium text-[0.8em] w-[15px]">{coin.id}</span>
                                            <img src={coin.img} width="20" height="20" className="rounded-full" />
                                            <div>
                                                <div className="font-semibold">{coin.name}</div>
                                                <div className="text-text-dark text-[0.75em]">{coin.ticker}</div>
                                            </div>
                                        </td>
                                        <td>{coin.price}</td>
                                        <td className={getPercentColor(changeVal)}>{changeVal}</td>
                                        <td>{coin.cap}</td>
                                        <td>{coin.dexBuy}</td>
                                        <td>{coin.dexSell}</td>
                                        <td>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[0.75em] text-primary-green">${(coin.dexFlow/10).toFixed(1)}M</span>
                                                <div className="w-[80px] h-1.5 bg-border rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary-green" style={{width: `${coin.dexFlow}%`}}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`px-2 py-1 rounded-md text-[0.75rem] font-bold uppercase border ${
                                                coin.trend === 'Bullish' 
                                                ? 'bg-primary-green/10 text-primary-green border-primary-green/30' 
                                                : 'bg-primary-red/10 text-primary-red border-primary-red/30'
                                            }`}>
                                                {coin.trend}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};