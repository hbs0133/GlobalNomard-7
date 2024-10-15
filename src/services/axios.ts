import axios from 'axios';
import { getAccessTokenWithRefresh } from '@/hooks/useUserStore';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/7-7',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 추가
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 401 오류 시 토큰 갱신
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러가 발생하고, 이 요청이 재시도되지 않았을 때
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // 무한 재시도를 방지하기 위한 플래그

      try {
        // 액세스 토큰 갱신을 시도
        const newAccessToken = await getAccessTokenWithRefresh();

        // 새로운 액세스 토큰을 Authorization 헤더에 설정
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 재시도 요청을 보냄
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
