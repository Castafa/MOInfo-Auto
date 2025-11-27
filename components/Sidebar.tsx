import React from 'react';
import { LayoutDashboard, PenSquare, Calendar, Settings, Bot } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'create', label: 'Create & AI', icon: <Bot size={20} /> },
    { id: 'calendar', label: 'Schedule', icon: <Calendar size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6">
        <div className="flex items-center space-x-2 text-white mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-lg">S</span>
          </div>
          <span className="font-bold text-xl tracking-tight">SocialFlow</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-indigo-600 text-white' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-800">
        <button className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors w-full px-4 py-2">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};