import BaseModal from '../BaseModal';
import NoticeCard from './components/NoticeCard';

function NoticeModal() {
  return (
    <BaseModal
      titleContent="알림 6개"
      tStyle="notice"
      xStyle="notice"
      size="notice"
      footerButton={null}
    >
      <NoticeCard />
    </BaseModal>
  );
}

export default NoticeModal;
