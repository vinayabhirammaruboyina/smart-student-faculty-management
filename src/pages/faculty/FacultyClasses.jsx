import { useNavigate } from 'react-router-dom';
import { Users, QrCode, ClipboardCheck, Clock, MapPin } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { mockTimetable } from '../../data/timetable';

export default function FacultyClasses() {
  const navigate = useNavigate();
  const allSlots = mockTimetable.student.flatMap(d => d.slots.map(s => ({ ...s, day: d.day })));
  const uniqueSubjects = [...new Map(allSlots.map(s => [s.subject, s])).values()];
  const colors = ['indigo', 'emerald', 'blue', 'purple', 'amber'];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Classes</h2>
        <p className="text-sm text-slate-400">All classes assigned to you this semester</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {uniqueSubjects.map((cls, i) => (
          <Card key={cls.subject}>
            <div className="flex items-start justify-between mb-4">
              <span className={`px-3 py-1.5 bg-${colors[i % colors.length]}-50 dark:bg-${colors[i % colors.length]}-900/20 rounded-xl text-sm font-bold text-${colors[i % colors.length]}-600 dark:text-${colors[i % colors.length]}-400`}>
                {cls.code}
              </span>
              <Badge variant={cls.type === 'practical' ? 'success' : 'primary'}>{cls.type}</Badge>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{cls.subject}</h3>
            <div className="flex flex-col gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-4">
              <span className="flex items-center gap-1.5"><MapPin size={13} />{cls.room}</span>
              <span className="flex items-center gap-1.5"><Users size={13} />42 Students enrolled</span>
              <span className="flex items-center gap-1.5"><Clock size={13} />{cls.time}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" icon={ClipboardCheck} onClick={() => navigate('/faculty/attendance')}>Attendance</Button>
              <Button size="sm" icon={QrCode} onClick={() => navigate('/faculty/qr-attendance')}>QR</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
