import { useState } from 'react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Monitor, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const Toggle = ({ checked, onChange }) => (
  <button onClick={() => onChange(!checked)} className={`relative inline-flex w-10 h-5.5 rounded-full transition-colors ${checked ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
    <span className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`} />
  </button>
);

export default function FacultySettings() {
  const { theme, setLight, setDark, setSystem } = useTheme();
  const [notifs, setNotifs] = useState({ email: true, leave: true, submissions: true, attendance: false });
  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun, action: setLight },
    { value: 'dark', label: 'Dark', icon: Moon, action: setDark },
    { value: 'system', label: 'System', icon: Monitor, action: setSystem }
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Settings</h2>
      
      <Card>
        <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map(({ value, label, icon: Icon, action }) => (
            <button
              key={value}
              onClick={action}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                theme === value 
                  ? 'border-emerald-650 bg-emerald-50/50 dark:bg-emerald-950/20' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon size={22} className={theme === value ? 'text-emerald-600' : 'text-slate-450'} />
              <span className={`text-sm font-medium ${theme === value ? 'text-emerald-600' : 'text-slate-500'}`}>{label}</span>
            </button>
          ))}
        </div>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <div className="space-y-4">
          {Object.entries(notifs).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-800 dark:text-white capitalize">{key} Notifications</p>
              <Toggle checked={val} onChange={(v) => setNotifs(p => ({...p, [key]: v}))} />
            </div>
          ))}
        </div>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Security</CardTitle></CardHeader>
        <div className="space-y-4">
          <input type="password" placeholder="Current Password" className="input-base" />
          <input type="password" placeholder="New Password" className="input-base" />
          <Button icon={Lock} variant="secondary" onClick={() => toast.success('Password updated!')}>Update Password</Button>
        </div>
      </Card>
    </div>
  );
}
