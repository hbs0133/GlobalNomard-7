import React from 'react';

interface InputFieldProps {
  label: string;
  register: any;
  error?: { message?: string };
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  register,
  error,
  placeholder,
  type,
}) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <label className="text-2xl font-bold text-black">{label}</label>
      <input
        {...register}
        type={type}
        className="h-[56px] w-full rounded-[4px] border border-gray-79 pb-2 pl-4 pt-2 placeholder:text-2lg placeholder:font-medium focus:outline-none"
        placeholder={placeholder}
      />
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
};

export default InputField;
