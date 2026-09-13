'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { services } from '../../../data/services';
import ServiceDetail from '../../../components/ServiceDetail';

const ServicePage = () => {
    const { slug } = useParams();
    const [service, setService] = useState<(typeof services)[number] | null>(null);

    useEffect(() => {
        if (slug) {
            const foundService = services.find((s) => String(s.id) === String(slug));
            setService(foundService ?? null);
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