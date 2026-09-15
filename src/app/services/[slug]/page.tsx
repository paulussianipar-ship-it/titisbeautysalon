'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ServiceDetail from '@/components/ServiceDetail';
import { supabase } from '@/lib/supabase/client';
import { getLocalServiceBySlugOrId, ServiceItem } from '@/data/services';

const ServicePage = () => {
    const params = useParams();
    const rawSlug = params?.slug ? String(params.slug) : '';
    
    // Initialize immediately with local data if available to prevent flash/delay
    const initialLocal = rawSlug ? getLocalServiceBySlugOrId(rawSlug) : undefined;
    const [service, setService] = useState<ServiceItem | null>(initialLocal || null);
    const [isLoading, setIsLoading] = useState(!initialLocal);

    useEffect(() => {
        if (!rawSlug) return;

        const loadService = async () => {
            const localMatch = getLocalServiceBySlugOrId(rawSlug);
            if (localMatch) {
                setService(localMatch);
            }

            try {
                // Try querying Supabase by id
                let { data } = await supabase
                    .from('services')
                    .select('id, name, description, image, price')
                    .eq('id', rawSlug)
                    .maybeSingle();

                // If not found by numeric ID, try querying by matching name
                if (!data && localMatch) {
                    const res = await supabase
                        .from('services')
                        .select('id, name, description, image, price')
                        .ilike('name', `%${localMatch.name}%`)
                        .maybeSingle();
                    data = res.data;
                }

                if (data) {
                    setService({
                        id: String(data.id),
                        slug: localMatch?.slug || rawSlug,
                        name: data.name || localMatch?.name || '',
                        category: localMatch?.category || 'Facial Treatment',
                        categoryNumber: localMatch?.categoryNumber || 1,
                        code: localMatch?.code || 'A',
                        description: data.description || localMatch?.description || '',
                        image: localMatch?.image || data.image,
                        price: data.price ?? localMatch?.price ?? 0,
                        duration: localMatch?.duration || '30-45 Menit',
                        benefits: localMatch?.benefits,
                    });
                } else if (!localMatch) {
                    setService(null);
                }
            } catch (err) {
                console.warn('Supabase service fetch fallback:', err);
                if (localMatch) {
                    setService(localMatch);
                }
            } finally {
                setIsLoading(false);
            }
        };

        void loadService();
    }, [rawSlug]);

    if (isLoading) {
        return (
            <div className="service-detail-loading section-shell">
                <div className="loading-spinner" />
                <p>Memuat detail perawatan...</p>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="service-detail-not-found section-shell">
                <h2>Treatment Tidak Ditemukan</h2>
                <p>Maaf, perawatan yang Anda cari saat ini tidak tersedia atau tautan salah.</p>
                <Link href="/services" className="button-reserve-primary">
                    Lihat Semua Treatment
                </Link>
            </div>
        );
    }

    return (
        <main>
            <ServiceDetail service={service} />
        </main>
    );
};

export default ServicePage;