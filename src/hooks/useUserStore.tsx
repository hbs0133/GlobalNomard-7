'use client';

import exp from 'constants';
import { promises } from 'dns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

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
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User, accessToken: string, refreshToken: string) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  accessToRefresh: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      error: null,
      setUser: (user: User, accessToken: string, refreshToken: string) =>
        set({ user, accessToken, refreshToken, loading: false, error: null }),
      clearUser: () =>
        set({ user: null, accessToken: null, refreshToken: null }),
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error, loading: false }),
      accessToRefresh: async () => {
        const { refreshToken } = get();
        const response = await axios.post<Tokens>(
          'https://sp-globalnomad-api.vercel.app/7-7/auth/tokens',
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );
        const accessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        set({ accessToken, refreshToken: newRefreshToken });
      },
    }),
    {
      name: 'user-storage',
    },
  ),
);

export const getAccessTokenWithRefresh = async (): Promise<string | null> => {
  const { accessToken, accessToRefresh } = useUserStore.getState();
  await accessToRefresh();
  return useUserStore.getState().accessToken;
};
