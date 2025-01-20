import React, { useRef, useState, useEffect } from 'react'
import { FaRegFileImage } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const ImageSelector = ({ image, setImage, handleDeleteImg }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const handleRemoveImage = () => {
        setImage(null);
        handleDeleteImg();
    };

    useEffect(() => {
        //If the image prop is a string URL, set it as preview URL
        if (typeof image === 'string') {
            setPreviewUrl(image);
        }
        else if (image) {
            //If the image prop is a File Object, create a preview URL
            setPreviewUrl(URL.createObjectURL(image));
        }
        else {
            //If there is no image, clear the preview URL
            setPreviewUrl(null);
        }

        return () => {
            if (previewUrl && typeof previewUrl === 'string' && !image) {
                URL.revokeObjectURL(previewUrl);
            }
        };

    }, [image]);

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!image ?
                <button
                    className='w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50'
                    onClick={() => onChooseFile()}
                >
                    <div className='w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100'>
                        <FaRegFileImage className='text-xl text-cyan-500' />
                    </div>

                    <p className='text-sm text-slate-500'>Browse Image Files to Upload</p>
                </button> :

                <div className='w-full relative'>
                    <img src={previewUrl} alt="selected" className='w-full h-[300px] object-cover rounded-lg' />

                    <button
                        className='btn-small btn-delete absolute top-2 right-2'
                        onClick={handleRemoveImage}
                    >
                        <MdDeleteOutline className='text-lg' />
                    </button>
                </div>
            }
        </div>
    )
}

export default ImageSelector