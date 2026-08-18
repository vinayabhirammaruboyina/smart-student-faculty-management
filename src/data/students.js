export const mockStudents = [
  { id: 'STU-001', name: 'VinayAbhiram Maruboyina', enrollmentNo: 'PU2023IMCA0042', email: 'vinay@example.com', phone: '+91 98765 43210', department: 'Computer Applications', semester: 'VII', gpa: 8.2, attendance: 82, assignmentsCompleted: 8, totalAssignments: 10, status: 'active', joinDate: '2021-07-15', avatar: null },
  { id: 'STU-002', name: 'Rahul Patel', enrollmentNo: 'BCA2021002', email: 'rahul@example.com', phone: '+91 98765 43211', department: 'Computer Applications', semester: 'VII', gpa: 7.8, attendance: 79, assignmentsCompleted: 9, totalAssignments: 10, status: 'active', joinDate: '2021-07-15', avatar: null },
  { id: 'STU-003', name: 'Arjun Singh', enrollmentNo: 'BCA2021003', email: 'arjun@example.com', phone: '+91 98765 43212', department: 'Computer Applications', semester: 'VII', gpa: 9.1, attendance: 91, assignmentsCompleted: 10, totalAssignments: 10, status: 'active', joinDate: '2021-07-15', avatar: null },
  { id: 'STU-004', name: 'Priya Nair', enrollmentNo: 'BCA2021004', email: 'priya@example.com', phone: '+91 98765 43213', department: 'Computer Applications', semester: 'VII', gpa: 8.7, attendance: 88, assignmentsCompleted: 7, totalAssignments: 10, status: 'active', joinDate: '2021-07-15', avatar: null },
  { id: 'STU-005', name: 'Sneha Joshi', enrollmentNo: 'BCA2021005', email: 'sneha@example.com', phone: '+91 98765 43214', department: 'Computer Applications', semester: 'VII', gpa: 7.2, attendance: 71, assignmentsCompleted: 6, totalAssignments: 10, status: 'active', joinDate: '2021-07-15', avatar: null },
  { id: 'STU-006', name: 'Kiran Kumar', enrollmentNo: 'BCA2021006', email: 'kiran@example.com', phone: '+91 98765 43215', department: 'Computer Applications', semester: 'VII', gpa: 8.5, attendance: 85, assignmentsCompleted: 9, totalAssignments: 10, status: 'active', joinDate: '2021-07-15', avatar: null },
  { id: 'STU-007', name: 'Meera Desai', enrollmentNo: 'BCA2021007', email: 'meera@example.com', phone: '+91 98765 43216', department: 'Computer Applications', semester: 'VII', gpa: 6.9, attendance: 68, assignmentsCompleted: 5, totalAssignments: 10, status: 'inactive', joinDate: '2021-07-15', avatar: null },
  { id: 'STU-008', name: 'Rohan Shah', enrollmentNo: 'BCA2021008', email: 'rohan@example.com', phone: '+91 98765 43217', department: 'Computer Applications', semester: 'VII', gpa: 9.3, attendance: 94, assignmentsCompleted: 10, totalAssignments: 10, status: 'active', joinDate: '2021-07-15', avatar: null },
  { id: 'STU-009', name: 'Anjali Mehta', enrollmentNo: 'BCA2021009', email: 'anjali@example.com', phone: '+91 98765 43218', department: 'Computer Applications', semester: 'VII', gpa: 8.0, attendance: 80, assignmentsCompleted: 8, totalAssignments: 10, status: 'active', joinDate: '2021-07-15', avatar: null },
  { id: 'STU-010', name: 'Dev Patel', enrollmentNo: 'BCA2021010', email: 'dev@example.com', phone: '+91 98765 43219', department: 'Computer Applications', semester: 'VII', gpa: 7.5, attendance: 75, assignmentsCompleted: 7, totalAssignments: 10, status: 'active', joinDate: '2021-07-15', avatar: null },
];

export const studentAttendanceData = {
  'STU-001': {
    overall: 82,
    present: 82,
    absent: 18,
    subjects: [
      { subjectId: 'SUB-701', subject: 'Web Engineering', code: 'WE701', present: 42, total: 46, percentage: 91, history: [
        { date: '2026-08-17', status: 'PRESENT', session: '09:00 AM - 10:00 AM', method: 'QR_SCAN' },
        { date: '2026-08-16', status: 'PRESENT', session: '10:00 AM - 11:00 AM', method: 'QR_SCAN' },
        { date: '2026-08-15', status: 'ABSENT', session: '09:00 AM - 10:00 AM', method: 'MANUAL' },
        { date: '2026-08-14', status: 'PRESENT', session: '09:00 AM - 10:00 AM', method: 'QR_SCAN' },
        { date: '2026-08-13', status: 'PRESENT', session: '09:00 AM - 10:00 AM', method: 'QR_SCAN' },
      ] },
      { subjectId: 'SUB-702', subject: 'Artificial Intelligence', code: 'AI702', present: 38, total: 44, percentage: 86 },
      { subjectId: 'SUB-703', subject: 'Database Management', code: 'DB703', present: 34, total: 43, percentage: 79 },
      { subjectId: 'SUB-704', subject: 'Software Testing', code: 'ST704', present: 31, total: 43, percentage: 72 },
      { subjectId: 'SUB-705', subject: 'Cloud Computing', code: 'CC705', present: 36, total: 40, percentage: 90 },
    ],
    monthly: [
      { month: 'Mar', percentage: 88 },
      { month: 'Apr', percentage: 85 },
      { month: 'May', percentage: 80 },
      { month: 'Jun', percentage: 78 },
      { month: 'Jul', percentage: 82 },
      { month: 'Aug', percentage: 82 },
    ],
  },
};

export const studentGradesData = {
  'STU-001': {
    currentGpa: 8.2,
    subjects: [
      { subject: 'Web Engineering', code: 'WE701', internal: 38, assignment: 18, attendance: 9, total: 65, max: 70, grade: 'A', credits: 4 },
      { subject: 'Artificial Intelligence', code: 'AI702', internal: 35, assignment: 16, attendance: 9, total: 60, max: 70, grade: 'A', credits: 4 },
      { subject: 'Database Management', code: 'DB703', internal: 30, assignment: 14, attendance: 8, total: 52, max: 70, grade: 'B+', credits: 3 },
      { subject: 'Software Testing', code: 'ST704', internal: 28, assignment: 15, attendance: 7, total: 50, max: 70, grade: 'B', credits: 3 },
      { subject: 'Cloud Computing', code: 'CC705', internal: 36, assignment: 17, attendance: 9, total: 62, max: 70, grade: 'A', credits: 3 },
    ],
    semesterTrend: [
      { semester: 'Sem I', gpa: 7.8 },
      { semester: 'Sem II', gpa: 8.0 },
      { semester: 'Sem III', gpa: 7.9 },
      { semester: 'Sem IV', gpa: 8.3 },
      { semester: 'Sem V', gpa: 8.1 },
      { semester: 'Sem VI', gpa: 8.2 },
    ],
  },
};
