import { mockStudents, studentAttendanceData, studentGradesData } from '../data/students';
import { mockAssignments } from '../data/assignments';
import { mockLeaveApplications } from '../data/leave';
import { mockNotifications } from '../data/notifications';

export const studentService = {
  getProfile: (id) => Promise.resolve(mockStudents.find(s => s.id === id)),
  getAttendance: (id) => Promise.resolve(studentAttendanceData[id]),
  getGrades: (id) => Promise.resolve(studentGradesData[id]),
  getAssignments: () => Promise.resolve(mockAssignments),
  getLeaveApplications: (id) => Promise.resolve(mockLeaveApplications.filter(l => l.studentId === id)),
  applyLeave: (data) => Promise.resolve({ success: true, id: 'LVE' + Date.now(), ...data }),
  submitAssignment: (id, file) => new Promise(r => setTimeout(() => r({ success: true }), 2000)),
  getNotifications: (id) => Promise.resolve(mockNotifications),
};
