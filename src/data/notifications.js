export const mockNotifications = [
  { id: 1, type: 'warning', category: 'attendance', title: 'Low Attendance Alert', message: 'Your attendance in Software Testing is 72%, which is below the required 75%. Please attend upcoming classes regularly.', timestamp: '2026-08-17T09:00:00', read: false, actionLabel: 'View Attendance', actionLink: '/student/attendance' },
  { id: 2, type: 'info', category: 'assignments', title: 'Assignment Deadline Tomorrow', message: 'Your Web Engineering assignment "Build a REST API" is due tomorrow at 11:59 PM. Make sure to submit on time.', timestamp: '2026-08-17T08:30:00', read: false, actionLabel: 'Submit Now', actionLink: '/student/assignments' },
  { id: 3, type: 'success', category: 'leave', title: 'Leave Request Approved', message: 'Your leave application for 14 Aug - 15 Aug has been approved by Dr. Priya Sharma.', timestamp: '2026-08-16T15:20:00', read: false, actionLabel: 'View Details', actionLink: '/student/leave' },
  { id: 4, type: 'success', category: 'grades', title: 'Marks Updated', message: 'Internal marks for Artificial Intelligence have been updated. Check your latest score.', timestamp: '2026-08-15T11:00:00', read: true, actionLabel: 'View Grades', actionLink: '/student/grades' },
  { id: 5, type: 'info', category: 'announcements', title: 'New Announcement', message: 'Semester VII examination form submission starts from 1st September 2026. Fill the form before the deadline.', timestamp: '2026-08-14T10:00:00', read: true, actionLabel: null, actionLink: null },
  { id: 6, type: 'info', category: 'assignments', title: 'New Assignment Published', message: 'Prof. Anil Patel has published a new assignment: "Neural Network Implementation" for AI subject.', timestamp: '2026-08-13T14:30:00', read: true, actionLabel: 'View Assignment', actionLink: '/student/assignments' },
  { id: 7, type: 'warning', category: 'attendance', title: 'Attendance Warning', message: 'Overall attendance has dropped to 82%. Maintain at least 75% to be eligible for examinations.', timestamp: '2026-08-12T09:00:00', read: true, actionLabel: null, actionLink: null },
  { id: 8, type: 'success', category: 'grades', title: 'Assignment Graded', message: 'Your Cloud Computing assignment "Cloud Architecture Design" has been graded. You scored 22/25.', timestamp: '2026-08-11T16:45:00', read: true, actionLabel: 'View Grade', actionLink: '/student/grades' },
];

export const mockFacultyNotifications = [
  { id: 1, type: 'warning', category: 'leave', title: 'Leave Request Pending', message: 'Vinay Abhiram has submitted a leave application for 20 Aug - 21 Aug. Review and approve/reject.', timestamp: '2026-08-17T09:30:00', read: false, actionLabel: 'Review', actionLink: '/faculty/leave' },
  { id: 2, type: 'info', category: 'assignments', title: 'New Submissions', message: '6 students have submitted the "Build a REST API" assignment. Review and grade them.', timestamp: '2026-08-16T14:00:00', read: false, actionLabel: 'Review', actionLink: '/faculty/submissions' },
  { id: 3, type: 'warning', category: 'attendance', title: 'Low Class Attendance', message: 'Software Testing class on 15 Aug had only 65% attendance. Consider sending a reminder.', timestamp: '2026-08-15T12:00:00', read: true, actionLabel: null, actionLink: null },
];

export const mockAdminNotifications = [
  { id: 1, type: 'info', category: 'system', title: 'New User Registrations', message: '15 new students have been added to the system for Semester VII.', timestamp: '2026-08-17T08:00:00', read: false, actionLabel: 'View Users', actionLink: '/admin/users' },
  { id: 2, type: 'warning', category: 'attendance', title: 'System-wide Low Attendance', message: 'Overall institution attendance is 78% for August. Below target of 85%.', timestamp: '2026-08-16T10:00:00', read: false, actionLabel: 'View Analytics', actionLink: '/admin/analytics' },
];
