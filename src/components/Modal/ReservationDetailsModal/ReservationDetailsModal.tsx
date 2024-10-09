import { useState } from 'react';
import BaseModal from '../BaseModal';
import ApprovedContent from './components/ApprovedContent';
import RejectedContent from './components/RejectedContent';
import RequestContent from './components/RequestContent';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/services/axios';

const useReservedSchedule = (activityId, date) => {
  return useQuery({
    queryKey: ['reservedSchedule', activityId, date],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/my-activities/${activityId}/reserved-schedule`,
        {
          params: { date },
        },
      );
      return response.data;
    },
    enabled: !!activityId && !!date,
  });
};

function ReservationDetailsModal({
  modalPosition,
  selectedDate,
  reservations,
  activityId,
}: IReservationDetailsModal) {
  if (!selectedDate) {
    return null;
  }

  const [activeTab, setActiveTab] = useState('requestTab');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const { data: reservedSchedule = [] } = useReservedSchedule(
    activityId,
    dateString,
  );

  const options = reservedSchedule.map((schedule) => ({
    label: `${schedule.startTime} ~ ${schedule.endTime}`,
    value: `${schedule.startTime} ~ ${schedule.endTime}`,
  }));

  // const filteredReservations = reservedSchedule.filter(
  //   (schedule) =>
  //     `${schedule.startTime} ~ ${schedule.endTime}` === selectedTimeSlot,
  // );

  const filteredReservations = reservedSchedule.filter(
    (schedule) =>
      `${schedule.startTime} ~ ${schedule.endTime}` === selectedTimeSlot &&
      schedule.count.pending > 0,
  );

  const requestCount = reservedSchedule.reduce((total, schedule) => {
    return total + schedule.count.pending;
  }, 0);

  const approvedCount = reservedSchedule.reduce((total, schedule) => {
    return total + schedule.count.confirmed;
  }, 0);

  const rejectedCount = reservedSchedule.reduce((total, schedule) => {
    return total + schedule.count.declined;
  }, 0);

  const tabs = [
    { label: '신청', value: 'requestTab', count: requestCount },
    { label: '승인', value: 'approvedTab', count: approvedCount },
    { label: '거절', value: 'rejectedTab', count: rejectedCount },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'requestTab':
        return (
          <RequestContent
            reservations={reservations}
            selectedDate={selectedDate}
            options={options}
            // label={options[0]?.label}
            label={selectedTimeSlot}
            filteredReservations={filteredReservations}
            setValue={handleTimeSlotChange}
            setLabel={(label) => {}}
          />
        );
      case 'approvedTab':
        return (
          <ApprovedContent
            reservations={reservations}
            selectedDate={selectedDate}
            options={options}
            label={options[0]?.label}
          />
        );
      case 'rejectedTab':
        return (
          <RejectedContent
            reservations={reservations}
            selectedDate={selectedDate}
            options={options}
            label={options[0]?.label}
          />
        );
      default:
        return (
          <RequestContent
            reservations={reservations}
            selectedDate={selectedDate}
            options={options}
          />
        );
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTimeSlotChange = (value) => {
    setSelectedTimeSlot(value);
  };

  return (
    <BaseModal
      type="nonModal"
      size={
        activeTab === 'requestTab'
          ? 'reservationDetailLarge'
          : 'reservationDetailMedium'
      }
      titleContent="예약 정보"
      tStyle="reservationDetail"
      xStyle="reservationDetail"
      footerButton={null}
      modalPosition={modalPosition}
    >
      <div className="mx-[-24px] my-[27px] border-b-[1px] border-gray-dd pb-[10px] mobile:mx-[-15px]">
        <div className="mx-[24px] flex gap-[12px]">
          {tabs.map((tab) => (
            <button
              className={`relative flex flex-col items-center hover:font-bold hover:text-green-0B ${tab.value === activeTab && 'font-bold text-green-0B'}`}
              type="button"
              key={tab.value}
              onClick={() => handleTabClick(tab.value)}
            >
              <div className="flex gap-[4px]">
                <span className="text-2lg font-regular">{tab.label}</span>
                <span className="text-2lg font-regular">{tab.count}</span>
              </div>
              {tab.value === activeTab && (
                <hr className="absolute top-[34px] h-[4px] w-[60px] rounded-[12px] border-green-0B bg-green-0B" />
              )}
            </button>
          ))}
        </div>
      </div>
      {renderContent()}
    </BaseModal>
  );
}

export default ReservationDetailsModal;
