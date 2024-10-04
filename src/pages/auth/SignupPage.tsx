'use client';

import axios from 'axios'
import { useRouter } from 'next/router'
import { useUserStore } from '@/hooks/useUserStore';
import React, { useEffect, useState } from 'react'
import Input from '@/components/Input/Input';
import PwdInput from '@/components/Input/PwdInput';

function SignupPage() {
    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const router = useRouter();
    const { user, setUser } = useUserStore();

    //로그인 돼있을 때 회원가입 창으로 못 들어가게 막음
    useEffect(() => {
        if (user) {
            router.push('/');
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
                router.push("/auth/LoginPage")
            })
            .catch(res => {
                console.log(res.response.data.message);
            });
    };


    return (
        <form onSubmit={signUp}>
            <Input
                id='email'
                placeholder='이메일을 입력해 주세요'
                value={email}
                onChange={(e) => setEmail(e.target.value)} // 이메일 상태 업데이트
            />
            <Input
                id='nickname'
                placeholder='닉네임을 입력해 주세요'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)} // 닉네임 상태 업데이트
            />
            <PwdInput
                id='password'
                placeholder='8자 이상 입력해 주세요'
                value={password}
                onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
            />
            <PwdInput
                id='passwordConfirm'
                placeholder='비밀번호를 한 번 더 입력해 주세요'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)} // 비밀번호 확인 상태 업데이트
                correct={password}
            />
            <button type="submit">회원가입</button>
        </form>

    )
}

export default SignupPage