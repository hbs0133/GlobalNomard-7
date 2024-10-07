import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/7-7',
  headers: {
    'Content-Type': 'application/json', // 이 기본 헤더는 모든 요청에 적용됩니다
  },
});

// 요청 인터셉터를 통해 토큰 추가
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

export default axiosInstance;
