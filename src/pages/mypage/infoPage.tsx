'use client';

import axios from 'axios'
import { IUser, IUserInforEdit } from '@/types/user'
import { useRouter } from 'next/router'
import { useUserStore, getAccessTokenWithRefresh } from '@/hooks/useUserStore'
import React, { useEffect, useState } from 'react'
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';


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
            <div className={`max-w-[850px] mx-[16px] tablet:mx-[24px] desktop:mx-[24px] text-black`} >

                <div className={`flex justify-between h-[48px] mb-[16px] desktop:mb-[24px]`}>
                    <p className={`pb-4 text-3xl font-bold`}>내 정보</p>
                    <Button
                        onClick={edit} size='large'
                        style={{ width: '120px' }}
                    >저장하기
                    </Button>
                </div>

                <div className={`flex justify-between flex-col gap-[32px]`}>

                    <div>
                        <p className={`pb-4 text-2xl font-bold`}>닉네임</p>
                        <Input
                            id='nickname'
                            placeholder='10자 이내로 입력해주세요'
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>

                    <div>
                        <p className={`pb-4 text-2xl font-bold`}>이메일</p>
                        <Input
                            id='email'
                            placeholder='새로운 이메일을 입력해 주세요'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <p className={`pb-4 text-2xl font-bold`}>비밀번호</p>
                        <Input
                            id='password'
                            placeholder='8자 이상 입력해 주세요'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <p className={`pb-4 text-2xl font-bold`}>비밀번호 재입력</p>
                        <Input
                            id='passwordConfirm'
                            placeholder='비밀번호를 한번 더 입력해 주세요'
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

export default InfoPage;