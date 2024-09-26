import { MouseEvent } from 'react';
import { useModalStore } from '@/stores/modalStore';
import { IconX40px } from '@/assets/icons/index';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

function BaseModal({
  titleContent,
  tStyle,
  children,
  footerButton,
  size,
  ...props
}: IBaseModal) {
  const { isModalOpen, setCloseModal } = useModalStore();

  const sizeStyle = {
    alert: 'w-[540px] h-[250px] mobile:w-[327px] mobile:h-[220px]',
    cancel: 'w-[298px] h-[184px]',
    review: 'w-[480px] h-[750px] mobile:w-[375px] mobile:h-[777px]',
    reservation: 'w-[429px] h-[697px] mobile:w-[375px] mobile:h-[777px]',
    notice: 'mobile:h-[812px]',
  };

  const titleStyle = {
    review: '',
    reservation: '',
    notice: 'text-xl font-bold mobile:mt-[40px]',
  };

  let button;

  if (footerButton === null) {
    button = null;
  } else if (footerButton === 1) {
    button = (
      <div className="mobile:justify-center flex h-full items-end justify-end">
        <Button onClick={setCloseModal} size="mediumModal">
          확인
        </Button>
      </div>
    );
  } else if (footerButton === 2) {
    button = (
      <div className="flex h-full items-end justify-center">
        <div className="relative flex gap-[8px]">
          <Button onClick={setCloseModal} size="smallModal" solid="no">
            아니오
          </Button>
          <Button size="smallModal">취소하기</Button>
        </div>
      </div>
    );
  }

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setCloseModal();
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div
          className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.5)]"
          onClick={handleOverlayClick}
          aria-hidden="true"
        >
          <div
            className={twMerge(
              `mobile:px-[16px] z-[100] flex flex-col justify-items-center rounded-[24px] border-[1px] bg-white px-[24px] pb-[24px] pt-[23px] ${sizeStyle[size]}`,
            )}
          >
            {titleContent && (
              <div className="flex items-center justify-between">
                <span
                  className={twMerge(
                    `mobile:text-[28px] text-2xl font-bold text-black ${titleStyle[tStyle]}`,
                  )}
                >
                  {titleContent}
                </span>
                <button
                  className="cursor-pointer hover:opacity-80"
                  type="button"
                  onClick={setCloseModal}
                >
                  <Image
                    className="h-[40px] w-[40px]"
                    src={IconX40px}
                    alt="닫기버튼"
                  />
                </button>
              </div>
            )}
            {children}
            {button && button}
          </div>
        </div>
      )}
    </div>
  );
}

export default BaseModal;
