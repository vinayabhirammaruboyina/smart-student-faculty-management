import { mockStudents } from '../data/students';
import { mockFacultyAssignments, mockSubmissions } from '../data/assignments';
import { mockFacultyLeaveRequests } from '../data/leave';
import { mockFacultyNotifications } from '../data/notifications';

export const facultyService = {
  getStudents: () => Promise.resolve(mockStudents),
  getAssignments: () => Promise.resolve(mockFacultyAssignments),
  getSubmissions: (assignmentId) => Promise.resolve(mockSubmissions.filter(s => s.assignmentId === assignmentId)),
  getLeaveRequests: () => Promise.resolve(mockFacultyLeaveRequests),
  approveLeave: (id) => Promise.resolve({ success: true }),
  rejectLeave: (id) => Promise.resolve({ success: true }),
  gradeSubmission: (subId, marks, feedback) => Promise.resolve({ success: true }),
  getNotifications: () => Promise.resolve(mockFacultyNotifications),
  markAttendance: (data) => new Promise(r => setTimeout(() => r({ success: true }), 500)),
};
