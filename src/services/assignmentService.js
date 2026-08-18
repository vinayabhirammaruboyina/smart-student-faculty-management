import { mockAssignments, mockFacultyAssignments, mockSubmissions } from '../data/assignments';
import { simulateLatency } from './apiConfig';

export const assignmentService = {
  getStudentAssignments: async (studentId) => {
    await simulateLatency(150);
    return { data: mockAssignments };
  },

  submitAssignment: async (assignmentId, fileData) => {
    await simulateLatency(300);
    return {
      status: 200,
      data: {
        message: 'Assignment submitted successfully',
        timestamp: new Date().toISOString(),
        fileMetadata: {
          filename: fileData?.name || 'submission.pdf',
          hash: 'sha256:' + Math.random().toString(36).substr(2, 16),
          size: fileData?.size || '2.4 MB',
        },
      },
    },
  },

  getFacultyAssignments: async (facultyId) => {
    await simulateLatency(150);
    return { data: mockFacultyAssignments };
  },

  getSubmissions: async (assignmentId) => {
    await simulateLatency(200);
    return { data: mockSubmissions.filter(s => s.assignmentId === assignmentId) };
  },

  gradeSubmission: async (submissionId, marks, feedback) => {
    await simulateLatency(250);
    return {
      status: 200,
      data: { message: 'Graded successfully', submissionId, marks, feedback },
    };
  },
};
