import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
registerPlugin(FilePondPluginImageExifOrientation);
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import useSettings from '../../store/Context';
import './filepond.scss';

export function Uploader() {
    const [files, setFiles] = React.useState([]);

    const myURL = 'https://api.cloudinary.com/v1_1/dresan22/image/upload';

    const {
      originalImage,
      setOriginalImage,
      publicId,
      setPublicId,
      setUploadComplete,
      uploadComplete,
      setHeight,
      setWidth,
      setOriginalWidth,
      setOriginalHeight,
      imageURL,
      setEditedImage,
    } = useSettings();

  const handleOnLoad = (response) => {
    console.log(`🚀 ~ response:`, response);
    if (!response) return;
    const result = JSON.parse(response);
    console.log(`🚀 ~ result:`, result);
    // console.log(`🚀 ~ responseJSON:`, responseJSON);
    setOriginalImage(result.secure_url);
    setEditedImage(result.secure_url);
    setPublicId(result.public_id);
    setHeight(result.height);
    setWidth(result.width);
    setOriginalWidth(result.width);
    setOriginalHeight(result.height);
    setUploadComplete(true);
    return response.data;
  };

  const moveToCorner = uploadComplete ? 'absolute top-5 right-5 z-10' : '';

  return (
    <div className={`mx-auto ${moveToCorner}`}>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        maxFiles={1}
        server={{
          url: myURL,
          process: {
            method: 'POST',
            withCredentials: false,
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            timeout: 7000,
            onload: handleOnLoad,
            onerror: (response) => response.data,
            ondata: (formData) => {
              formData.append('file', files[0].file);
              formData.append('upload_preset', 'yoalpaao');
              formData.append('api_key', '496498499269514');
              formData.append('timestamp', (Date.now() / 1000) | 0);
              return formData;
            },
          },
        }}
        name='files'
        labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
        credits={false}
      />
    </div>
  );
}




        //         files={files}
        // allowMultiple={false}
        // maxFiles={1}
        // server={{
        //   // url: myURL,
        //   process: {
        //     url: myURL,
        //     method: 'POST',
        //     withCredentials: false,
        //     headers: {
        //       'X-Requested-With': 'XMLHttpRequest',
        //     },
        //     ondata: (formData) => {
        //       formData.append('file', files[0].file);

        //       formData.append('upload_preset', 'dresan22');
        //       formData.append('upload_preset', 'yoalpaao');
        //       formData.append('api_key', '496498499269514');
        //       formData.append('timestamp', (Date.now() / 1000) | 0);
        //       return formData;
        //     },
        //     onload: handleOnLoad,
        //   },
        // }}