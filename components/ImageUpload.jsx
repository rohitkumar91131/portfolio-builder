"use client";

import { CldUploadWidget } from 'next-cloudinary';
import { useCallback } from 'react';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';

const ImageUpload = ({
    onChange,
    value,
    blurDataURL,
    label = "Upload Image"
}) => {

    const handleSuccess = useCallback((result) => {
        console.log("DEBUG: Cloudinary Success:", result);
        if (result.info && result.info.secure_url) {
            onChange(result.info.secure_url);
        } else {
            console.error("DEBUG: Cloudinary Success but no URL:", result);
        }
    }, [onChange]);

    const handleRemove = useCallback((e) => {
        e.stopPropagation(); // prevent triggering upload widget
        onChange("");
    }, [onChange]);

    return (
        <CldUploadWidget
            onSuccess={handleSuccess}
            onUpload={handleSuccess} // Keep for compatibility just in case
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "portfolio_preset"}
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 border-neutral-300 flex flex-col justify-center items-center h-[200px] w-full rounded-lg bg-neutral-50 dark:bg-neutral-900 border-neutral-600 overflow-hidden"
                    >
                        {value ? (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    src={value}
                                    alt="Upload"
                                    placeholder={blurDataURL ? "blur" : "empty"}
                                    blurDataURL={blurDataURL}
                                />
                                <button
                                    onClick={handleRemove}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full z-10 hover:bg-red-600 transition"
                                    type="button"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-neutral-500">
                                <ImagePlus size={40} />
                                <div className="font-semibold text-lg">
                                    {label}
                                </div>
                                <div className="text-xs">
                                    Click to upload
                                </div>
                            </div>
                        )}
                    </div>
                );
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;
