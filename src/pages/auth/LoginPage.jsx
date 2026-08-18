import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { User, Lock, Fingerprint, ArrowRight, Eye, EyeOff, AlertTriangle } from 'lucide-react';
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
    if (!email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Minimum 6 characters';
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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-pattern dark bg-[#051424] text-[#d4e4fa]">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-container rounded-full opacity-10 blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md px-4 z-10">
        {/* Brand Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-primary tracking-tight mb-2">Smart SMS</h1>
          <p className="text-[12px] font-medium text-outline uppercase tracking-widest">Enterprise Portal</p>
        </div>

        {/* Login Card */}
        <div className="glass-panel rounded-xl p-6 relative overflow-hidden">
          {/* Top Light Accent */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Academic ID Field */}
            <div>
              <label className="block text-[12px] font-medium text-on-surface-variant mb-1" htmlFor="email">Academic ID / Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-outline">
                  <User size={18} />
                </span>
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(p => ({...p, email: ''})); }}
                  placeholder="student@example.com" 
                  className={`input-punched w-full rounded text-[12px] py-2 pl-9 pr-3 bg-surface-container-lowest border ${errors.email ? 'border-error focus:border-error' : 'border-surface-variant focus:border-primary'} text-on-surface focus:outline-none transition-all duration-200`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-error">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[12px] font-medium text-on-surface-variant" htmlFor="password">Password</label>
                <button type="button" className="text-[12px] font-medium text-primary hover:text-primary-fixed transition-colors">Forgot Password?</button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-outline">
                  <Lock size={18} />
                </span>
                <input 
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(p => ({...p, password: ''})); }}
                  placeholder="••••••••" 
                  className={`input-punched w-full rounded text-[12px] py-2 pl-9 pr-10 bg-surface-container-lowest border ${errors.password ? 'border-error focus:border-error' : 'border-surface-variant focus:border-primary'} text-on-surface focus:outline-none transition-all duration-200`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-error">{errors.password}</p>}
            </div>

            {/* Biometric Auth / Remember Me */}
            <div className="flex items-center mt-2">
              <input 
                id="remember" 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-surface-container-lowest border-outline-variant text-primary focus:ring-primary focus:ring-offset-surface-dim focus:ring-2 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 flex items-center text-[12px] text-on-surface-variant cursor-pointer">
                <Fingerprint size={16} className="mr-1 text-primary" />
                Secure Biometric Auth
              </label>
            </div>

            {/* Action Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-container hover:bg-on-primary-fixed-variant text-on-primary-container text-lg font-semibold py-2 rounded transition-colors duration-200 mt-6 flex justify-center items-center disabled:opacity-50"
            >
              Sign In
              <ArrowRight size={20} className="ml-1" />
            </button>
          </form>

          {/* Demo Login Buttons */}
          <div className="mt-8 pt-4 border-t border-white/5">
            <p className="text-center text-[10px] text-outline uppercase tracking-widest mb-3">Demo Accounts</p>
            <div className="flex justify-center gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => handleDemoLogin(acc.role)}
                  disabled={loading}
                  className="px-3 py-1.5 rounded bg-surface-container-lowest border border-outline-variant text-[12px] text-on-surface hover:bg-surface-container hover:border-primary transition-all disabled:opacity-50"
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center flex flex-col items-center justify-center opacity-60">
          <AlertTriangle size={24} className="text-error mb-1" />
          <p className="text-[10px] text-outline uppercase tracking-widest font-medium">
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}
