import React from 'react';

interface TextAreaFieldProps {
  label: string;
  register: any;
  error?: { message?: string };
  placeholder?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  register,
  error,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <label className="text-2xl font-bold text-black">{label}</label>
      <textarea
        {...register}
        placeholder={placeholder}
        className="h-[222px] w-full resize-none rounded-[4px] border border-gray-79 pb-[8px] pl-[16px] pt-[8px] placeholder:text-2lg placeholder:font-medium focus:outline-none"
      />
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
};

export default TextAreaField;
