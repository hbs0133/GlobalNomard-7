import { useState } from 'react';
import BaseModal from '../BaseModal';
import ApprovedContent from './components/ApprovedContent';
import RejectedContent from './components/RejectedContent';
import RequestContent from './components/RequestContent';

function ReservationDetailsModal() {
  const [activeTab, setActiveTab] = useState('requestTab');

  const tabs = [
    { label: '신청', value: 'requestTab', count: 2 },
    { label: '승인', value: 'approvedTab', count: 0 },
    { label: '거절', value: 'rejectedTab', count: 0 },
  ];

  const options = [
    { label: '14:00 ~ 15:00', value: '14:00 ~ 15:00' },
    { label: '16:00 ~ 17:00', value: '16:00 ~ 17:00' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'requestTab':
        return <RequestContent options={options} />;
      case 'approvedTab':
        return <ApprovedContent options={options} />;
      case 'rejectedTab':
        return <RejectedContent options={options} />;
      default:
        return <RequestContent options={options} />;
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <BaseModal
      type="nonModal"
      size={
        activeTab === 'requestTab'
          ? 'reservationDetailLarge'
          : 'reservationDetailMedium'
      }
      titleContent="예약 정보"
      tStyle="reservationDetail"
      xStyle="reservationDetail"
      footerButton={null}
    >
      <div className="mx-[-24px] my-[27px] border-b-[1px] border-gray-dd pb-[10px] mobile:mx-[-15px]">
        <div className="mx-[24px] flex gap-[12px]">
          {tabs.map((tab) => (
            <button
              className={`relative flex flex-col items-center hover:font-bold hover:text-green-0B ${tab.value === activeTab && 'font-bold text-green-0B'}`}
              type="button"
              key={tab.value}
              onClick={() => handleTabClick(tab.value)}
            >
              <div className="flex gap-[4px]">
                <span className="text-2lg font-regular">{tab.label}</span>
                <span className="text-2lg font-regular">{tab.count}</span>
              </div>
              {tab.value === activeTab && (
                <hr className="absolute top-[34px] h-[4px] w-[60px] rounded-[12px] border-green-0B bg-green-0B" />
              )}
            </button>
          ))}
        </div>
      </div>
      {renderContent()}
    </BaseModal>
  );
}

export default ReservationDetailsModal;
