import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCountUp } from '../../hooks/useCountUp';
import { QrCode, Megaphone } from 'lucide-react';
import { studentAttendanceData, studentGradesData } from '../../data/students';
import { mockAssignments } from '../../data/assignments';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Safely get data assuming student data exists
  const attendance = studentAttendanceData['STU-001'] || { overall: 0, present: 0, absent: 0, subjects: [] };
  const grades = studentGradesData['STU-001'] || { currentGpa: 0, cgpa: 0, semesterTrend: [] };
  
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending');
  const overdueAssignments = mockAssignments.filter(a => a.status === 'overdue');
  const allDueAssignments = [...overdueAssignments, ...pendingAssignments];

  const attendanceCount = useCountUp(attendance.overall, 1200, !loading);
  const gpaRaw = useCountUp(Math.round(grades.cgpa * 10), 1200, !loading);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 w-72 bg-[#0B101E] rounded-xl animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-[#0B101E] rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 h-64 bg-[#0B101E] rounded-lg animate-pulse" />
          <div className="md:col-span-4 h-64 bg-[#0B101E] rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="text-slate-200">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back, {user?.name?.split(' ')[0] || 'Student'}</h1>
        <p className="text-slate-400 mt-1 text-sm">Here is your academic overview for the current semester.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 border-l-2 border-l-[#6366F1] flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">Cumulative GPA</span>
          <span className="text-3xl font-extrabold text-white">{(gpaRaw / 10).toFixed(2)}</span>
          <span className="text-[10px] font-mono text-slate-500 mt-2">Target: 3.80</span>
        </div>
        
        <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 border-l-2 border-l-[#F59E0B] flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">Attendance</span>
          <span className="text-3xl font-extrabold text-white">{attendanceCount}%</span>
          <span className="text-[10px] font-mono text-slate-500 mt-2">Required: 75%</span>
        </div>
        
        <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 border-l-2 border-l-[#818CF8] flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">Credits Earned</span>
          <span className="text-3xl font-extrabold text-white">86<span className="text-lg text-slate-400">/120</span></span>
          <span className="text-[10px] font-mono text-slate-500 mt-2">On track for graduation</span>
        </div>
        
        <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 border-l-2 border-l-[#F43F5E] flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">Pending Tasks</span>
          <span className="text-3xl font-extrabold text-white">{allDueAssignments.length}</span>
          <span className="text-[10px] font-mono text-slate-500 mt-2">{overdueAssignments.length} overdue</span>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Upcoming Deadlines (Span 8) */}
        <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 flex flex-col md:col-span-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Upcoming Deadlines</h3>
            <button onClick={() => navigate('/student/assignments')} className="text-indigo-400 hover:text-indigo-300 text-xs font-medium">View All</button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="text-[10px] font-mono text-slate-500 uppercase pb-2 border-b border-[#162039] pl-2 w-1/5">Task ID</th>
                  <th className="text-[10px] font-mono text-slate-500 uppercase pb-2 border-b border-[#162039] w-2/5">Assignment</th>
                  <th className="text-[10px] font-mono text-slate-500 uppercase pb-2 border-b border-[#162039] w-1/5">Course</th>
                  <th className="text-[10px] font-mono text-slate-500 uppercase pb-2 border-b border-[#162039] text-right pr-2 w-1/5">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {allDueAssignments.slice(0, 4).map((a, i) => (
                  <tr key={i} className="border-b border-[#162039]/50 hover:bg-[#151D33]/30 transition-colors">
                    <td className="py-3 pl-2 text-[11px] font-mono text-indigo-300">ASN-{8092 + i}</td>
                    <td className="py-3 text-sm text-slate-200">{a.title}</td>
                    <td className="py-3 text-[11px] font-mono text-slate-400">{a.subject}</td>
                    <td className={`py-3 pr-2 text-[11px] font-mono text-right ${a.status === 'overdue' ? 'text-rose-400' : 'text-slate-400'}`}>{a.dueDate}</td>
                  </tr>
                ))}
                {allDueAssignments.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-sm text-slate-500">No pending assignments</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Current Grades (Span 4) */}
        <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 flex flex-col md:col-span-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">Current Grades</h3>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            {attendance.subjects.slice(0, 4).map((sub, i) => {
              const gradeColors = ['text-indigo-400', 'text-amber-400', 'text-[#818CF8]', 'text-rose-400'];
              const c = gradeColors[i % gradeColors.length];
              return (
                <div key={i} className="flex justify-between items-center p-2 hover:bg-[#151D33]/50 rounded transition-colors border border-transparent hover:border-[#2A3755]">
                  <span className="text-[11px] font-mono text-slate-300 truncate mr-2" title={sub.subject}>{sub.subject}</span>
                  <span className={`text-sm font-semibold ${c}`}>{sub.percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Verification Widget (Span 4) */}
        <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 flex flex-col md:col-span-4 justify-center items-center text-center">
          <h3 className="text-lg font-semibold text-white mb-1">Quick ID</h3>
          <p className="text-xs text-slate-500 mb-5">Scan for attendance &amp; access</p>
          
          <div className="w-36 h-36 bg-white rounded-lg p-2.5 mb-4 shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-black flex items-center justify-center">
              <QrCode size={80} className="text-white" strokeWidth={1} />
            </div>
          </div>
          
          <div className="text-[11px] font-mono text-slate-400 mt-2">STU-2026-0891</div>
        </div>

        {/* Campus Announcements (Span 8) */}
        <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 flex flex-col md:col-span-8">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#162039]">
            <h3 className="text-lg font-semibold text-white">Campus Announcements</h3>
            <Megaphone size={18} className="text-slate-500" />
          </div>
          <div className="flex flex-col gap-5 flex-1">
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Library Hours Extension</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">The main library will be open 24/7 starting next week for midterm preparations. Ensure you have your active ID for late-night access.</p>
                <span className="text-[10px] font-mono text-slate-500 mt-2 block">POSTED 2 HOURS AGO</span>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">System Maintenance Notice</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">The assignment submission portal will undergo scheduled maintenance on Saturday from 2:00 AM to 4:00 AM. Plan your submissions accordingly.</p>
                <span className="text-[10px] font-mono text-slate-500 mt-2 block">POSTED YESTERDAY</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
