import BaseModal from '../BaseModal';
import NoticeCard from './components/NoticeCard';

function NoticeModal({
  modalPosition,
  notificationsData,
}: {
  modalPosition: any;
  notificationsData: any;
}) {
  const totalCount = notificationsData ? notificationsData.totalCount : 0;
  const notifications = notificationsData
    ? notificationsData.notifications
    : [];
  return (
    <BaseModal
      type="nonModal"
      size="notice"
      titleContent={`알림 ${totalCount}개`}
      tStyle="notice"
      xStyle="notice"
      footerButton={null}
      modalPosition={modalPosition}
      notificationsData={notificationsData}
    >
      {notifications.length > 0 &&
        notifications.map((notification: any) => (
          <NoticeCard key={notification.id} notification={notification} />
        ))}
    </BaseModal>
  );
}

export default NoticeModal;
