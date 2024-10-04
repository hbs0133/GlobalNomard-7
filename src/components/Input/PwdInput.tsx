'use client';

import { useState } from 'react';
import Image from 'next/image';
import IconVisibilityOff from '@/assets/icons/ic_visibility_off.svg';
import IconVisibilityOn from '@/assets/icons/ic_visibility_on.svg';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    placeholder: string;
    error?: string;
    correct?: string;
}

function PwdInput({ id, placeholder, error, className = '', correct = '', ...inputProps }: InputProps) {
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState<string | null>(null);
    const [pwdError, setPwdError] = useState<string | null>(null);
    const [PwdConfirmError, setPwdConfirmError] = useState<string | null>(null);
    const type = visible ? 'text' : 'password';

    const validatePassword = (pwd: string) => {
        if (id === "password") {
            if (pwd.length < 8) {
                setPwdError('8자 이상 입력해주세요.');
            } else {
                setPwdError(null);
            }
        }
        else if (id === "passwordConfirm") {
            if (pwd !== correct) {
                setPwdConfirmError('불일치');
            } else {
                setPwdConfirmError(null)
            }
        }
    };

    return (
        <div>
            <div>
                <input
                    style={{ backgroundColor: 'skyblue' }}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    value={password || ''}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => validatePassword(e.target.value)}
                    autoComplete="new-password"
                    {...inputProps}
                />
                <button type="button" onClick={() => setVisible(!visible)}>
                    {visible ? (
                        <Image src={IconVisibilityOff} alt="Show" />
                    ) : (
                        <Image src={IconVisibilityOn} alt="Hide" />
                    )}
                </button>
            </div>
            {pwdError && <p style={{ color: 'red' }}>{pwdError}</p>} {/* 비밀번호 에러 표시 */}
            {PwdConfirmError && <p style={{ color: 'red' }}>{PwdConfirmError}</p>} {/* 비밀번호 에러 표시 */}
        </div>
    );
}

export default PwdInput;
