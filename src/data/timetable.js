export const mockTimetable = {
  student: [
    { id: 1, day: 'Monday', slots: [
      { time: '09:00 - 10:00', subject: 'Web Engineering', faculty: 'Dr. Priya Sharma', room: 'A-204', code: 'WE701', type: 'lecture' },
      { time: '10:00 - 11:00', subject: 'Artificial Intelligence', faculty: 'Prof. Anil Patel', room: 'B-103', code: 'AI702', type: 'lecture' },
      { time: '11:15 - 12:15', subject: 'Database Management', faculty: 'Dr. Sunita Rao', room: 'A-201', code: 'DB703', type: 'lecture' },
      { time: '13:00 - 14:00', subject: 'Software Testing', faculty: 'Dr. Priya Sharma', room: 'A-204', code: 'ST704', type: 'lecture' },
      { time: '14:00 - 15:00', subject: 'Cloud Computing', faculty: 'Dr. Sunita Rao', room: 'Lab-3', code: 'CC705', type: 'practical' },
    ]},
    { id: 2, day: 'Tuesday', slots: [
      { time: '09:00 - 10:00', subject: 'Artificial Intelligence', faculty: 'Prof. Anil Patel', room: 'B-103', code: 'AI702', type: 'lecture' },
      { time: '10:00 - 12:00', subject: 'Web Engineering Lab', faculty: 'Dr. Priya Sharma', room: 'Lab-1', code: 'WE701L', type: 'practical' },
      { time: '13:00 - 14:00', subject: 'Database Management', faculty: 'Dr. Sunita Rao', room: 'A-201', code: 'DB703', type: 'lecture' },
      { time: '14:00 - 15:00', subject: 'Software Testing', faculty: 'Dr. Priya Sharma', room: 'A-204', code: 'ST704', type: 'lecture' },
    ]},
    { id: 3, day: 'Wednesday', slots: [
      { time: '09:00 - 10:00', subject: 'Cloud Computing', faculty: 'Dr. Sunita Rao', room: 'A-301', code: 'CC705', type: 'lecture' },
      { time: '10:00 - 11:00', subject: 'Web Engineering', faculty: 'Dr. Priya Sharma', room: 'A-204', code: 'WE701', type: 'lecture' },
      { time: '11:15 - 12:15', subject: 'Artificial Intelligence', faculty: 'Prof. Anil Patel', room: 'B-103', code: 'AI702', type: 'lecture' },
      { time: '13:00 - 15:00', subject: 'AI Lab', faculty: 'Prof. Anil Patel', room: 'Lab-2', code: 'AI702L', type: 'practical' },
    ]},
    { id: 4, day: 'Thursday', slots: [
      { time: '09:00 - 10:00', subject: 'Database Management', faculty: 'Dr. Sunita Rao', room: 'A-201', code: 'DB703', type: 'lecture' },
      { time: '10:00 - 11:00', subject: 'Software Testing', faculty: 'Dr. Priya Sharma', room: 'A-204', code: 'ST704', type: 'lecture' },
      { time: '11:15 - 12:15', subject: 'Cloud Computing', faculty: 'Dr. Sunita Rao', room: 'A-301', code: 'CC705', type: 'lecture' },
      { time: '13:00 - 15:00', subject: 'DB Lab', faculty: 'Dr. Sunita Rao', room: 'Lab-3', code: 'DB703L', type: 'practical' },
    ]},
    { id: 5, day: 'Friday', slots: [
      { time: '09:00 - 10:00', subject: 'Web Engineering', faculty: 'Dr. Priya Sharma', room: 'A-204', code: 'WE701', type: 'lecture' },
      { time: '10:00 - 11:00', subject: 'Artificial Intelligence', faculty: 'Prof. Anil Patel', room: 'B-103', code: 'AI702', type: 'lecture' },
      { time: '11:15 - 12:15', subject: 'Software Testing', faculty: 'Dr. Priya Sharma', room: 'A-204', code: 'ST704', type: 'lecture' },
      { time: '13:00 - 14:00', subject: 'Database Management', faculty: 'Dr. Sunita Rao', room: 'A-201', code: 'DB703', type: 'lecture' },
    ]},
  ],
};

export const todaySchedule = [
  { time: '09:00 - 10:00', subject: 'Web Engineering', faculty: 'Dr. Priya Sharma', room: 'A-204', code: 'WE701', status: 'completed' },
  { time: '10:00 - 11:00', subject: 'Artificial Intelligence', faculty: 'Prof. Anil Patel', room: 'B-103', code: 'AI702', status: 'current' },
  { time: '11:15 - 12:15', subject: 'Database Management', faculty: 'Dr. Sunita Rao', room: 'A-201', code: 'DB703', status: 'upcoming' },
  { time: '13:00 - 14:00', subject: 'Software Testing', faculty: 'Dr. Priya Sharma', room: 'A-204', code: 'ST704', status: 'upcoming' },
  { time: '14:00 - 15:00', subject: 'Cloud Computing', faculty: 'Dr. Sunita Rao', room: 'Lab-3', code: 'CC705', status: 'upcoming' },
];
