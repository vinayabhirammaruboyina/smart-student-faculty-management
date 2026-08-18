import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Sun, Moon, Settings, Bell, User, LogOut, ArrowRightLeft,
  ChevronDown, HelpCircle, Menu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import Avatar from '../ui/Avatar';
import toast from 'react-hot-toast';
import CommandPalette from '../common/CommandPalette';

const SWITCHABLE_ACCOUNTS = [
  { role: 'student', name: 'VinayAbhiram M.', label: 'Student Portal' },
  { role: 'faculty', name: 'Dr. Priya Sharma', label: 'Faculty Portal' },
  { role: 'admin', name: 'Rajesh Mehta', label: 'Admin Portal' },
];

export default function Navbar({ onMenuClick }) {
  const { user, logout, switchRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  
  const [profileOpen, setProfileOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const profileRef = useRef(null);
  const roleSwitcherRef = useRef(null);
  const role = user?.role || 'student';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (roleSwitcherRef.current && !roleSwitcherRef.current.contains(e.target)) {
        setRoleSwitcherOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleSwitch = async (roleType) => {
    const res = await switchRole(roleType);
    if (res.success) {
      toast.success(`Switched to ${res.user.role.toUpperCase()} mode!`);
      navigate(`/${res.user.role}/dashboard`);
      setRoleSwitcherOpen(false);
    }
  };

  const renderStudentHeader = () => (
    <>
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu trigger */}
        <button onClick={onMenuClick} className="md:hidden text-primary p-1.5 rounded hover:bg-surface-container-high">
          <Menu size={20} />
        </button>
        <div className="text-lg font-bold text-primary md:hidden">Smart SMS</div>
        
        {/* Search resources */}
        <div 
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center bg-surface-container-high rounded-full px-4 py-1.5 border border-outline-variant/60 cursor-pointer w-64 lg:w-80 group hover:border-primary transition-all duration-150"
        >
          <Search size={16} className="text-on-surface-variant mr-2" />
          <span className="text-xs text-on-surface-variant/80 select-none">Search resources...</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Mobile Search trigger */}
        <button onClick={() => setSearchOpen(true)} className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full">
          <Search size={18} />
        </button>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileOpen(!profileOpen)} className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors flex items-center">
            <User size={18} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-surface-container-high border border-outline-variant rounded shadow-lg py-1 z-50 animate-fade-in text-sm">
              <div className="px-4 py-2 border-b border-outline-variant">
                <p className="font-semibold text-on-surface">{user?.name}</p>
                <p className="text-xs text-on-surface-variant truncate">{user?.email}</p>
              </div>
              <button onClick={() => navigate('/student/profile')} className="w-full text-left px-4 py-2 hover:bg-surface-container-highest flex items-center gap-2 text-on-surface">
                <User size={14} /> Profile
              </button>
              <button onClick={() => navigate('/student/settings')} className="w-full text-left px-4 py-2 hover:bg-surface-container-highest flex items-center gap-2 text-on-surface">
                <Settings size={14} /> Settings
              </button>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-surface-container-highest flex items-center gap-2 text-error border-t border-outline-variant">
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderFacultyHeader = () => (
    <>
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu trigger */}
        <button onClick={onMenuClick} className="md:hidden text-primary p-1.5 rounded hover:bg-surface-container-high">
          <Menu size={20} />
        </button>
        
        <div className="font-semibold text-lg text-primary tracking-tight">Smart SMS</div>
        
        {/* Search */}
        <div 
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center bg-surface-container-high rounded-full px-4 py-1.5 border border-outline-variant/50 focus-within:border-primary w-64 lg:w-96 cursor-pointer hover:border-primary transition-all"
        >
          <Search size={16} className="text-on-surface-variant mr-2" />
          <span className="text-xs text-on-surface-variant/80 select-none">Search courses, students, IDs...</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Mobile Search trigger */}
        <button onClick={() => setSearchOpen(true)} className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full">
          <Search size={18} />
        </button>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setProfileOpen(!profileOpen)} 
            className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors flex items-center gap-2 border border-transparent hover:border-outline-variant px-3"
          >
            <User size={18} />
            <span className="text-xs font-medium hidden md:block">{user?.name?.split(' ').slice(-1)[0] || 'Faculty'}</span>
          </button>
          
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-surface-container-high border border-outline-variant rounded shadow-lg py-1 z-50 animate-fade-in text-sm">
              <div className="px-4 py-2 border-b border-outline-variant">
                <p className="font-semibold text-on-surface">{user?.name}</p>
                <p className="text-xs text-on-surface-variant truncate">{user?.email}</p>
              </div>
              <button onClick={() => navigate('/faculty/profile')} className="w-full text-left px-4 py-2 hover:bg-surface-container-highest flex items-center gap-2 text-on-surface">
                <User size={14} /> Profile
              </button>
              <button onClick={() => navigate('/faculty/settings')} className="w-full text-left px-4 py-2 hover:bg-surface-container-highest flex items-center gap-2 text-on-surface">
                <Settings size={14} /> Settings
              </button>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-surface-container-highest flex items-center gap-2 text-error border-t border-outline-variant">
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderAdminHeader = () => (
    <>
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu trigger */}
        <button onClick={onMenuClick} className="md:hidden text-primary p-1.5 rounded hover:bg-surface-container-high">
          <Menu size={20} />
        </button>
        
        <span className="text-lg font-bold text-indigo-750 dark:text-primary tracking-tight hidden md:block">Smart SMS</span>
        
        {/* Command Search */}
        <div 
          onClick={() => setSearchOpen(true)}
          className="relative w-full max-w-sm lg:max-w-md ml-4 cursor-pointer group"
        >
          <div className="w-full bg-white dark:bg-surface-container-lowest border border-slate-200 dark:border-outline-variant rounded py-1.5 pl-9 pr-12 text-xs flex items-center justify-between text-on-surface-variant/80 hover:bg-slate-50 dark:hover:bg-surface-container-highest transition-all duration-150">
            <div className="flex items-center gap-2">
              <Search size={14} className="text-slate-400 dark:text-on-surface-variant" />
              <span>Command Center...</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="text-[9px] font-semibold text-slate-500 bg-slate-100 dark:bg-surface-container px-1.5 py-0.5 rounded border border-slate-250 dark:border-outline-variant">Cmd</kbd>
              <kbd className="text-[9px] font-semibold text-slate-500 bg-slate-100 dark:bg-surface-container px-1.5 py-0.5 rounded border border-slate-250 dark:border-outline-variant">K</kbd>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Mobile Search trigger */}
        <button onClick={() => setSearchOpen(true)} className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full">
          <Search size={18} />
        </button>

        {/* Role Switcher dropdown */}
        <div className="relative group hidden sm:block" ref={roleSwitcherRef}>
          <button 
            onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
            className="flex items-center gap-1 px-3 py-1.5 rounded border border-slate-200 dark:border-outline-variant text-slate-700 dark:text-on-surface text-xs font-semibold hover:bg-slate-100 dark:hover:bg-surface-container-highest transition-colors"
          >
            <span>Admin Portal</span>
            <ChevronDown size={14} />
          </button>
          
          {roleSwitcherOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-container-high border border-slate-200 dark:border-outline-variant rounded shadow-lg py-1 z-50 animate-fade-in text-xs text-on-surface">
              <div className="px-3 py-1.5 border-b border-slate-100 dark:border-outline-variant text-[10px] uppercase font-semibold text-slate-450 dark:text-on-surface-variant">Switch Portal</div>
              {SWITCHABLE_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => handleSwitch(acc.role)}
                  className={`w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-surface-container-highest flex items-center justify-between ${role === acc.role ? 'font-bold text-primary' : 'text-slate-700 dark:text-on-surface'}`}
                >
                  <span>{acc.label}</span>
                  {role === acc.role && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="p-2 text-slate-500 dark:text-on-surface-variant hover:bg-slate-100 dark:hover:bg-surface-container-highest rounded-full transition-colors">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Settings */}
        <button onClick={() => navigate('/admin/settings')} className="p-2 text-slate-500 dark:text-on-surface-variant hover:bg-slate-100 dark:hover:bg-surface-container-highest rounded-full transition-colors hidden sm:block">
          <Settings size={18} />
        </button>

        {/* Notifications */}
        <button className="p-2 text-slate-500 dark:text-on-surface-variant hover:bg-slate-100 dark:hover:bg-surface-container-highest rounded-full transition-colors relative">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
          )}
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileOpen(!profileOpen)} className="p-2 text-slate-500 dark:text-on-surface-variant hover:bg-slate-100 dark:hover:bg-surface-container-highest rounded-full transition-colors flex items-center">
            <User size={18} />
          </button>
          
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-container-high border border-slate-200 dark:border-outline-variant rounded shadow-lg py-1 z-50 animate-fade-in text-sm text-on-surface">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-outline-variant">
                <p className="font-semibold text-on-surface">{user?.name}</p>
                <p className="text-xs text-on-surface-variant truncate">{user?.email}</p>
              </div>
              <button onClick={() => navigate('/admin/settings')} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-surface-container-highest flex items-center gap-2 text-on-surface">
                <Settings size={14} /> Settings
              </button>
              {/* Dev shortcut to change portal inside menu for mobile */}
              <div className="border-t border-slate-100 dark:border-outline-variant sm:hidden">
                {SWITCHABLE_ACCOUNTS.map((acc) => (
                  <button key={acc.role} onClick={() => handleSwitch(acc.role)} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-surface-container-highest flex items-center gap-2 text-on-surface pl-6">
                    <ArrowRightLeft size={12} /> {acc.label}
                  </button>
                ))}
              </div>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-surface-container-highest flex items-center gap-2 text-error border-t border-slate-150 dark:border-outline-variant">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const getHeaderTheme = () => {
    switch (role) {
      case 'admin':
        return {
          headerClass: 'bg-[#F8FAFC] dark:bg-surface-dim border-slate-200 dark:border-outline-variant text-slate-700 dark:text-primary',
          content: renderAdminHeader()
        };
      case 'faculty':
        return {
          headerClass: 'bg-surface dark:bg-surface border-outline-variant text-primary dark:text-primary',
          content: renderFacultyHeader()
        };
      case 'student':
      default:
        return {
          headerClass: 'bg-surface dark:bg-surface border-outline-variant text-primary dark:text-primary',
          content: renderStudentHeader()
        };
    }
  };

  const headerTheme = getHeaderTheme();

  return (
    <>
      <header className={`sticky top-0 z-30 flex justify-between items-center px-6 h-16 w-full border-b transition-all duration-200 ${headerTheme.headerClass}`}>
        {headerTheme.content}
      </header>

      {/* Command Palette search overlay */}
      {searchOpen && (
        <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
}
