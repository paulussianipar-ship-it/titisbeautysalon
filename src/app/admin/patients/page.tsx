'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import AdminShell from '@/components/AdminShell';
import { Patient } from '@/types/admin';
import { supabase } from '@/lib/supabase/client';

const PatientsPage = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({ name: '', contact: '', email: '' });

    useEffect(() => {
        const loadPatients = async () => {
            const { data } = await supabase.from('patients').select('id, name, contact, email').order('created_at', { ascending: false });
            setPatients((data || []) as Patient[]);
        };

        void loadPatients();
    }, []);

    const savePatients = async (nextPatients: Patient[]) => {
        setPatients(nextPatients);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nextPatient = { id: editingId || `PT-${Date.now()}`, ...form };
        await supabase.from('patients').upsert(nextPatient);
        const nextPatients = editingId
            ? patients.map((patient) => patient.id === editingId ? nextPatient : patient)
            : [nextPatient, ...patients];
        await savePatients(nextPatients);
        setForm({ name: '', contact: '', email: '' });
        setEditingId(null);
    };

    const startEdit = (patient: Patient) => {
        setEditingId(patient.id);
        setForm({ name: patient.name, contact: patient.contact, email: patient.email || '' });
    };

    const handleDeletePatient = async (id: string) => {
        await supabase.from('patients').delete().eq('id', id);
        await savePatients(patients.filter((patient) => patient.id !== id));
    };

    return (
        <AdminShell>
            <div className="admin-page-heading"><div><p className="admin-kicker">Customer records</p><h1>Patients</h1><p>Keep every client detail close and current.</p></div></div>
            <div className="admin-content-grid">
            <form className="admin-form-card" onSubmit={handleSubmit}><div className="admin-card-heading"><div><span className="admin-kicker">{editingId ? 'Edit record' : 'New record'}</span><h2>{editingId ? 'Update patient' : 'Add patient'}</h2></div></div><label>Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required placeholder="Full name" /></label><label>WhatsApp / contact<input value={form.contact} onChange={(event) => setForm({ ...form, contact: event.target.value })} required placeholder="0851..." /></label><label>Email <span>(optional)</span><input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="client@email.com" /></label><div className="admin-form-actions"><button type="submit" className="admin-primary-button">{editingId ? 'Save changes' : 'Add patient'}</button>{editingId && <button type="button" className="admin-secondary-button" onClick={() => { setEditingId(null); setForm({ name: '', contact: '', email: '' }); }}>Cancel</button>}</div></form>
            <div className="admin-table-card"><div className="admin-card-heading"><div><span className="admin-kicker">Directory</span><h2>{patients.length} patients</h2></div></div><div className="admin-table-wrap"><table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                            <td>{patient.contact}<small>{patient.email}</small></td>
                            <td className="admin-actions">
                                <button onClick={() => startEdit(patient)}>Edit</button>
                                <button onClick={() => handleDeletePatient(patient.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table></div></div></div>
        </AdminShell>
    );
};

export default PatientsPage;