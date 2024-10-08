'use client';

import axios from 'axios';
import { useUserStore } from '@/hooks/useUserStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ILoginResponse } from '@/types/auth';
import Input from '@/components/Input/Input';
import PwdInput from '@/components/Input/PwdInput';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import GlobalNomadLogo from '@/assets/images/logo_big.png';


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
            router.push('/main');
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

            setUser(user, accessToken, refreshToken);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            router.push('/main');
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

    const navigateToSignup = () => {
        router.push('/signuppage');
    };

    return (
        <div className={`mx-auto max-w-[666px]`} >
            <div className={`w-full
                mt-[40px] tablet:mt-[56px] desktop:mt-[48px]
                px-[13px]`}>

                <div className={`flex justify-center
                mb-[24px] tablet:mb-[40px] desktop:mb-[56px]`}>
                    <Image src={GlobalNomadLogo} alt='글로벌노마드 로고'
                        className={`w-[340px] mobile:w-[270px]`} />
                </div>

                <div className={`flex justify-between flex-col gap-[28px]`}>
                    <div>
                        <p className={`pb-[8px] text-lg text-black`}>이메일</p>
                        <Input
                            id='email'
                            placeholder='이메일을 입력해 주세요'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className={`pb-2 text-lg text-black`}>비밀번호</p>
                        <PwdInput
                            id='password'
                            placeholder='비밀번호를 입력해주세요'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={onSubmit}
                        size='large'
                        status={loading || email.length == 0 || password.length == 0 ? 'inactive' : 'active'}
                        style={{ width: '100%' }}
                    >
                        {loading ? '로그인 중...' : '로그인 하기'}
                    </Button>

                    <div className={`flex justify-center text-lg tablet:pt-[4px] desktop:pt-[4px]`}>
                        <p className={` text-black mr-3`}>회원이 아니신가요?</p>
                        <p onClick={navigateToSignup}
                            className={` text-green-0B cursor-pointer underline`}
                            style={{ textUnderlineOffset: '3px' }}>회원가입하기</p>
                    </div>
                </div >
            </div>
        </div>
    );
};

export default Login;
