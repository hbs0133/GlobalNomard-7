export const getStatusText: Record<string, string> = {
  pending: '예약 완료',
  canceled: '예약 취소',
  declined: '예약 거절',
  completed: '체험 완료',
  confirmed: '예약 승인',
};
export const getStatusColor: Record<string, string> = {
  pending: 'text-primary-blue-200',
  canceled: 'text-primary-gray-700',
  completed: 'text-primary-gray-700',
  declined: 'text-primary-red-200',
  confirmed: 'text-primary-orange-200',
};
