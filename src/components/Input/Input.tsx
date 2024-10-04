'use client';

import { useState } from 'react';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    placeholder: string;
    error?: string;
}

function Input({ id, placeholder, error, className = '', ...inputProps }: InputProps) {
    const [value, setValue] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailError('잘못된 이메일입니다.');
        } else {
            setEmailError(null);
        }
    };

    const handleBlur = (value: string) => {
        if (id === 'email') {
            validateEmail(value);
        }
    };

    return (
        <div>
            <div>
                <input
                    style={{ backgroundColor: 'pink' }}
                    id={id}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={(e) => handleBlur(e.target.value)}
                    autoComplete="new-password"
                    {...inputProps}
                />
            </div>
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </div>
    );
}

export default Input;
