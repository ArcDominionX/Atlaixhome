import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight, Activity, Zap, TrendingUp, ShieldAlert, Trash, Rocket, Wallet, Share2, ChevronDown, Check } from 'lucide-react';
import { CustomCalendar } from '../components/CustomCalendar';

// Declare ApexCharts
declare var ApexCharts: any;

interface DetectionProps {
    onSearch: (token: string) => void;
}

export const Detection: React.FC<DetectionProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [timeFilter, setTimeFilter] = useState('24H');
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    
    // Filter States
    const [chain, setChain] = useState('All Chains');
    const [feedChain, setFeedChain] = useState('All Chains');
    const [eventType, setEventType] = useState('All Events');
    const [severity, setSeverity] = useState('All Severity');
    
    // Calendar States
    const [openCalendar, setOpenCalendar] = useState<'from' | 'to' | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<any>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const toggleFilter = (filterName: string) => {
        if(filterName === 'timerange') setOpenCalendar(null); 
        setActiveFilter(activeFilter === filterName ? null : filterName);
    };

    const handleDateSelect = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        if(openCalendar === 'from') setStartDate(dateStr);
        else if(openCalendar === 'to') setEndDate(dateStr);
        setOpenCalendar(null); 
    };

    // Close filters on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeFilter && !(event.target as Element).closest('.filter-wrapper') && !(event.target as Element).closest('.calendar-container')) {
                setActiveFilter(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeFilter]);

    // Initialize Chart
    useEffect(() => {
        if (chartRef.current && typeof ApexCharts !== 'undefined') {
            const options = {
                series: [
                    { name: 'Market Risk', data: [30, 35, 40, 38, 45, 50, 55, 52, 48, 50, 55, 60] },
                    { name: 'Smart Money Flow', data: [20, 25, 30, 45, 60, 55, 65, 70, 80, 85, 82, 88] },
                    { name: 'Volatility', data: [10, 12, 15, 20, 18, 25, 30, 28, 35, 40, 42, 45] },
                    { name: 'Volume', data: [5, 15, 25, 30, 40, 35, 50, 60, 55, 65, 70, 75] }
                ],
                chart: { type: 'area', height: 320, background: 'transparent', toolbar: { show: false }, zoom: { enabled: false } },
                colors: ['#EB5757', '#2F80ED', '#9B51E0', '#26D356'],
                fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
                stroke: { curve: 'smooth', width: 2 },
                dataLabels: { enabled: false },
                xaxis: { categories: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'], labels: { style: { colors: '#8F96A3', fontSize: '10px', fontFamily: 'Inter' } }, axisBorder: { show: false }, axisTicks: { show: false } },
                yaxis: { show: true, labels: { style: { colors: '#8F96A3', fontFamily: 'Inter' } } },
                grid: { borderColor: '#2A2E33', strokeDashArray: 4 },
                theme: { mode: 'dark' },
                legend: { show: false }
            };

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            chartInstance.current = new ApexCharts(chartRef.current, options);
            chartInstance.current.render();
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) onSearch(query);
    };

    const detectionEvents = [
        { type: 'Whale Buy Detected', icon: <Wallet size={16} />, time: '2m ago', desc: 'Major accumulation in a single transaction block.', token: '$PEPE', amt: '837 ETH', severity: 'High', color: 'text-primary-red' },
        { type: 'Smart Money Accumulation', icon: <Zap size={16} />, time: '12m ago', desc: '9 high win-rate wallets entered positions.', token: '$BRETT', amt: 'Multi-sig', severity: 'Medium', color: 'text-primary-yellow' },
        { type: 'Sniper Bot Swarm', icon: <Activity size={16} />, time: '15s ago', desc: 'High frequency automated buys detected at launch.', token: '$MOG', amt: 'N/A', severity: 'High', color: 'text-primary-red' },
        { type: 'Liquidity Removal', icon: <Trash size={16} />, time: '5m ago', desc: 'Developer wallet removed significant LP.', token: '$SCAM', amt: '30 SOL', severity: 'High', color: 'text-primary-red' },
        { type: 'New Token Launch', icon: <Rocket size={16} />, time: '1m ago', desc: 'Contract deployed and verified on-chain.', token: '$NEW', amt: 'Launch', severity: 'Low', color: 'text-primary-green' },
        { type: 'Risk Spike', icon: <ShieldAlert size={16} />, time: '8m ago', desc: 'Honeypot detector flagged suspicious code.', token: '$RISK', amt: 'Score 98', severity: 'High', color: 'text-primary-red' },
        { type: 'Social Surge Event', icon: <Share2 size={16} />, time: '20m ago', desc: 'Mentions up 400% across Twitter/X.', token: '$VIRAL', amt: 'Trending', severity: 'Medium', color: 'text-primary-yellow' }
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Header Area */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Global Detection Radar</h1>
                    <p className="text-text-medium text-sm">Real-time detection of whale signals, smart money movements, risk events, liquidity shifts, and market anomalies.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-green/10 border border-primary-green/30 text-primary-green text-xs font-semibold cursor-default shadow-[0_0_10px_rgba(38,211,86,0.1)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-green animate-pulse"></div> Live
                    </div>
                    {/* Top Chain Filter */}
                    <div className="filter-wrapper relative">
                        <button className={`filter-pill ${activeFilter === 'chain' ? 'active' : ''}`} onClick={() => toggleFilter('chain')}>
                            {chain} <ChevronDown size={14} />
                        </button>
                        {activeFilter === 'chain' && (
                            <div className="filter-popup right-0 left-auto" ref={popupRef}>
                                <ul className="flex flex-col gap-1">
                                    {['All Chains', 'Solana', 'Ethereum', 'BNB Chain', 'Arbitrum', 'Base'].map(c => (
                                        <li key={c} className={`filter-list-item ${chain === c ? 'selected' : ''}`} onClick={() => { setChain(c); setActiveFilter(null); }}>{c}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Specific Token */}
            <div className="bg-gradient-to-br from-card to-[#151719] border border-border rounded-2xl p-8 text-center">
                <h3 className="text-lg font-medium mb-3">Detect Specific Token Anomalies</h3>
                <p className="text-text-medium text-sm max-w-lg mx-auto mb-6 leading-relaxed">
                    Enter a contract address to scan for real-time whale movements, smart money signals, and critical risk alerts for a specific asset.
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2 max-w-lg mx-auto">
                    <div className="flex-1 bg-[#111315] border border-border rounded-lg flex items-center pr-2">
                        <input 
                            type="text" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter a token or paste link"
                            className="w-full bg-transparent border-none text-text-light px-4 py-3 outline-none"
                        />
                    </div>
                    <button type="submit" className="btn btn-green px-6">Search</button>
                </form>
            </div>

            {/* Global Chart & Actions */}
            <div className="bg-card border border-border rounded-2xl p-0 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_250px]">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                            <h3 className="card-title mb-0">Global Detection Chart</h3>
                            <div className="flex gap-2">
                                {['1H', '4H', '12H', '24H'].map(tf => (
                                    <button 
                                        key={tf} 
                                        className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${timeFilter === tf ? 'bg-card-hover border-primary-green text-primary-green' : 'bg-transparent border-border text-text-medium hover:text-text-light'}`}
                                        onClick={() => setTimeFilter(tf)}
                                    >{tf}</button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 mb-2 text-xs text-text-medium">
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#EB5757]"></div> Market Risk</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#2F80ED]"></div> Smart Money</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#9B51E0]"></div> Volatility</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#26D356]"></div> Volume</div>
                        </div>
                        <div ref={chartRef} className="w-full min-h-[320px]"></div>
                    </div>
                    
                    <div className="border-t md:border-t-0 md:border-l border-border p-6 bg-card-hover/20">
                        <h3 className="card-title">Quick Actions</h3>
                        <div className="flex flex-col gap-2">
                            {[
                                {icon: <ShieldAlert size={18} />, label: 'Create Smart Alert'},
                                {icon: <Wallet size={18} />, label: 'Track Wallet'},
                                {icon: <Activity size={18} />, label: 'Run SafeScan'},
                                {icon: <TrendingUp size={18} />, label: 'View Top Gainers'},
                            ].map((action, i) => (
                                <button key={i} className="flex items-center gap-2 p-3 text-sm font-medium text-text-medium hover:bg-card-hover hover:text-text-light hover:pl-4 transition-all rounded-lg text-left">
                                    {action.icon} {action.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Feed */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Global Detection Feed</h3>
                
                {/* Feed Filters */}
                <div className="flex items-center gap-3 mb-6 flex-wrap relative z-10">
                    <div className="filter-wrapper relative">
                        <button className={`filter-pill ${activeFilter === 'feedChain' ? 'active' : ''}`} onClick={() => toggleFilter('feedChain')}>
                            {feedChain} <ChevronDown size={14} />
                        </button>
                        {activeFilter === 'feedChain' && (
                            <div className="filter-popup">
                                <ul className="flex flex-col gap-1">
                                    {['All Chains', 'Solana', 'Ethereum', 'BNB Chain', 'Arbitrum', 'Base'].map(c => (
                                        <li key={c} className={`filter-list-item ${feedChain === c ? 'selected' : ''}`} onClick={() => { setFeedChain(c); setActiveFilter(null); }}>{c}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="filter-wrapper relative">
                        <button className={`filter-pill ${activeFilter === 'timerange' ? 'active' : ''}`} onClick={() => toggleFilter('timerange')}>
                            <ChevronDown size={14} /> Time Range
                        </button>
                        {activeFilter === 'timerange' && (
                            <div className="filter-popup complex z-[1200]">
                                <div className="font-semibold mb-3 text-[0.95rem] text-text-light">Select Date Range</div>
                                <div className="flex gap-4 mb-4">
                                    <div className="flex-1">
                                        <label className="text-xs text-text-medium mb-1 block">From</label>
                                        <input type="text" className="w-full bg-main border border-border rounded-lg text-text-light p-2 text-sm outline-none cursor-pointer" readOnly value={startDate} placeholder="Select Date" onClick={() => setOpenCalendar('from')} />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs text-text-medium mb-1 block">To</label>
                                        <input type="text" className="w-full bg-main border border-border rounded-lg text-text-light p-2 text-sm outline-none cursor-pointer" readOnly value={endDate} placeholder="Select Date" onClick={() => setOpenCalendar('to')} />
                                    </div>
                                </div>
                                {openCalendar && (
                                    <div className="fixed inset-0 bg-black/50 z-[1500] flex items-center justify-center" onClick={(e) => { if(e.target === e.currentTarget) setOpenCalendar(null); }}>
                                        <CustomCalendar onSelect={handleDateSelect} onCancel={() => setOpenCalendar(null)} />
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <button className="btn btn-outline flex-1 py-1.5 text-xs" onClick={() => setActiveFilter(null)}>Cancel</button>
                                    <button className="btn btn-green flex-1 py-1.5 text-xs" onClick={() => setActiveFilter(null)}>Apply</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="filter-wrapper relative">
                        <button className={`filter-pill ${activeFilter === 'event' ? 'active' : ''}`} onClick={() => toggleFilter('event')}>
                            {eventType} <ChevronDown size={14} />
                        </button>
                        {activeFilter === 'event' && (
                            <div className="filter-popup">
                                <ul className="flex flex-col gap-1">
                                    {['All Events', 'Whale Buy', 'Smart Money', 'Sniper Bot', 'Liquidity Removal', 'Token Launch', 'Risk Spike'].map(e => (
                                        <li key={e} className={`filter-list-item ${eventType === e ? 'selected' : ''}`} onClick={() => { setEventType(e); setActiveFilter(null); }}>{e}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="filter-wrapper relative">
                        <button className={`filter-pill ${activeFilter === 'severity' ? 'active' : ''}`} onClick={() => toggleFilter('severity')}>
                            {severity} <ChevronDown size={14} />
                        </button>
                        {activeFilter === 'severity' && (
                            <div className="filter-popup">
                                <ul className="flex flex-col gap-1">
                                    {['All Severity', 'Low', 'Medium', 'High'].map(s => (
                                        <li key={s} className={`filter-list-item ${severity === s ? 'selected' : ''}`} onClick={() => { setSeverity(s); setActiveFilter(null); }}>{s}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {detectionEvents.map((event, idx) => (
                        <div key={idx} className="bg-card border border-border rounded-xl p-5 flex flex-col relative overflow-hidden group hover:border-text-medium transition-colors">
                            <div className="flex justify-between items-center mb-2">
                                <div className={`flex items-center gap-1.5 font-semibold text-sm ${event.color}`}>
                                    {event.icon} {event.type}
                                </div>
                                <span className="text-xs text-text-dark">{event.time}</span>
                            </div>
                            <p className="text-sm text-text-medium mb-3 leading-snug min-h-[40px]">{event.desc}</p>
                            <div className="mt-auto pt-3 border-t border-border flex justify-between items-center font-semibold text-sm">
                                <span>{event.token}</span>
                                <span>{event.amt}</span>
                            </div>
                            <div className={`absolute bottom-0 left-0 w-full h-1 ${
                                event.severity === 'High' ? 'bg-primary-red' : 
                                event.severity === 'Medium' ? 'bg-primary-yellow' : 'bg-primary-green'
                            }`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};