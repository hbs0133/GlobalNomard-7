import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LogoImage from '@/assets/images/logo_md.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconNotification } from '@/assets/icons';
import axiosInstance from '@/services/axios';
import { useQuery } from '@tanstack/react-query';
import { useModalStore } from '@/stores/modalStore';
import NoticeModal from '../Modal/NoticeModal/NoticeModal';

const fetchUserData = async () => {
  const response = await axiosInstance.get(`/users/me`);
  return response.data;
};

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { setOpenModal } = useModalStore();
  const { data, error, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserData,
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const getProfilePlaceholder = (nickname: string) => {
    const firstLetter = nickname?.charAt(0).toUpperCase() || 'N';
    return (
      <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-black-nomad bg-black-nomad font-bold text-white">
        {firstLetter}
      </div>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshTokenToken');
    localStorage.removeItem('user-storage');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex h-[70px] max-w-[1200px] items-center justify-between">
        <Link href={'/'}>
          <Image
            src={LogoImage}
            alt="클릭시 메인페이지로 돌아가는 로고이미지"
            width={172}
            height={30}
          />
        </Link>

        <div className="flex gap-[25px]">
          {isLoggedIn ? (
            <>
              <button>
                <Image
                  src={IconNotification}
                  alt="알림을 나타냐는 종모양 아이콘"
                  onClick={setOpenModal}
                />
              </button>
              <NoticeModal />
              <Link
                href={'/myprofile'}
                className="flex items-center gap-[10px] text-md font-medium text-black-nomad"
              >
                {data.profileImageUrl ? (
                  <Image
                    width={32}
                    height={32}
                    className="h-[32px] w-[32px] rounded-[50%]"
                    src={data.profileImageUrl}
                    alt="프로필 이미지"
                  />
                ) : (
                  getProfilePlaceholder(data?.nickname)
                )}
                <div>{data.nickname}</div>
              </Link>
              <button
                onClick={handleLogout}
                className="text-md font-medium text-black-nomad"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href={'/loginpage'}
                className="text-md font-medium text-black-nomad"
              >
                로그인
              </Link>
              <Link
                href={'/signuppage'}
                className="text-md font-medium text-black-nomad"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
