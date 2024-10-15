'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ButtonHoverProps {
  children?: React.ReactNode;
  defaultIcon: string;
  hoverIcon: string;
  href: string;
}

const ButtonHover = ({
  children,
  defaultIcon,
  hoverIcon,
  href,
}: ButtonHoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === href) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pathname, href]);

  const activeClass = isHovered || isActive ? 'bg-green-ce text-black' : '';

  return (
    <Link href={href}>
      <button
        className={`${activeClass} flex h-[44px] w-[203px] cursor-pointer items-center rounded-2xl pl-4 text-lg font-bold xl:w-[336px]`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="item-center flex justify-center gap-3.5">
          <Image
            src={isHovered || isActive ? hoverIcon : defaultIcon}
            width={24}
            height={24}
            alt="icon"
          />
          <div>{children}</div>
        </div>
      </button>
    </Link>
  );
};

export default ButtonHover;
