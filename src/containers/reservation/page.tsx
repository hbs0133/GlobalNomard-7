import AlertModal from '@/components/Modal/AlertModal';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import NoticeModal from '@/components/Modal/NoticeModal/NoticeModal';
import ReviewModal from '@/components/Modal/ReviewModal';
import { useModalStore } from '@/stores/modalStore';

function Reservation() {
  const { isModalOpen, setOpenModal } = useModalStore();

  return (
    <div>
      <button type="button" onClick={setOpenModal}>
        모달 열기
      </button>
      {/* {isModalOpen && (
        <AlertModal size="alert" footerButton={1}>
          비밀번호가 일치하지 않습니다.
        </AlertModal>
      )} */}
      {/* {isModalOpen && (
        <ConfirmModal size="confirm" footerButton={2}>
          예약을 취소하시겠어요?
        </ConfirmModal>
      )} */}
      {/* {isModalOpen && <ReviewModal />} */}
      {isModalOpen && <NoticeModal />}
    </div>
  );
}

export default Reservation;
