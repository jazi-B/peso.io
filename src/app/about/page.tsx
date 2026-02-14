
import { siteConfig } from '@/config/site';

export const metadata = {
    title: `About Us - ${siteConfig.name}`,
    description: 'Learn more about our mission to provide safe and effective pest control services.',
};

export default function AboutPage() {
    return (
        <div className="container section-padding">
            <div className="glass-card animate-fade-in" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="section-title">About {siteConfig.name}</h1>

                <p className="text-body" style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.8' }}>
                    Welcome to <strong>{siteConfig.name}</strong>. We are dedicated to providing top-tier pest control and fumigation services for both residential and commercial properties.
                    Our mission is simple: <strong>{siteConfig.description}</strong>
                </p>

                <div className="grid-auto-fit" style={{ gap: '2rem', marginTop: '3rem' }}>
                    {siteConfig.features.map((feature, i) => (
                        <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.5)', borderRadius: '12px' }}>
                            <h3 className="text-subtitle" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                            <p className="text-body">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '3rem' }}>
                    <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Why Trust Us?</h2>
                    <p className="text-body">
                        We understand that inviting someone into your home requires trust. That's why all our technicians are fully vetted, trained, and certified.
                        We use only government-approved, eco-friendly chemicals that are tough on pests but safe for your family and pets.
                    </p>
                </div>
            </div>
        </div>
    );
}
