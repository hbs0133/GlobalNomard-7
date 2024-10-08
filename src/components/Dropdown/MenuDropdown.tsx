import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { IconMeatball } from '@/assets/icons';

interface MenuDropDownDropDownProps {
  onEdit: () => void;
  onDelete: () => void;
}

function MenuDropDown({ onEdit, onDelete }: MenuDropDownDropDownProps) {
  const [dropDownVisibility, setDropDownVisibility] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleOutsideClick(e: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setDropDownVisibility(false);
    }
  }

  useEffect(() => {
    if (dropDownVisibility) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropDownVisibility]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setDropDownVisibility(!dropDownVisibility)}
      >
        <Image src={IconMeatball} alt="드롭다운을 여는 토글버튼" />
      </button>

      {dropDownVisibility && (
        <div
          className={`absolute left-[-130px] z-10 mt-2 w-[160px] rounded-lg border bg-white p-[6px] shadow-lg`}
        >
          <ul>
            <li className="rounded-lg hover:bg-black-nomad hover:text-white">
              <button
                type="button"
                className="flex h-[40px] w-full cursor-pointer flex-row items-center justify-center px-4 py-3 transition-colors"
                onClick={() => {
                  onEdit();
                  setDropDownVisibility(false);
                }}
              >
                수정하기
              </button>
            </li>
            <li className="rounded-lg hover:bg-black-nomad hover:text-white">
              <button
                type="button"
                className="flex h-[40px] w-full cursor-pointer items-center justify-center px-4 py-3 transition-colors"
                onClick={() => {
                  onDelete();
                  setDropDownVisibility(false);
                }}
              >
                삭제하기
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

MenuDropDown.defaultProps = {
  square: false,
};

export default MenuDropDown;
