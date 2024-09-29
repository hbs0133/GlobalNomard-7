"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

interface UserState {
    user: User | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
    setUser: (user: User, accessToken: string) => void;
    clearUser: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            loading: false,
            error: null,
            setUser: (user: User, accessToken: string) =>
                set({ user, accessToken, loading: false, error: null }),
            clearUser: () => set({ user: null, accessToken: null }),
            setLoading: (loading: boolean) => set({ loading }),
            setError: (error: string | null) => set({ error, loading: false }),
        }),
        {
            name: 'user-storage',
        }
    )
);
