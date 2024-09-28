import BaseModal from '../BaseModal';
import NoticeCard from './components/NoticeCard';

function NoticeModal() {
  return (
    <BaseModal
      type="nonModal"
      size="notice"
      titleContent="알림 6개"
      tStyle="notice"
      xStyle="notice"
      footerButton={null}
    >
      <NoticeCard />
    </BaseModal>
  );
}

export default NoticeModal;
