import { IconEllipseBlue, IconEllipseRed, IconXMedium } from '@/assets/icons';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/services/axios';

function NoticeCard({ notification }: { notification: any }) {
  const queryClient = useQueryClient();
  const createdAt = new Date(notification.createdAt);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000,
  );
  let timeAgo = '';

  const deleteNotificationMutation = useMutation({
    mutationFn: async (notificationId) => {
      await axiosInstance.delete(`/my-notifications/${notificationId}`, {
        data: { notificationId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userNotifications'] });
    },
  });

  const handleDeleteNotification = () => {
    deleteNotificationMutation.mutate(notification.id);
  };

  if (diffInSeconds < 60) {
    timeAgo = `${diffInSeconds}초 전`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    timeAgo = `${minutes}분 전`;
  } else {
    const hours = Math.floor(diffInSeconds / 3600);
    timeAgo = `${hours}시간 전`;
  }

  const isApproved = notification.content.includes('승인');

  return (
    <div className="mb-[8px] mt-[16px] w-[328px] rounded-[5px] border-[1px] border-gray-cb bg-white px-[12px] py-[16px]">
      <div>
        <div className="flex items-center justify-between">
          <Image
            src={isApproved ? IconEllipseBlue : IconEllipseRed}
            alt="예약 승인 아이콘"
          />
          <button className="mobile:hidden" onClick={handleDeleteNotification}>
            <Image src={IconXMedium} alt="알림 삭제 버튼" />
          </button>
        </div>
        <p className="mb-[4px] mt-[8px] text-md font-regular">
          <span>{notification.content} </span>
        </p>
      </div>
      <p className="text-sm font-regular text-gray-a4">{timeAgo}</p>
    </div>
  );
}

export default NoticeCard;
