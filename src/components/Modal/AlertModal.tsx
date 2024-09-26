import BaseModal from './BaseModal';

function AlertModal({ size, footerButton, children }: IAlertModal) {
  return (
    <BaseModal size={size} footerButton={footerButton}>
      <div className="flex h-full flex-col items-center justify-end">
        <p className="text-center text-lg font-medium">{children}</p>
      </div>
    </BaseModal>
  );
}

export default AlertModal;
