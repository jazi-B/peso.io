
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export const metadata = {
    title: `Our Services - ${siteConfig.name}`,
    description: 'Explore our full range of pest control services.',
};

export default function ServicesPage() {
    return (
        <div className="container section-padding">
            <h1 className="section-title">Our Services</h1>
            <p className="text-center text-body" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
                We offer comprehensive solutions for all your pest problems. Choose a service below to learn more or book an appointment.
            </p>

            <div className="grid-auto-fit">
                {siteConfig.services.map((service, i) => (
                    <div key={i} className="glass-card flex-column" style={{ overflow: 'hidden' }}>
                        <div style={{ position: 'relative', height: '240px', width: '100%' }}>
                            <img
                                src={service.image}
                                alt={service.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h2 className="text-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h2>
                            <p className="text-body" style={{ marginBottom: '1.5rem' }}>{service.details}</p>
                            <Link href="/order" className="btn btn-primary" style={{ marginTop: 'auto', textAlign: 'center' }}>
                                Book {service.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
