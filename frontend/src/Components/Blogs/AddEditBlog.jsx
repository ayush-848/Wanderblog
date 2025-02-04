import React, { useState } from 'react';
import { MdAdd, MdClose, MdUpdate } from 'react-icons/md';
import axiosInstance from '../../utils/api';
import moment from 'moment';
import { toast } from 'react-toastify';
import uploadImage from '../../utils/uploadImage';
import DateSelector from "./DateSelector";
import ImageSelector from "./ImageSelector";
import TagInput from './TagInput';
import { useClerk } from '@clerk/clerk-react';

const AddEditBlog = ({ storyInfo, type, onClose, getAllBlogs }) => {
    const [title, setTitle] = useState(storyInfo?.title || "");
    const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
    const [story, setStory] = useState(storyInfo?.story || "");
    const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || []);
    const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null);

    const [error, setError] = useState("");
    const { user, session } = useClerk();

    const handleImageUpload = async (storyImg) => {
        if (!storyImg) return { imageUrl: "", fileId: "" };

        try {
            const imgUploadRes = await uploadImage(storyImg);
            return { imageUrl: imgUploadRes.imageUrl, fileId: imgUploadRes.fileId };
        } catch (error) {
            console.error("Image Upload Failed:", error.response?.data || error.message);
            throw new Error("Failed to upload image. Please try again.");
        }
    };

    const addNewBlog = async () => {
        try {
            const token = await session.getToken();

            let uploadedImage = { imageUrl: "", fileId: "" };
            if (storyImg) {
                uploadedImage = await handleImageUpload(storyImg);
            }

            const response = await axiosInstance.post(
                "/blogs/add-blog-story",
                {
                    title,
                    story,
                    imageUrl: uploadedImage.imageUrl,
                    fileId: uploadedImage.fileId,
                    visitedLocation,
                    visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data?.story) {
                toast.success("Story Added Successfully");
                onClose();
                getAllBlogs();
            } else {
                throw new Error("Failed to add blog. Please try again.");
            }
        } catch (error) {
            console.error("Add Blog Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "An unexpected error occurred. Please try again.");
        }
    };

    const updateBlog = async () => {
        try {
            const token = await session.getToken();
            const storyId = storyInfo._id;
            let updatedImage = { imageUrl: storyInfo.imageUrl || "", fileId: storyInfo.fileId || "" };

            if (typeof storyImg === "object" && storyImg !== null) {
                if (storyInfo.fileId) {
                    try {
                        await axiosInstance.delete("/blogs/delete-image", {
                            params: { fileId: storyInfo.fileId },
                            headers: { Authorization: `Bearer ${token}` },
                        });
                    } catch (error) {
                        console.error("Failed to delete old image:", error);
                    }
                }
                updatedImage = await handleImageUpload(storyImg);
            }

            const response = await axiosInstance.put(
                `/blogs/edit-blog-story/${storyId}`,
                {
                    title,
                    story,
                    imageUrl: updatedImage.imageUrl,
                    fileId: updatedImage.fileId,
                    visitedLocation,
                    visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data?.story) {
                toast.success("Story Updated Successfully");
                getAllBlogs();
                onClose();
            } else {
                throw new Error("Failed to update blog. Please try again.");
            }
        } catch (error) {
            console.error("Update Blog Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "An unexpected error occurred. Please try again.");
        }
    };

    const handleAddUpdate = () => {
        setError("");
        if (!title || !story) {
            setError("Please enter the title and story");
            return;
        }
        type === 'edit' ? updateBlog() : addNewBlog();
    };

    return (
        <div className='relative'>
            <div className='flex items-center justify-between'>
                <h5 className='text-xl font-medium text-slate-700'>
                    {type === "add" ? "Add Blog" : "Update Blog"}
                </h5>
                <div>
                    <div className='flex items-center gap-3 bg-cyan-50/50 rounded-l-lg'>
                        <button className='btn-small' onClick={handleAddUpdate}>
                            {type === "add" ? <MdAdd className='text-lg' /> : <MdUpdate className='text-lg' />} {type.toUpperCase()} BLOG
                        </button>
                        <button className='btn-delete' onClick={onClose}>
                            <MdClose className='text-xl text-slate-400' />
                        </button>
                    </div>
                    {error && <p className='text-red-500 text-xs pt-2 text-right'>{error}</p>}
                </div>
            </div>
            <div>
                <div className='flex-1 flex flex-col gap-2 pt-4'>
                    <label className='input-label'>TITLE</label>
                    <input type="text" className='text-2xl text-slate-950 outline-none' placeholder="Your Blog Title" value={title} onChange={({ target }) => setTitle(target.value)} />
                    <div className='my-3'><DateSelector date={visitedDate} setDate={setVisitedDate} /></div>
                    <ImageSelector image={storyImg} setImage={setStoryImg} />
                    <div className='flex flex-col gap-2 mt-4'>
                        <label className='input-label'>STORY</label>
                        <textarea className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded' placeholder='Your Blog Story' rows={20} value={story} onChange={({ target }) => setStory(target.value)} />
                    </div>
                    <div className='pt-3'><label>VISITED LOCATIONS</label><TagInput tags={visitedLocation} setTags={setVisitedLocation} /></div>
                </div>
            </div>
        </div>
    );
};

export default AddEditBlog;
