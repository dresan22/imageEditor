import { createContext, useContext, useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { crop, fill, scale } from '@cloudinary/url-gen/actions/resize';
import { byAngle } from '@cloudinary/url-gen/actions/rotate';
import { grayscale } from '@cloudinary/url-gen/actions/effect';

export const Context = createContext({});

export const EditorProvider = ({ children }) => {
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'dresan22',
    },
    url: {
      secure: true,
    },
  });

  const [url, setUrl] = useState('');
  const [originalImage, setOriginalImage] = useState('');
  // console.log(`🚀 ~ originalImage:`, originalImage);
  const [editedImage, setEditedImage] = useState('');
  // console.log(`🚀 ~ editedImage:`, editedImage);
  const [files, setFiles] = useState([]);
  const [publicId, setPublicId] = useState([]);
  const [cropData, setCropData] = useState('#');
  const [xCoord, setXCoord] = useState(0);
  const [yCoord, setYCoord] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [cropping, setCropping] = useState(false);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [angle, setAngle] = useState(0);
  const [effectList, setEffectList] = useState([]);

  const image = cloudinary.image(publicId);

  image
    .resize(crop().width(width).height(height).x(xCoord).y(yCoord))
    .rotate(byAngle(angle));

  const [imageURL, setImageURL] = useState(image.toURL());

  const [originalWidth, setOriginalWidth] = useState(image.width);
  const [originalHeight, setOriginalHeight] = useState(image.height);

  const addGrayscale = (image) => {
    image.effect(grayscale());
    setEditedImage(image.toURL());
    console.log(`🚀 ~ image.toURL():`, image.toURL());
  };

  const rotateImage = (image) => {
    image.rotate(byAngle(angle));
    setEditedImage(image.toURL());
    return image;
  };

  const systemVariables = {
    url,
    setUrl,
    height,
    setHeight,
    width,
    setWidth,
    originalImage,
    setOriginalImage,
    files,
    setFiles,
    publicId,
    setPublicId,
    cropData,
    setCropData,
    xCoord,
    setXCoord,
    yCoord,
    setYCoord,
    uploadComplete,
    setUploadComplete,
    angle,
    setAngle,
    originalHeight,
    setOriginalHeight,
    originalWidth,
    setOriginalWidth,
    editedImage,
    setEditedImage,
    image,
    addGrayscale,
    imageURL,
    rotateImage,
  };

  return (
    <Context.Provider value={systemVariables}>{children}</Context.Provider>
  );
};

const useSettings = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useRecipe must be used withing Context');
  }
  return context;
};

export default useSettings;
