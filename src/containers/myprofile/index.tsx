'use client';

import axios from 'axios';
import { IUser, IUserInforEdit } from '@/types/user';
import { useRouter } from 'next/router';
import { useUserStore, getAccessTokenWithRefresh } from '@/hooks/useUserStore';
import React, { useEffect, useState } from 'react';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import MyReservations from '@/components/SideNavCard/page';
import SideNavCard from '@/components/SideNavCard/SideNavCard';
0;

function InfoPage() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState(
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/7-7_1119_1728047280262.jpeg',
  );
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(
    null,
  );
  const [isFormValid, setIsFormValid] = useState(false);

  const validateNickname = (nickname: string) => {
    if (nickname.length > 10) {
      setNicknameError('10자 이내로 입력해주세요.');
    } else {
      setNicknameError(null);
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setPasswordError('8자 이상 입력해 주세요.');
    } else {
      setPasswordError(null);
    }
  };

  const validatePasswordConfirm = (passwordConfirm: string) => {
    if (passwordConfirm.length >= 8 && password !== passwordConfirm) {
      setPasswordMatchError('비밀번호와 일치하지 않습니다.');
    } else {
      setPasswordMatchError(null);
    }
  };

  useEffect(() => {
    const myInfo = async () => {
      try {
        const accessToken = await getAccessTokenWithRefresh();
        const response = await axios.get<IUser>(
          'https://sp-globalnomad-api.vercel.app/7-7/users/me',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );

        const data = response.data;
        setEmail(data.email);
        setNickname(data.nickname);
      } catch {
        router.push('/main');
      }
    };
    if (user != null) {
      myInfo();
    }
  }, [user]);

  // 저장 버튼 활성화 여부
  useEffect(() => {
    if (
      !nicknameError &&
      !passwordError &&
      !passwordMatchError &&
      nickname &&
      password &&
      passwordConfirm &&
      password === passwordConfirm
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    nicknameError,
    passwordError,
    passwordMatchError,
    nickname,
    password,
    passwordConfirm,
  ]);

  const edit = async () => {
    //유효하지 않는 경우
    if (!isFormValid) return;

    try {
      const accessToken = await getAccessTokenWithRefresh();
      await axios.patch<IUserInforEdit>(
        'https://sp-globalnomad-api.vercel.app/7-7/users/me',
        {
          nickname: nickname,
          profileImageUrl: profileImageUrl,
          newPassword: password,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className={`text-black`}>
        <div
          className={`mb-[16px] flex h-[48px] justify-between desktop:mb-[24px]`}
        >
          <p className={`pb-4 text-3xl font-bold`}>내 정보</p>
          <Button
            onClick={edit}
            size="large"
            style={{ width: '120px' }}
            disabled={!isFormValid}
            status={!isFormValid ? 'inactive' : 'active'}
          >
            저장하기
          </Button>
        </div>

        <div className={`flex flex-col justify-between gap-[32px]`}>
          <div>
            <p className={`pb-4 text-2xl font-bold`}>닉네임</p>
            <Input
              id="nickname"
              placeholder="10자 이내로 입력해주세요"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                validateNickname(e.target.value);
              }}
              className={`${nicknameError ? `border-green-800` : `border-black`}`}
            />
            {nicknameError && (
              <p className={`px-2 pt-2 text-xs text-green-800`}>
                {nicknameError}
              </p>
            )}
          </div>

          <div>
            <p className={`pb-4 text-2xl font-bold`}>이메일</p>
            <Input
              id="email"
              placeholder="이메일은 변경하실 수 없습니다."
              value={email}
              readOnly
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div>
            <p className={`pb-4 text-2xl font-bold`}>비밀번호</p>
            <Input
              id="password"
              type="password"
              placeholder="8자 이상 입력해 주세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              className={`${passwordError ? `border-green-800` : `border-black`}`}
            />
            {passwordError && (
              <p className={`px-2 pt-2 text-xs text-green-800`}>
                {passwordError}
              </p>
            )}
          </div>

          <div>
            <p className={`pb-4 text-2xl font-bold`}>비밀번호 재입력</p>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                validatePasswordConfirm(e.target.value);
              }}
              className={`${passwordMatchError ? `border-green-800` : `border-black`}`}
            />
            {passwordMatchError && (
              <p className={`px-2 pt-2 text-xs text-green-800`}>
                {passwordMatchError}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoPage;
