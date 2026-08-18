import { useState } from 'react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Monitor, Lock, Database, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const Toggle = ({ checked, onChange }) => (
  <button onClick={() => onChange(!checked)} className={`relative inline-flex w-10 h-5.5 rounded-full transition-colors duration-200 ${checked ? 'bg-indigo-650' : 'bg-slate-200 dark:bg-slate-700'}`}>
    <span className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`} />
  </button>
);

export default function AdminSettings() {
  const { theme, setLight, setDark, setSystem } = useTheme();
  const [sysSettings, setSysSettings] = useState({ openRegistrations: true, enableEmailAlerts: true, maintenanceMode: false });
  const [backupProgress, setBackupProgress] = useState(false);

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun, action: setLight },
    { value: 'dark', label: 'Dark', icon: Moon, action: setDark },
    { value: 'system', label: 'System', icon: Monitor, action: setSystem }
  ];

  const triggerBackup = async () => {
    setBackupProgress(true);
    await new Promise(r => setTimeout(r, 2000));
    setBackupProgress(false);
    toast.success('Database backup generated successfully!');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">System Settings</h2>
      
      <Card>
        <CardHeader><CardTitle>Appearance Theme</CardTitle></CardHeader>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map(({ value, label, icon: Icon, action }) => (
            <button
              key={value}
              onClick={action}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                theme === value 
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon size={22} className={theme === value ? 'text-indigo-650' : 'text-slate-450'} />
              <span className={`text-sm font-medium ${theme === value ? 'text-indigo-650' : 'text-slate-500'}`}>{label}</span>
            </button>
          ))}
        </div>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Platform Configurations</CardTitle></CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-white">Allow Student Registrations</p>
              <p className="text-xs text-slate-400">Enable or disable new user signup/admissions.</p>
            </div>
            <Toggle checked={sysSettings.openRegistrations} onChange={(v) => setSysSettings(p => ({...p, openRegistrations: v}))} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-white">Global Email Alerts</p>
              <p className="text-xs text-slate-400">Trigger emails for attendance notices.</p>
            </div>
            <Toggle checked={sysSettings.enableEmailAlerts} onChange={(v) => setSysSettings(p => ({...p, enableEmailAlerts: v}))} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-white">Maintenance Mode</p>
              <p className="text-xs text-slate-400">Render maintenance splash page for non-admin users.</p>
            </div>
            <Toggle checked={sysSettings.maintenanceMode} onChange={(v) => setSysSettings(p => ({...p, maintenanceMode: v}))} />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle>Database Management</CardTitle></CardHeader>
        <div className="space-y-3">
          <p className="text-sm text-slate-500">Run manual full-system backups. Files will be saved as JSON dump formats.</p>
          <Button icon={Database} loading={backupProgress} onClick={triggerBackup}>Generate Manual Backup</Button>
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle>Change Admin Password</CardTitle></CardHeader>
        <div className="space-y-4">
          <input type="password" placeholder="Current Password" className="input-base" />
          <input type="password" placeholder="New Password" className="input-base" />
          <Button icon={Lock} variant="secondary" onClick={() => toast.success('Admin password updated!')}>Update Password</Button>
        </div>
      </Card>
    </div>
  );
}
