"use client";

import { useUserStore } from "@/hooks/useUserStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const setUser = useUserStore((state) => state.setUser);
    const router = useRouter();

    const onSubmit = () => {
        // 유효성 검사
        if (!email || !password) {
            alert("이메일과 비밀번호를 입력해주세요.");
            return;
        }
        setUser(email);
        router.push("/");
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
            <button
                onClick={onSubmit}
            >
                로그인
            </button>
        </>
    );
};

export default Login;
