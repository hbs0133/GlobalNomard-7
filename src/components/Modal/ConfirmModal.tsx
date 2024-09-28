import { IconCheck, IconEllipse } from '@/assets/icons';
import Image from 'next/image';
import BaseModal from './BaseModal';

function ConfirmModal({
  size,
  footerButton,
  children,
  ...props
}: IConfirmModal) {
  return (
    <BaseModal type="modal" size={size} footerButton={footerButton}>
      <div className="relative flex h-full flex-col items-center">
        <Image
          className="absolute top-[8px]"
          src={IconCheck}
          alt="체크 아이콘"
        />
        <Image src={IconEllipse} alt="원형 아이콘" />
        <p className="mt-[16px] text-center text-lg font-regular">{children}</p>
      </div>
    </BaseModal>
  );
}

export default ConfirmModal;
