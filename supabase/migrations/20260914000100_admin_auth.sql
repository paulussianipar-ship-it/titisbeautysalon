drop policy if exists "public can manage patients for testing" on public.patients;
drop policy if exists "public can manage staff for testing" on public.staff;
drop policy if exists "public can manage sales for testing" on public.sales;
drop policy if exists "authenticated admins can manage patients" on public.patients;
drop policy if exists "authenticated admins can manage staff" on public.staff;
drop policy if exists "authenticated admins can manage sales" on public.sales;

create policy "authenticated admins can manage patients" on public.patients
    for all to authenticated using (true) with check (true);
create policy "authenticated admins can manage staff" on public.staff
    for all to authenticated using (true) with check (true);
create policy "authenticated admins can manage sales" on public.sales
    for all to authenticated using (true) with check (true);