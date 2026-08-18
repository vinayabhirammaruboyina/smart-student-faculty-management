import { useState } from 'react';
import { Search, Plus, Trash2, Edit3, ShieldAlert } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Avatar from '../../components/ui/Avatar';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { mockUsers } from '../../data/users';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'student', department: 'Computer Applications', status: 'active' });
  const [loading, setLoading] = useState(false);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error('Name and Email are required');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUsers(prev => [
      {
        id: 'USR' + Date.now().toString().slice(-4),
        name: form.name,
        email: form.email,
        role: form.role,
        department: form.department,
        status: form.status,
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: 'Never'
      },
      ...prev
    ]);
    setLoading(false);
    setShowAddModal(false);
    setForm({ name: '', email: '', role: 'student', department: 'Computer Applications', status: 'active' });
    toast.success('User added successfully!');
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, ...form } : u));
    setLoading(false);
    setShowEditModal(false);
    toast.success('User details updated!');
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
    setLoading(false);
    setShowDeleteConfirm(false);
    toast.success('User deleted successfully');
  };

  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'student', label: 'Student' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'admin', label: 'Admin' }
  ];

  const depts = [
    { value: 'Computer Applications', label: 'Computer Applications' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Administration', label: 'Administration' }
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">User Accounts</h2>
          <p className="text-sm text-slate-400">Add, edit, or remove student, faculty, and administrator accounts.</p>
        </div>
        <Button icon={Plus} onClick={() => {
          setForm({ name: '', email: '', role: 'student', department: 'Computer Applications', status: 'active' });
          setShowAddModal(true);
        }}>Add New User</Button>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} icon={Search} />
          </div>
          <div className="w-full sm:w-48">
            <Select options={roles} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} />
          </div>
        </div>
      </Card>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Join Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors text-sm">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} size="sm" />
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white">{u.name}</p>
                        <p className="text-xs text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 capitalize font-medium text-slate-650">{u.role}</td>
                  <td className="px-5 py-4 text-slate-500">{u.department}</td>
                  <td className="px-5 py-4">
                    <Badge variant={u.status === 'active' ? 'success' : 'danger'}>{u.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-slate-400 text-xs">{formatDate(u.joinDate)}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setForm({ name: u.name, email: u.email, role: u.role, department: u.department, status: u.status });
                          setShowEditModal(true);
                        }}
                        className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-550 transition-colors"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setShowDeleteConfirm(true);
                        }}
                        className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add User Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Create User Account" size="md">
        <form onSubmit={handleAddUser} className="space-y-4">
          <Input label="Name *" placeholder="Vinay Abhiram" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} />
          <Input label="Email Address *" type="email" placeholder="vinay@example.com" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} />
          
          <div className="grid grid-cols-2 gap-3">
            <Select label="Role" options={roles.slice(1)} value={form.role} onChange={(e) => setForm(p => ({ ...p, role: e.target.value }))} />
            <Select label="Status" options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))} />
          </div>

          <Select label="Department" options={depts} value={form.department} onChange={(e) => setForm(p => ({ ...p, department: e.target.value }))} />

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit" loading={loading}>Save User</Button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Modify User Account" size="md">
        <form onSubmit={handleEditUser} className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} />
          <Input label="Email Address" type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} />
          
          <div className="grid grid-cols-2 gap-3">
            <Select label="Role" options={roles.slice(1)} value={form.role} onChange={(e) => setForm(p => ({ ...p, role: e.target.value }))} />
            <Select label="Status" options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))} />
          </div>

          <Select label="Department" options={depts} value={form.department} onChange={(e) => setForm(p => ({ ...p, department: e.target.value }))} />

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" type="button" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button type="submit" loading={loading}>Update Account</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteUser}
        title="Delete User Account?"
        message={`Are you sure you want to permanently delete the account of ${selectedUser?.name}? This action cannot be undone.`}
        confirmLabel="Permanently Delete"
        variant="danger"
        loading={loading}
      />
    </div>
  );
}
