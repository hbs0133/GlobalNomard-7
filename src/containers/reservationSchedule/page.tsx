import React, { useState } from 'react';
import DropDown from '@/components/Dropdown/Dropdown';
import Calendar from './components/Calendar';
import axiosInstance from '@/services/axios';
import { useQuery } from '@tanstack/react-query';

const useReservationDashboard = (
  activityId: number | undefined | string,
  year: string,
  month: string,
) => {
  return useQuery({
    queryKey: ['reservationDashboard', activityId, year, month],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/my-activities/${activityId}/reservation-dashboard`,
        {
          params: {
            year,
            month,
          },
        },
      );
      return response.data;
    },
    enabled: !!activityId,
  });
};

const useActivities = (cursorId: any, size: any) => {
  return useQuery({
    queryKey: ['activities', cursorId, size],
    queryFn: async () => {
      const response = await axiosInstance.get('/my-activities', {
        params: {
          cursorId,
          size,
        },
      });
      return response.data;
    },
    enabled: cursorId !== undefined && size !== undefined,
  });
};

function ReservationSchedule() {
  const [selectedLabel, setSelectedLabel] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString();
  const activityId = selectedValue;

  const { data: reservations = [] } = useReservationDashboard(
    activityId,
    year,
    month,
  );

  const cursorId = null;
  const size = 10;
  const { data: activitiesData = [] } = useActivities(cursorId, size);
  const activities = activitiesData.activities || [];

  const options = activities.map((activity: any) => ({
    label: activity.title,
    value: activity.id,
  }));

  const changeMonth = (increment: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  return (
    <>
      <div className="flex">
        <div className="max-w-[800px] flex-1 font-bold">
          <h1 className="mb-[32px] text-3xl">예약 현황</h1>
          <DropDown
            label={selectedLabel}
            options={options}
            setLabel={setSelectedLabel}
            setValue={setSelectedValue}
            size="full"
            text="black"
            border="gray"
          />
          {options.map(
            (option: any) =>
              option.value === selectedValue && (
                <Calendar
                  key={option.value}
                  reservations={reservations}
                  changeMonth={changeMonth}
                  currentDate={currentDate}
                  activityId={selectedValue}
                />
              ),
          )}
        </div>
      </div>
    </>
  );
}

export default ReservationSchedule;
