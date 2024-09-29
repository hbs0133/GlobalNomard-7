"use client";
import axios from 'axios';
import { useUserStore } from "@/hooks/useUserStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ILoginResponse } from '@/types/auth';

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { user, setUser } = useUserStore();
    const router = useRouter();

    //로그인 돼있을 때 로그인창으로 못 들어가게 막음
    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user])

    const onSubmit = async () => {
        // 유효성 검사
        if (!email || !password) {
            //모달창 띄우기
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 로그인 API 요청
            const response = await axios.post<ILoginResponse>('https://sp-globalnomad-api.vercel.app/7-7/auth/login', {
                email: email,
                password: password,
            });

            // 사용자 정보와 액세스 토큰을 받아옴
            const data = response.data;
            console.log(data);
            const { user, accessToken, refreshToken } = data;

            // 상태 설정
            setUser(user, accessToken);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            router.push("/");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                alert('로그인 실패');
                //로그인 실패 모달 띄워야함
            } else {
                setError("알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={onSubmit} disabled={loading}>
                {loading ? "로그인 중..." : "로그인"}
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
        </>
    );
};

export default Login;
