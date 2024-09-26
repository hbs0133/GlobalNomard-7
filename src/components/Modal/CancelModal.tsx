import Image from 'next/image';
import { IconCheck, IconEllipse } from '@/assets/icons';
import BaseModal from './BaseModal';

function CancelModal({ size, footerButton, children, ...props }: ICancelModal) {
  return (
    <BaseModal size={size} footerButton={footerButton}>
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

export default CancelModal;
