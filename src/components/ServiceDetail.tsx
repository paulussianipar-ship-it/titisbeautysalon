import React from 'react';

type Service = { name: string; description: string; image: string; price?: number };

const ServiceDetail = ({ service }: { service: Service }) => {

    return (
        <div className="service-detail">
            <h1 className="title">{service.name}</h1>
            <img src={service.image} alt={service.name} className="image" />
            <p className="description">{service.description}</p>
            {service.price !== undefined && <h2 className="price">Price: {service.price}</h2>}
            <button className="reserve-button" onClick={() => alert('Reservation form will be implemented.')}>
                Reserve Now
            </button>
        </div>
    );
};

export default ServiceDetail;