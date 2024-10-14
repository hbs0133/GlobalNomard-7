import React from 'react';
import Image from 'next/image';
import { IconImageRegister, IconDelete40px } from '@/assets/icons';

interface ImageUploadFieldProps {
  label: string;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview?: string | null;
  removeImagePreview: any;
  multiple?: boolean;
  imageUrls?: string[];
  removeImagePreviewCallback?: (index: number) => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  handleImageChange,
  imagePreview,
  removeImagePreview,
  multiple = false,
  imageUrls = [],
  removeImagePreviewCallback,
}) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <label className="text-2xl font-bold text-black">{label}</label>
      <div className="flex flex-row gap-[24px]">
        <label>
          <Image
            src={IconImageRegister}
            alt="이미지등록을 할수있는 버튼이미지"
          />
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleImageChange}
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
        {imageUrls.map((url, index) => (
          <div className="relative" key={index}>
            <Image
              src={url}
              alt={`서브 이미지 ${index + 1}`}
              width={180}
              height={180}
              className="h-[180px] object-contain"
            />
            <button
              type="button"
              onClick={() =>
                removeImagePreviewCallback && removeImagePreviewCallback(index)
              }
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
  );
};

export default ImageUploadField;
