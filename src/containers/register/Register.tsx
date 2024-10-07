import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import 'react-datepicker/dist/react-datepicker.css';
import axiosInstance from '@/services/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/Button/Button';
import DropDown from '@/components/Dropdown/Dropdown';
import DaumPostcode from 'react-daum-postcode';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import ScheduleInput from './Scheduleinput';
import ImageUploadField from './ImageUploadField';
import { IconPlusTime, IconMinusTime } from '@/assets/icons';
import Image from 'next/image';

const schema = z.object({
  title: z.string().nonempty({ message: '제목을 입력해주세요!' }),
  description: z.string().nonempty({ message: '설명을 입력해주세요!' }),
  price: z.number().positive({ message: '가격을 입력해주세요!' }),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const [availableTimes, setAvailableTimes] = useState<
    { date: Date; startTime: string; endTime: string }[]
  >([]);
  const [selectedTime, setSelectedTime] = useState({
    date: new Date(),
    startTime: '',
    endTime: '',
  });

  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [subImageUrls, setSubImageUrls] = useState<string[]>([]);
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
    },
    onError: (error) => {
      console.error('Activity registration error:', error);
    },
  });

  const handleBannerImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
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

  const addSchedule = () => {
    setAvailableTimes((prev) => [...prev, selectedTime]);
    setSelectedTime({ date: new Date(), startTime: '', endTime: '' });
  };

  const removeSchedule = (index: number) => {
    setAvailableTimes((prev) => prev.filter((_, i) => i !== index));
  };

  const onCompletePost = (data: any) => {
    console.log(data.address);
    setAddress(data.address);
    setIsPostcodeOpen(false);
  };

  const onScheduleChange = (date: Date, startTime: string, endTime: string) => {
    setSelectedTime({ date, startTime, endTime });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById('postcode-modal');
      if (modal && !modal.contains(event.target as Node)) {
        setIsPostcodeOpen(false);
      }
    };

    if (isPostcodeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPostcodeOpen]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[72px] flex w-[792px] flex-col gap-[24px]"
      >
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold">내 체험 등록</h1>
          <Button type="submit" size="small">
            등록하기
          </Button>
        </div>

        <InputField
          label="제목"
          register={register('title')}
          placeholder="제목을 입력해주세요"
          error={errors.title}
        />

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

        <TextAreaField
          label="설명"
          register={register('description')}
          error={errors.description}
          placeholder="설명을 입력해주세요"
        />

        <InputField
          type="number"
          label="가격"
          register={register('price', { valueAsNumber: true })}
          error={errors.price}
          placeholder="가격을 입력해주세요"
        />

        <div className="flex flex-col gap-[16px]">
          <label className="text-2xl font-bold text-black">주소</label>
          <input
            onClick={() => setIsPostcodeOpen(true)}
            value={address}
            placeholder="주소를 입력해주세요"
            className="h-[56px] w-full rounded-[4px] border border-gray-79 pb-2 pl-4 pt-2"
          />
        </div>

        {isPostcodeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
              id="postcode-modal"
              className="w-[400px] max-w-full rounded-lg bg-white p-4 shadow-lg"
            >
              <DaumPostcode onComplete={onCompletePost} />
              <button
                type="button"
                onClick={() => setIsPostcodeOpen(false)}
                className="mt-4 w-full rounded bg-black-nomad px-4 py-2 text-white"
              >
                닫기
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-[16px]">
          <label className="text-2xl font-bold text-black">일정</label>
          <ScheduleInput
            time={selectedTime}
            onScheduleChange={onScheduleChange}
            addSchedule={addSchedule}
          />
          {availableTimes.map((time, index) => (
            <div key={index} className="gap=[21px] flex flex-col">
              <div className="flex items-center justify-between">
                <span className="flex h-[56px] w-[379px] flex-row items-center rounded-[4px] border border-gray-79 pb-[8px] pl-[16px] pt-[8px]">
                  {time.date.toLocaleDateString('ko-KR')}
                </span>
                <span className="flex h-[56px] w-[140px] flex-row items-center rounded-[4px] border border-gray-79 pb-[8px] pl-[16px] pt-[8px]">
                  {' '}
                  {time.startTime}{' '}
                </span>
                <span className="flex h-[56px] w-[140px] flex-row items-center rounded-[4px] border border-gray-79 pb-[8px] pl-[16px] pt-[8px]">
                  {time.endTime}
                </span>
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
            </div>
          ))}
        </div>

        <ImageUploadField
          label="배너 이미지"
          handleImageChange={handleBannerImageChange}
          imagePreview={bannerImageUrl}
          removeImagePreview={removeImagePreview}
        />

        <ImageUploadField
          label="소개 이미지"
          handleImageChange={handleSubImagesChange}
          multiple={true}
          imageUrls={subImageUrls}
          removeImagePreview={removeSubImagePreview}
        />
      </form>
    </>
  );
};

export default Register;
