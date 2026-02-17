const API_BASE = '/api';

interface FetchOptions extends Omit<RequestInit, 'body'> {
    body?: unknown;
}

export async function api<T = unknown>(
    path: string,
    options: FetchOptions = {}
): Promise<T> {
    const { body, headers, ...rest } = options;

    const res = await fetch(`${API_BASE}${path}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...rest,
    });

    if (res.status === 401) {
        // Try refresh
        const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        });

        if (refreshRes.ok) {
            // Retry original request
            const retryRes = await fetch(`${API_BASE}${path}`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
                ...rest,
            });

            if (!retryRes.ok) {
                const err = await retryRes.json().catch(() => ({ error: 'Request failed' }));
                throw new ApiError(retryRes.status, err.error || 'Request failed');
            }

            return retryRes.json();
        }

        // Refresh failed — redirect to login
        window.location.href = '/login';
        throw new ApiError(401, 'Session expired');
    }

    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }));
        throw new ApiError(res.status, err.error || 'Request failed');
    }

    return res.json();
}

export class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}
