'use client';

import {
  IconAccountCheckOutline,
  IconTextBoxCheck,
  IconCog,
  IconCalendarCheck,
  IconPen,
  IconTextBoxCheckOutlineGray,
  IconCalendarCheckOutlineGray,
  IconCogGray,
  IconAccountCheckoutOutlineGray,
} from '@/assets/icons';
import Image from 'next/image';
import React from 'react';
import ButtonHover from './ButtonHover';
import ProfileImage from './ProfileImage';

function SideNavCard(): React.JSX.Element {
  return (
    <div className="flex h-[432px] w-[251px] gap-6 rounded-2xl border border-solid border-gray-dd bg-white drop-shadow-sm md:flex-col xl:h-[432px] xl:w-[384px]">
      <div className="relative mx-auto mt-6 flex items-center justify-center">
        <ProfileImage />
      </div>
      <Image
        className="absolute right-14 top-[140px] xl:right-32"
        src={IconPen}
        width={44}
        height={44}
        alt="연필"
      />
      <div className="mx-auto flex flex-col gap-2 text-gray-a1 xl:h-[200px] xl:w-[336px]">
        <ButtonHover
          href={'/myprofile'}
          defaultIcon={IconAccountCheckoutOutlineGray}
          hoverIcon={IconAccountCheckOutline}
        >
          내 정보
        </ButtonHover>
        <ButtonHover
          href={'/myreservations'}
          defaultIcon={IconTextBoxCheckOutlineGray}
          hoverIcon={IconTextBoxCheck}
        >
          예약 내역
        </ButtonHover>
        <ButtonHover
          href={'/myactivities'}
          defaultIcon={IconCogGray}
          hoverIcon={IconCog}
        >
          내 체험 관리
        </ButtonHover>
        <ButtonHover
          href={'/reservation-schedule'}
          defaultIcon={IconCalendarCheckOutlineGray}
          hoverIcon={IconCalendarCheck}
        >
          예약 현황
        </ButtonHover>
      </div>
    </div>
  );
}

export default SideNavCard;
