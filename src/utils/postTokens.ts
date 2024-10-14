import { IAuthTokens } from '@/types/user';
import fetchInstance from '@/utils/fetchInstance';

const postTokens = async (): Promise<IAuthTokens> => {
  try {
    // 서버에서 액세스 토큰을 새로 발급받음
    const data = await fetchInstance<IAuthTokens>('auth/tokens', {
      method: 'POST',
    });

    if (data.accessToken) {
      // 클라이언트에서 localStorage에 토큰 저장
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken); // 필요 시 리프레시 토큰도 저장
    } else {
      throw new Error('Access token is missing');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Re-issuance failed');
    } else {
      throw new Error('Re-issuance failed');
    }
  }
};

export default postTokens;
