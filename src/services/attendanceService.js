import { studentAttendanceData } from '../data/students';
import { simulateLatency } from './apiConfig';

export const attendanceService = {
  getStudentAttendance: async (studentId) => {
    await simulateLatency(150);
    return { data: studentAttendanceData[studentId] || null };
  },

  submitQRScan: async (payload) => {
    await simulateLatency(300);
    return {
      status: 200,
      data: {
        message: 'Attendance verified successfully',
        timestamp: new Date().toISOString(),
        sessionId: payload?.sessionId || 'SESSION_' + Date.now(),
      },
    };
  },

  getSubjectAttendance: async (subjectId, studentId) => {
    await simulateLatency(200);
    const data = studentAttendanceData[studentId];
    if (!data) return { data: null };
    const subject = data.subjects.find(s => s.subjectId === subjectId || s.code === subjectId);
    return { data: subject || null };
  },
};
