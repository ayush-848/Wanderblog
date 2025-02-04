import React, { useRef, useState, useEffect } from "react";
import { FaRegFileImage } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const ImageSelector = ({ image, setImage, imageUrlToDelete }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileId, setFileId] = useState(""); // Store ImageKit file ID

  // Handle Image Selection
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Set the local preview but DO NOT upload yet
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setImage(file); // Keep file in state for later upload

      // Optional: If you want to delete the previous image after a new one is confirmed
      if (imageUrlToDelete) {
        await deleteImage(imageUrlToDelete);
      }

      console.log("Image selected for preview:", file);
    }
  };



  // Function to Open File Selector
  const onChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Remove Image and Delete from ImageKit
  const handleRemoveImage = async () => {
    if (fileId) {
      await deleteImage(fileId);
    }
    setImage(null);
    setPreviewUrl(null);
    setFileId("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Upload Image to ImageKit via Backend API

  // Delete Image from ImageKit via Backend API
  const deleteImage = async (fileId) => {
    try {
      await axios.delete(`http://localhost:3000/blogs/delete-image/${fileId}`);
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting the image:", error);
    }
  };

  useEffect(() => {
    let objectUrl;

    if (typeof image === "string") {
      setPreviewUrl(image); // If image is URL, use it directly
    } else if (image instanceof File) {
      objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl); // Cleanup URL to prevent memory leaks
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
        className="hidden"
      />

      {!image ? (
        <button
          className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50 hover:bg-gray-100 transition"
          onClick={onChooseFile}
          aria-label="Browse Image Files to Upload"
        >
          <div className="w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100">
            <FaRegFileImage className="text-2xl text-cyan-500" />
          </div>
          <p className="text-sm text-slate-500">Browse Image Files to Upload</p>
        </button>
      ) : (
        <div className="w-full relative">
          <img
            src={previewUrl}
            alt="Selected preview"
            className="w-full h-[300px] object-cover rounded-lg"
          />

          <button
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
            onClick={handleRemoveImage}
            aria-label="Remove selected image"
          >
            <MdDeleteOutline className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
