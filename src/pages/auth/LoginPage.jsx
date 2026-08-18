import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { CreditCard, Lock, Fingerprint, Eye, EyeOff, AlertTriangle } from 'lucide-react';
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
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Smart SMS</h1>
          <p className="text-[11px] font-mono text-indigo-400 tracking-widest mt-1 uppercase">COMMAND CENTER LOGIN</p>
        </div>

        <div className="bg-[#0B101E] border border-[#18233C] rounded-2xl p-8 shadow-2xl shadow-black/60">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block tracking-wide" htmlFor="email">Academic ID / Email</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input 
                  id="email"
                  type="text" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(p => ({...p, email: ''})); }}
                  placeholder="ID or Email" 
                  className={`w-full h-12 text-sm bg-[#070B13] border ${errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-[#1E2C4A] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'} outline-none text-slate-100 placeholder-slate-500 rounded-xl pl-11 pr-4 transition-all duration-200`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.email}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block tracking-wide" htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input 
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(p => ({...p, password: ''})); }}
                  placeholder="••••••••" 
                  className={`w-full h-12 text-sm bg-[#070B13] border ${errors.password ? 'border-rose-500 focus:border-rose-500' : 'border-[#1E2C4A] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'} outline-none text-slate-100 placeholder-slate-500 rounded-xl pl-11 pr-12 transition-all duration-200`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.password}</p>}
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <input 
                id="biometric" 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-[#070B13] border-[#1E2C4A] text-indigo-650 focus:ring-indigo-500 focus:ring-offset-[#0B101E] cursor-pointer"
              />
              <label htmlFor="biometric" className="flex items-center text-xs font-medium text-slate-400 cursor-pointer select-none hover:text-slate-200 transition-colors">
                <Fingerprint size={14} className="mr-1.5 text-indigo-400" />
                Enable Biometric Auth
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 py-3 rounded-xl bg-[#3B49DF] hover:bg-indigo-500 font-bold text-sm text-white shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 flex items-center justify-center"
            >
              Authenticate
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#162039]">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 text-center mb-3">Demo Access</p>
            <div className="grid grid-cols-3 gap-2.5">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => handleDemoLogin(acc.role)}
                  disabled={loading}
                  className="h-9 rounded-lg bg-[#10172A] border border-[#1E2C4A] text-slate-300 hover:text-white hover:bg-[#18233C] text-xs font-semibold transition flex items-center justify-center"
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500 tracking-widest">
          <AlertTriangle size={14} className="text-amber-500 animate-pulse" />
          <span>AUTHORIZED PERSONNEL ONLY</span>
        </div>
      </div>
    </div>
  );
}
