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
import { useModalStore } from '@/stores/modalStore';
import AlertModal from '@/components/Modal/AlertModal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const { setOpenModal } = useModalStore();

  // 로그인 돼있을 때 로그인창으로 못 들어가게 막음
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  const onSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post<ILoginResponse>(
        'https://sp-globalnomad-api.vercel.app/7-7/auth/login',
        {
          email: email,
          password: password,
        },
      );

      const data = response.data;
      console.log(data);
      const { user, accessToken, refreshToken } = data;

      setUser(user, accessToken, refreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      router.push('/');
    } catch (err) {
      if (err instanceof Error) {
        setError('비밀번호가 일치하지 않습니다.');
        setOpenModal();
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
        setOpenModal();
      }
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignup = () => {
    router.push('/signuppage');
  };

  return (
    <div className={`mx-auto max-w-[666px]`}>
      <div
        className={`mt-[40px] w-full px-[13px] tablet:mt-[56px] desktop:mt-[48px]`}
      >
        <div
          className={`mb-[24px] flex justify-center tablet:mb-[40px] desktop:mb-[56px]`}
        >
          <Image
            src={GlobalNomadLogo}
            alt="글로벌노마드 로고"
            className={`w-[340px] mobile:w-[270px]`}
          />
        </div>

        <div className={`flex flex-col justify-between gap-[28px]`}>
          <div>
            <p className={`pb-[8px] text-lg text-black`}>이메일</p>
            <Input
              id="email"
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p className={`pb-2 text-lg text-black`}>비밀번호</p>
            <PwdInput
              id="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            onClick={onSubmit}
            size="large"
            status={
              loading || email.length == 0 || password.length == 0
                ? 'inactive'
                : 'active'
            }
            style={{ width: '100%' }}
          >
            {loading ? '로그인 중...' : '로그인 하기'}
          </Button>

          <div
            className={`flex justify-center text-lg tablet:pt-[4px] desktop:pt-[4px]`}
          >
            <p className={`mr-3 text-black`}>회원이 아니신가요?</p>
            <p
              onClick={navigateToSignup}
              className={`cursor-pointer text-green-0B underline`}
              style={{ textUnderlineOffset: '3px' }}
            >
              회원가입하기
            </p>
          </div>
        </div>
      </div>

      {error && <AlertModal>{error}</AlertModal>}
    </div>
  );
};

export default Login;
