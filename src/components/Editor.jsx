import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'two-up-element';
import 'cropperjs/dist/cropper.css';
import useSettings from '../store/Context';
import { AdvancedImage } from '@cloudinary/react';

import 'react-image-crop/dist/ReactCrop.css';

export default function Editor() {
  const [cropper, setCropper] = useState();
  const {
    url,
    setUrl,
    height,
    setHeight,
    width,
    setWidth,
    setXCoord,
    setYCoord,
    setEditedImage,
    originalImage,
    originalHeight,
    originalWidth,
    setOriginalWidth,
    setOriginalHeight,
    cropping,
    setCropping,
    imgURL,
    setImgURL,
    editedImage,
    xCoord,
    yCoord,
    image,
    edited,
    imageURL,
  } = useSettings();

  const handleRestore = () => {
    setEditedImage(originalImage);
  };

  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    setCropper(imageElement?.cropper);
  };

  const handleCropButtonClick = () => {
    if (typeof cropper !== 'undefined') {
      setXCoord(Math.round(cropper.getData().x));
      setYCoord(Math.round(cropper.getData().y));
      setWidth(Math.round(cropper.getData().width));
      setHeight(Math.round(cropper.getData().height));
      setEditedImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className={`rounded-2xl overflow-hidden shadow-xl`}>
      <two-up>
        <div className='relative max-h-[50rem] max-w-[60rem] bg-black bg-opacity-25'>
          <img
            src={originalImage}
            ref={cropperRef}
            // src='https://res.cloudinary.com/dresan22/image/upload/v1677650681/cjzckujcuizjomulggg5.jpg'
            // src='https://res.cloudinary.com/dresan22/image/upload/v1677735626/hxvup3nagfv28yxfa9hb.png'
            alt='Original image'
            className='h-full w-full  object-contain object-center'
          />
        </div>
        <div className='relative max-h-[50rem] max-w-[60rem]'>
          <Cropper
            src={editedImage}
            className='h-full w-full  object-contain object-center'
            highlight={false}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
          />
          <button
            className='absolute right-2 bottom-2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleRestore}
          >
            Restore
          </button>
          <button
            className='absolute right-28 bottom-2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleCropButtonClick}
          >
            Crop
          </button>
        </div>
      </two-up>
      {/* <AdvancedImage cldImg={image} /> */}
    </div>
  );
}
