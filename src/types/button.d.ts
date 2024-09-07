interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  solid?: 'yes' | 'no';
  size: 'large' | 'medium' | 'small';
  status?: 'active' | 'inactive';
}
