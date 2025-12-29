import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function setCookie(name: string, value: string, days: number) {
    if (typeof document === 'undefined') return;
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name: string) {
    if (typeof document === 'undefined') return null;
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name: string) {
    if (typeof document === 'undefined') return;
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

export const authClient = {
    async signUp(data: any) {
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, {
                email: data.email,
                password: data.password,
                name: data.name
            });
            
            // Handle auto-login token from signup
            const { access_token } = response.data;
            if (access_token) {
                setCookie('better-auth.session_token', access_token, 7);
                localStorage.setItem('token', access_token);
            }

            if (data.fetchOptions?.onSuccess) {
                data.fetchOptions.onSuccess();
            }
            return response.data;
        } catch (error: any) {
            if (data.fetchOptions?.onError) {
                data.fetchOptions.onError({ error: { message: error.response?.data?.detail || "Signup failed" } });
            }
            throw error;
        }
    },

    async signIn(data: any) {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email: data.email,
                password: data.password
            });
            
            const { access_token } = response.data;
            if (access_token) {
                setCookie('better-auth.session_token', access_token, 7);
                localStorage.setItem('token', access_token);
            }

            if (data.fetchOptions?.onSuccess) {
                data.fetchOptions.onSuccess();
            }
            return response.data;
        } catch (error: any) {
            if (data.fetchOptions?.onError) {
                data.fetchOptions.onError({ error: { message: error.response?.data?.detail || "Login failed" } });
            }
            throw error;
        }
    },

    signOut() {
        eraseCookie('better-auth.session_token');
        localStorage.removeItem('token');
        window.location.href = '/login';
    },

    getToken() {
        return getCookie('better-auth.session_token') || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
    }
};

export const useSession = () => {
    const [data, setData] = useState<any>(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            const token = authClient.getToken();
            if (!token) {
                setIsPending(false);
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData({ user: response.data, session: { token } });
            } catch (err: any) {
                setError(err);
                if (err.response?.status === 401) {
                    authClient.signOut();
                }
            } finally {
                setIsPending(false);
            }
        };

        fetchSession();
    }, []);

    return { data, isPending, error };
};

export const signUp = {
    email: authClient.signUp
};

export const signIn = {
    email: authClient.signIn
};

export const signOut = authClient.signOut;