import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const SWITCHABLE_ACCOUNTS = [
  { role: 'student', name: 'VinayAbhiram Maruboyina', label: 'Student Portal' },
  { role: 'faculty', name: 'Dr. Priya Sharma', label: 'Faculty Portal' },
  { role: 'admin', name: 'Rajesh Mehta', label: 'Admin Portal' },
];

const DEMO_USERS = {
  student: {
    id: 'USR-2026-001',
    name: 'VinayAbhiram Maruboyina',
    email: 'student@example.com',
    role: 'student',
    department: 'Computer Applications',
    program: 'IMCA (Integrated MCA)',
    semester: 7,
    enrollmentNo: 'PU2023IMCA0042',
    phone: '+91 98765 43210',
    gpa: 8.2,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  },
  faculty: {
    id: 'USR-2026-004',
    name: 'Dr. Priya Sharma',
    email: 'faculty@example.com',
    role: 'faculty',
    department: 'Computer Applications',
    designation: 'Assistant Professor',
    employeeId: 'EMP2019042',
    phone: '+91 98765 11111',
    subjects: ['Web Engineering', 'Artificial Intelligence', 'Software Testing'],
    avatar: null,
  },
  admin: {
    id: 'USR-2026-006',
    name: 'Rajesh Mehta',
    email: 'admin@example.com',
    role: 'admin',
    department: 'Administration',
    designation: 'System Administrator',
    employeeId: 'ADM2018001',
    phone: '+91 98765 99999',
    avatar: null,
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sms-user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password, role) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    let userData = null;
    if (role) {
      userData = DEMO_USERS[role];
    } else if (email === 'student@example.com' && password === 'student123') {
      userData = DEMO_USERS.student;
    } else if (email === 'faculty@example.com' && password === 'faculty123') {
      userData = DEMO_USERS.faculty;
    } else if (email === 'admin@example.com' && password === 'admin123') {
      userData = DEMO_USERS.admin;
    }
    setLoading(false);
    if (userData) {
      setUser(userData);
      localStorage.setItem('sms-user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sms-user');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('sms-user', JSON.stringify(updated));
  };

  const switchRole = (role) => {
    const userData = DEMO_USERS[role];
    if (userData) {
      setUser(userData);
      localStorage.setItem('sms-user', JSON.stringify(userData));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      updateProfile, 
      isAuthenticated: !!user,
      switchRole,
      SWITCHABLE_ACCOUNTS
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
