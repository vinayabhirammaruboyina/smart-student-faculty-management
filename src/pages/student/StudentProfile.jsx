import { useState } from 'react';
import { User, Mail, Phone, Building, BookOpen, Edit3, Save } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Avatar from '../../components/ui/Avatar';
import { useAuth } from '../../context/AuthContext';
import { studentGradesData, studentAttendanceData } from '../../data/students';
import toast from 'react-hot-toast';

export default function StudentProfile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '' });
  const grades = studentGradesData['STU001'];
  const attendance = studentAttendanceData['STU001'];
  const handleSave = () => { updateProfile(form); setEditing(false); toast.success('Profile updated!'); };

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Profile</h2>
      <Card>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative"><Avatar name={user?.name} size="2xl" /><button className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800"><Edit3 size={13} className="text-white" /></button></div>
          <div className="text-center sm:text-left flex-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h3>
            <p className="text-slate-500 text-sm">{user?.enrollmentNo}</p>
            <div className="flex gap-2 mt-3 flex-wrap justify-center sm:justify-start"><Badge variant="primary" dot>Active Student</Badge><Badge variant="info">Sem {user?.semester}</Badge></div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center"><p className="text-xl font-bold text-slate-900 dark:text-white">{grades.currentGpa}</p><p className="text-xs text-slate-400">GPA</p></div>
              <div className="text-center"><p className="text-xl font-bold text-slate-900 dark:text-white">{attendance.overall}%</p><p className="text-xs text-slate-400">Attendance</p></div>
              <div className="text-center"><p className="text-xl font-bold text-slate-900 dark:text-white">VII</p><p className="text-xs text-slate-400">Semester</p></div>
            </div>
          </div>
          <Button variant="secondary" size="sm" icon={editing ? Save : Edit3} onClick={editing ? handleSave : () => setEditing(true)}>{editing ? 'Save' : 'Edit'}</Button>
        </div>
      </Card>
      {!editing ? (
        <Card>
          <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
          <div className="space-y-4">
            {[{ icon: User, label: 'Full Name', value: user?.name }, { icon: Mail, label: 'Email', value: user?.email }, { icon: Phone, label: 'Phone', value: user?.phone }, { icon: Building, label: 'Department', value: user?.department }, { icon: BookOpen, label: 'Semester', value: `Semester ${user?.semester}` }, { icon: User, label: 'Enrollment No.', value: user?.enrollmentNo }].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3"><div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center"><Icon size={15} className="text-slate-500" /></div><div><p className="text-xs text-slate-400">{label}</p><p className="text-sm font-medium text-slate-800 dark:text-white">{value}</p></div></div>
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          <CardHeader><CardTitle>Edit Profile</CardTitle></CardHeader>
          <div className="space-y-4">
            <Input label="Full Name" value={form.name} onChange={(e) => setForm(p => ({...p, name: e.target.value}))} />
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm(p => ({...p, email: e.target.value}))} />
            <Input label="Phone" value={form.phone} onChange={(e) => setForm(p => ({...p, phone: e.target.value}))} />
            <div className="flex gap-3"><Button onClick={handleSave} icon={Save}>Save Changes</Button><Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button></div>
          </div>
        </Card>
      )}
    </div>
  );
}
