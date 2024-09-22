import { twMerge } from 'tailwind-merge';

function Button({
  solid = 'yes',
  size,
  status = 'active',
  children,
  ...props
}: IButtonProps) {
  const solidStyle =
    solid === 'yes'
      ? 'border border-black-nomad bg-black-nomad text-white'
      : 'border border-black-nomad  text-black-nomad';

  const sizeStyle = {
    large: 'w-[350px] h-[48px] text-lg font-bold',
    medium: 'w-[144px] h-[48px] text-lg font-bold',
    small: 'w-[108px] h-[38px] text-md font-bold',
  };

  const statusStyle = {
    active: '',
    inactive: 'bg-gray-a4 text-white border border-gray-a4 cursor-not-allowed',
  };

  return (
    <button
      type="button"
      disabled={status === 'inactive'}
      aria-disabled={status === 'inactive'}
      className={twMerge(
        `rounded-[6px] ${solidStyle} ${sizeStyle[size]} ${statusStyle[status]}`,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
