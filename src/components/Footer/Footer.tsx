import {
  IconFacebook,
  IconInstargram,
  IconTwiter,
  IconYoutube,
} from '@/assets/icons';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex h-[160px] w-full items-start justify-center bg-black-nomad text-lg font-regular text-gray-79">
      <div className="mt-[32px] flex w-[1200px] items-center justify-between">
        <div>©codeit - 2023</div>
        <div className="flex gap-[30px]">
          <Link href="/">Privacy Policy</Link>
          <Link href="/">FAQ</Link>
        </div>
        <div className="flex gap-[12px]">
          <a href="www.facebook.com">
            <Image
              src={IconFacebook}
              alt="페이스북 바로가기를 하는 페이스북 아이콘"
              width={20}
              height={20}
            />
          </a>
          <a href="www.twier.com">
            <Image
              src={IconTwiter}
              alt="트위터 바로가기를 하는 페이스북 아이콘"
              width={20}
              height={20}
            />
          </a>
          <a href="www.facebook.com">
            <Image
              src={IconYoutube}
              alt="유튜브 바로가기를 하는 페이스북 아이콘"
              width={20}
              height={20}
            />
          </a>
          <a href="www.instagram.com">
            <Image
              src={IconInstargram}
              alt="인스타그램 바로가기를 하는 페이스북 아이콘"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
