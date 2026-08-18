export const mockUsers = [
  { id: 'USR-2026-001', name: 'VinayAbhiram Maruboyina', enrollmentNo: 'PU2023IMCA0042', email: 'vinay@example.com', role: 'student', department: 'Computer Applications', program: 'IMCA (Integrated MCA)', status: 'active', joinDate: '2021-07-15', lastLogin: '2026-08-17T09:30:00' },
  { id: 'USR-2026-002', name: 'Rahul Patel', email: 'rahul@example.com', role: 'student', department: 'Computer Applications', program: 'IMCA (Integrated MCA)', status: 'active', joinDate: '2021-07-15', lastLogin: '2026-08-17T08:45:00' },
  { id: 'USR-2026-003', name: 'Arjun Singh', email: 'arjun@example.com', role: 'student', department: 'Computer Applications', program: 'IMCA (Integrated MCA)', status: 'active', joinDate: '2021-07-15', lastLogin: '2026-08-16T14:20:00' },
  { id: 'USR-2026-004', name: 'Dr. Priya Sharma', email: 'priya.sharma@pica.edu', role: 'faculty', department: 'Computer Applications', status: 'active', joinDate: '2019-07-01', lastLogin: '2026-08-17T09:00:00' },
  { id: 'USR-2026-005', name: 'Prof. Anil Patel', email: 'anil.patel@pica.edu', role: 'faculty', department: 'Computer Applications', status: 'active', joinDate: '2018-07-01', lastLogin: '2026-08-16T16:30:00' },
  { id: 'USR-2026-006', name: 'Rajesh Mehta', email: 'admin@example.com', role: 'admin', department: 'Administration', status: 'active', joinDate: '2018-01-01', lastLogin: '2026-08-17T08:00:00' },
];

export const mockDepartments = [
  { id: 'DEPT-001', name: 'Computer Applications', code: 'CA', hod: 'Prof. Rajan Mehta', totalStudents: 245, totalFaculty: 12, totalSubjects: 18 },
  { id: 'DEPT-002', name: 'Information Technology', code: 'IT', hod: 'Dr. Kavita Joshi', totalStudents: 198, totalFaculty: 10, totalSubjects: 16 },
  { id: 'DEPT-003', name: 'Computer Science', code: 'CS', hod: 'Dr. Anand Tiwari', totalStudents: 312, totalFaculty: 15, totalSubjects: 22 },
  { id: 'DEPT-004', name: 'Data Science', code: 'DS', hod: 'Prof. Neha Verma', totalStudents: 156, totalFaculty: 8, totalSubjects: 14 },
];

export const mockSubjects = [
  { id: 'SUB-701', name: 'Web Engineering', code: 'WE701', department: 'Computer Applications', semester: 'VII', credits: 4, faculty: 'Dr. Priya Sharma', type: 'core' },
  { id: 'SUB-702', name: 'Artificial Intelligence', code: 'AI702', department: 'Computer Applications', semester: 'VII', credits: 4, faculty: 'Prof. Anil Patel', type: 'core' },
  { id: 'SUB-703', name: 'Database Management', code: 'DB703', department: 'Computer Applications', semester: 'VII', credits: 3, faculty: 'Dr. Sunita Rao', type: 'core' },
  { id: 'SUB-704', name: 'Software Testing', code: 'ST704', department: 'Computer Applications', semester: 'VII', credits: 3, faculty: 'Dr. Priya Sharma', type: 'elective' },
  { id: 'SUB-705', name: 'Cloud Computing', code: 'CC705', department: 'Computer Applications', semester: 'VII', credits: 3, faculty: 'Dr. Sunita Rao', type: 'elective' },
];

export const adminAnalyticsData = {
  totalStudents: 2450,
  totalFaculty: 145,
  departments: 12,
  activeClasses: 84,
  studentGrowth: [
    { month: 'Jan', count: 2200 },
    { month: 'Feb', count: 2250 },
    { month: 'Mar', count: 2280 },
    { month: 'Apr', count: 2310 },
    { month: 'May', count: 2350 },
    { month: 'Jun', count: 2380 },
    { month: 'Jul', count: 2420 },
    { month: 'Aug', count: 2450 },
  ],
  attendanceTrend: [
    { month: 'Mar', overall: 85, target: 85 },
    { month: 'Apr', overall: 83, target: 85 },
    { month: 'May', overall: 80, target: 85 },
    { month: 'Jun', overall: 78, target: 85 },
    { month: 'Jul', overall: 82, target: 85 },
    { month: 'Aug', overall: 79, target: 85 },
  ],
  departmentAttendance: [
    { department: 'CA', attendance: 82 },
    { department: 'IT', attendance: 79 },
    { department: 'CS', attendance: 85 },
    { department: 'DS', attendance: 88 },
  ],
  submissionRate: [
    { month: 'Jun', rate: 78 },
    { month: 'Jul', rate: 82 },
    { month: 'Aug', rate: 85 },
  ],
};
