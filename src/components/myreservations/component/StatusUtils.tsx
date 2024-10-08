export const getStatustext = (status: string): string => {
  switch (status) {
    case 'pending':
      return '예약 완료';
    case 'canceled':
      return '예약 취소';
    case 'declined':
      return '예약 거절';
    case 'completed':
      return '체험 완료';
    case 'confirmed':
      return '예약 승인';
    default:
      return status;
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'text-primary-blue-200';
    case 'canceled':
    case 'completed':
      return 'text-primary-gray-700';
    case 'declined':
      return 'text-primary-red-200';
    case 'confirmed':
      return 'text-primary-orange-200';
    default:
      return '';
  }
};
