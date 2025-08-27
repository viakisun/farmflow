import React, { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Workflow, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOverlayStore } from '@/stores/overlay';
import Overlay from '@/components/ui/Overlay';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/workflow-editor', icon: Workflow, label: 'Workflows' },
  { path: '/performance-dashboard', icon: BarChart3, label: 'Analytics' },
  { path: '/help', icon: Settings, label: 'Help' },
];

const AppLayout: React.FC = () => {
  const location = useLocation();
  const { isAnyOverlayOpen, closeAll } = useOverlayStore();

  // Close any overlays when the route changes
  useEffect(() => {
    closeAll();
  }, [location.pathname, closeAll]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Left Navigation */}
      <nav className="w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 z-20">
        <Link to="/" className="w-8 h-8 mb-8">
          <svg className="w-8 h-8" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="navBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#256C3A'}}/>
                <stop offset="100%" style={{stopColor:'#1e5530'}}/>
              </linearGradient>
            </defs>
            <rect x="8" y="8" width="48" height="48" rx="12" fill="url(#navBg)"/>
            <rect x="16" y="36" width="4" height="12" fill="white" rx="2"/>
            <rect x="22" y="32" width="4" height="16" fill="white" rx="2"/>
            <rect x="28" y="28" width="4" height="20" fill="white" rx="2"/>
            <rect x="34" y="24" width="4" height="24" fill="white" rx="2"/>
            <rect x="40" y="30" width="4" height="18" fill="white" rx="2"/>
            <circle cx="48" cy="20" r="4" fill="white"/>
            <rect x="46" y="18" width="4" height="4" fill="#256C3A" rx="1"/>
          </svg>
        </Link>

        <div className="flex flex-col space-y-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
                aria-label={item.label}
              >
                <item.icon className="w-5 h-5" />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* Global Overlay */}
      <Overlay open={isAnyOverlayOpen} onClick={closeAll} />
    </div>
  );
};

export default AppLayout;
