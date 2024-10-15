import DropDown from '@/components/Dropdown/Dropdown';
import ReservationDetailCard from './ReservationDetailCard';

function RequestContent({
  selectedDate,
  options,
  reservations,
  label,
  filteredReservations,
  setValue,
  setLabel,
}: ITabContent) {
  const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const reservationData = reservations.find(
    (reservation: any) => reservation.date === dateString,
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
            <DropDown
              size="full"
              label={label}
              options={options}
              setValue={setValue}
              setLabel={setLabel}
              text="black"
              border="green"
            />
          )}
        </div>
      </div>
      <div>
        <span className="text-2lg font-semibold">예약 내역</span>
        {reservationData ? (
          <div>
            <div className="max-h-72 overflow-y-auto">
              {filteredReservations.length > 0 ? (
                filteredReservations.map((reservation: any) => (
                  <ReservationDetailCard
                    key={`${reservation.scheduleId}-${reservation.userId}`}
                    reservation={reservation}
                  />
                ))
              ) : (
                <p className="mt-[15px]">예약 정보가 없습니다.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-[15px]">예약 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default RequestContent;
