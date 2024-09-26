import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IModalPortal } from '@/types/modal';

function ModalPortal({ children }: IModalPortal) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined') return <></>;

  return mounted ? (
    createPortal(children, document.getElementById('modal-root') as HTMLElement)
  ) : (
    <></>
  );
}
export default ModalPortal;
