import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import SideNavCard from '@/components/SideNavCard/SideNavCard';
import { ILoginResponse } from '@/types/auth';

function LoginPage() {
    const [email, setEmail] = useState<string>('');  // 상태 변수에 타입 추가
    const [password, setPassword] = useState<string>('');  // 상태 변수에 타입 추가
    const router = useRouter();

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<ILoginResponse>('https://sp-globalnomad-api.vercel.app/7-7/auth/login', {
                email: email,
                password: password,
            });
            const data = response.data;
            console.log(data);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            router.push('/');
        }
    }, [router]);

    return (
        <>
            <form onSubmit={login}>
                <input type="email" placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">로그인</button>
            </form>
            <SideNavCard />
        </>
    );
}

export default LoginPage;
