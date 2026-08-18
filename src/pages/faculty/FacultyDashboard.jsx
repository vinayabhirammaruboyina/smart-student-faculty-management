import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FileText, FlaskConical, HelpCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const studentsCount = useCountUp(1432, 1200, !loading);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 w-72 bg-[#0B101E] rounded-xl animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-[#0B101E] rounded-lg animate-pulse" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="text-slate-200">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Welcome, {user?.name || 'Faculty'}</h1>
        <p className="text-slate-400 mt-1 text-sm">Here is your faculty command center overview.</p>
      </div>
        
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Metric Card 1 */}
        <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 border-l-2 border-l-[#6366F1] flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">Total Students</span>
          <div className="text-3xl font-extrabold text-white">{studentsCount.toLocaleString()}</div>
          <div className="mt-2 text-[10px] font-mono text-slate-500 flex items-center gap-1">
            <TrendingUp size={12} className="text-[#6366F1]" />
            <span className="text-[#6366F1]">+5.2%</span> from last sem
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 border-l-2 border-l-[#F59E0B] flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">Avg Class Perf</span>
          <div className="text-3xl font-extrabold text-white">84.5<span className="text-lg text-slate-400">%</span></div>
          <div className="mt-2 text-[10px] font-mono text-slate-500">Across 4 active courses</div>
        </div>

        {/* Metric Card 3 */}
        <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 border-l-2 border-l-[#818CF8] flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">Pending Grading</span>
          <div className="text-3xl font-extrabold text-white">48</div>
          <div className="mt-2 text-[10px] font-mono text-slate-500">Requires action this week</div>
        </div>

        {/* Metric Card 4 */}
        <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 border-l-2 border-l-[#F43F5E] flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">Active Research</span>
          <div className="text-3xl font-extrabold text-white">03</div>
          <div className="mt-2 text-[10px] font-mono text-slate-500">2 pending publication</div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Main Content Column (2 spans) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Course Overview */}
          <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#162039]">
              <h2 className="text-lg font-semibold text-white">Course Overview</h2>
              <button onClick={() => navigate('/faculty/classes')} className="text-indigo-400 hover:text-indigo-300 text-[10px] font-mono uppercase flex items-center gap-1">
                View All <ArrowRight size={12} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="text-[10px] font-mono text-slate-500 uppercase pb-2 border-b border-[#162039] pl-2 w-2/5">Course Code &amp; Title</th>
                    <th className="text-[10px] font-mono text-slate-500 uppercase pb-2 border-b border-[#162039] w-1/5">Enrollment</th>
                    <th className="text-[10px] font-mono text-slate-500 uppercase pb-2 border-b border-[#162039] w-1/5">Next Lecture</th>
                    <th className="text-[10px] font-mono text-slate-500 uppercase pb-2 border-b border-[#162039] w-1/5">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#162039]/50 hover:bg-[#151D33]/30 transition-colors">
                    <td className="py-3 pl-2">
                      <div className="text-[11px] font-mono text-indigo-300">SUB-701</div>
                      <div className="text-xs text-slate-300 truncate max-w-[200px] mt-1">Introduction to Physics</div>
                    </td>
                    <td className="py-3 text-[11px] font-mono text-slate-300">124</td>
                    <td className="py-3 text-[11px] font-mono text-slate-400">Mon, 10:00 AM</td>
                    <td className="py-3">
                      <div className="w-16 h-4 bg-[#151D33] rounded overflow-hidden flex items-end">
                        <div className="w-1/5 bg-indigo-500/40 h-[40%] ml-0.5"></div>
                        <div className="w-1/5 bg-indigo-500/60 h-[60%] ml-0.5"></div>
                        <div className="w-1/5 bg-indigo-500/80 h-[50%] ml-0.5"></div>
                        <div className="w-1/5 bg-indigo-500 h-[80%] ml-0.5"></div>
                        <div className="w-1/5 bg-emerald-400 h-[90%] ml-0.5"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#162039]/50 hover:bg-[#151D33]/30 transition-colors">
                    <td className="py-3 pl-2">
                      <div className="text-[11px] font-mono text-indigo-300">ENG-302</div>
                      <div className="text-xs text-slate-300 truncate max-w-[200px] mt-1">Advanced Thermodynamics</div>
                    </td>
                    <td className="py-3 text-[11px] font-mono text-slate-300">68</td>
                    <td className="py-3 text-[11px] font-mono text-slate-400">Tue, 14:00 PM</td>
                    <td className="py-3">
                      <div className="w-16 h-4 bg-[#151D33] rounded overflow-hidden flex items-end">
                        <div className="w-1/5 bg-indigo-500/80 h-[70%] ml-0.5"></div>
                        <div className="w-1/5 bg-indigo-500/60 h-[60%] ml-0.5"></div>
                        <div className="w-1/5 bg-indigo-500/40 h-[50%] ml-0.5"></div>
                        <div className="w-1/5 bg-rose-500/80 h-[30%] ml-0.5"></div>
                        <div className="w-1/5 bg-rose-500 h-[20%] ml-0.5"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#151D33]/30 transition-colors">
                    <td className="py-3 pl-2">
                      <div className="text-[11px] font-mono text-indigo-300">RES-900</div>
                      <div className="text-xs text-slate-300 truncate max-w-[200px] mt-1">Thesis Seminar</div>
                    </td>
                    <td className="py-3 text-[11px] font-mono text-slate-300">12</td>
                    <td className="py-3 text-[11px] font-mono text-slate-400">Thu, 09:00 AM</td>
                    <td className="py-3">
                      <div className="w-16 h-4 bg-[#151D33] rounded overflow-hidden flex items-end">
                        <div className="w-1/5 bg-indigo-500/60 h-[80%] ml-0.5"></div>
                        <div className="w-1/5 bg-indigo-500/60 h-[85%] ml-0.5"></div>
                        <div className="w-1/5 bg-indigo-500/60 h-[82%] ml-0.5"></div>
                        <div className="w-1/5 bg-indigo-500/60 h-[88%] ml-0.5"></div>
                        <div className="w-1/5 bg-indigo-500 h-[95%] ml-0.5"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Grading Queue */}
          <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#162039]">
              <h2 className="text-lg font-semibold text-white">Grading Queue</h2>
              <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-mono px-2 py-0.5 rounded-full">48 Pending</span>
            </div>
            <div className="space-y-3">
              
              {/* Queue Item */}
              <div className="flex justify-between items-center p-3 hover:bg-[#151D33]/50 rounded-lg transition-colors border border-transparent hover:border-[#2A3755] bg-[#070B13]/50">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                    <FileText size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">Midterm Essay</div>
                    <div className="text-[10px] text-slate-500 flex gap-2 mt-1">
                      <span className="font-mono">ASN-8092-A</span> • <span className="font-mono">USR-2026</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] text-rose-400 font-mono">2 DAYS OVERDUE</span>
                  <button onClick={() => navigate('/faculty/submissions')} className="text-[10px] font-mono text-slate-300 hover:text-white border border-[#2A3755] hover:border-indigo-500 px-3 py-1 rounded transition-colors bg-[#0B101E]">GRADE</button>
                </div>
              </div>

              {/* Queue Item */}
              <div className="flex justify-between items-center p-3 hover:bg-[#151D33]/50 rounded-lg transition-colors border border-transparent hover:border-[#2A3755] bg-[#070B13]/50">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                    <FlaskConical size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">Lab Report 3</div>
                    <div className="text-[10px] text-slate-500 flex gap-2 mt-1">
                      <span className="font-mono">ASN-8105-B</span> • <span className="font-mono">USR-2144</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">DUE TOMORROW</span>
                  <button onClick={() => navigate('/faculty/submissions')} className="text-[10px] font-mono text-slate-300 hover:text-white border border-[#2A3755] hover:border-indigo-500 px-3 py-1 rounded transition-colors bg-[#0B101E]">GRADE</button>
                </div>
              </div>

              {/* Queue Item */}
              <div className="flex justify-between items-center p-3 hover:bg-[#151D33]/50 rounded-lg transition-colors border border-transparent hover:border-[#2A3755] bg-[#070B13]/50">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                    <HelpCircle size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">Quiz 4</div>
                    <div className="text-[10px] text-slate-500 flex gap-2 mt-1">
                      <span className="font-mono">ASN-8110-Q</span> • <span className="font-mono">USR-1998</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">DUE IN 3 DAYS</span>
                  <button onClick={() => navigate('/faculty/submissions')} className="text-[10px] font-mono text-slate-300 hover:text-white border border-[#2A3755] hover:border-indigo-500 px-3 py-1 rounded transition-colors bg-[#0B101E]">GRADE</button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column (1 span) */}
        <div className="space-y-4">
          {/* Analytics Card */}
          <div className="rounded-lg bg-[#0B101E] border border-[#151D33] p-5 flex flex-col h-full min-h-[300px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-white">Grade Distribution</h2>
            </div>
            <div className="flex-1 flex flex-col justify-center relative">
              
              {/* Simulated Chart Graphic */}
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 rounded-full border-[10px] border-[#151D33]"></div>
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="transition-all duration-1000 ease-out" cx="50" cy="50" fill="transparent" r="40" stroke="#6366F1" strokeDasharray="251.2" strokeDashoffset="62.8" strokeWidth="10"></circle>
                  <circle className="origin-center rotate-[90deg]" cx="50" cy="50" fill="transparent" r="40" stroke="#F59E0B" strokeDasharray="100 251.2" strokeDashoffset="150" strokeWidth="10"></circle>
                  <circle className="origin-center rotate-[190deg]" cx="50" cy="50" fill="transparent" r="40" stroke="#818CF8" strokeDasharray="50 251.2" strokeDashoffset="200" strokeWidth="10"></circle>
                  <circle className="origin-center rotate-[240deg]" cx="50" cy="50" fill="transparent" r="40" stroke="#F43F5E" strokeDasharray="21.2 251.2" strokeDashoffset="230" strokeWidth="10"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white font-mono">84.5</span>
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mt-1">Mean Score</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6366F1]"></div>
                  <span className="text-slate-400">A (75%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>
                  <span className="text-slate-400">B (40%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#818CF8]"></div>
                  <span className="text-slate-400">C (20%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]"></div>
                  <span className="text-slate-400">D/F (8%)</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
