interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  solid?: 'yes' | 'no';
  size:
    | 'large'
    | 'medium'
    | 'small'
    | 'largeModal'
    | 'mediumModal'
    | 'smallModal';
  status?: 'active' | 'inactive';
}
