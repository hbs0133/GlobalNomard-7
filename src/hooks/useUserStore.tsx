"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 상태와 액션의 타입 정의
interface UserState {
    user: string;
}

interface UserAction {
    setUser: (user: string) => void;
}

// Zustand 상태 관리와 persist 설정
export const useUserStore = create<UserState & UserAction>()(
    persist(
        (set) => ({
            user: "",
            setUser: (user: string) => set({ user }),
        }),
        {
            name: 'user-storage', // 로컬 스토리지의 키 이름
        }
    )
);
