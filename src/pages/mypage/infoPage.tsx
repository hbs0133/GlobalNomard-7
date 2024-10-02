'use client';

import axios from 'axios'
import { IUser } from '@/types/user'
import { useRouter } from 'next/router'
import { useUserStore } from '@/hooks/useUserStore'
import React, { useEffect, useState } from 'react'

function InfoPage() {
    const [email, setEmail] = useState(null)
    const [nickname, setNickname] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirm, setPasswordConfirm] = useState(null);
    const router = useRouter();
    const { user, accessToken, setUser } = useUserStore();

    //로그인 돼있을 때 회원가입 창으로 못 들어가게 막음
    useEffect(() => {

        const myInfo = async () => {
            const response = await axios.get<IUser>('https://sp-globalnomad-api.vercel.app/7-7/users/me', {
                headers: { Authorization: `Bearer ${accessToken}`, },
            });
            console.log(response);
        }

        if (!user) {
            router.push('/');
        }
        else {
            myInfo();
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
        <>
        </>
    )
}

export default InfoPage;