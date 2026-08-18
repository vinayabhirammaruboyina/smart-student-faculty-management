import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useLocalStorage('sidebar-collapsed', false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on window resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen w-full flex bg-[#070B13] text-slate-200 overflow-hidden">
      {/* Sidebar navigation */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#070B13] animate-fade-in relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
