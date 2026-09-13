insert into public.services (id, name, description, image, price) values
    ('1', 'Cleanser Milk', 'A gentle cleanser that removes impurities and makeup, leaving your skin refreshed.', '/images/services/cleanser-milk.jpg', 75000),
    ('2', 'Steamer', 'A soothing steam treatment that opens up pores and prepares your skin for deep cleansing.', '/images/services/steamer.jpg', 80000),
    ('3', 'Ekstrasi Komedo', 'Professional extraction of blackheads and whiteheads for a clearer complexion.', '/images/services/ekstrasi-komedo.jpg', 100000),
    ('4', 'Massage', 'Relaxing massage to relieve tension and promote circulation, enhancing your overall well-being.', '/images/services/massage.jpg', 120000),
    ('5', 'Facial Wash', 'A refreshing facial wash that cleanses and revitalizes your skin.', '/images/services/facial-wash.jpg', 70000),
    ('6', 'Serum', 'Nourishing serum that targets specific skin concerns for a radiant complexion.', '/images/services/serum.jpg', 90000),
    ('7', 'Uap Dingin', 'Cooling steam treatment that hydrates and refreshes your skin.', '/images/services/uap-dingin.jpg', 85000),
    ('8', 'Masker Wajah', 'A luxurious face mask that hydrates and rejuvenates your skin.', '/images/services/masker-wajah.jpg', 95000),
    ('9', 'Oxygen', 'Oxygen therapy that revitalizes your skin, promoting a youthful glow.', '/images/services/oxygen.jpg', 150000)
on conflict (id) do update set name = excluded.name, description = excluded.description, image = excluded.image, price = excluded.price;

insert into public.patients (id, name, contact, email) values
    ('PT-TEST-001', 'Aulia Putri', '085175089198', 'aulia.putri@example.com'),
    ('PT-TEST-002', 'Nadia Permata', '081234567890', 'nadia.permata@example.com'),
    ('PT-TEST-003', 'Salsa Maharani', '082112223333', 'salsa.maharani@example.com')
on conflict (id) do update set name = excluded.name, contact = excluded.contact, email = excluded.email;

insert into public.staff (id, name, position, contact) values
    ('ST-TEST-001', 'Titis Anggraini', 'Founder & Beautician', '085175089198'),
    ('ST-TEST-002', 'Rani Wulandari', 'Senior Beautician', '081298765432'),
    ('ST-TEST-003', 'Dewi Lestari', 'Receptionist', '082233445566')
on conflict (id) do update set name = excluded.name, position = excluded.position, contact = excluded.contact;

insert into public.sales (id, sale_date, service, customer, amount) values
    ('SALE-TEST-001', current_date - 2, 'Facial Wash', 'Aulia Putri', 70000),
    ('SALE-TEST-002', current_date - 1, 'Massage', 'Nadia Permata', 120000),
    ('SALE-TEST-003', current_date, 'Oxygen', 'Salsa Maharani', 150000)
on conflict (id) do update set sale_date = excluded.sale_date, service = excluded.service, customer = excluded.customer, amount = excluded.amount;

insert into public.reservations (name, email, phone, service, appointment_date, appointment_time, status) values
    ('Maya Sari', 'maya.sari@example.com', '081377788899', 'Masker Wajah', current_date + 1, '10:00', 'pending'),
    ('Intan Pratiwi', 'intan.pratiwi@example.com', '082299887766', 'Ekstrasi Komedo', current_date + 2, '13:30', 'confirmed');