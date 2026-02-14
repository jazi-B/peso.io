import { cookies } from 'next/headers';
import { verifyToken } from './token';

export async function isAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return false;
    return await verifyToken(token);
}
