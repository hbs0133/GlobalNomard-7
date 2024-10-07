import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axiosInstance from '@/services/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/Button/Button';
import DropDown from '@/components/Dropdown/Dropdown';
import {
  IconImageRegister,
  IconDelete40px,
  IconPlusTime,
  IconMinusTime,
} from '@/assets/icons';
import Image from 'next/image';
import DaumPostcode from 'react-daum-postcode';

// Zod 스키마로 입력 데이터 검증
const schema = z.object({
  title: z.string().nonempty({ message: '제목을 입력해주세요!' }),
  description: z.string().nonempty({ message: '설명을 입력해주세요!' }),
  price: z.number().positive({ message: '가격을 입력해주세요!' }),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const [availableTimes, setAvailableTimes] = useState([
    { date: new Date(), startTime: '', endTime: '' },
  ]);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [subImageUrls, setSubImageUrls] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<string>('카테고리를 선택해주세요');
  const [address, setAddress] = useState<string>('');
  const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false);
  const categoryOptions = [
    { label: '문화 예술', value: '문화 예술' },
    { label: '식음료', value: '식음료' },
    { label: '스포츠', value: '스포츠' },
    { label: '투어', value: '투어' },
    { label: '관광', value: '관광' },
    { label: '웰빙', value: '웰빙' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  //이미지 업로드 함수
  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const { data } = await axiosInstance.post(
          '/activities/image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        return data.activityImageUrl;
      } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
      }
    },
  });

  //제출 mutation
  const submitDataMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosInstance.post('/activities', formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['activities']);
      alert('등록이 성공적으로 완료되었습니다!');
    },
    onError: (error) => {
      console.error('Activity registration error:', error);
      alert('실패');
    },
  });

  // 이미지추가 클릭 미리보기,url생성함수 호출
  const handleBannerImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const url = await uploadImageMutation.mutateAsync(file);
      setBannerImageUrl(url);
    }
  };

  const handleSubImagesChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files) {
      const urls = await Promise.all(
        Array.from(files).map((file) => uploadImageMutation.mutateAsync(file)),
      );
      setSubImageUrls(urls);
    }
  };

  const removeImagePreview = () => {
    setImagePreview(null);
    setBannerImageUrl(null);
  };

  const removeSubImagePreview = (index: number) => {
    setSubImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    const postData = {
      ...data,
      category: selectedCategory,
      bannerImageUrl,
      subImageUrls,
      address: address,
      schedules: availableTimes.map((time) => ({
        ...time,
        date: time.date.toISOString().split('T')[0],
      })),
    };
    console.log('데이터', postData);
    try {
      submitDataMutation.mutate(postData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // 일정 추가함수
  const addSchedule = () => {
    setAvailableTimes((prev) => [
      ...prev,
      { date: new Date(), startTime: '', endTime: '' },
    ]);
  };

  // 일정 제거함수
  const removeSchedule = (index: number) => {
    setAvailableTimes((prev) => prev.filter((_, i) => i !== index));
  };

  const onCompletePost = (data: any) => {
    setAddress(data.address);
    setIsPostcodeOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[72px] flex w-[792px] flex-col gap-[24px]"
      >
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold">내 체험 등록</h1>
          <div>
            <Button type="submit" size="small">
              등록하기
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <label className="text-2xl font-bold text-black">제목</label>
          <input
            {...register('title')}
            className="h-[56px] w-full rounded-[4px] border border-gray-79 pb-2 pl-4 pt-2"
            placeholder="제목을 입력해주세요"
          />
          {errors.title && (
            <span className="text-sm text-red-500">{errors.title.message}</span>
          )}
        </div>

        {/* 카테고리 */}
        <div className="flex flex-col gap-[16px]">
          <label className="text-2xl font-bold text-black">카테고리</label>
          <DropDown
            label={selectedCategory}
            options={categoryOptions}
            setLabel={setSelectedCategory}
            setValue={setSelectedCategory}
            size="large"
            text="gray"
            border="gray"
            square={true}
          />
        </div>

        {/* 설명 */}
        <div className="flex flex-col gap-[16px]">
          <label className="text-2xl font-bold text-black">설명</label>
          <textarea
            {...register('description')}
            placeholder="설명을 입력해주세요"
            className="h-[222px] w-full rounded-[4px] border border-gray-79 pb-[8px] pl-[16px] pt-[8px]"
          />
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* 가격 */}
        <div className="flex flex-col gap-[16px]">
          <label className="text-2xl font-bold text-black">가격</label>
          <input
            type="number"
            {...register('price', { valueAsNumber: true })}
            placeholder="가격을 입력해주세요"
            className="h-[56px] w-full rounded-[4px] border border-gray-79 pb-2 pl-4 pt-2"
          />
          {errors.price && (
            <span className="text-sm text-red-500">{errors.price.message}</span>
          )}
        </div>

        {/* 주소 */}
        <div className="flex flex-col gap-[16px]">
          <label className="text-2xl font-bold text-black">주소</label>
          <input
            onClick={() => setIsPostcodeOpen(true)}
            value={address}
            placeholder="주소를 입력해주세요"
            className="h-[56px] w-full rounded-[4px] border border-gray-79 pb-2 pl-4 pt-2"
          />
          {isPostcodeOpen && (
            <div className="modal">
              <DaumPostcode onComplete={onCompletePost} />
            </div>
          )}
        </div>

        {/* 일정 */}
        <div className="flex flex-col gap-[16px]">
          <label className="text-2xl font-bold text-black">일정</label>
          {availableTimes.map((time, index) => (
            <div key={index} className="flex items-center space-x-4">
              <DatePicker
                selected={time.date}
                onChange={(date) =>
                  setAvailableTimes((prev) => {
                    const updated = [...prev];
                    updated[index].date = date as Date;
                    return updated;
                  })
                }
                dateFormat="yyyy-MM-dd"
                className="block w-1/3 rounded-md border-gray-300 shadow-sm"
              />
              <input
                type="time"
                value={time.startTime}
                onChange={(e) =>
                  setAvailableTimes((prev) => {
                    const updated = [...prev];
                    updated[index].startTime = e.target.value;
                    return updated;
                  })
                }
                className="block w-1/4 rounded-md border-gray-300 shadow-sm"
              />
              <input
                type="time"
                value={time.endTime}
                onChange={(e) =>
                  setAvailableTimes((prev) => {
                    const updated = [...prev];
                    updated[index].endTime = e.target.value;
                    return updated;
                  })
                }
                className="block w-1/4 rounded-md border-gray-300 shadow-sm"
              />
              <button type="button" onClick={addSchedule}>
                <Image
                  src={IconPlusTime}
                  alt="일정을 추가하는 +모양 아이콘"
                  width={56}
                  height={56}
                />
              </button>
              <button
                type="button"
                onClick={() => removeSchedule(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Image
                  src={IconMinusTime}
                  alt="일정을 제거하는 -모양 아이콘"
                  width={56}
                  height={56}
                />
              </button>
            </div>
          ))}
        </div>

        {/* 배너 이미지 */}
        <div className="flex flex-col gap-[16px]">
          <label className="text-2xl font-bold text-black">배너 이미지</label>
          <div className="flex flex-row gap-[24px]">
            <label>
              <Image
                src={IconImageRegister}
                alt="이미지등록을 할수있는 버튼이미지"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerImageChange}
                className="hidden"
              />
            </label>
            {imagePreview && (
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="이미지 미리보기"
                  width={180}
                  height={180}
                  className="h-[180px] object-contain"
                />
                <button type="button" onClick={removeImagePreview}>
                  <Image
                    src={IconDelete40px}
                    alt="배너이미지를 삭제할수있는 x모양 아이콘"
                    className="absolute right-0 top-[-20px]"
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 서브 이미지 */}
        <div className="flex flex-col gap-[16px]">
          <label className="text-2xl font-bold text-black">소개 이미지</label>
          <div className="flex flex-row gap-[24px]">
            <label>
              <Image
                src={IconImageRegister}
                alt="이미지등록을 할수있는 버튼이미지"
              />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleSubImagesChange}
                className="hidden"
              />
            </label>
            <div>
              {subImageUrls.map((url, index) => (
                <div className="relative">
                  <Image
                    key={index}
                    src={url}
                    alt={`서브 이미지 ${index + 1}`}
                    width={180}
                    height={180}
                    className="h-[180px] object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => removeSubImagePreview(index)}
                    className="absolute right-0 top-[-20px]"
                  >
                    <Image
                      src={IconDelete40px}
                      alt="서브 이미지를 삭제할수있는 x모양 아이콘"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
