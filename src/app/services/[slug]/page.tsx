'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ServiceDetail from '../../../components/ServiceDetail';
import { supabase } from '@/lib/supabase/client';
import { ServiceRecord } from '@/lib/services';

const ServicePage = () => {
    const { slug } = useParams();
    const [service, setService] = useState<ServiceRecord | null>(null);

    useEffect(() => {
        if (slug) {
            const loadService = async () => {
                const { data } = await supabase
                    .from('services')
                    .select('id, name, description, image, price')
                    .eq('id', String(slug))
                    .maybeSingle();
                setService((data as ServiceRecord | null) ?? null);
            };

            void loadService();
        }
    }, [slug]);

    if (!service) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ServiceDetail service={service} />
        </div>
    );
};

export default ServicePage;