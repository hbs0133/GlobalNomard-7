import BaseModal from '../BaseModal';
import NoticeCard from './components/NoticeCard';

function NoticeModal({ modalPosition }) {
  return (
    <BaseModal
      type="nonModal"
      size="notice"
      titleContent="알림 6개"
      tStyle="notice"
      xStyle="notice"
      footerButton={null}
      modalPosition={modalPosition}
    >
      <NoticeCard />
    </BaseModal>
  );
}

export default NoticeModal;
