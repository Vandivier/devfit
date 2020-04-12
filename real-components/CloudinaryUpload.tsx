import React, { useEffect } from 'react';

interface CloudinaryUploadProps {}

export const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({}) => {
    useEffect(() => {
        const id = setInterval(() => {
            if (!('cloudinary' in window)) {
                return;
            }
            console.log('only see me once :)');
            clearInterval(id);
            var myWidget = (window as any).cloudinary.createUploadWidget(
                {
                    cloudName: 'dtskkn5bc', // @todo
                    uploadPreset: 'my_preset', // @todo
                },
                (error, result) => {
                    if (!error && result && result.event === 'success') {
                        console.log('Done! Here is the image info: ', result.info);
                    }
                }
            );

            document.getElementById('upload_widget').addEventListener(
                'click',
                function () {
                    myWidget.open();
                },
                false
            );
        }, 500);

        return () => {
            clearInterval(id);
        };
    }, []);

    return (
        <>
            <button id="upload_widget" className="cloudinary-button">
                Upload files
            </button>
            <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
        </>
    );
};
