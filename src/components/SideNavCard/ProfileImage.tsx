import { useEffect, useState } from 'react';

const ProfileImage = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('user/me');
      const jsonData = await response.json();
    };
  });
  return (
    <div className="h-[160px] w-[160px] justify-center rounded-full bg-gray-dd"></div>
  );
};

export default ProfileImage;
