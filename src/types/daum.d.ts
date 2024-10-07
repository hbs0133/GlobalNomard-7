interface DaumPostcode {
  // 다음 우편번호 API에서 사용하는 함수의 타입을 정의합니다.
  new (options: { oncomplete: (data: any) => void }): {
    open: () => void;
  };
}

// window 객체에 daum 속성 추가
declare global {
  interface Window {
    daum: {
      Postcode: DaumPostcode;
    };
  }
}
