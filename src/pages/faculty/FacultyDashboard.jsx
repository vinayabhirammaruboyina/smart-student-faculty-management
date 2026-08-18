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
        <div className="h-16 w-72 bg-surface-container rounded-xl animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-surface-container rounded-lg animate-pulse" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-background min-h-screen text-on-surface font-body-md">
      <div className="max-w-[1440px] mx-auto space-y-4">
        
        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Metric Card 1 */}
          <div className="canvas-card bg-[#111827] border border-[#1F2937] rounded-lg p-4 relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[12px] font-medium text-on-surface-variant uppercase tracking-wider">Total Students</span>
            </div>
            <div className="text-3xl font-bold text-on-surface font-mono">{studentsCount.toLocaleString()}</div>
            <div className="mt-2 text-[10px] flex items-center gap-1 text-on-surface">
              <TrendingUp size={12} className="text-[#34d399]" />
              <span className="text-[#34d399]">+5.2%</span> from last semester
            </div>
          </div>

          {/* Metric Card 2 */}
          <div className="canvas-card bg-[#111827] border border-[#1F2937] rounded-lg p-4 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary"></div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[12px] font-medium text-on-surface-variant uppercase tracking-wider">Avg Class Perf</span>
            </div>
            <div className="text-3xl font-bold text-on-surface font-mono">84.5<span className="text-xl">%</span></div>
            <div className="mt-2 text-[10px] text-on-surface-variant">
              Across 4 active courses
            </div>
          </div>

          {/* Metric Card 3 */}
          <div className="canvas-card bg-[#111827] border border-[#1F2937] rounded-lg p-4 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[12px] font-medium text-on-surface-variant uppercase tracking-wider">Pending Grading</span>
            </div>
            <div className="text-3xl font-bold text-error font-mono">48</div>
            <div className="mt-2 text-[10px] text-on-surface-variant">
              Requires action this week
            </div>
          </div>

          {/* Metric Card 4 */}
          <div className="canvas-card bg-[#111827] border border-[#1F2937] rounded-lg p-4 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[12px] font-medium text-on-surface-variant uppercase tracking-wider">Active Research</span>
            </div>
            <div className="text-3xl font-bold text-on-surface font-mono">03</div>
            <div className="mt-2 text-[10px] text-on-surface-variant">
              2 pending publication
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Main Content Column (2 spans) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Course Overview */}
            <div className="canvas-card bg-[#111827] border border-[#1F2937] rounded-lg flex flex-col">
              <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low rounded-t-lg">
                <h2 className="text-xl font-semibold text-on-surface flex items-center gap-2">
                  Course Overview
                </h2>
                <button onClick={() => navigate('/faculty/classes')} className="text-primary hover:text-primary-fixed transition-colors text-[10px] uppercase flex items-center gap-1">
                  View All <ArrowRight size={12} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant text-[10px] text-on-surface-variant uppercase tracking-wider bg-[#151f2e]">
                      <th className="p-2 pl-4 font-medium">Course Code &amp; Title</th>
                      <th className="p-2 font-medium">Enrollment</th>
                      <th className="p-2 font-medium">Next Lecture</th>
                      <th className="p-2 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="text-[12px]">
                    <tr className="border-b border-outline-variant/30 hover:bg-white/5 transition-colors cursor-pointer">
                      <td className="p-2 pl-4">
                        <div className="font-medium text-on-surface font-mono">SUB-701</div>
                        <div className="text-on-surface-variant text-xs truncate max-w-[200px]">Introduction to Physics</div>
                      </td>
                      <td className="p-2 font-mono text-on-surface">124</td>
                      <td className="p-2 text-on-surface-variant">Mon, 10:00 AM</td>
                      <td className="p-2">
                        <div className="w-16 h-4 bg-surface-container-high rounded overflow-hidden flex items-end">
                          <div className="w-1/5 bg-primary/40 h-[40%] ml-0.5"></div>
                          <div className="w-1/5 bg-primary/60 h-[60%] ml-0.5"></div>
                          <div className="w-1/5 bg-primary/80 h-[50%] ml-0.5"></div>
                          <div className="w-1/5 bg-primary h-[80%] ml-0.5"></div>
                          <div className="w-1/5 bg-[#34d399] h-[90%] ml-0.5"></div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-outline-variant/30 hover:bg-white/5 transition-colors cursor-pointer">
                      <td className="p-2 pl-4">
                        <div className="font-medium text-on-surface font-mono">ENG-302</div>
                        <div className="text-on-surface-variant text-xs truncate max-w-[200px]">Advanced Thermodynamics</div>
                      </td>
                      <td className="p-2 font-mono text-on-surface">68</td>
                      <td className="p-2 text-on-surface-variant">Tue, 14:00 PM</td>
                      <td className="p-2">
                        <div className="w-16 h-4 bg-surface-container-high rounded overflow-hidden flex items-end">
                          <div className="w-1/5 bg-primary/80 h-[70%] ml-0.5"></div>
                          <div className="w-1/5 bg-primary/60 h-[60%] ml-0.5"></div>
                          <div className="w-1/5 bg-primary/40 h-[50%] ml-0.5"></div>
                          <div className="w-1/5 bg-error/80 h-[30%] ml-0.5"></div>
                          <div className="w-1/5 bg-error h-[20%] ml-0.5"></div>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors cursor-pointer">
                      <td className="p-2 pl-4">
                        <div className="font-medium text-on-surface font-mono">RES-900</div>
                        <div className="text-on-surface-variant text-xs truncate max-w-[200px]">Thesis Seminar</div>
                      </td>
                      <td className="p-2 font-mono text-on-surface">12</td>
                      <td className="p-2 text-on-surface-variant">Thu, 09:00 AM</td>
                      <td className="p-2">
                        <div className="w-16 h-4 bg-surface-container-high rounded overflow-hidden flex items-end">
                          <div className="w-1/5 bg-primary/60 h-[80%] ml-0.5"></div>
                          <div className="w-1/5 bg-primary/60 h-[85%] ml-0.5"></div>
                          <div className="w-1/5 bg-primary/60 h-[82%] ml-0.5"></div>
                          <div className="w-1/5 bg-primary/60 h-[88%] ml-0.5"></div>
                          <div className="w-1/5 bg-primary h-[95%] ml-0.5"></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grading Queue */}
            <div className="canvas-card bg-[#111827] border border-[#1F2937] rounded-lg flex flex-col">
              <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low rounded-t-lg">
                <h2 className="text-xl font-semibold text-on-surface flex items-center gap-2">
                  Grading Queue
                </h2>
                <span className="bg-error text-on-error text-[10px] font-medium px-2 py-0.5 rounded-full">48 Pending</span>
              </div>
              <div className="p-2 space-y-2">
                
                {/* Queue Item */}
                <div className="flex justify-between items-center p-2 hover:bg-surface-container-high rounded transition-colors border border-transparent hover:border-outline-variant/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-primary">
                      <FileText size={16} />
                    </div>
                    <div>
                      <div className="text-[12px] font-medium text-on-surface">Midterm Essay</div>
                      <div className="text-[10px] text-on-surface-variant flex gap-2">
                        <span className="font-mono">ASN-8092-A</span> • <span className="font-mono">USR-2026</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-error flex items-center gap-1">
                      2 days overdue
                    </span>
                    <button onClick={() => navigate('/faculty/submissions')} className="bg-transparent border border-outline text-on-surface text-[10px] font-medium px-3 py-1 rounded hover:bg-surface-container-highest transition-colors">Grade</button>
                  </div>
                </div>

                {/* Queue Item */}
                <div className="flex justify-between items-center p-2 hover:bg-surface-container-high rounded transition-colors border border-transparent hover:border-outline-variant/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-primary">
                      <FlaskConical size={16} />
                    </div>
                    <div>
                      <div className="text-[12px] font-medium text-on-surface">Lab Report 3</div>
                      <div className="text-[10px] text-on-surface-variant flex gap-2">
                        <span className="font-mono">ASN-8105-B</span> • <span className="font-mono">USR-2144</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-on-surface-variant">Due tomorrow</span>
                    <button onClick={() => navigate('/faculty/submissions')} className="bg-transparent border border-outline text-on-surface text-[10px] font-medium px-3 py-1 rounded hover:bg-surface-container-highest transition-colors">Grade</button>
                  </div>
                </div>

                {/* Queue Item */}
                <div className="flex justify-between items-center p-2 hover:bg-surface-container-high rounded transition-colors border border-transparent hover:border-outline-variant/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-primary">
                      <HelpCircle size={16} />
                    </div>
                    <div>
                      <div className="text-[12px] font-medium text-on-surface">Quiz 4</div>
                      <div className="text-[10px] text-on-surface-variant flex gap-2">
                        <span className="font-mono">ASN-8110-Q</span> • <span className="font-mono">USR-1998</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-on-surface-variant">Due in 3 days</span>
                    <button onClick={() => navigate('/faculty/submissions')} className="bg-transparent border border-outline text-on-surface text-[10px] font-medium px-3 py-1 rounded hover:bg-surface-container-highest transition-colors">Grade</button>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column (1 span) */}
          <div className="space-y-4">
            {/* Analytics Card */}
            <div className="canvas-card bg-[#111827] border border-[#1F2937] rounded-lg flex flex-col h-full min-h-[300px]">
              <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low rounded-t-lg">
                <h2 className="text-xl font-semibold text-on-surface flex items-center gap-2">
                  Grade Distribution
                </h2>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-center relative">
                
                {/* Simulated Chart Graphic */}
                <div className="relative w-48 h-48 mx-auto">
                  {/* A purely CSS representation of a donut chart */}
                  <div className="absolute inset-0 rounded-full border-8 border-surface-container-highest"></div>
                  {/* Segments (Simulated via SVG) */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle className="transition-all duration-1000 ease-out" cx="50" cy="50" fill="transparent" r="40" stroke="#34d399" strokeDasharray="251.2" strokeDashoffset="62.8" strokeWidth="12"></circle>
                    <circle className="origin-center rotate-[90deg]" cx="50" cy="50" fill="transparent" r="40" stroke="#c3c0ff" strokeDasharray="100 251.2" strokeDashoffset="150" strokeWidth="12"></circle>
                    <circle className="origin-center rotate-[190deg]" cx="50" cy="50" fill="transparent" r="40" stroke="#c0c6db" strokeDasharray="50 251.2" strokeDashoffset="200" strokeWidth="12"></circle>
                    <circle className="origin-center rotate-[240deg]" cx="50" cy="50" fill="transparent" r="40" stroke="#ffb4ab" strokeDasharray="21.2 251.2" strokeDashoffset="230" strokeWidth="12"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-on-surface font-mono">84.5</span>
                    <span className="text-[10px] font-medium text-on-surface-variant">Mean Score</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2 text-[10px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#34d399]"></div>
                    <span className="text-on-surface-variant">A (75%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-on-surface-variant">B (40%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span className="text-on-surface-variant">C (20%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-error"></div>
                    <span className="text-on-surface-variant">D/F (8%)</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
