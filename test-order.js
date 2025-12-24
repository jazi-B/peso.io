// Native fetch used 
// Actually in Node 18+ fetch is global.

async function testOrder() {
    try {
        const res = await fetch('http://localhost:3001/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Uer',
                contact: '1234567890',
                location: 'Test Location',
                service: 'General Pest Control',
                notes: 'Test note'
            })
        });

        console.log('Status:', res.status);
        const text = await res.text();
        console.log('Status:', res.status);
        console.log('Body:', text);
    } catch (e) {
        console.error('Fetch error:', e);
    }
}

testOrder();
