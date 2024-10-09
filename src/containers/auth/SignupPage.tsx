'use client';

import axios from 'axios'
import { useRouter } from 'next/router'
import { useUserStore } from '@/hooks/useUserStore';
import React, { useEffect, useState } from 'react'
import Input from '@/components/Input/Input';
import PwdInput from '@/components/Input/PwdInput';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import GlobalNomadLogo from '@/assets/images/logo_big.png';
import { useModalStore } from '@/stores/modalStore';
import AlertModal from '@/components/Modal/AlertModal';
import SHAlertModal from '@/components/Modal/SHModal';

function SignupPage() {
    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const router = useRouter();
    const { user, setUser } = useUserStore();
    const { setOpenModal } = useModalStore();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    //로그인 돼있을 때 회원가입 창으로 못 들어가게 막음
    useEffect(() => {
        if (user) {
            router.push('/main');
        }
    }, [user])

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post('https://sp-globalnomad-api.vercel.app/7-7/users', {
            email: email,
            nickname: nickname,
            password: password,
            passwordConfirmation: passwordConfirm,
        })
            .then(res => {
                setOpenModal();
                setSuccess('가입이 완료되었습니다!');
            })
            .catch(res => {
                setOpenModal();
                setError('이미 사용중인 이메일입니다.');
            });
    };

    const navigateToLogin = () => {
        router.push('/loginpage');
    };

    const onConfirm = () => {
        router.push('/loginpage');
    };

    return (
        <div className={`mx-auto max-w-[666px] `} >
            <div className={`w-full mb-[40px] mt-[48px] mobile:mt-[40px] px-[13px]`}>

                <div className={`flex justify-center mb-[24px] tablet:mb-[40px] desktop:mb-[56px]`}>
                    <Image src={GlobalNomadLogo} alt='글로벌노마드 로고'
                        className={`w-[270px] tablet:w-[340px] desktop:w-[340px]`} />
                </div>

                <form onSubmit={signUp} className={`flex justify-between flex-col gap-[28px]`}>
                    <div>
                        <p className={`pb-[8px] text-lg text-black`}>이메일</p>
                        <Input
                            id='email'
                            placeholder='이메일을 입력해 주세요'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // 이메일 상태 업데이트
                        />
                    </div>
                    <div>
                        <p className={`pb-[8px] text-lg text-black`}>닉네임</p>
                        <Input
                            id='nickname'
                            placeholder='닉네임을 입력해 주세요'
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)} // 닉네임 상태 업데이트
                        />
                    </div>
                    <div>
                        <p className={`pb-[8px] text-lg text-black`}>비밀번호</p>
                        <PwdInput
                            id='password'
                            placeholder='8자 이상 입력해 주세요'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
                        />
                    </div>
                    <div>
                        <p className={`pb-[8px] text-lg text-black`}>비밀번호 확인</p>
                        <PwdInput
                            id='passwordConfirm'
                            placeholder='비밀번호를 한 번 더 입력해 주세요'
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)} // 비밀번호 확인 상태 업데이트
                            correct={password}
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            size='large'
                            status={email.length === 0 || password.length === 0 ? 'inactive' : 'active'}
                            style={{ width: '100%' }}>
                            회원가입 하기
                        </Button>
                    </div>

                    <div className={`flex justify-center text-lg tablet:pt-[4px] desktop:pt-[4px]`}>
                        <p className={` text-black mr-3`}>회원이신가요?</p>
                        <p onClick={navigateToLogin}
                            className={` text-green-0B cursor-pointer underline`}
                            style={{ textUnderlineOffset: '3px' }}>로그인하기</p>
                    </div>

                </form>
            </div>

            {error && (<AlertModal>{error}</AlertModal>)}
            {success && (<SHAlertModal onConfirm={onConfirm}>{success}</SHAlertModal>)}

        </div>

    )
}

export default SignupPage