import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
  LayoutDashboard, Users, Target, Activity, Radar, Flame, MessageSquare, 
  Wallet, Zap, ShieldCheck, Bell, Settings, LogOut, Menu, User 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{ 
  active: boolean; 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void;
  colorClass?: string;
  tag?: string;
}> = ({ active, icon, label, onClick, colorClass, tag }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-3 py-3 rounded-lg mb-1 transition-all duration-200 text-sm font-medium relative group
      ${active ? 'bg-card text-text-light font-semibold' : 'text-text-medium hover:bg-card hover:text-text-light'}
      ${active && colorClass ? colorClass : ''}
    `}
  >
    {active && (
      <div className={`absolute left-[-1.5rem] top-0 bottom-0 w-1 rounded-r-md bg-primary-purple ${
        colorClass?.includes('text-primary-yellow') ? 'bg-primary-yellow' : ''
      }`} />
    )}
    <span className={`mr-3 ${active ? 'text-current' : 'text-text-dark group-hover:text-current'}`}>
      {icon}
    </span>
    {label}
    {tag && (
      <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary-green/10 text-primary-green">
        {tag}
      </span>
    )}
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const getPageTitle = () => {
    switch (currentView) {
      case 'overview': return 'Overview';
      case 'kol-feed': return 'KOL / Influencer Feed';
      case 'heatmap': return 'Token Heatmap';
      case 'sentiment': return 'Sentiment Analysis';
      case 'detection': return 'Global Detection';
      case 'token-detection': return 'Detection';
      case 'virality': return 'Virality Prediction Engine';
      case 'chatbot': return 'AI Chatbot';
      case 'wallet-tracking': return 'Wallet Tracking';
      case 'safe-scan': return 'Safe Scan';
      case 'settings': return 'Settings';
      default: return 'Overview';
    }
  };
  
  const getPageSubtitle = () => {
    switch (currentView) {
        case 'overview': return 'Track token and stay ahead of the crowd'; 
        case 'kol-feed': return 'Real-time posts from top crypto influencers ranked by impact, engagement, and narrative momentum.';
        case 'heatmap': return 'Visualize concentration of normal vs. abnormal activity';
        case 'sentiment': return 'Monitor user opinions, reviews, and feedback trends.';
        case 'detection': return 'Identify anomalies, drift, or suspicious patterns';
        case 'virality': return 'AI predicts tokens likely to blow up from sentiment + engagement signals';
        case 'chatbot': return 'Interact with AlphaTracker Intelligence';
        case 'safe-scan': return 'Security analysis and risk scoring for tokens';
        case 'wallet-tracking': return 'Monitor wallet activity, performance and patterns';
        default: return '';
    }
  };

  return (
    <div className="flex h-screen bg-main overflow-hidden">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-[280px] bg-sidebar border-r border-border
        transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl md:shadow-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 pb-4">
          <div className="flex items-center gap-2 text-xl font-bold text-text-light">
            <img src="https://i.ibb.co/LtbW0q2/alphatrackerlogo.png" alt="Logo" className="w-8 h-8 object-contain" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/32')} />
            AlphaTracker AI
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="text-xs font-semibold text-text-dark uppercase tracking-wider mb-3 mt-2">Overview</div>
          <NavItem active={currentView === 'overview'} onClick={() => onViewChange('overview')} icon={<LayoutDashboard size={20} />} label="Overview" />
          
          <div className="text-xs font-semibold text-text-dark uppercase tracking-wider mb-3 mt-6">Market Monitoring</div>
          <NavItem active={currentView === 'kol-feed'} onClick={() => onViewChange('kol-feed')} icon={<Users size={20} />} label="KOL / Influencer Feed" colorClass="text-primary-yellow" />
          <NavItem active={currentView === 'custom-alerts'} onClick={() => onViewChange('custom-alerts')} icon={<Bell size={20} />} label="Custom Alerts" />
          <NavItem active={currentView === 'heatmap'} onClick={() => onViewChange('heatmap')} icon={<Activity size={20} />} label="Token Heatmap" />

          <div className="text-xs font-semibold text-text-dark uppercase tracking-wider mb-3 mt-6">Analytics & Insights</div>
          <NavItem active={currentView === 'sentiment'} onClick={() => onViewChange('sentiment')} icon={<Target size={20} />} label="Sentiment Analysis" />
          <NavItem active={currentView === 'detection'} onClick={() => onViewChange('detection')} icon={<Radar size={20} />} label="Detection" colorClass="text-primary-purple" />
          <NavItem active={currentView === 'virality'} onClick={() => onViewChange('virality')} icon={<Flame size={20} />} label="Virality Prediction Engine" />

          <div className="text-xs font-semibold text-text-dark uppercase tracking-wider mb-3 mt-6">Trading & Intelligence Tools</div>
          <NavItem active={currentView === 'wallet-tracking'} onClick={() => onViewChange('wallet-tracking')} icon={<Wallet size={20} />} label="Wallet Tracking" />
          <NavItem active={currentView === 'chatbot'} onClick={() => onViewChange('chatbot')} icon={<MessageSquare size={20} />} label="AI Chatbot" />
          <NavItem active={currentView === 'smart-money'} onClick={() => onViewChange('smart-money')} icon={<Zap size={20} />} label="Smart Money Tracking" />
          
          <div className="text-xs font-semibold text-text-dark uppercase tracking-wider mb-3 mt-6">Security & Risk</div>
          <NavItem active={currentView === 'safe-scan'} onClick={() => onViewChange('safe-scan')} icon={<ShieldCheck size={20} />} label="Safe Scan" />
        </div>

        <div className="p-4 border-t border-border mt-auto">
          <div className="text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">Settings</div>
          <NavItem active={currentView === 'settings'} onClick={() => onViewChange('settings')} icon={<Settings size={20} />} label="Settings" />
          
          <div className="flex items-center gap-3 mt-4 p-2 rounded-lg bg-card/50 border border-border">
            <div className="w-8 h-8 rounded-full bg-primary-purple flex items-center justify-center text-xs font-bold text-white">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text-light truncate">AlphaTracker User</div>
              <div className="text-xs text-text-medium">Free Plan</div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full mt-3 flex items-center justify-center gap-2 p-2 text-xs font-medium text-text-medium hover:text-primary-red transition-colors"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-main h-full">
        {/* Header */}
        <header className="h-[70px] md:h-[90px] px-4 md:px-8 flex items-center justify-between sticky top-0 bg-[#111315e6] backdrop-blur-md z-30 border-b border-border/50">
          <div className="flex items-center gap-4 overflow-hidden">
            <button 
              className="md:hidden text-text-medium hover:text-text-light"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-text-light flex items-center gap-2 truncate">
                {getPageTitle()}
                {currentView === 'overview' && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-card border border-border text-text-light font-medium uppercase">Free</span>
                )}
              </h1>
              <p className="text-sm text-text-medium truncate hidden md:block">{getPageSubtitle()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
             <div className="relative">
                <button 
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-text-medium hover:text-text-light hover:bg-card-hover transition-colors"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <User size={20} />
                </button>
                
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-12 w-64 bg-card border border-border rounded-xl shadow-2xl p-2 z-50 animate-fade-in">
                      <div className="flex items-center gap-3 p-3 border-b border-border mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary-purple flex items-center justify-center font-bold text-white">A</div>
                        <div>
                          <div className="font-semibold text-sm">AlphaTracker User</div>
                          <div className="text-xs text-text-medium">user@example.com</div>
                        </div>
                      </div>
                      <button className="w-full text-left px-3 py-2 text-sm text-text-medium hover:bg-card-hover hover:text-text-light rounded-lg flex items-center gap-2">
                        <User size={16} /> Profile
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-text-medium hover:bg-card-hover hover:text-text-light rounded-lg flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> Plan & Billing
                      </button>
                      <div className="h-px bg-border my-2" />
                      <button onClick={() => { onViewChange('settings'); setUserMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-text-medium hover:bg-card-hover hover:text-text-light rounded-lg flex items-center gap-2">
                        <Settings size={16} /> Settings
                      </button>
                      <button onClick={onLogout} className="w-full text-left px-3 py-2 text-sm text-text-medium hover:bg-card-hover hover:text-primary-red rounded-lg flex items-center gap-2">
                        <LogOut size={16} /> Login / Switch
                      </button>
                    </div>
                  </>
                )}
             </div>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {children}
        </main>
      </div>
    </div>
  );
};