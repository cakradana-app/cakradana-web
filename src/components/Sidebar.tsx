'use client';
import React, { useState } from 'react';
import { Search, Bell, User, Home, Network, FileText, AlertTriangle, Upload, Users, BarChart3, Clock, TrendingUp, TrendingDown } from 'lucide-react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: Home, active: true },
    { name: 'Network View', icon: Network },
    { name: 'Donations', icon: FileText },
    { name: 'Risk Analysis', icon: AlertTriangle },
    { name: 'Upload Data', icon: Upload },
    { name: 'Candidates', icon: Users },
    { name: 'Reports', icon: BarChart3 }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="flex-1 p-4">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Quick Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.name === activeItem;
            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                <span className="text-sm">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-xs font-semibold text-white">CD</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">Cakra Putra Dana</div>
            <div>KPU</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;