'use client';

import axios from 'axios'
import { IUser, IUserInforEdit } from '@/types/user'
import { useRouter } from 'next/router'
import { useUserStore, getAccessTokenWithRefresh } from '@/hooks/useUserStore'
import React, { useEffect, useState } from 'react'
import Input from '@/components/Input/Input';

function InfoPage() {
    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/7-7_1119_1728047280262.jpeg')
    const router = useRouter();
    const { user, setUser } = useUserStore();

    useEffect(() => {
        const myInfo = async () => {
            try {
                const accessToken = await getAccessTokenWithRefresh()

                console.log(accessToken);
                const response = await axios.get<IUser>('https://sp-globalnomad-api.vercel.app/7-7/users/me', {
                    headers: { Authorization: `Bearer ${accessToken}`, },
                });
                const data = response.data;
                setEmail(data.email);
                setNickname(data.nickname);
            } catch {
                router.push('/');
            }
        }
        if (user != null) {
            myInfo();
        }
    }, [user])

    const edit = async () => {
        try {
            const accessToken = await getAccessTokenWithRefresh()
            const response = await axios.patch<IUserInforEdit>(
                'https://sp-globalnomad-api.vercel.app/7-7/users/me',
                {
                    nickname: nickname,
                    profileImageUrl: profileImageUrl,
                    newPassword: password
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <button onClick={edit} >버튼</button>
            <Input
                id='nickname'
                placeholder='10자 이내로 입력해주세요'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <Input
                id='email'
                placeholder='새로운 이메일을 입력해 주세요'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                id='password'
                placeholder='8자 이상 입력해 주세요'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                id='passwordConfirm'
                placeholder='비밀번호를 한번 더 입력해 주세요'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
            />
        </>
    )
}

export default InfoPage;