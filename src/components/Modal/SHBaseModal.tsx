import { IconX40px } from '@/assets/icons/index';
import { MouseEvent, useEffect, useState } from 'react';
import { useModalStore } from '@/stores/modalStore';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import ModalPortal from './ModalPortal';

function BaseModal({
  type,
  size,
  titleContent,
  tStyle,
  xStyle,
  children,
  onConfirm,
  ...props
}: IBaseModal) {
  const { isModalOpen, setCloseModal } = useModalStore();
  const [isNonModal, setIsNonModal] = useState(false);

  const sizeStyle = {
    alert:
      'w-[540px] h-[250px] rounded-[8px] mobile:h-[220px] mobile:w-[327px]',
    confirm: 'w-[298px] h-[184px] rounded-[12px]',
    review:
      'w-[480px] h-[750px] rounded-[24px] mobile:w-[375px] mobile:h-[777px] mobile:rounded-[0px]',
    reservation:
      'w-[384px] h-[750px] rounded-[12px] tablet:w-[480px] tablet:h-[599px] tablet:rounded-[24px] mobile:w-[375px] mobile:h-[777px] mobile:rounded-[0px]',
    reservationDetailLarge:
      'w-[429px] h-[697px] rounded-[24px] mobile:w-[375px] mobile:h-[777px] mobile:rounded-[0px]',
    reservationDetailMedium:
      'w-[429px] h-[582px] rounded-[24px] mobile:w-[375px] mobile:h-[777px] mobile:rounded-[0px]',
    notice: 'mobile:h-[812px] rounded-[10px] mobile:rounded-[0px]',
  };

  const titleStyle = {
    review: 'text-2xl font-bold mobile:text-[28px] mobild:leading-[26px]',
    reservationDetail:
      'text-2xl font-bold mobile:text-[28px] mobile:leading-[26px]',
    notice: 'text-xl font-bold mobile:mt-[30px] mobile:text-xl ',
  };

  const xButtonStyle = {
    review: 'w-[40px] h-[40px]',
    reservationDetail: 'w-[40px] h-[40px]',
    notice: 'w-[26px] h-[26px] mobile:mt-[30px]',
  };

  useEffect(() => {
    if (type === 'nonModal') {
      setIsNonModal(true);
    } else {
      setIsNonModal(false);
    }
  }, [type]);

  const button = (
    <div className="flex h-full items-end justify-end mobile:justify-center">
      <Button onClick={onConfirm} size="mediumModal">
        확인
      </Button>
    </div>
  );

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setCloseModal();
    }
  };

  return (
    <ModalPortal>
      {isModalOpen && !isNonModal && (
        <div
          className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.5)]"
          onClick={handleOverlayClick}
          aria-hidden="true"
        >
          <div
            className={twMerge(
              `z-[100] flex flex-col justify-items-center border-[1px] bg-white px-[24px] pb-[24px] pt-[23px] mobile:px-[16px] ${sizeStyle[size]}`,
            )}
          >
            {titleContent && (
              <div className="flex items-center justify-between">
                <span
                  className={twMerge(
                    `text-black ${tStyle ? titleStyle[tStyle] : ''}`,
                  )}
                >
                  {titleContent}
                </span>
                <button
                  className={twMerge(
                    `cursor-pointer hover:opacity-80 ${xStyle ? xButtonStyle[xStyle] : ''}`,
                  )}
                  type="button"
                  onClick={setCloseModal}
                >
                  <Image src={IconX40px} alt="닫기버튼" />
                </button>
              </div>
            )}
            {children}
            {button && button}
          </div>
        </div>
      )}

      {isModalOpen && isNonModal && (
        <div
          className="absolute left-0 top-0 flex h-full w-full items-start"
          onClick={handleOverlayClick}
          aria-hidden="true"
        >
          <div
            className={twMerge(
              `${size === 'notice' ? 'bg-green-ce' : 'bg-white'} z-[100] flex flex-col justify-items-center border-[1px] px-[24px] pb-[24px] pt-[23px] mobile:px-[16px] ${sizeStyle[size]}`,
            )}
          >
            {titleContent && (
              <div className="flex items-center justify-between">
                <span
                  className={twMerge(
                    `text-black ${tStyle ? titleStyle[tStyle] : ''}`,
                  )}
                >
                  {titleContent}
                </span>
                <button
                  className={twMerge(
                    `cursor-pointer hover:opacity-80 ${xStyle ? xButtonStyle[xStyle] : ''}`,
                  )}
                  type="button"
                  onClick={setCloseModal}
                >
                  <Image src={IconX40px} alt="닫기버튼" />
                </button>
              </div>
            )}
            {children}
            {button && button}
          </div>
        </div>
      )}
    </ModalPortal>
  );
}

export default BaseModal;
