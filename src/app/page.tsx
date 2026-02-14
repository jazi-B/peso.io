import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Home() {
  return (
    <div>
      <section className="hero-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="text-hero">
            Pest-Free Living,<br /> Guaranteed.
          </h1>
          <p className="text-subtitle" style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            {siteConfig.description}
          </p>
          <div className="flex-center gap-4">
            <Link href="/order" className="btn btn-white">
              Book a Service
            </Link>
            <Link href="#services" className="btn btn-outline white">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      <section className="container section-padding" id="services">
        <h2 className="section-title">Our Services</h2>
        <div className="grid-auto-fit">
          {siteConfig.services.map((service, i) => (
            <div key={i} className="glass-card flex-column">
              <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 className="text-title">{service.title}</h3>
                <p className="text-muted" style={{ marginBottom: '1rem', fontWeight: '500' }}>{service.desc}</p>
                <p className="text-body" style={{ opacity: 0.8 }}>{service.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#e0f2fe' }} className="section-padding">
        <div className="container text-center">
          <h2 className="section-title">Why Choose {siteConfig.name}?</h2>
          <div className="grid-auto-fit" style={{ marginTop: '3rem' }}>
            {siteConfig.features.map((feature, i) => (
              <div key={i}>
                <h3 className="text-subtitle">{feature.title}</h3>
                <p className="text-body">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
