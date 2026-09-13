import React from 'react';
import Link from 'next/link';
import { services } from '../data/services';

const ServiceGrid = () => {
    return (
        <div className="service-grid">
            {services.map((service) => (
                <div key={service.id} className="service-card">
                    <Link href={`/services/${service.id}`}>
                        <div className="service-image-wrap">
                            <img src={service.image} alt={service.name} className="service-image" />
                            <span className="service-arrow" aria-hidden="true">&#8599;</span>
                        </div>
                        <div className="service-card-copy">
                            <span className="service-tag">Treatment {String(service.id).padStart(2, '0')}</span>
                            <h3 className="service-title">{service.name}</h3>
                            <p className="service-description">{service.description}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ServiceGrid;