import React, { useState, useEffect } from 'react';
import { User, SortDesc, TrendingUp, Zap, Target, Brain, Heart, Repeat, MessageSquare, Twitter, ExternalLink, Wallet, Check, ShieldCheck } from 'lucide-react';
import { Post } from '../types';

interface Influencer {
    name: string;
    score: number;
    wallet: boolean;
}

export const KolFeed: React.FC = () => {
    const [highEngagement, setHighEngagement] = useState(true);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
    const [expandedPosts, setExpandedPosts] = useState<Record<number, boolean>>({});
    const [followerRange, setFollowerRange] = useState(2);
    const [selectedPlatform, setSelectedPlatform] = useState('All');
    const [selectedTier, setSelectedTier] = useState('All');
    const [selectedNarrative, setSelectedNarrative] = useState('All');
    const [selectedEngagement, setSelectedEngagement] = useState('All');
    const [selectedSentiment, setSelectedSentiment] = useState('All');

    const followerOptions = ['100', '1k', '10k', '100k >'];
    const platformOptions = ['All', 'Telegram', 'X', 'Reddit', 'Discord'];
    const tierOptions = ['All', 'Micro influencer', 'Macro influencer', 'Mega influencer', 'Smart money influencer', 'Researcher and analyst'];
    const narrativeOptions = ['All', 'RWA', 'Meme', 'AI', 'DePin'];
    const engagementOptions = ['All', 'Organic', 'Viral', 'Paid/Promo', 'Controversial'];

    const toggleAI = (id: number) => { setExpandedPosts(prev => ({...prev, [id]: !prev[id]})); };
    const openProfile = (user: Influencer) => { setSelectedInfluencer(user); setProfileModalOpen(true); };
    const toggleFilter = (filterName: string) => { setActiveFilter(activeFilter === filterName ? null : filterName); };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => { if (activeFilter && !(event.target as Element).closest('.filter-wrapper')) setActiveFilter(null); };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeFilter]);

    const getTierText = () => (!selectedTier || selectedTier === 'All') ? 'Influencer Tier' : selectedTier.split(' ')[0];

    return (
        <div className="relative">
             <div className="flex items-center gap-3 mb-6 flex-wrap relative z-20">
                <div className="filter-wrapper relative">
                     <button className={`filter-pill ${activeFilter === 'platform' ? 'active' : ''}`} onClick={() => toggleFilter('platform')}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> 
                        {selectedPlatform === 'All' ? 'Platform' : selectedPlatform}
                     </button>
                     {activeFilter === 'platform' && (<div className="filter-popup">{platformOptions.map(p => (<div key={p} className={`filter-list-item ${selectedPlatform === p ? 'selected' : ''}`} onClick={() => { setSelectedPlatform(p); setActiveFilter(null); }}>{p}</div>))}</div>)}
                </div>
                <div className="filter-wrapper relative">
                     <button className={`filter-pill ${activeFilter === 'followers' ? 'active' : ''}`} onClick={() => toggleFilter('followers')}><User size={14} /> Followers</button>
                     {activeFilter === 'followers' && (<div className="filter-popup complex"><div className="font-semibold mb-3 text-[0.95rem] text-text-light">Min Followers</div><div className="w-full px-2"><input type="range" className="w-full" min="0" max="3" step="1" value={followerRange} onChange={(e) => setFollowerRange(parseInt(e.target.value))} /><div className="mt-2 text-center text-primary-green font-bold">{followerOptions[followerRange]} +</div></div></div>)}
                </div>
                <div className="filter-wrapper relative">
                     <button className={`filter-pill ${activeFilter === 'tier' ? 'active' : ''}`} onClick={() => toggleFilter('tier')}><SortDesc size={14} /> {getTierText()}</button>
                     {activeFilter === 'tier' && (<div className="filter-popup" style={{minWidth:'200px'}}>{tierOptions.map(t => (<div key={t} className={`filter-list-item ${selectedTier === t ? 'selected' : ''}`} onClick={() => {setSelectedTier(t); setActiveFilter(null);}}>{t}</div>))}</div>)}
                </div>
                <div className="filter-wrapper relative">
                     <button className={`filter-pill ${activeFilter === 'narrative' ? 'active' : ''}`} onClick={() => toggleFilter('narrative')}><TrendingUp size={14} /> {selectedNarrative === 'All' ? 'Narrative' : selectedNarrative}</button>
                     {activeFilter === 'narrative' && (<div className="filter-popup">{narrativeOptions.map(n => (<div key={n} className={`filter-list-item ${selectedNarrative === n ? 'selected' : ''}`} onClick={() => {setSelectedNarrative(n); setActiveFilter(null);}}>{n}</div>))}</div>)}
                </div>
                <div className="filter-wrapper relative">
                     <button className={`filter-pill ${activeFilter === 'engagement' ? 'active' : ''}`} onClick={() => toggleFilter('engagement')}><Zap size={14} /> {selectedEngagement === 'All' ? 'Engagement' : selectedEngagement}</button>
                     {activeFilter === 'engagement' && (<div className="filter-popup">{engagementOptions.map(e => (<div key={e} className={`filter-list-item ${selectedEngagement === e ? 'selected' : ''}`} onClick={() => {setSelectedEngagement(e); setActiveFilter(null);}}>{e}</div>))}</div>)}
                </div>
                <div className="filter-wrapper relative">
                     <button className={`filter-pill ${activeFilter === 'sentiment' ? 'active' : ''}`} onClick={() => toggleFilter('sentiment')}><Target size={14} /> {selectedSentiment === 'All' ? 'Sentiment' : selectedSentiment}</button>
                     {activeFilter === 'sentiment' && (<div className="filter-popup">{['Bullish', 'Bearish'].map(s => (<div key={s} className="filter-list-item" onClick={() => {setSelectedSentiment(s); setActiveFilter(null);}}>{s}</div>))}</div>)}
                </div>
                
                <div className={`ml-auto flex items-center gap-3 cursor-pointer bg-card px-3 py-1.5 rounded-lg border border-border ${highEngagement ? 'border-primary-green' : ''}`} onClick={() => setHighEngagement(!highEngagement)}>
                    <div className={`w-9 h-5 rounded-full relative transition-colors ${highEngagement ? 'bg-[#1B3D28] border border-primary-green' : 'bg-card-hover border border-border'}`}>
                        <div className={`absolute top-[1px] w-3.5 h-3.5 rounded-full transition-transform ${highEngagement ? 'bg-primary-green left-[18px]' : 'bg-text-medium left-[2px]'}`}></div>
                    </div>
                    <span className={`text-sm font-medium ${highEngagement ? 'text-text-light' : 'text-text-medium'}`}>Real-Time Feed</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mb-8">
                {/* Main Feed */}
                <div className="flex flex-col gap-4">
                    {/* Post 1 */}
                    <div className="bg-card border border-border rounded-xl p-5 hover:border-text-dark transition-colors flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                                <img src="https://i.pravatar.cc/150?u=1" className="w-11 h-11 rounded-full object-cover border border-border cursor-pointer" onClick={() => openProfile({name: '@cryptoGuru', score: 74, wallet: true})} />
                                <div className="flex flex-col">
                                    <h4 className="text-[0.95rem] font-semibold text-text-light flex items-center gap-1 cursor-pointer hover:text-primary-purple" onClick={() => openProfile({name: '@cryptoGuru', score: 74, wallet: true})}>
                                        @cryptoGuru <Twitter size={14} className="text-white fill-white" />
                                    </h4>
                                    <div className="flex gap-2 mb-1 mt-0.5">
                                        <span className="text-[0.7rem] px-1.5 py-0.5 rounded border border-primary-purple text-primary-purple bg-[rgba(155,81,224,0.1)] flex items-center gap-1"><Zap size={10} /> Smart Money</span>
                                    </div>
                                    <p className="text-xs text-text-dark">215K followers • 2m ago</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <Twitter size={16} className="text-white fill-white" />
                                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[rgba(38,211,86,0.15)] text-primary-green border border-[rgba(38,211,86,0.3)]">BULLISH</span>
                            </div>
                        </div>
                        <div className="text-[0.95rem] leading-relaxed text-text-light">
                            Hey resto & <span className="text-primary-green font-semibold cursor-pointer hover:underline">$SOL</span> looks incredibly strong here. Breaking out of the falling wedge pattern on the 4h timeframe. Targets $140 soon.
                        </div>
                        <button className="flex items-center gap-1 text-primary-purple border border-primary-purple rounded px-2.5 py-1 text-xs font-semibold w-fit hover:bg-[rgba(155,81,224,0.1)] transition-colors" onClick={() => toggleAI(1)}>
                            <Brain size={14} /> {expandedPosts[1] ? 'Hide AI Insight' : 'View AI Insight'}
                        </button>
                        {expandedPosts[1] && (
                            <div className="bg-[rgba(155,81,224,0.05)] border border-[rgba(155,81,224,0.2)] rounded-lg p-3 text-sm animate-fade-in">
                                <div className="flex items-center gap-1.5 text-primary-purple font-semibold mb-2 text-xs"><Brain size={14} /> AI Insight</div>
                                <div className="mb-2">Signal detects strong accumulation. Narrative aligns with current L1 rotation.</div>
                                <div className="flex gap-4 flex-wrap">
                                    <span className="text-[0.7rem] px-1.5 py-0.5 rounded bg-main border border-primary-green text-primary-green flex items-center gap-1"><Zap size={10} /> Virality: 92/100</span>
                                    <span className="text-[0.7rem] px-1.5 py-0.5 rounded bg-main border border-primary-green text-primary-green flex items-center gap-1"><ShieldCheck size={10} /> Credibility: High</span>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-3 border-t border-border mt-1">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-1.5 text-text-dark text-[0.7rem] font-medium cursor-pointer hover:text-text-medium"><Heart size={14} /> 130</div>
                                <div className="flex items-center gap-1.5 text-text-dark text-[0.7rem] font-medium cursor-pointer hover:text-text-medium"><Repeat size={14} /> 500</div>
                                <div className="flex items-center gap-1.5 text-text-dark text-[0.7rem] font-medium cursor-pointer hover:text-text-medium"><MessageSquare size={14} /> 1.2k</div>
                            </div>
                            <span className="text-xs text-text-medium font-medium cursor-pointer hover:text-text-light hover:underline">Open Post</span>
                        </div>
                    </div>

                    {/* Post 2 */}
                    <div className="bg-card border border-border rounded-xl p-5 hover:border-text-dark transition-colors flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                                <img src="https://i.pravatar.cc/150?u=2" className="w-11 h-11 rounded-full object-cover border border-border cursor-pointer" onClick={() => openProfile({name: '@TheTrader', score: 92, wallet: false})} />
                                <div className="flex flex-col">
                                    <h4 className="text-[0.95rem] font-semibold text-text-light cursor-pointer hover:text-primary-purple" onClick={() => openProfile({name: '@TheTrader', score: 92, wallet: false})}>AlphaCalls Channel</h4>
                                    <p className="text-xs text-text-dark mt-0.5">1.3M subscribers • 15m ago</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <Zap size={16} className="text-[#2AABEE] fill-[#2AABEE]" />
                                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[rgba(143,150,163,0.15)] text-text-medium border border-[rgba(143,150,163,0.3)]">NEUTRAL</span>
                            </div>
                        </div>
                        <div className="text-[0.95rem] leading-relaxed text-text-light">
                            It's really choppy out here. I'd wait for a confirmed close above resistance before longing <span className="text-primary-green font-semibold cursor-pointer hover:underline">$BONK</span>. Funding rates are getting high.
                        </div>
                        <button className="flex items-center gap-1 text-primary-purple border border-primary-purple rounded px-2.5 py-1 text-xs font-semibold w-fit hover:bg-[rgba(155,81,224,0.1)] transition-colors" onClick={() => toggleAI(2)}>
                            <Brain size={14} /> {expandedPosts[2] ? 'Hide AI Insight' : 'View AI Insight'}
                        </button>
                        {expandedPosts[2] && (
                            <div className="bg-[rgba(155,81,224,0.05)] border border-[rgba(155,81,224,0.2)] rounded-lg p-3 text-sm animate-fade-in">
                                <div className="flex items-center gap-1.5 text-primary-purple font-semibold mb-2 text-xs"><Brain size={14} /> AI Insight</div>
                                <div>Caution advised. Sentiment is mixed with high funding rates indicating potential flush.</div>
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-3 border-t border-border mt-1">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-1.5 text-text-dark text-[0.7rem] font-medium cursor-pointer hover:text-text-medium"><Heart size={14} /> 200</div>
                                <div className="flex items-center gap-1.5 text-text-dark text-[0.7rem] font-medium cursor-pointer hover:text-text-medium"><MessageSquare size={14} /> 300</div>
                            </div>
                            <span className="text-xs text-text-medium font-medium cursor-pointer hover:text-text-light hover:underline">Open Post</span>
                        </div>
                    </div>
                    
                    <div className="w-full p-4 bg-card border border-dashed border-border text-text-medium cursor-pointer text-center rounded-xl hover:bg-card-hover hover:text-text-light hover:border-text-light transition-all">Load More Posts</div>
                </div>

                {/* Sidebar Column */}
                <div className="flex flex-col gap-6">
                    <div className="bg-card border border-border rounded-xl p-5">
                        <h4 className="text-base font-semibold mb-4 text-text-light border-b border-border pb-3">Narrative Trends</h4>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-card-hover rounded -mx-2 transition-colors">
                                <div className="flex flex-col">
                                    <div className="text-[0.9rem] font-medium text-text-light">Solana Memes</div>
                                    <div className="text-[0.7rem] text-text-medium flex items-center gap-1">Vel: High <span className="text-primary-green">▲</span></div>
                                </div>
                                <div className="text-right">
                                    <div className="text-primary-green font-bold text-xs">120</div>
                                    <div className="text-[0.7rem] text-text-medium">mentions</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-card-hover rounded -mx-2 transition-colors">
                                <div className="flex flex-col">
                                    <div className="text-[0.9rem] font-medium text-text-light">AI Tokens</div>
                                    <div className="text-[0.7rem] text-text-medium flex items-center gap-1">Vel: Med <span className="text-primary-yellow">►</span></div>
                                </div>
                                <div className="text-right">
                                    <div className="text-text-light font-bold text-xs">78</div>
                                    <div className="text-[0.7rem] text-text-medium">mentions</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-5">
                        <h4 className="text-base font-semibold mb-4 text-text-light border-b border-border pb-3">Trending Tokens by KOLs</h4>
                        <table className="w-full text-[0.85rem] border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left text-text-dark pb-3 font-medium text-xs">Token</th>
                                    <th className="text-left text-text-dark pb-3 font-medium text-xs">Mentions</th>
                                    <th className="text-left text-text-dark pb-3 font-medium text-xs">Inf_by</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2.5 text-text-light font-semibold border-b border-border">$WIF</td>
                                    <td className="py-2.5 text-text-light font-medium border-b border-border">200</td>
                                    <td className="py-2.5 border-b border-border"><span className="text-[0.7rem] px-1.5 py-0.5 rounded bg-[rgba(38,211,86,0.1)] text-primary-green font-semibold">High</span></td>
                                </tr>
                                <tr>
                                    <td className="py-2.5 text-text-light font-semibold border-b border-border">$BONK</td>
                                    <td className="py-2.5 text-text-light font-medium border-b border-border">180</td>
                                    <td className="py-2.5 border-b border-border"><span className="text-[0.7rem] px-1.5 py-0.5 rounded bg-[rgba(242,201,76,0.1)] text-primary-yellow font-semibold">Medium</span></td>
                                </tr>
                                <tr>
                                    <td className="py-2.5 text-text-light font-semibold">$DOG</td>
                                    <td className="py-2.5 text-text-light font-medium">120</td>
                                    <td className="py-2.5"><span className="text-[0.7rem] px-1.5 py-0.5 rounded bg-[rgba(242,201,76,0.1)] text-primary-yellow font-semibold">Medium</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Profile Modal */}
            {profileModalOpen && (
                <div className="fixed inset-0 bg-black/70 z-[2000] flex items-center justify-center backdrop-blur-sm p-4" onClick={() => setProfileModalOpen(false)}>
                    <div className="bg-card border border-border w-full max-w-[500px] rounded-2xl p-6 relative animate-fade-in" onClick={(e) => e.stopPropagation()}>
                        <div className="absolute top-4 right-4 cursor-pointer text-text-dark hover:text-text-light" onClick={() => setProfileModalOpen(false)}>✕</div>
                        <div className="flex gap-4 items-center mb-6">
                            <img src="https://i.pravatar.cc/150?u=1" className="w-16 h-16 rounded-full border-2 border-primary-purple object-cover" />
                            <div>
                                <h3 className="text-xl font-bold">{selectedInfluencer?.name}</h3>
                                <p className="text-text-medium text-sm">Top Tier Analyst • Smart Money</p>
                            </div>
                        </div>
                        {selectedInfluencer?.wallet && (
                            <button className="w-full py-3 bg-primary-purple text-white font-semibold rounded-lg hover:bg-[#8244bb] transition-colors mb-4 flex items-center justify-center gap-2">
                                <Wallet size={18} /> Track Wallet Activity
                            </button>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-main p-4 rounded-lg text-center border border-border">
                                <h5 className="text-text-medium text-xs mb-1">Influence Score</h5>
                                <p className="text-primary-purple text-lg font-bold">{selectedInfluencer?.score}/100</p>
                            </div>
                            <div className="bg-main p-4 rounded-lg text-center border border-border">
                                <h5 className="text-text-medium text-xs mb-1">Engagement Rate</h5>
                                <p className="text-primary-green text-lg font-bold">8.4%</p>
                            </div>
                            <div className="bg-main p-4 rounded-lg text-center border border-border">
                                <h5 className="text-text-medium text-xs mb-1">Followers</h5>
                                <p className="text-text-light text-lg font-bold">215K</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};