import { mockUsers, mockDepartments, mockSubjects, adminAnalyticsData } from '../data/users';
import { mockStudents } from '../data/students';
import { mockFaculty } from '../data/faculty';
import { mockAdminNotifications } from '../data/notifications';

export const adminService = {
  getUsers: () => Promise.resolve(mockUsers),
  getStudents: () => Promise.resolve(mockStudents),
  getFaculty: () => Promise.resolve(mockFaculty),
  getDepartments: () => Promise.resolve(mockDepartments),
  getSubjects: () => Promise.resolve(mockSubjects),
  getAnalytics: () => Promise.resolve(adminAnalyticsData),
  getNotifications: () => Promise.resolve(mockAdminNotifications),
  createUser: (data) => Promise.resolve({ success: true, id: 'USR' + Date.now(), ...data }),
  updateUser: (id, data) => Promise.resolve({ success: true }),
  deleteUser: (id) => Promise.resolve({ success: true }),
  toggleUserStatus: (id) => Promise.resolve({ success: true }),
};
