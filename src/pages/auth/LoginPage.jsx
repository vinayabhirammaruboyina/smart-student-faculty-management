import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const DEMO_ACCOUNTS = [
  { role: 'student', label: 'Student' },
  { role: 'faculty', label: 'Faculty' },
  { role: 'admin', label: 'Admin' },
];

export default function LoginPage() {
  const { login, loading, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  if (isAuthenticated && user) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  const validate = () => {
    const errs = {};
    if (!email) errs.email = 'Required';
    if (!password) errs.password = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await login(email, password);
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name.split(' ')[0]}!`);
      navigate(`/${result.user.role}/dashboard`);
    } else {
      toast.error('Invalid credentials. Use demo accounts below.');
    }
  };

  const handleDemoLogin = async (role) => {
    const result = await login(null, null, role);
    if (result.success) {
      toast.success(`Welcome, ${result.user.name.split(' ')[0]}! 🎉`);
      navigate(`/${result.user.role}/dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B13] flex flex-col items-center justify-center p-4 text-slate-200">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Smart SMS</h1>
          <p className="text-xs font-mono uppercase tracking-widest text-indigo-400 mt-2">COMMAND CENTER LOGIN</p>
        </div>

        <div className="bg-[#0B101E] border border-[#1E293B] rounded-2xl p-10 md:p-12 shadow-2xl shadow-black/80">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 block tracking-wide" htmlFor="email">
                Academic ID / Email
              </label>
              <input 
                id="email"
                type="text" 
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(p => ({...p, email: ''})); }}
                placeholder="name@paruluniversity.ac.in or USR-2026-001" 
                className={`w-full px-4 py-3.5 bg-[#070B13] border ${errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-[#1E293B] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'} rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.email}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 block tracking-wide" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input 
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(p => ({...p, password: ''})); }}
                  placeholder="••••••••" 
                  className={`w-full px-4 py-3.5 bg-[#070B13] border ${errors.password ? 'border-rose-500 focus:border-rose-500' : 'border-[#1E293B] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'} rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.password}</p>}
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-3 text-xs text-slate-400 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0" 
                />
                <span>Enable Biometric Authentication</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center"
            >
              Authenticate
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#1E293B]">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 text-center mb-3 block">
              Demo Access
            </span>
            <div className="grid grid-cols-3 gap-3">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => handleDemoLogin(acc.role)}
                  disabled={loading}
                  className="py-2.5 px-3 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] border border-[#334155] text-xs font-semibold text-slate-200 transition text-center"
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs font-mono text-amber-500/80 uppercase tracking-widest flex items-center justify-center gap-2">
          <AlertTriangle size={14} className="text-amber-500 animate-pulse" />
          <span>AUTHORIZED PERSONNEL ONLY</span>
        </div>
      </div>
    </div>
  );
}
