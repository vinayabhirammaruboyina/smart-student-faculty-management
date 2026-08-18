import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Sun, Moon, Settings, Bell, User, LogOut, ArrowRightLeft,
  ChevronDown, Menu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
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

  const NavIcons = () => (
    <div className="flex items-center gap-3 ml-auto">
      {/* Search trigger for mobile */}
      <button onClick={() => setSearchOpen(true)} className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-md transition-colors">
        <Search size={18} />
      </button>

      {/* Role Switcher */}
      <div className="relative hidden sm:block" ref={roleSwitcherRef}>
        <button 
          onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
          className="flex items-center gap-1.5 px-2 py-1 rounded border border-[#141C2E] text-slate-300 text-xs font-semibold hover:bg-[#151D33] hover:text-white transition-colors bg-[#0B101E]"
        >
          <span>{role.charAt(0).toUpperCase() + role.slice(1)} Portal</span>
          <ChevronDown size={14} className="text-slate-500" />
        </button>
        {roleSwitcherOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[#0B101E] border border-[#151D33] rounded-md shadow-lg py-1 z-50 text-xs">
            <div className="px-3 py-1.5 border-b border-[#141C2E] text-[10px] uppercase font-mono tracking-widest text-[#5C6E91]">Switch Portal</div>
            {SWITCHABLE_ACCOUNTS.map((acc) => (
              <button
                key={acc.role}
                onClick={() => handleSwitch(acc.role)}
                className={`w-full text-left px-3 py-2 hover:bg-[#151D33] flex items-center justify-between ${role === acc.role ? 'text-white font-semibold' : 'text-slate-400'}`}
              >
                <span>{acc.label}</span>
                {role === acc.role && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Theme Toggle */}
      <button onClick={toggleTheme} className="p-1.5 text-slate-400 hover:text-white hover:bg-[#151D33] rounded-md transition-colors hidden sm:block">
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Settings */}
      <button onClick={() => navigate(`/${role}/settings`)} className="p-1.5 text-slate-400 hover:text-white hover:bg-[#151D33] rounded-md transition-colors hidden sm:block">
        <Settings size={18} />
      </button>

      {/* Notifications with ping */}
      <button className="p-1.5 text-slate-400 hover:text-white hover:bg-[#151D33] rounded-md transition-colors relative">
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
        )}
      </button>

      {/* Profile Avatar */}
      <div className="relative ml-1" ref={profileRef}>
        <button onClick={() => setProfileOpen(!profileOpen)} className="w-8 h-8 rounded-full bg-[#151D33] border border-[#2A3755] flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-500 transition-colors">
          <User size={16} />
        </button>
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[#0B101E] border border-[#151D33] rounded-md shadow-lg py-1 z-50 text-sm">
            <div className="px-4 py-2 border-b border-[#141C2E]">
              <p className="font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
            <button onClick={() => navigate(`/${role}/profile`)} className="w-full text-left px-4 py-2 hover:bg-[#151D33] flex items-center gap-2 text-slate-300">
              <User size={14} /> Profile
            </button>
            <div className="border-t border-[#141C2E] sm:hidden">
              {SWITCHABLE_ACCOUNTS.map((acc) => (
                <button key={acc.role} onClick={() => handleSwitch(acc.role)} className="w-full text-left px-4 py-2 hover:bg-[#151D33] flex items-center gap-2 text-slate-400 pl-6">
                  <ArrowRightLeft size={12} /> {acc.label}
                </button>
              ))}
            </div>
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-[#151D33] flex items-center gap-2 text-[#E58C8A] border-t border-[#141C2E]">
              <LogOut size={14} /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderStudentHeader = () => (
    <div className="flex items-center w-full">
      <button onClick={onMenuClick} className="md:hidden text-slate-300 p-1.5 mr-2 rounded hover:bg-[#151D33]">
        <Menu size={20} />
      </button>
      <div className="text-lg font-bold text-white md:hidden mr-4">Smart SMS</div>
      <div 
        onClick={() => setSearchOpen(true)}
        className="hidden md:flex items-center bg-[#0B101E] rounded-md px-3 py-1.5 border border-[#141C2E] cursor-pointer w-64 lg:w-80 hover:border-indigo-500 transition-colors"
      >
        <Search size={16} className="text-slate-500 mr-2" />
        <span className="text-xs text-slate-400 select-none">Search resources...</span>
      </div>
      <NavIcons />
    </div>
  );

  const renderFacultyHeader = () => (
    <div className="flex items-center w-full">
      <button onClick={onMenuClick} className="md:hidden text-slate-300 p-1.5 mr-2 rounded hover:bg-[#151D33]">
        <Menu size={20} />
      </button>
      <div className="hidden md:block font-bold text-lg text-white tracking-tight mr-6">Smart SMS</div>
      <div 
        onClick={() => setSearchOpen(true)}
        className="hidden md:flex items-center bg-[#0B101E] rounded-md px-3 py-1.5 border border-[#141C2E] cursor-pointer w-64 lg:w-96 hover:border-indigo-500 transition-colors"
      >
        <Search size={16} className="text-slate-500 mr-2" />
        <span className="text-xs text-slate-400 select-none">Search courses, students, IDs...</span>
      </div>
      <NavIcons />
    </div>
  );

  const renderAdminHeader = () => (
    <div className="flex items-center w-full">
      <button onClick={onMenuClick} className="md:hidden text-slate-300 p-1.5 mr-2 rounded hover:bg-[#151D33]">
        <Menu size={20} />
      </button>
      <div className="hidden md:block font-bold text-lg text-white tracking-tight mr-6">Smart SMS</div>
      <div 
        onClick={() => setSearchOpen(true)}
        className="hidden md:flex items-center bg-[#0B101E] rounded-md px-3 py-1 border border-[#141C2E] cursor-pointer w-64 lg:w-96 hover:border-indigo-500 transition-colors justify-between"
      >
        <div className="flex items-center">
          <Search size={16} className="text-slate-500 mr-2" />
          <span className="text-xs text-slate-400 select-none">Command search...</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="text-[10px] font-mono text-slate-400 bg-[#151D33] px-1.5 py-0.5 rounded border border-[#2A3755]">Cmd</kbd>
          <kbd className="text-[10px] font-mono text-slate-400 bg-[#151D33] px-1.5 py-0.5 rounded border border-[#2A3755]">K</kbd>
        </div>
      </div>
      <NavIcons />
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center px-4 md:px-6 h-14 shrink-0 w-full bg-[#070B13] border-b border-[#141C2E]">
        {role === 'admin' ? renderAdminHeader() : role === 'faculty' ? renderFacultyHeader() : renderStudentHeader()}
      </header>
      {searchOpen && (
        <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
}
