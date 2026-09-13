'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import AdminShell from '@/components/AdminShell';
import { StaffMember } from '@/types/admin';
import { supabase } from '@/lib/supabase/client';

const StaffPage = () => {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({ name: '', position: '', contact: '' });

    useEffect(() => {
        const loadStaff = async () => {
            const { data } = await supabase.from('staff').select('id, name, position, contact').order('created_at', { ascending: false });
            setStaff((data || []) as StaffMember[]);
        };

        void loadStaff();
    }, []);

    const saveStaff = async (nextStaff: StaffMember[]) => {
        setStaff(nextStaff);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nextMember = { id: editingId || `ST-${Date.now()}`, ...form };
        await supabase.from('staff').upsert(nextMember);
        const nextStaff = editingId
            ? staff.map((member) => member.id === editingId ? nextMember : member)
            : [nextMember, ...staff];
        await saveStaff(nextStaff);
        setForm({ name: '', position: '', contact: '' });
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        await supabase.from('staff').delete().eq('id', id);
        await saveStaff(staff.filter((member) => member.id !== id));
    };

    return (
        <AdminShell>
            <div className="admin-page-heading"><div><p className="admin-kicker">People & roles</p><h1>Staff</h1><p>Maintain the team behind every Titis experience.</p></div></div>
            <div className="admin-content-grid">
            <form className="admin-form-card" onSubmit={handleSubmit}><div className="admin-card-heading"><div><span className="admin-kicker">{editingId ? 'Edit record' : 'New record'}</span><h2>{editingId ? 'Update staff' : 'Add staff'}</h2></div></div><label>Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required placeholder="Full name" /></label><label>Position<input value={form.position} onChange={(event) => setForm({ ...form, position: event.target.value })} required placeholder="Beautician, receptionist..." /></label><label>Contact <span>(optional)</span><input value={form.contact} onChange={(event) => setForm({ ...form, contact: event.target.value })} placeholder="WhatsApp number" /></label><div className="admin-form-actions"><button type="submit" className="admin-primary-button">{editingId ? 'Save changes' : 'Add staff'}</button>{editingId && <button type="button" className="admin-secondary-button" onClick={() => { setEditingId(null); setForm({ name: '', position: '', contact: '' }); }}>Cancel</button>}</div></form>
            <div className="admin-table-card"><div className="admin-card-heading"><div><span className="admin-kicker">Team directory</span><h2>{staff.length} staff members</h2></div></div><div className="admin-table-wrap"><table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Contact</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map(member => (
                        <tr key={member.id}>
                            <td>{member.name}</td>
                            <td>{member.position}</td>
                            <td>{member.contact || '-'}</td>
                            <td className="admin-actions">
                                <button onClick={() => { setEditingId(member.id); setForm({ name: member.name, position: member.position, contact: member.contact || '' }); }}>Edit</button>
                                <button onClick={() => handleDelete(member.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table></div></div></div>
        </AdminShell>
    );
};

export default StaffPage;