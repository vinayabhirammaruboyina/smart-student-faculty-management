import { useState } from 'react';
import { Clock, MapPin, User, Edit3, Calendar } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { mockTimetable } from '../../data/timetable';
import { mockSubjects } from '../../data/users';
import { mockFaculty } from '../../data/faculty';
import toast from 'react-hot-toast';

export default function AdminTimetable() {
  const [timetable, setTimetable] = useState(mockTimetable.student);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [editingSlot, setEditingSlot] = useState(null);
  
  const [form, setForm] = useState({ subject: '', faculty: '', room: '', time: '' });

  const handleUpdateSlot = (e) => {
    e.preventDefault();
    const updated = timetable.map((dayData, di) => {
      if (di === selectedDayIndex) {
        return {
          ...dayData,
          slots: dayData.slots.map((slot, si) => {
            if (si === editingSlot) {
              const matchedSub = mockSubjects.find(s => s.name === form.subject);
              return {
                ...slot,
                subject: form.subject,
                faculty: form.faculty,
                room: form.room,
                code: matchedSub ? matchedSub.code : slot.code
              };
            }
            return slot;
          })
        };
      }
      return dayData;
    });
    setTimetable(updated);
    setEditingSlot(null);
    toast.success('Timetable slot updated!');
  };

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Class Timetables</h2>
        <p className="text-sm text-slate-400">Configure weekly session slots and lecturer assignments.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {DAYS.map((day, i) => (
          <button
            key={day}
            onClick={() => setSelectedDayIndex(i)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              selectedDayIndex === i
                ? 'bg-indigo-650 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-650 border border-slate-200 dark:border-slate-700 hover:border-indigo-300'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {timetable[selectedDayIndex]?.slots.map((slot, si) => (
          <Card key={si} className="flex gap-4 items-start relative group">
            <div className="shrink-0 text-right min-w-[80px] pt-1">
              <p className="text-sm font-bold text-slate-850 dark:text-slate-200">{slot.time.split(' - ')[0]}</p>
              <p className="text-xs text-slate-400">{slot.time.split(' - ')[1]}</p>
            </div>
            <div className="w-0.5 bg-indigo-200 dark:bg-indigo-800 self-stretch rounded-full shrink-0" />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{slot.subject}</p>
                  <p className="text-xs text-slate-450 mt-0.5">{slot.code} · Sem VII</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={slot.type === 'practical' ? 'success' : 'primary'}>{slot.type}</Badge>
                  <Button
                    size="xs"
                    variant="secondary"
                    icon={Edit3}
                    onClick={() => {
                      setEditingSlot(si);
                      setForm({ subject: slot.subject, faculty: slot.faculty, room: slot.room, time: slot.time });
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><User size={13} /> {slot.faculty}</span>
                <span className="flex items-center gap-1.5"><MapPin size={13} /> {slot.room}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {slot.time}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Slot Dialog */}
      {editingSlot !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit Schedule Slot</h3>
            <form onSubmit={handleUpdateSlot} className="space-y-3">
              <Select
                label="Subject"
                options={mockSubjects.map(s => ({ value: s.name, label: `${s.name} (${s.code})` }))}
                value={form.subject}
                onChange={(e) => setForm(p => ({ ...p, subject: e.target.value }))}
              />
              <Select
                label="Lecturer"
                options={mockFaculty.map(f => ({ value: f.name, label: f.name }))}
                value={form.faculty}
                onChange={(e) => setForm(p => ({ ...p, faculty: e.target.value }))}
              />
              <Input
                label="Classroom"
                value={form.room}
                onChange={(e) => setForm(p => ({ ...p, room: e.target.value }))}
              />
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="secondary" type="button" onClick={() => setEditingSlot(null)}>Cancel</Button>
                <Button type="submit">Save Slot</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
