import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function SignupPage() {
    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const router = useRouter();

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

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            router.push('/')
        }
    }, [router]);


    return (
        <form onSubmit={signUp}>
            <input type="email" placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="닉네임" onChange={(e) => setNickname(e.target.value)} />
            <input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="비밀번호 확인" onChange={(e) => setPasswordConfirm(e.target.value)} />
            <button type="submit">회원가입</button>
        </form>
    )
}

export default SignupPage