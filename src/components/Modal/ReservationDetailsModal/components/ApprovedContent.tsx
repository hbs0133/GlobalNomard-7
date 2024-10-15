import DropDown from '@/components/Dropdown/Dropdown';
import ReservationDetailCard from './ReservationDetailCard';

function ApprovedContent({
  selectedDate,
  options,
  reservations,
  label,
  setValue,
  approvedReservations,
  setLabel,
  // setApprovedReservations,
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
          {reservationData && reservationData.reservations.confirmed > 0 && (
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
              {approvedReservations.length > 0 ? (
                approvedReservations.map((reservation: any) => (
                  <ReservationDetailCard
                    key={`${reservation.scheduleId}-${reservation.userId}`}
                    reservation={reservation}
                    // setApprovedReservations={setApprovedReservations}
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

export default ApprovedContent;
