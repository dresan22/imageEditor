import { Uploader } from './components/uploader/Uploader';
import { useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
// Import required actions.
import { thumbnail, scale, fill } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { sepia } from '@cloudinary/url-gen/actions/effect';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { opacity, brightness } from '@cloudinary/url-gen/actions/adjust';
import { byAngle } from '@cloudinary/url-gen/actions/rotate';

// Import required qualifiers.
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { Position } from '@cloudinary/url-gen/qualifiers/position';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
// import { roundCorners } from '@cloudinary/url-gen/actions/roundCorners';
import React from 'react';
import { Transformation } from '@cloudinary/url-gen';
// import Navbar from './components/NavBar';
import SimpleAccordion from './components/Accordion';
import Drawer from './components/Drawer';
import { Box } from '@mui/material';
import Editor from './components/Editor';
import useSettings from './store/Context';
import { fit } from '@cloudinary/url-gen/actions/resize';
import { crop } from '@cloudinary/url-gen/actions/resize';
function App() {
  const {
    publicId,
    height,
    width,
    xCoord,
    yCoord,
    editedImage,
    uploadComplete,
    image,
  } = useSettings();
  //cjzckujcuizjomulggg5 publicId

  // const resized = new CloudinaryImage(
  //   'https://res.cloudinary.com/dresan22/image/upload/v1677646287/smikoqgbrfqb8o1qma2n.png'
  // ).resize(fill().width(500).height(300));
  // const cloudinary = new Cloudinary({
  //   cloud: {
  //     cloudName: 'dresan22',
  //   },
  //   url: {
  //     secure: true,
  //   },
  // });

  // const myImage = cloudinary.image(publicId);

  // myImage.resize(
  //   crop().width(width).height(height).x(xCoord).y(yCoord)
  //   // .roundCorners(byRadius(20))
  // );
  // console.log(`🚀 ~ myImage:`, myImage.toURL());
  // // .rotate(byAngle(90)); // Crop the image.
  // // .roundCorners(byRadius(20)) // Round the corners.
  // // .effect(sepia()) // Apply a sepia effect.
  // // .rotate(byAngle(0)) // Rotate the result.
  // // .format('png'); // Deliver as PNG. */

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer />
      <Box component='main' sx={{ flexGrow: 1 }}>
        <div className=' bg-gradient-to-b from-[#113a52]	 to-[#00a28b] h-screen grid place-content-center relative'>
          {/* <img src={image.toURL()} alt='' /> */}
          <Uploader />
          {uploadComplete && <Editor />}
          {/* {<Editor />} */}
          {/* <AdvancedImage cldImg={editedImage} /> */}
        </div>
      </Box>
    </Box>
  );
}

export default App;
