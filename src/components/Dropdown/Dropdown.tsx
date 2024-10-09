import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { IconArrowDown } from '@/assets/icons';

interface DropDownProps {
  label: string;
  options: { label: string; value: string }[];
  setLabel: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  size: 'small' | 'medium' | 'large' | 'full';
  square?: boolean;
  text: 'green' | 'gray' | 'black';
  border: 'green' | 'gray';
}

function DropDown({
  label,
  options,
  setLabel,
  setValue,
  size,
  square = false,
  text,
  border,
}: DropDownProps) {
  const [dropDownVisibility, setDropDownVisibility] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const sizeStyle = {
    small: 'w-[127px] mobile:w-[90px] tablet:w-[120px]',
    medium: 'w-[160px] mobile:w-[130px] tablet:w-[140px]',
    large: 'w-[792px] mobile:w-[343px] tablet:w-[429px]',
    full: 'w-full',
  };
  const textStyle = {
    green: 'text-green-8b',
    gray: 'text-gray-a1',
    black: 'text-black',
  };
  const borderStyle = {
    green: 'border-green-0B',
    gray: 'border-gray-79',
  };

  const btnClassName = classNames(
    'duration-400 flex h-[53px]',
    sizeStyle[size],
    'items-center justify-between',
    square ? 'rounded-custom-top' : 'rounded-[15px]',
    'border px-[16px] py-[15px] text-2lg font-medium',
    borderStyle[border],
    textStyle[text],
    'transition-all ease-in-out',
    {
      'border-gray-4b': dropDownVisibility,
      'border-gray-79': !dropDownVisibility,
      'text-gray-79': dropDownVisibility,
      'hover:border-gray-79 hover:text-gray-79': !dropDownVisibility,
    },
  );

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
        className={btnClassName}
      >
        {label}
        <span
          className={`duration-600 transition-transform ${dropDownVisibility ? 'rotate-180' : 'rotate-0'}`}
        >
          <Image src={IconArrowDown} alt="화살표 모양 아이콘" />
        </span>
      </button>

      {dropDownVisibility && (
        <div
          className={`absolute z-10 mt-2 ${sizeStyle[size]} rounded-lg border bg-white p-[6px] shadow-lg`}
        >
          <ul>
            {options.map((item) => (
              <li
                key={item.value}
                className="rounded-lg hover:bg-black-nomad hover:text-white"
              >
                <button
                  type="button"
                  className="flex h-[40px] w-full cursor-pointer items-center px-4 py-3 transition-colors"
                  onClick={() => {
                    setLabel(item.label);
                    setValue(item.value);
                    setDropDownVisibility(false);
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

DropDown.defaultProps = {
  square: false,
};

export default DropDown;
