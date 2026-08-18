import { mockLeaveApplications, mockFacultyLeaveRequests } from '../data/leave';
import { simulateLatency } from './apiConfig';

export const leaveService = {
  getStudentLeaves: async (studentId) => {
    await simulateLatency(150);
    return { data: mockLeaveApplications.filter(l => l.studentId === studentId) };
  },

  applyLeave: async (leaveData) => {
    await simulateLatency(300);
    return {
      status: 201,
      data: {
        message: 'Leave application submitted successfully',
        id: 'LVE-' + Date.now(),
        ...leaveData,
        status: 'pending',
        appliedOn: new Date().toISOString(),
      },
    };
  },

  getFacultyLeaveRequests: async (facultyId) => {
    await simulateLatency(150);
    return { data: mockFacultyLeaveRequests };
  },

  approveLeave: async (leaveId) => {
    await simulateLatency(250);
    return { status: 200, data: { message: 'Leave approved', leaveId } };
  },

  rejectLeave: async (leaveId, reason) => {
    await simulateLatency(250);
    return { status: 200, data: { message: 'Leave rejected', leaveId, reason } };
  },
};
