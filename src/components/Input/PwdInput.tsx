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
}

function PwdInput({ id, placeholder, error, className = '', ...inputProps }: InputProps) {
    const [visible, setVisible] = useState(false);
    const type = visible ? 'text' : 'password';

    return (
        <div>
            <div>
                <input
                    style={{ backgroundColor: 'skyblue' }}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    autoComplete="new-password"
                    {...inputProps}
                />
                <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                >
                    {visible ? (
                        <Image src={IconVisibilityOff} alt="Show" />
                    ) : (
                        <Image src={IconVisibilityOn} alt="Hide" />
                    )}
                </button>
            </div>
            {error && <p>{error}</p>}
        </div>
    );
}

export default PwdInput;