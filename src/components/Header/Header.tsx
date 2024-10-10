import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LogoImage from '@/assets/images/logo_md.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconNotification } from '@/assets/icons';
import axiosInstance from '@/services/axios';
import { useQuery } from '@tanstack/react-query';
import NoticeModal from '../Modal/NoticeModal/NoticeModal';
import Button from '@/components/Button/Button';
import { useModalStore } from '@/stores/modalStore';

const fetchUserData = async () => {
  const response = await axiosInstance.get(`/users/me`);
  return response.data;
};

const fetchNotifications = async () => {
  const response = await axiosInstance.get(`/my-notifications`, {
    params: { size: 10 },
  });
  return response.data;
};

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { isNoticeModalOpen, setOpenNoticeModal } = useModalStore();
  const { data, error, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserData,
  });

  const {
    data: notificationsData,
    error: notificationsError,
    isLoading: notificationsLoading,
  } = useQuery({
    queryKey: ['userNotifications'],
    queryFn: fetchNotifications,
  });
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

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
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user-storage');
    setIsLoggedIn(false);
    router.push('/');
    window.location.reload();
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
              <button className="relative transform transition-all duration-300 ease-in-out hover:rotate-12 hover:scale-110">
                <Image
                  className="h-6 w-6 transition-transform duration-300 ease-in-out"
                  src={IconNotification}
                  alt="알림을 나타냐는 종모양 아이콘"
                  onClick={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    const rect = target.getBoundingClientRect();
                    const top = rect.top + window.scrollY + 60;
                    const left = rect.left + window.scrollX - 230;

                    setModalPosition({ top, left });
                    setOpenNoticeModal();
                  }}
                />
              </button>
              {isNoticeModalOpen && (
                <NoticeModal
                  modalPosition={modalPosition}
                  notificationsData={notificationsData}
                />
              )}
              {isLoading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error loading data</div>
              ) : data ? (
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
              ) : null}
              <Button size="small" onClick={handleLogout}>
                로그아웃
              </Button>
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
