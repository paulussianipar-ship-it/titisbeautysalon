'use client';

import { FormEvent, useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import AdminShell from '@/components/AdminShell';
import { Sale } from '@/types/admin';
import { supabase } from '@/lib/supabase/client';

const emptyForm = { date: new Date().toISOString().slice(0, 10), service: '', customer: '', amount: '' };

export default function ReportsPage() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        const loadSales = async () => {
            const { data } = await supabase.from('sales').select('id, sale_date, service, customer, amount').order('sale_date', { ascending: false });
            setSales((data || []).map((sale) => ({
                id: sale.id,
                date: sale.sale_date,
                service: sale.service,
                customer: sale.customer,
                amount: sale.amount,
            })) as Sale[]);
        };

        void loadSales();
    }, []);

    const saveSales = (nextSales: Sale[]) => {
        setSales(nextSales);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const sale: Sale = { id: `SALE-${Date.now()}`, date: form.date, service: form.service, customer: form.customer, amount: Number(form.amount) };
        await supabase.from('sales').insert({
            id: sale.id,
            sale_date: sale.date,
            service: sale.service,
            customer: sale.customer,
            amount: sale.amount,
        });
        saveSales([sale, ...sales]);
        setForm(emptyForm);
    };

    const removeSale = async (id: string) => {
        await supabase.from('sales').delete().eq('id', id);
        saveSales(sales.filter((sale) => sale.id !== id));
    };
    const revenue = sales.reduce((total, sale) => total + sale.amount, 0);
    const average = sales.length ? revenue / sales.length : 0;

    const exportExcel = () => {
        const sheet = XLSX.utils.json_to_sheet(sales.map(({ id, ...sale }) => sale));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, sheet, 'Sales');
        XLSX.writeFile(workbook, `titis-sales-${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    const exportPdf = () => {
        const pdf = new jsPDF();
        pdf.setFontSize(20);
        pdf.text('Titis Beauty Aesthetic', 18, 20);
        pdf.setFontSize(11);
        pdf.text(`Sales report | ${new Date().toLocaleDateString('id-ID')}`, 18, 29);
        pdf.text(`Total revenue: Rp ${revenue.toLocaleString('id-ID')}`, 18, 42);
        pdf.text(`Transactions: ${sales.length}`, 18, 49);
        let y = 64;
        sales.forEach((sale, index) => {
            if (y > 275) { pdf.addPage(); y = 20; }
            pdf.text(`${index + 1}. ${sale.date} | ${sale.service} | ${sale.customer} | Rp ${sale.amount.toLocaleString('id-ID')}`, 18, y);
            y += 8;
        });
        pdf.save(`titis-sales-${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    return (
        <AdminShell>
            <div className="admin-page-heading"><div><p className="admin-kicker">Performance overview</p><h1>Sales & reports</h1><p>Record every treatment and understand your studio&apos;s rhythm.</p></div><div className="admin-export-actions"><button onClick={exportExcel} className="admin-secondary-button">Export Excel</button><button onClick={exportPdf} className="admin-primary-button">Export PDF</button></div></div>
            <div className="admin-metric-grid"><div className="admin-metric-card"><span>Total revenue</span><strong>Rp {revenue.toLocaleString('id-ID')}</strong><small>All recorded sales</small></div><div className="admin-metric-card"><span>Transactions</span><strong>{sales.length}</strong><small>Completed entries</small></div><div className="admin-metric-card"><span>Average sale</span><strong>Rp {Math.round(average).toLocaleString('id-ID')}</strong><small>Per transaction</small></div></div>
            <div className="admin-content-grid reports-grid"><form className="admin-form-card" onSubmit={handleSubmit}><div className="admin-card-heading"><div><span className="admin-kicker">New transaction</span><h2>Record a sale</h2></div></div><label>Date<input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required /></label><label>Service<input value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })} required placeholder="Facial, massage..." /></label><label>Customer<input value={form.customer} onChange={(event) => setForm({ ...form, customer: event.target.value })} required placeholder="Customer name" /></label><label>Amount (Rp)<input type="number" min="0" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} required placeholder="150000" /></label><button type="submit" className="admin-primary-button">Save sale <span aria-hidden="true">+</span></button></form>
            <div className="admin-table-card"><div className="admin-card-heading"><div><span className="admin-kicker">Transaction log</span><h2>{sales.length} sales</h2></div></div><div className="admin-table-wrap"><table><thead><tr><th>Date</th><th>Service</th><th>Customer</th><th>Amount</th><th></th></tr></thead><tbody>{sales.map((sale) => <tr key={sale.id}><td>{sale.date}</td><td>{sale.service}</td><td>{sale.customer}</td><td>Rp {sale.amount.toLocaleString('id-ID')}</td><td><button onClick={() => removeSale(sale.id)}>Delete</button></td></tr>)}</tbody></table>{sales.length === 0 && <p className="admin-empty">No sales recorded yet. Add the first transaction.</p>}</div></div></div>
        </AdminShell>
    );
}
