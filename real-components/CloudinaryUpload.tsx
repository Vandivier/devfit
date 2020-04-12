import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface CloudinaryImg {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: Date;
    tags: any[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    existing: boolean;
    original_filename: string;
}

interface CloudinaryUploadProps {
    onUpload: (img: CloudinaryImg) => void;
}

export const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({ onUpload }) => {
    const onDrop = useCallback(async ([file]) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'zl2awopq');
        const upload = await fetch('https://api.cloudinary.com/v1_1/dtskkn5bc/image/upload', {
            method: 'POST',
            body: data,
        });
        const image = await upload.json();
        console.log(image);
        onUpload(image);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
        </div>
    );
};
