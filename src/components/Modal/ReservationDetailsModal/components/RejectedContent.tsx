import DropDown from '@/components/Dropdown/Dropdown';
import ReservationDetailCard from './ReservationDetailCard';

function RejectedContent({ selectedDate, options, reservations }: ITabContent) {
  const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const reservationData = reservations.find(
    (reservation) => reservation.date === dateString,
  );
  return (
    <div>
      <div className="mb-[24px]">
        <span className="text-2lg font-semibold">예약 날짜</span>
        <div className="mt-[16px]">
          <p className="mb-[5px] text-2lg font-regular">
            {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{' '}
            {selectedDate.getDate()}일
          </p>
          {reservationData && reservationData.reservations.pending > 0 && (
            <DropDown size="full" label="14:00 ~ 15:00" options={options} />
          )}
        </div>
      </div>
      <div>
        <span className="text-2lg font-semibold">예약 내역</span>
        {reservationData && reservationData.reservations.pending > 0 && (
          <div>
            <div>
              <ReservationDetailCard />
              <ReservationDetailCard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RejectedContent;
