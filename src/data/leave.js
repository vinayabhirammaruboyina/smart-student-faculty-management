export const mockLeaveApplications = [
  { id: 'LVE001', studentId: 'STU-001', studentName: 'Vinay Abhiram', type: 'Medical Leave', fromDate: '2026-08-14', toDate: '2026-08-15', days: 2, reason: 'Fever and cold', description: 'I was suffering from high fever and could not attend classes. Doctor advised rest for 2 days.', status: 'approved', approvedBy: 'Dr. Priya Sharma', appliedOn: '2026-08-13', document: 'medical_certificate_vinay.pdf', documentUrl: null },
  { id: 'LVE002', studentId: 'STU-001', studentName: 'Vinay Abhiram', type: 'Personal Leave', fromDate: '2026-08-20', toDate: '2026-08-21', days: 2, reason: 'Family function', description: 'I need to attend my sister\'s engagement ceremony which is a family obligation.', status: 'pending', approvedBy: null, appliedOn: '2026-08-17', document: null, documentUrl: null },
  { id: 'LVE003', studentId: 'STU-001', studentName: 'Vinay Abhiram', type: 'Medical Leave', fromDate: '2026-07-10', toDate: '2026-07-10', days: 1, reason: 'Dental appointment', description: 'Scheduled dental procedure.', status: 'rejected', approvedBy: 'Dr. Priya Sharma', appliedOn: '2026-07-09', document: 'dental_appointment.pdf', documentUrl: null },
];

export const mockFacultyLeaveRequests = [
  { id: 'LVE001', studentId: 'STU-001', studentName: 'Vinay Abhiram', enrollmentNo: 'PU2023IMCA0042', type: 'Medical Leave', fromDate: '2026-08-20', toDate: '2026-08-21', days: 2, reason: 'Fever and cold', description: 'High fever, doctor advised rest for 2 days.', status: 'pending', appliedOn: '2026-08-17', document: 'medical_cert.pdf' },
  { id: 'LVE002', studentId: 'STU-002', studentName: 'Rahul Patel', enrollmentNo: 'BCA2021002', type: 'Personal Leave', fromDate: '2026-08-22', toDate: '2026-08-22', days: 1, reason: 'Family function', description: 'Need to attend family function.', status: 'pending', appliedOn: '2026-08-16', document: null },
  { id: 'LVE003', studentId: 'STU-004', studentName: 'Priya Nair', enrollmentNo: 'BCA2021004', type: 'Medical Leave', fromDate: '2026-08-10', toDate: '2026-08-11', days: 2, reason: 'Illness', description: 'Was ill with viral infection.', status: 'approved', appliedOn: '2026-08-09', document: 'medical_cert_priya.pdf' },
  { id: 'LVE004', studentId: 'STU-006', studentName: 'Kiran Kumar', enrollmentNo: 'BCA2021006', type: 'Personal Leave', fromDate: '2026-08-05', toDate: '2026-08-05', days: 1, reason: 'Personal work', description: 'Personal work.', status: 'rejected', appliedOn: '2026-08-04', document: null },
];

