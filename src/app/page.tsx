import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Pest-Free Living,<br /> Guaranteed.
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Professional fumigation and pest control services for your home and business.
            Safe, effective, and reliable.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/order" className="btn" style={{
              backgroundColor: 'white',
              color: 'var(--primary)',
              fontWeight: 'bold',
              padding: '1rem 2rem',
              fontSize: '1.1rem'
            }}>
              Book a Service
            </Link>
            <Link href="#services" className="btn btn-outline" style={{
              color: 'white',
              borderColor: 'white',
              padding: '1rem 2rem',
              fontSize: '1.1rem'
            }}>
              Our Services
            </Link>
          </div>
        </div>
      </section>

      <section className="container" id="services" style={{ paddingBottom: '6rem' }}>
        <h2 className="section-title">Our Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            {
              title: 'General Pest Control',
              desc: 'Comprehensive treatment for common household pests including ants, cockroaches, and spiders.',
              details: 'Our general pest control service uses eco-friendly solutions to protect your home year-round. We target nesting sites and entry points to ensure long-term protection.',
              image: '/images/general_pest.png'
            },
            {
              title: 'Fumigation',
              desc: 'Deep cleaning and fumigation ensuring total eradication of severe infestations.',
              details: 'Professional-grade fumigation for severe infestations. We ensure complete coverage of your property, penetrating cracks and crevices where pests hide.',
              image: '/images/fumigation.png'
            },
            {
              title: 'Termite Control',
              desc: 'Protect your property from structural damage caused by destructive termites.',
              details: 'Advanced termite detection and elimination. We use baiting systems and soil treatments to destroy colonies and prevent future damage to your property\'s structure.',
              image: '/images/termite.png'
            },
            {
              title: 'Disinfectant Service',
              desc: 'Sanitization services to keep your environment virus and germ-free.',
              details: 'Hospital-grade disinfection services for homes and offices. Our treatment eliminates 99.9% of bacteria and viruses, creating a safe and healthy environment.',
              image: '/images/disinfectant.png'
            },
            {
              title: 'Rodent Control',
              desc: 'Effective removal and prevention of rats, mice, and other rodents.',
              details: 'Humane and effective rodent control. We identify entry points, trap existing rodents, and seal your property to prevent them from returning.',
              image: '/images/rodent.png'
            },
          ].map((service, i) => (
            <div key={i} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: '500' }}>{service.desc}</p>
                <p style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: '1.6' }}>{service.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#e0f2fe', padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Why Choose Peso.io?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Licensed & Insured</h3>
              <p>Fully certified professionals you can trust.</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Eco-Friendly</h3>
              <p>Safe treatments for children and pets.</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>100% Satisfaction</h3>
              <p>We don't stop untill the pests are gone.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
