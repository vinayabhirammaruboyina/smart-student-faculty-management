import { useState } from 'react';
import { Edit3, Save, Mail, Phone, Building, BookOpen } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Avatar from '../../components/ui/Avatar';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function FacultyProfile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '' });
  
  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Faculty Profile</h2>
      <Card>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <Avatar name={user?.name} size="2xl" />
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
              <Edit3 size={13} className="text-white" />
            </button>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h3>
            <p className="text-slate-500 text-sm">{user?.designation}</p>
            <div className="flex gap-2 mt-3 flex-wrap justify-center sm:justify-start">
              <Badge variant="success" dot>Active</Badge>
              <Badge variant="info">{user?.department}</Badge>
            </div>
            <p className="text-sm text-slate-500 mt-2 font-mono">Employee ID: {user?.employeeId}</p>
          </div>
          <Button variant="secondary" size="sm" icon={editing ? Save : Edit3} onClick={editing ? handleSave : () => setEditing(true)}>
            {editing ? 'Save' : 'Edit'}
          </Button>
        </div>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>{editing ? 'Edit Profile' : 'Contact Information'}</CardTitle></CardHeader>
        {!editing ? (
          <div className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: user?.email },
              { icon: Phone, label: 'Phone', value: user?.phone },
              { icon: Building, label: 'Department', value: user?.department },
              { icon: BookOpen, label: 'Subjects', value: user?.subjects?.join(', ') }
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <Icon size={15} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Input label="Full Name" value={form.name} onChange={(e) => setForm(p => ({...p, name: e.target.value}))} />
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm(p => ({...p, email: e.target.value}))} />
            <Input label="Phone" value={form.phone} onChange={(e) => setForm(p => ({...p, phone: e.target.value}))} />
            <div className="flex gap-3">
              <Button onClick={handleSave} icon={Save}>Save Changes</Button>
              <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
