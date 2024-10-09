import postTokens from './postTokens'; // 토큰 갱신 함수
import createParams from './createParams';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// 클라이언트에서 토큰을 localStorage로 가져오기
const getDefaultHeaders = (isMultipart: boolean = false): HeadersInit => {
  const headers: HeadersInit = {
    Accept: 'application/json',
  };

  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }

  const token = localStorage.getItem('accessToken'); // localStorage에서 토큰 가져오기
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const createQueryString = (
  url: string,
  params?: Record<string, string | number>,
): string => (params ? `${url}?${createParams(params)}` : url);

// 메인 함수: 전체적인 fetch 로직을 관리
const fetchInstance = async <T>(
  url: string,
  options: RequestInit & {
    params?: Record<string, string | number>;
    isMultipart?: boolean;
  } = {},
  onError?: (error: unknown) => Error,
): Promise<T> => {
  const queryString = createQueryString(url, options.params);
  const fullUrl = `${baseUrl}${queryString}`;

  try {
    const response = await performFetch(fullUrl, options);
    return await handleResponse<T>(response, fullUrl, options);
  } catch (error) {
    if (onError) {
      throw onError(error);
    } else {
      throw createError(error);
    }
  }
};

// fetch 호출을 위한 별도 함수 생성으로 중복 제거 및 재사용성 향상
const performFetch = async (
  url: string,
  options: RequestInit & { isMultipart?: boolean },
): Promise<Response> => {
  const headers = new Headers({
    ...getDefaultHeaders(options.isMultipart),
    ...options.headers,
  });

  return fetch(url, { ...options, headers });
};

// 응답 처리 로직을 별도 함수로 분리하여 메인 함수의 복잡도 감소
const handleResponse = async <T>(
  response: Response,
  url: string,
  options: RequestInit & { isMultipart?: boolean },
): Promise<T> => {
  if (response.ok) {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      try {
        return await response.json();
      } catch (error) {
        throw new Error('Failed to parse JSON response');
      }
    } else {
      return {} as T; // JSON 응답이 아닌 경우 빈 객체 반환
    }
  }

  if (response.status === 401) {
    return handleUnauthorized<T>(url, options);
  }

  const error = await response.text().catch(() => 'Unknown error');
  throw new Error(error);
};

// 401 Unauthorized 에러 처리를 위한 별도 함수
const handleUnauthorized = async <T>(
  url: string,
  options: RequestInit & { isMultipart?: boolean },
): Promise<T> => {
  const refreshToken = localStorage.getItem('refreshToken'); // 클라이언트에서 refreshToken 가져오기
  if (!refreshToken) {
    throw new Error('Unauthorized: No refresh token available');
  }

  try {
    await postTokens(); // 토큰 갱신 로직
    const retryResponse = await performFetch(url, options);
    if (retryResponse.ok) {
      return retryResponse.json();
    }
    throw new Error('Failed to refresh token');
  } catch (error) {
    throw createError(error);
  }
};

// 일관된 에러 생성을 위한 헬퍼 함수
const createError = (error: unknown): Error => {
  return new Error(error instanceof Error ? error.message : 'Request failed');
};

export default fetchInstance;
