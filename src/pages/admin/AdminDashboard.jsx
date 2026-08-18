import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, ShieldAlert, Award, ArrowUpRight, Plus, Megaphone, QrCode } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCountUp } from '../../hooks/useCountUp';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');

  const studentCount = useCountUp(1492, 1200, !loading);
  const activeAssignments = useCountUp(34, 1000, !loading);
  const activeSubjects = useCountUp(12, 800, !loading);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMsg) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('System broadcast sent successfully to all users!');
    setShowBroadcastModal(false);
    setBroadcastTitle('');
    setBroadcastMsg('');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 w-80 bg-surface-container rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-surface-container rounded-lg animate-pulse" />)}
          </div>
          <div className="md:col-span-4 h-32 bg-surface-container rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-background min-h-screen text-on-surface font-body-md">
      {/* Header Actions */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Admin Command Center 🛠️</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Manage institutional data and overall platform health.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowBroadcastModal(true)} className="flex items-center gap-2 px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded text-[12px] font-medium hover:bg-opacity-80 transition-colors">
            <Megaphone size={16} /> Send Broadcast
          </button>
          <button onClick={() => navigate('/admin/users')} className="flex items-center gap-2 px-3 py-1.5 bg-primary text-on-primary rounded text-[12px] font-medium hover:bg-opacity-90 transition-colors">
            <Plus size={16} /> Add User
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(140px,_auto)]">
        
        {/* Key Metrics (Spans 8 cols) */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Metric 1 */}
          <div className="glass-card bg-[#111827] border border-[#1F2937] rounded-lg p-4 flex flex-col justify-between metric-accent border-l-2" style={{ borderLeftColor: '#c3c0ff' }}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[12px] font-medium text-on-surface-variant uppercase tracking-wider">Total Students</span>
              <Users className="text-primary" size={20} />
            </div>
            <div>
              <div className="text-3xl font-bold text-on-surface">{studentCount}</div>
              <div className="text-[10px] text-tertiary mt-1">ID: USR-2026-X</div>
            </div>
          </div>
          
          {/* Metric 2 */}
          <div className="glass-card bg-[#111827] border border-[#1F2937] rounded-lg p-4 flex flex-col justify-between metric-accent border-l-2" style={{ borderLeftColor: '#f97316' }}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[12px] font-medium text-on-surface-variant uppercase tracking-wider">Active Assignments</span>
              <BookOpen className="text-[#f97316]" size={20} />
            </div>
            <div>
              <div className="text-3xl font-bold text-on-surface">{activeAssignments}</div>
              <div className="text-[10px] text-tertiary mt-1">ID: ASN-8092-X</div>
            </div>
          </div>
          
          {/* Metric 3 */}
          <div className="glass-card bg-[#111827] border border-[#1F2937] rounded-lg p-4 flex flex-col justify-between metric-accent border-l-2" style={{ borderLeftColor: '#94a3b8' }}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[12px] font-medium text-on-surface-variant uppercase tracking-wider">Active Subjects</span>
              <ShieldAlert className="text-secondary" size={20} />
            </div>
            <div>
              <div className="text-3xl font-bold text-on-surface">{activeSubjects}</div>
              <div className="text-[10px] text-secondary mt-1">ID: SUB-701-X</div>
            </div>
          </div>
        </div>

        {/* QR Widget (Spans 4 cols) */}
        <div className="md:col-span-4 glass-card bg-[#111827] border border-[#1F2937] rounded-lg p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-surface-container-low opacity-50"></div>
          <div className="relative z-10 w-full flex flex-col items-center">
            <span className="text-[12px] font-medium text-on-surface-variant uppercase mb-2 w-full text-left border-b border-outline-variant pb-1">Quick Verify</span>
            <div className="w-32 h-32 bg-white rounded-md p-1 mt-2 mb-4 flex items-center justify-center">
              <QrCode size={64} className="text-black" />
            </div>
            <button className="w-full bg-transparent border border-outline-variant text-on-surface text-[12px] font-medium py-1.5 rounded hover:bg-surface-container-highest transition-colors">
              Scan Attendance
            </button>
          </div>
        </div>

        {/* Recent Activity Feed (Spans 8 cols) */}
        <div className="md:col-span-8 glass-card bg-[#111827] border border-[#1F2937] rounded-lg flex flex-col md:row-span-2">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="text-xl font-semibold text-on-surface">Recent Activity</h3>
            <button className="text-[10px] font-medium text-primary hover:text-primary-fixed transition-colors">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#0d1c2d] border-b border-outline-variant">
                <tr>
                  <th className="p-2 text-[10px] font-medium text-on-surface-variant w-1/4 pl-4">Timestamp</th>
                  <th className="p-2 text-[10px] font-medium text-on-surface-variant w-1/2">Event</th>
                  <th className="p-2 text-[10px] font-medium text-on-surface-variant w-1/4 pr-4 text-right">User ID</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                <tr className="border-b border-outline-variant/50 hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="p-2 pl-4 text-on-surface-variant">09:41 AM</td>
                  <td className="p-2 text-on-surface flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                    Assignment Submitted: Calculus III
                  </td>
                  <td className="p-2 pr-4 text-right text-on-surface-variant font-mono">USR-2026-A</td>
                </tr>
                <tr className="border-b border-outline-variant/50 hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="p-2 pl-4 text-on-surface-variant">09:38 AM</td>
                  <td className="p-2 text-on-surface flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary inline-block"></span>
                    Grade Updated: Intro to Physics
                  </td>
                  <td className="p-2 pr-4 text-right text-on-surface-variant font-mono">USR-2026-B</td>
                </tr>
                <tr className="border-b border-outline-variant/50 hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="p-2 pl-4 text-on-surface-variant">09:15 AM</td>
                  <td className="p-2 text-on-surface flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
                    System Login
                  </td>
                  <td className="p-2 pr-4 text-right text-on-surface-variant font-mono">USR-1099-S</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="p-2 pl-4 text-on-surface-variant">08:50 AM</td>
                  <td className="p-2 text-on-surface flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-error inline-block"></span>
                    Failed Access Attempt
                  </td>
                  <td className="p-2 pr-4 text-right text-error font-mono">UNKNOWN</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pinned Assignments (Spans 4 cols) */}
        <div className="md:col-span-4 glass-card bg-[#111827] border border-[#1F2937] rounded-lg flex flex-col md:row-span-2">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="text-xl font-semibold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">push_pin</span>
              Pinned Assignments
            </h3>
          </div>
          <div className="p-4 space-y-2 flex-1 overflow-y-auto">
            {/* Item 1 */}
            <div className="bg-[#090D16] border border-[#1F2937] p-2 rounded flex justify-between items-center group hover:border-primary transition-colors cursor-pointer">
              <div>
                <div className="text-[12px] text-on-surface font-semibold">Q3 Final Project</div>
                <div className="text-[10px] text-on-surface-variant mt-0.5">Due: Today, 11:59 PM</div>
              </div>
              <span className="text-[10px] bg-primary-container/20 text-primary px-1.5 py-0.5 rounded border border-primary/30 font-mono">ASN-8092-A</span>
            </div>
            {/* Item 2 */}
            <div className="bg-[#090D16] border border-[#1F2937] p-2 rounded flex justify-between items-center group hover:border-primary transition-colors cursor-pointer">
              <div>
                <div className="text-[12px] text-on-surface font-semibold">Midterm Essay Review</div>
                <div className="text-[10px] text-on-surface-variant mt-0.5">Due: Tomorrow</div>
              </div>
              <span className="text-[10px] bg-primary-container/20 text-primary px-1.5 py-0.5 rounded border border-primary/30 font-mono">ASN-8092-B</span>
            </div>
            {/* Item 3 */}
            <div className="bg-[#090D16] border border-[#1F2937] p-2 rounded flex justify-between items-center group hover:border-primary transition-colors cursor-pointer">
              <div>
                <div className="text-[12px] text-on-surface font-semibold">Lab Report 04</div>
                <div className="text-[10px] text-on-surface-variant mt-0.5">Due: in 3 days</div>
              </div>
              <span className="text-[10px] bg-primary-container/20 text-primary px-1.5 py-0.5 rounded border border-primary/30 font-mono">ASN-8092-C</span>
            </div>
          </div>
        </div>

      </div>

      {/* Broadcast dialog */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-surface border border-outline-variant rounded-xl shadow-2xl overflow-hidden p-6 space-y-4">
            <h3 className="text-xl font-bold text-on-surface">Send System Broadcast</h3>
            <p className="text-sm text-on-surface-variant">This announcement will be pushed to the notification feeds of all student and faculty portal users.</p>
            <form onSubmit={handleBroadcast} className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-on-surface-variant mb-1">Title</label>
                <input 
                  type="text" 
                  value={broadcastTitle} 
                  onChange={(e) => setBroadcastTitle(e.target.value)} 
                  placeholder="e.g. Server Maintenance Notice" 
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-[12px] text-on-surface focus:border-primary focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-on-surface-variant mb-1">Message</label>
                <textarea 
                  rows={3} 
                  value={broadcastMsg} 
                  onChange={(e) => setBroadcastMsg(e.target.value)} 
                  placeholder="Type announcement detail..." 
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-[12px] text-on-surface focus:border-primary focus:outline-none" 
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowBroadcastModal(false)} className="px-4 py-2 text-[12px] font-medium text-on-surface-variant hover:bg-surface-container-highest rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 text-[12px] font-medium bg-primary text-on-primary rounded hover:bg-opacity-90">Broadcast Alert</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
