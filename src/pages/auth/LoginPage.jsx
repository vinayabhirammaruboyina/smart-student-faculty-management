import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, BookOpen, Users, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const DEMO_ACCOUNTS = [
  { role: 'student', label: 'Login as Student', email: 'student@example.com', password: 'student123', icon: GraduationCap, color: 'from-indigo-500 to-indigo-600', badge: 'Student', desc: 'Vinay Abhiram · BCA Sem VII' },
  { role: 'faculty', label: 'Login as Faculty', email: 'faculty@example.com', password: 'faculty123', icon: BookOpen, color: 'from-emerald-500 to-emerald-600', badge: 'Faculty', desc: 'Dr. Priya Sharma · Asst. Professor' },
  { role: 'admin', label: 'Login as Admin', email: 'admin@example.com', password: 'admin123', icon: Shield, color: 'from-purple-500 to-purple-600', badge: 'Admin', desc: 'Rajesh Mehta · System Admin' },
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
    <div className="min-h-screen flex bg-[#F8FAFC] dark:bg-[#090D16]">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 py-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-xl">Smart SMS</p>
              <p className="text-indigo-300 text-sm">Academic Management System</p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
              Manage Academics
              <br />
              <span className="text-indigo-300">Smarter.</span>
            </h2>
            <p className="text-indigo-200 text-lg leading-relaxed max-w-md">
              A unified platform for students, faculty, and administrators at Parul Institute of Computer Applications.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-4">
            {[
              { icon: '📊', text: 'Real-time attendance tracking & QR-based marking' },
              { icon: '📝', text: 'Assignment submission and grade management' },
              { icon: '🔔', text: 'Smart notifications and leave management' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-indigo-100 text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Decorative dashboard preview */}
          <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex gap-3">
            {['82% Attendance', '8/10 Assignments', '8.2 GPA'].map((stat, i) => (
              <div key={i} className="flex-1 bg-white/10 rounded-xl p-3 text-center">
                <p className="text-white text-sm font-semibold">{stat.split(' ')[0]}</p>
                <p className="text-indigo-300 text-xs">{stat.split(' ').slice(1).join(' ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">Smart SMS</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Welcome back 👋</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Sign in to your account to continue.</p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(p => ({...p, email: ''})); }}
                placeholder="student@example.com"
                className={`w-full px-4 py-2.5 border rounded-xl bg-white/70 dark:bg-[#111827]/75 backdrop-blur-[16px] text-slate-900 dark:text-white text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 placeholder-slate-400 ${
                  errors.email ? 'border-red-400' : 'border-slate-200 dark:border-white/[0.08] focus:border-indigo-600'
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(p => ({...p, password: ''})); }}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 pr-11 border rounded-xl bg-white/70 dark:bg-[#111827]/75 backdrop-blur-[16px] text-slate-900 dark:text-white text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 placeholder-slate-400 ${
                    errors.password ? 'border-red-400' : 'border-slate-200 dark:border-white/[0.08] focus:border-indigo-600'
                  }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded border-slate-300" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
              </label>
              <button type="button" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Forgot password?</button>
            </div>

            <Button type="submit" fullWidth size="lg" loading={loading} className="rounded-xl !py-3">
              Sign In <ArrowRight size={18} />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#F8FAFC] dark:bg-[#090D16] px-3 text-xs text-slate-400">OR CONTINUE WITH DEMO ACCOUNT</span>
            </div>
          </div>

          {/* Demo accounts */}
          <div className="space-y-3">
            {DEMO_ACCOUNTS.map((acc) => {
              const Icon = acc.icon;
              return (
                <button
                  key={acc.role}
                  onClick={() => handleDemoLogin(acc.role)}
                  disabled={loading}
                  className="w-full flex items-center gap-4 p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white/70 dark:bg-[#111827]/75 backdrop-blur-[16px] hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition-all duration-200 group disabled:opacity-50"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${acc.color} flex items-center justify-center shrink-0`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{acc.badge}</p>
                    <p className="text-xs text-slate-400">{acc.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            Parul Institute of Computer Applications · Semester VII Project
          </p>
        </div>
      </div>
    </div>
  );
}
