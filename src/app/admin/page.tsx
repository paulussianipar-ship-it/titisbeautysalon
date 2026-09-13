'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminShell from '@/components/AdminShell';
import { Patient, Sale, StaffMember } from '@/types/admin';
import { supabase } from '@/lib/supabase/client';

export default function AdminOverview() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        const loadOverview = async () => {
            const [{ data: patientRows }, { data: staffRows }, { data: saleRows }] = await Promise.all([
                supabase.from('patients').select('id, name, contact, email').order('created_at', { ascending: false }),
                supabase.from('staff').select('id, name, position, contact').order('created_at', { ascending: false }),
                supabase.from('sales').select('id, sale_date, service, customer, amount').order('sale_date', { ascending: false }),
            ]);

            setPatients((patientRows || []) as Patient[]);
            setStaff((staffRows || []) as StaffMember[]);
            setSales((saleRows || []).map((sale) => ({
                id: sale.id,
                date: sale.sale_date,
                service: sale.service,
                customer: sale.customer,
                amount: sale.amount,
            })) as Sale[]);
        };

        void loadOverview();
    }, []);

    const revenue = sales.reduce((total, sale) => total + Number(sale.amount || 0), 0);

    return (
        <AdminShell>
            <div className="admin-page-heading"><div><p className="admin-kicker">Titis Beauty Aesthetic</p><h1>Good day, admin.</h1><p>Keep your studio moving beautifully.</p></div><Link href="/admin/reports" className="admin-primary-button">Add sale <span aria-hidden="true">+</span></Link></div>
            <div className="admin-metric-grid">
                <div className="admin-metric-card"><span>Patients</span><strong>{patients.length}</strong><small>Customer records</small></div>
                <div className="admin-metric-card"><span>Team members</span><strong>{staff.length}</strong><small>Active staff records</small></div>
                <div className="admin-metric-card"><span>Total sales</span><strong>Rp {revenue.toLocaleString('id-ID')}</strong><small>{sales.length} recorded transactions</small></div>
            </div>
            <div className="admin-quick-grid"><Link href="/admin/patients"><span>01</span><strong>Update patient data</strong><small>Add, edit, or remove patient records.</small><b aria-hidden="true">&#8594;</b></Link><Link href="/admin/staff"><span>02</span><strong>Manage your team</strong><small>Keep staff details and roles current.</small><b aria-hidden="true">&#8594;</b></Link><Link href="/admin/reports"><span>03</span><strong>Review performance</strong><small>Calculate sales and export reports.</small><b aria-hidden="true">&#8594;</b></Link></div>
        </AdminShell>
    );
}