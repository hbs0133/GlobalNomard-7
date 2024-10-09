import Button from '@/components/Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/services/axios';

function ReservationDetailCard({
  reservation,
  setApprovedReservations,
  setRejectedReservations,
}) {
  const queryClient = useQueryClient();

  const updateReservation = useMutation({
    mutationFn: async ({ activityId, reservationId, status }) => {
      const response = await axiosInstance.patch(
        `/my-activities/${activityId}/reservations/${reservationId}`,
        { reservationId, status },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reservations']);
    },
    onError: (error) => {
      console.error('예약 업데이트 실패:', error);
    },
  });

  // const handleApprove = () => {
  //   updateReservation.mutate({
  //     activityId: reservation.activityId,
  //     reservationId: reservation.id,
  //     status: 'confirmed',
  //   });
  // };

  // const handleReject = () => {
  //   updateReservation.mutate({
  //     activityId: reservation.activityId,
  //     reservationId: reservation.id,
  //     status: 'declined',
  //   });
  // };

  // const handleApprove = () => {
  //   updateReservation.mutate(
  //     {
  //       activityId: reservation.activityId,
  //       reservationId: reservation.id,
  //       status: 'confirmed',
  //     },
  //     {
  //       onSuccess: () => {
  //         setApprovedReservations((prev) => [...prev, reservation]);
  //       },
  //     },
  //   );
  // };

  // const handleReject = () => {
  //   updateReservation.mutate(
  //     {
  //       activityId: reservation.activityId,
  //       reservationId: reservation.id,
  //       status: 'declined',
  //     },
  //     {
  //       onSuccess: () => {
  //         setRejectedReservations((prev) => [...prev, reservation]);
  //       },
  //     },
  //   );
  // };

  const handleApprove = () => {
    updateReservation.mutate(
      {
        activityId: reservation.activityId,
        reservationId: reservation.id,
        status: 'confirmed',
      },
      {
        onSuccess: () => {
          setApprovedReservations((prev) => [...prev, reservation]);
        },
      },
    );
  };

  const handleReject = () => {
    updateReservation.mutate(
      {
        activityId: reservation.activityId,
        reservationId: reservation.id,
        status: 'declined',
      },
      {
        onSuccess: () => {
          setRejectedReservations((prev) => [...prev, reservation]);
        },
      },
    );
  };

  if (!reservation) {
    return;
  }

  return (
    <div className="mt-[16px]">
      <div className="h-[116px] w-full rounded-[4px] border-[1px] border-gray-dd px-[16px] pb-[12px] pt-[9px]">
        <div>
          <div className="flex gap-[10px]">
            <span className="text-lg font-semibold text-gray-79">닉네임</span>
            <span className="text-lg font-medium">{reservation.nickname}</span>
          </div>
          <div className="flex gap-[10px]">
            <span className="text-lg font-semibold text-gray-79">인원</span>
            <span className="text-lg font-medium">
              {reservation.headCount}명
            </span>
          </div>
        </div>
        <div className="flex justify-end gap-[6px] pt-[5px]">
          <Button
            size="smallModal"
            solid="yes"
            status="active"
            onClick={handleApprove}
          >
            승인하기
          </Button>
          <Button
            size="smallModal"
            solid="no"
            status="active"
            onClick={handleReject}
          >
            거절하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReservationDetailCard;
