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
        <div className="h-16 w-72 bg-surface-container rounded-xl animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-surface-container rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 h-64 bg-surface-container rounded-lg animate-pulse" />
          <div className="md:col-span-4 h-64 bg-surface-container rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-background min-h-screen text-on-surface font-body-md">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold font-headline-lg">Welcome back, {user?.name?.split(' ')[0] || 'Student'}</h1>
        <p className="text-on-surface-variant mt-1 text-sm">Here is your academic overview for the current semester.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6">
        <div className="glass-card rounded-lg p-4 flex flex-col relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
          <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider mb-1">Cumulative GPA</span>
          <span className="text-2xl font-bold text-on-surface">{(gpaRaw / 10).toFixed(2)}</span>
        </div>
        
        <div className="glass-card rounded-lg p-4 flex flex-col relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary"></div>
          <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider mb-1">Attendance</span>
          <span className="text-2xl font-bold text-on-surface">{attendanceCount}%</span>
        </div>
        
        <div className="glass-card rounded-lg p-4 flex flex-col relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
          <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider mb-1">Credits Earned</span>
          <span className="text-2xl font-bold text-on-surface">86/120</span>
        </div>
        
        <div className="glass-card rounded-lg p-4 flex flex-col relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
          <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider mb-1">Pending Tasks</span>
          <span className="text-2xl font-bold text-on-surface">{allDueAssignments.length}</span>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Upcoming Deadlines (Span 8) */}
        <div className="glass-card rounded-lg flex flex-col md:col-span-8">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="text-xl font-semibold text-on-surface">Upcoming Deadlines</h3>
            <button onClick={() => navigate('/student/assignments')} className="text-primary text-[12px] font-medium hover:underline">View All</button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="p-2 pl-4 text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">Task ID</th>
                  <th className="p-2 text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">Assignment</th>
                  <th className="p-2 text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">Course</th>
                  <th className="p-2 pr-4 text-[10px] font-medium text-on-surface-variant uppercase tracking-wider text-right">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {allDueAssignments.slice(0, 4).map((a, i) => (
                  <tr key={i} className="table-row-hover border-b border-outline-variant/50 transition-colors">
                    <td className="p-2 pl-4 text-[12px] text-on-surface font-mono">ASN-{8092 + i}</td>
                    <td className="p-2 text-[12px] text-on-surface">{a.title}</td>
                    <td className="p-2 text-[12px] text-on-surface-variant">{a.subject}</td>
                    <td className={`p-2 pr-4 text-[10px] text-right ${a.status === 'overdue' ? 'text-error' : 'text-tertiary'}`}>{a.dueDate}</td>
                  </tr>
                ))}
                {allDueAssignments.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-sm text-on-surface-variant">No pending assignments</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Current Grades (Span 4) */}
        <div className="glass-card rounded-lg flex flex-col md:col-span-4">
          <div className="p-4 border-b border-outline-variant">
            <h3 className="text-xl font-semibold text-on-surface">Current Grades</h3>
          </div>
          <div className="p-4 flex-1 flex flex-col gap-2">
            {attendance.subjects.slice(0, 4).map((sub, i) => {
              const gradeColors = ['text-primary', 'text-tertiary', 'text-secondary'];
              const c = gradeColors[i % gradeColors.length];
              return (
                <div key={i} className="flex justify-between items-center p-1 hover:bg-surface-container-high rounded transition-colors">
                  <span className="text-[12px] font-medium text-on-surface font-mono truncate mr-2" title={sub.subject}>{sub.subject}</span>
                  <span className={`text-sm font-semibold ${c}`}>{sub.percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Verification Widget (Span 4) */}
        <div className="glass-card rounded-lg flex flex-col md:col-span-4 justify-center items-center p-6 relative overflow-hidden group">
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-surface to-background pointer-events-none"></div>
          <h3 className="text-xl font-semibold text-on-surface mb-1 relative z-10">Quick ID</h3>
          <p className="text-[12px] text-on-surface-variant mb-4 text-center relative z-10">Scan for attendance &amp; building access</p>
          
          <div className="bg-white p-2 rounded-lg mb-4 relative z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-300">
            <div className="w-32 h-32 bg-black border-2 border-white flex items-center justify-center">
              <QrCode size={64} className="text-white" />
            </div>
          </div>
          
          <div className="text-[12px] font-medium text-on-surface font-mono relative z-10">{user?.id || 'PU2023IMCA0042'}</div>
        </div>

        {/* Campus Announcements (Span 8) */}
        <div className="glass-card rounded-lg flex flex-col md:col-span-8">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="text-xl font-semibold text-on-surface">Campus Announcements</h3>
            <Megaphone size={20} className="text-on-surface-variant" />
          </div>
          <div className="p-4 flex flex-col gap-4 flex-1">
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
              <div>
                <h4 className="text-sm font-semibold text-on-surface">Library Hours Extension</h4>
                <p className="text-[12px] text-on-surface-variant mt-1">The main library will be open 24/7 starting next week for midterm preparations. Ensure you have your active ID for late-night access.</p>
                <span className="text-[10px] text-on-surface-variant mt-1 block">Posted 2 hours ago</span>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-tertiary mt-1.5 flex-shrink-0"></div>
              <div>
                <h4 className="text-sm font-semibold text-on-surface">System Maintenance Notice</h4>
                <p className="text-[12px] text-on-surface-variant mt-1">The assignment submission portal will undergo scheduled maintenance on Saturday from 2:00 AM to 4:00 AM. Plan your submissions accordingly.</p>
                <span className="text-[10px] text-on-surface-variant mt-1 block">Posted Yesterday</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
