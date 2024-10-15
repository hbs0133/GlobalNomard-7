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

function PwdInput({
  id,
  placeholder,
  error,
  className = '',
  correct = '',
  ...inputProps
}: InputProps) {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState<string | null>(null);
  const [pwdError, setPwdError] = useState<string | null>(null);
  const [PwdConfirmError, setPwdConfirmError] = useState<string | null>(null);
  const type = visible ? 'text' : 'password';

  const validatePassword = (pwd: string) => {
    if (id === 'password') {
      if (pwd.length < 8) {
        setPwdError('8자 이상 입력해주세요.');
      } else {
        setPwdError(null);
      }
    } else if (id === 'passwordConfirm') {
      if (pwd !== correct) {
        setPwdConfirmError('비밀번호가 일치하지 않습니다.');
      } else {
        setPwdConfirmError(null);
      }
    }
  };

  return (
    <div>
      <div className="relative w-full">
        <input
          className={`h-[58px] w-full border text-lg text-black ${pwdError || PwdConfirmError ? 'border-red-ff4' : 'border-black'} rounded-[5px] px-5 ${className}`}
          type={type}
          id={id}
          placeholder={placeholder}
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => validatePassword(e.target.value)}
          autoComplete="new-password"
          {...inputProps}
        />

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-5 top-1/2 -translate-y-1/2"
        >
          {visible ? (
            <Image src={IconVisibilityOff} alt="Show" />
          ) : (
            <Image src={IconVisibilityOn} alt="Hide" />
          )}
        </button>
      </div>

      {pwdError && (
        <p className={`px-2 pt-2 text-xs text-red-ff4 ${className}`}>
          {pwdError}
        </p>
      )}
      {PwdConfirmError && (
        <p className={`px-2 pt-2 text-xs text-red-ff4 ${className}`}>
          {PwdConfirmError}
        </p>
      )}
    </div>
  );
}

export default PwdInput;
