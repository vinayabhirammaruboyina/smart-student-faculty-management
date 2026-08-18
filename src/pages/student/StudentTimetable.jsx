import { useState } from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { mockTimetable } from '../../data/timetable';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TODAY_INDEX = Math.min(Math.max(new Date().getDay() - 1, 0), 4);

export default function StudentTimetable() {
  const [view, setView] = useState('week');
  const [selectedDay, setSelectedDay] = useState(TODAY_INDEX);
  const timetable = mockTimetable.student;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h2 className="text-xl font-bold text-slate-900 dark:text-white">Class Timetable</h2><p className="text-sm text-slate-400">Semester VII · Academic Year 2026–27</p></div>
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 gap-1">
          {['day', 'week'].map((v) => (<button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${view === v ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>{v}</button>))}
        </div>
      </div>

      {view === 'day' && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {DAYS.map((day, i) => (<button key={day} onClick={() => setSelectedDay(i)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedDay === i ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>{day}</button>))}
        </div>
      )}

      {view === 'week' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {timetable.map((dayData, di) => (
            <div key={dayData.day} className={`rounded-xl overflow-hidden border ${di === TODAY_INDEX ? 'border-indigo-400 dark:border-indigo-600' : 'border-slate-200 dark:border-slate-700'}`}>
              <div className={`px-3 py-2.5 text-sm font-bold text-center ${di === TODAY_INDEX ? 'bg-indigo-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                {dayData.day}{di === TODAY_INDEX && <span className="ml-1 text-xs font-normal opacity-80">(Today)</span>}
              </div>
              <div className="bg-white dark:bg-slate-800/50 p-2 space-y-2">
                {dayData.slots.map((slot, si) => (
                  <div key={si} className={`p-2 rounded-lg border text-xs ${slot.type === 'practical' ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300' : 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'}`}>
                    <p className="font-semibold truncate">{slot.subject}</p>
                    <p className="opacity-75 mt-0.5">{slot.time.split(' - ')[0]}</p>
                    <p className="opacity-60">{slot.room}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'day' && timetable[selectedDay] && (
        <div className="space-y-4">
          {timetable[selectedDay].slots.map((slot, si) => (
            <Card key={si} className="flex gap-4 items-start">
              <div className="shrink-0 text-right min-w-[80px] pt-1">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{slot.time.split(' - ')[0]}</p>
                <p className="text-xs text-slate-400">{slot.time.split(' - ')[1]}</p>
              </div>
              <div className="w-0.5 bg-indigo-200 dark:bg-indigo-800 self-stretch rounded-full shrink-0" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="font-semibold text-slate-900 dark:text-white">{slot.subject}</p><p className="text-xs text-slate-400 mt-0.5">{slot.code}</p></div>
                  <Badge variant={slot.type === 'practical' ? 'success' : 'primary'}>{slot.type}</Badge>
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5"><User size={14} />{slot.faculty}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} />{slot.room}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} />{slot.time}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-indigo-100 border border-indigo-200" /><span className="text-xs text-slate-500">Lecture</span></div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-emerald-100 border border-emerald-200" /><span className="text-xs text-slate-500">Practical / Lab</span></div>
      </div>
    </div>
  );
}
