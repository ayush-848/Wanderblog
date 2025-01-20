import React, { useState } from 'react'
import { MdAdd, MdClose, MdUpdate } from 'react-icons/md'
import axiosInstance from '../../utils/api';
import moment from 'moment';
import { toast } from 'react-toastify';
import uploadImage from '../../utils/uploadImage';
import DateSelector from "./../../Components/Blogs/DateSelector";
import ImageSelector from "./../../Components/Blogs/ImageSelector";
import TagInput from '../../Components/Blogs/TagInput';

const AddEditBlog = ({
    storyInfo,
    type, onClose, getAllBlogs
}) => {

    const [title, setTitle] = useState(storyInfo?.title || "");
    const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
    const [story, setStory] = useState(storyInfo?.story || "");
    const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || []);
    const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null);

    const [error, setError] = useState("");

    const addNewBlog = async () => {
        try {
            let imageUrl = "";

            //upload image if present
            if (storyImg) {
                const imgUploadRes = await uploadImage(storyImg);
                // get image URL
                imageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post("/add-blog-story", {
                title, story, imageUrl: imageUrl || "",
                visitedLocation,
                visitedDate: visitedDate
                    ? moment(visitedDate).valueOf()
                    : moment().valueOf(),
            });

            if (response.data && response.data.story) {
                toast.success("Story Added Successfully");
                getAllBlogs();
                //close modal or form
                onClose();
            }
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
            else {
                setError("An unexpected error occured. Please try again");
            }
        }
    };

    const updateBlog = async () => {
        const storyId = storyInfo._id;

        try {
            let imageUrl = "";

            let postData = {
                title, story,
                imageUrl: storyInfo.imageUrl || "",
                visitedLocation,
                visitedDate: visitedDate
                    ? moment(visitedDate).valueOf()
                    : moment().valueOf(),
            }

            if (typeof storyImg === 'object') {
                //upload new image
                const imgUploadRes = await uploadImage(storyImg);
                imageUrl = imgUploadRes.imageUrl || "";

                postData = {
                    ...postData,
                    imageUrl: imageUrl,
                };
            }

            const response = await axiosInstance.put(
                "/edit-blog-story/" + storyId,
                postData
            );

            if (response.data && response.data.story) {
                toast.success("Story Updated Successfully");
                //refresh stories
                getAllBlogs();
                //close modal or form
                onClose();
            }

        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
            else {
                //handle unexprected errors
                setError("An unexpected error occured. PLease try again");
            }
        }
    };

    const handleAddUpdate = () => {
        console.log("Input Data:", { title, storyImg, story, visitedLocation, visitedDate });

        if (!title) {
            setError("Please enter the title"); return;
        }

        if (!story) {
            setError("Please enter the story"); return;
        }

        setError("");

        if (type === 'edit') {
            updateBlog();
        }
        else {
            addNewBlog();
        }
    };

    //Delete story image and update the story
    const handleDeleteStoryImg = async () => {
        try {
            const deleteImgRes = await axiosInstance.delete("/delete-image", {
                params: { imageUrl: storyInfo.imageUrl },
            });

            if (deleteImgRes.data) {
                const storyId = storyInfo._id;
                const postData = {
                    title, story,
                    visitedLocation,
                    visitedDate: moment().valueOf(),
                    imageUrl: "",
                };

                await axiosInstance.put("/edit-blog-story/" + storyId, postData);
                setStoryImg(null);
            }

        } catch (error) {
            setError("Failed to delete image. Please try again.");
        }
    };


    return (
        <div className='relative'>
            <div className='flex items-center justify-between'>
                <h5 className='text-xl font-medium text-slate-700'>
                    {type === "add" ? "Add Blog" : "Update Blog"}
                </h5>

                <div>
                    <div className='flex items-center gap-3 bg-cyan-50/50 rounded-l-lg'>
                        {type === "add" ? (
                            <button className='btn-small' onClick={handleAddUpdate}>
                                <MdAdd className='text-lg' /> ADD BLOG
                            </button>
                        ) : (
                            <>
                                <button className='btn-small' onClick={handleAddUpdate}>
                                    <MdUpdate className='text-lg' /> UPDATE BLOG
                                </button>
                            </>
                        )}

                        <button className='btn-delete' onClick={onClose}>
                            <MdClose className='text-xl text-slate-400' />
                        </button>
                    </div>

                    {error && (
                        <p className='text-red-500 text-xs pt-2 text-right'>{error}</p>
                    )}
                </div>
            </div>

            <div>
                <div className='flex-1 flex flex-col gap-2 pt-4'>
                    <label className='input-label'>TITLE</label>
                    <input
                        type="text"
                        className='text-2xl text-slate-950 outline-none'
                        placeholder="Your Blog Title"
                        value={title}
                        onChange={({ target }) => { setTitle(target.value) }}
                    />

                    <div className='my-3'>
                        <DateSelector date={visitedDate} setDate={setVisitedDate} />
                    </div>

                    <ImageSelector
                        image={storyImg}
                        setImage={setStoryImg}
                        handleDeleteImg={handleDeleteStoryImg}
                    />

                    <div className='flex flex-col gap-2 mt-4'>
                        <label className='input-label'>STORY</label>
                        <textarea
                            type="text"
                            className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                            placeholder='Your Blog Story'
                            rows={20}
                            value={story}
                            onChange={({ target }) => setStory(target.value)}
                        />
                    </div>

                    <div className='pt-3'>
                        <label className=''>VISITED LOCATIONS</label>
                        <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEditBlog