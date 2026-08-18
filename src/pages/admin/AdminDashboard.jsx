import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, ShieldAlert, Plus, Megaphone, QrCode, Pin } from 'lucide-react';
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
        <div className="h-16 w-80 bg-[#0B101E] rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-[#0B101E] rounded-lg animate-pulse" />)}
          </div>
          <div className="md:col-span-4 h-32 bg-[#0B101E] rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="text-slate-200">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Admin Command Center</h2>
          <p className="text-slate-400 mt-1 text-sm">Manage institutional data and overall platform health.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowBroadcastModal(true)} className="flex items-center gap-2 px-3 py-1.5 bg-[#151D33] text-indigo-300 border border-[#2A3755] rounded-md text-xs font-semibold hover:bg-[#1E293B] transition-colors uppercase tracking-wider">
            <Megaphone size={14} /> Broadcast
          </button>
          <button onClick={() => navigate('/admin/users')} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500 text-white rounded-md text-xs font-semibold hover:bg-indigo-600 transition-colors uppercase tracking-wider">
            <Plus size={14} /> Add User
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Key Metrics (Spans 8 cols) */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Metric 1 */}
          <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 border-l-2 border-l-[#6366F1] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Total Students</span>
              <Users className="text-[#6366F1]" size={16} />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">{studentCount}</div>
              <div className="text-[10px] font-mono text-slate-500 mt-2">SYS-ID: USR-2026-X</div>
            </div>
          </div>
          
          {/* Metric 2 */}
          <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 border-l-2 border-l-[#F59E0B] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Active Assignments</span>
              <BookOpen className="text-[#F59E0B]" size={16} />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">{activeAssignments}</div>
              <div className="text-[10px] font-mono text-slate-500 mt-2">SYS-ID: ASN-8092-X</div>
            </div>
          </div>
          
          {/* Metric 3 */}
          <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 border-l-2 border-l-[#818CF8] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Active Subjects</span>
              <ShieldAlert className="text-[#818CF8]" size={16} />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">{activeSubjects}</div>
              <div className="text-[10px] font-mono text-slate-500 mt-2">SYS-ID: SUB-701-X</div>
            </div>
          </div>
        </div>

        {/* QR Widget (Spans 4 cols) */}
        <div className="md:col-span-4 rounded-lg bg-[#0B101E] border border-[#151D33] p-5 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase mb-3 w-full text-left border-b border-[#162039] pb-2">Quick Verify</span>
          <div className="w-28 h-28 bg-white rounded-md p-2 mt-2 mb-4 flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-black flex items-center justify-center">
              <QrCode size={60} className="text-white" strokeWidth={1} />
            </div>
          </div>
          <button className="w-full bg-[#151D33] border border-[#2A3755] text-white font-mono text-[11px] py-2 rounded-md hover:bg-[#1E293B] transition-colors mt-2">
            [ Scan Attendance ]
          </button>
        </div>

        {/* Recent Activity Feed (Spans 8 cols) */}
        <div className="md:col-span-8 rounded-lg bg-[#0B101E] border border-[#151D33] p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#162039]">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <button className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="text-[10px] font-mono text-slate-500 uppercase pb-2 border-b border-[#162039] w-1/5 pl-2">Time</th>
                  <th className="text-[10px] font-mono text-slate-500 uppercase pb-2 border-b border-[#162039] w-3/5">Event</th>
                  <th className="text-[10px] font-mono text-slate-500 uppercase pb-2 border-b border-[#162039] w-1/5 text-right pr-2">User ID</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#121A2F] hover:bg-[#0F162A]/50 transition-colors">
                  <td className="py-3 pl-2 text-[11px] font-mono text-slate-400">09:41 AM</td>
                  <td className="py-3 text-sm text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] inline-block"></span>
                    Assignment Submitted: Calculus III
                  </td>
                  <td className="py-3 pr-2 text-right text-[11px] font-mono text-slate-400">USR-2026-A</td>
                </tr>
                <tr className="border-b border-[#121A2F] hover:bg-[#0F162A]/50 transition-colors">
                  <td className="py-3 pl-2 text-[11px] font-mono text-slate-400">09:38 AM</td>
                  <td className="py-3 text-sm text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] inline-block"></span>
                    Grade Updated: Intro to Physics
                  </td>
                  <td className="py-3 pr-2 text-right text-[11px] font-mono text-slate-400">USR-2026-B</td>
                </tr>
                <tr className="border-b border-[#121A2F] hover:bg-[#0F162A]/50 transition-colors">
                  <td className="py-3 pl-2 text-[11px] font-mono text-slate-400">09:15 AM</td>
                  <td className="py-3 text-sm text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                    System Login
                  </td>
                  <td className="py-3 pr-2 text-right text-[11px] font-mono text-slate-400">USR-1099-S</td>
                </tr>
                <tr className="hover:bg-[#0F162A]/50 transition-colors">
                  <td className="py-3 pl-2 text-[11px] font-mono text-slate-400">08:50 AM</td>
                  <td className="py-3 text-sm text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E] inline-block"></span>
                    Failed Access Attempt
                  </td>
                  <td className="py-3 pr-2 text-right text-[11px] font-mono text-rose-400">UNKNOWN</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pinned Assignments (Spans 4 cols) */}
        <div className="md:col-span-4 rounded-lg bg-[#0B101E] border border-[#151D33] p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#162039]">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Pin size={16} className="text-indigo-400" />
              Pinned Items
            </h3>
          </div>
          <div className="space-y-3">
            {/* Item 1 */}
            <div className="bg-[#070B13] border border-[#141C2E] p-3 rounded-md flex justify-between items-center hover:border-[#2A3755] transition-colors group">
              <div>
                <div className="text-sm font-semibold text-slate-200">Q3 Final Project</div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">DUE: TODAY, 11:59 PM</div>
              </div>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 font-mono">ASN-8092-A</span>
            </div>
            {/* Item 2 */}
            <div className="bg-[#070B13] border border-[#141C2E] p-3 rounded-md flex justify-between items-center hover:border-[#2A3755] transition-colors group">
              <div>
                <div className="text-sm font-semibold text-slate-200">Midterm Essay Review</div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">DUE: TOMORROW</div>
              </div>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 font-mono">ASN-8092-B</span>
            </div>
            {/* Item 3 */}
            <div className="bg-[#070B13] border border-[#141C2E] p-3 rounded-md flex justify-between items-center hover:border-[#2A3755] transition-colors group">
              <div>
                <div className="text-sm font-semibold text-slate-200">Lab Report 04</div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">DUE: IN 3 DAYS</div>
              </div>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 font-mono">ASN-8092-C</span>
            </div>
          </div>
        </div>

      </div>

      {/* Broadcast dialog */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#0B101E] border border-[#151D33] rounded-xl shadow-2xl overflow-hidden p-6 space-y-5">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">System Broadcast</h3>
              <p className="text-xs text-slate-400">This announcement will be pushed to all users.</p>
            </div>
            <form onSubmit={handleBroadcast} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Title</label>
                <input 
                  type="text" 
                  value={broadcastTitle} 
                  onChange={(e) => setBroadcastTitle(e.target.value)} 
                  placeholder="e.g. Server Maintenance Notice" 
                  className="w-full bg-[#070B13] border border-[#141C2E] rounded-md p-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Message</label>
                <textarea 
                  rows={3} 
                  value={broadcastMsg} 
                  onChange={(e) => setBroadcastMsg(e.target.value)} 
                  placeholder="Type announcement detail..." 
                  className="w-full bg-[#070B13] border border-[#141C2E] rounded-md p-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none resize-none" 
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowBroadcastModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-xs font-semibold bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors uppercase tracking-widest">Broadcast Alert</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
