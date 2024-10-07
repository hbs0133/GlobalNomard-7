'use client';
import axios from 'axios';
import { useUserStore } from '@/hooks/useUserStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ILoginResponse } from '@/types/auth';
import Input from '@/components/Input/Input';
import PwdInput from '@/components/Input/PwdInput';
import Button from '@/components/Button/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ general?: string } | null>(null); // 에러 상태
    const { user, setUser } = useUserStore();
    const router = useRouter();

    // 로그인 돼있을 때 로그인창으로 못 들어가게 막음
    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user]);

    const onSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<ILoginResponse>('https://sp-globalnomad-api.vercel.app/7-7/auth/login', {
                email: email,
                password: password,
            });

            const data = response.data;
            console.log(data);
            const { user, accessToken, refreshToken } = data;

            setUser(user, accessToken);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            router.push('/');
        } catch (err) {
            if (err instanceof Error) {
                setError({ general: err.message });
                alert('로그인 실패');
            } else {
                setError({ general: '알 수 없는 오류가 발생했습니다.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Input
                id='email'
                placeholder='이메일을 입력해 주세요'
                value={email}
                // inputsize='large'
                onChange={(e) => setEmail(e.target.value)}
            />
            <PwdInput
                id='password'
                placeholder='비밀번호를 입력해주세요'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={onSubmit} size='large' status={loading || email.length == 0 || password.length == 0 ? 'inactive' : 'active'} >
                {loading ? '로그인 중...' : '로그인 하기'}
            </Button>
        </>
    );
};

export default Login;
