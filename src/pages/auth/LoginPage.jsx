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
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Smart SMS</h1>
          <p className="text-[10px] font-mono text-[#5C6E91] uppercase tracking-widest">Command Center Login</p>
        </div>

        <div className="bg-[#0B101E] border border-[#151D33] rounded-xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1" htmlFor="email">Academic ID / Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <CreditCard size={16} />
                </span>
                <input 
                  id="email"
                  type="text" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(p => ({...p, email: ''})); }}
                  placeholder="ID or Email" 
                  className={`w-full rounded bg-white text-slate-950 text-sm py-2 pl-10 pr-3 border ${errors.email ? 'border-rose-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <Lock size={16} />
                </span>
                <input 
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(p => ({...p, password: ''})); }}
                  placeholder="••••••••" 
                  className={`w-full rounded bg-white text-slate-950 text-sm py-2 pl-10 pr-10 border ${errors.password ? 'border-rose-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center pt-1 pb-2">
              <input 
                id="biometric" 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-[#151D33] border-[#2A3755] text-indigo-500 focus:ring-indigo-500 focus:ring-offset-[#0B101E] cursor-pointer"
              />
              <label htmlFor="biometric" className="ml-2 flex items-center text-xs text-slate-400 cursor-pointer select-none hover:text-slate-200 transition-colors">
                <Fingerprint size={14} className="mr-1.5 text-indigo-400" />
                Enable Biometric Auth
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#313C78] hover:bg-[#3D4B96] text-white rounded-md py-2 text-sm font-semibold transition-colors disabled:opacity-50"
            >
              Authenticate
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#141C2E]">
            <p className="text-center text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Demo Access</p>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => handleDemoLogin(acc.role)}
                  disabled={loading}
                  className="px-2 py-1.5 rounded-md bg-[#151D33] hover:bg-[#1E293B] text-xs font-medium text-slate-300 transition-colors border border-[#2A3755]"
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center flex flex-col items-center justify-center text-rose-500/80">
          <AlertTriangle size={20} className="mb-2" />
          <p className="text-[10px] font-mono tracking-widest font-semibold uppercase">
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}
