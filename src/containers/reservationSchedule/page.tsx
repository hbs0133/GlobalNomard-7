import React, { useState } from 'react';
import SideNavCard from '@/components/SideNavCard/SideNavCard';
import DropDown from '@/components/Dropdown/Dropdown';
import Calendar from './components/Calendar';

const options = [
  {
    label: '함께 배우면 즐거운 스트릿 댄스',
    value: '함께 배우면 즐거운 스트릿 댄스',
  },
  {
    label: '최강록의 1타 장조림 요리 강습',
    value: '최강록의 1타 장조림 요리 강습',
  },
  {
    label: '신나는 팝송 작곡 클래스',
    value: '신나는 팝송 작곡 클래스',
  },
];

function ReservationSchedule() {
  const [selectedLabel, setSelectedLabel] = useState(options[0].label);
  const [selectedValue, setSelectedValue] = useState(options[0].value);

  return (
    <>
      <div className="mb-[72px] h-[70px] w-full bg-gray-dd"></div>
      <div className="flex">
        <SideNavCard />
        <div className="mx-[24px] max-w-[800px] flex-1 font-bold">
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
            (option) =>
              option.value === selectedValue && <Calendar key={option.value} />,
          )}
        </div>
      </div>
    </>
  );
}

export default ReservationSchedule;
