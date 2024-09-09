import React, { useEffect, useRef, useState } from 'react';

interface DropDownProps {
  label: string;
  options: { label: string; value: string }[];
  setLabel: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function DropDown({ label, options, setLabel, setValue }: DropDownProps) {
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
    <div className="relative w-[320px]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setDropDownVisibility(!dropDownVisibility)}
        className={`duration-400 flex h-[50px] w-[320px] items-center justify-between rounded-lg border px-4 py-3 transition-all ease-in-out ${dropDownVisibility ? 'border-gray-500' : 'border-gray-300'} ${dropDownVisibility ? 'text-gray-500' : 'hover:border-gray-500 hover:text-gray-900'}`}
      >
        {label}
        <span
          className={`duration-600 transition-transform ${dropDownVisibility ? 'rotate-180' : 'rotate-0'}`}
        >
          {dropDownVisibility ? '▲' : '▼'}
        </span>
      </button>

      {dropDownVisibility && (
        <div className="absolute z-10 mt-2 w-[320px] rounded-lg bg-white shadow-lg">
          <ul className="divide-y divide-gray-300">
            {options.map((item) => (
              <li
                key={item.value}
                className="first:rounded-t-lg last:rounded-b-lg"
              >
                <button
                  type="button"
                  className="flex h-[50px] w-full cursor-pointer items-center px-4 py-3 transition-colors hover:bg-gray-100"
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

export default DropDown;
