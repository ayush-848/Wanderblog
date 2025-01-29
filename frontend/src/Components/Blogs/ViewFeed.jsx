import { useClerk } from '@clerk/clerk-react';
import moment from 'moment';
import React from 'react';
import { GrMapLocation } from 'react-icons/gr';
import { MdClose } from 'react-icons/md';

const ViewFeed = ({ storyInfo, onClose }) => {
    const { user } = useClerk();

    return (
        <div className='relative'>
            {/* Header Section */}
            <div className='flex justify-between items-center mb-4'>
                <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full text-[16px] font-semibold text-sky-700">
                    <span>✍️ Author:</span>
                    <span>@{user?.username || "Guest"}</span>
                </div>
                <button
                    className='p-2 hover:bg-red-600 rounded-full transition-all duration-300'
                    onClick={onClose}
                    aria-label="Close"
                >
                    <MdClose className='text-2xl text-red-600 hover:text-white' />
                </button>
            </div>

            {/* Content Section */}
            <div className='flex flex-col gap-2 py-4'>
                {/* Title */}
                <h1 className='text-3xl  text-slate-950 my-2 roboto-bold'>
                    {storyInfo?.title || "Untitled Story"}
                </h1>

                {/* Date & Location */}
                <div className='flex items-center justify-between gap-3 my-auto'>
                    <span className='text-[14px] font-semibold text-slate-950'>
                        {storyInfo?.visitedDate ? moment(storyInfo.visitedDate).format("Do MMM YYYY") : "Unknown Date"}
                    </span>

                    {Array.isArray(storyInfo?.visitedLocation) && storyInfo.visitedLocation.length > 0 && (
                        <div className='inline-flex items-center gap-2 text-[15px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1'>
                            <GrMapLocation className='text-sm' />
                            {storyInfo.visitedLocation.join(", ")}
                        </div>
                    )}
                </div>

                {/* Image */}
                {storyInfo?.imageUrl && (
                    <img
                        src={storyInfo.imageUrl}
                        alt="Story Visual"
                        loading="lazy"
                        className='w-full h-[300px] object-cover rounded-lg my-2'
                    />
                )}

                {/* Story Content */}
                <div className='mt-4'>
                    <p className='text-sm text-slate-600 leading-6 md:text-justify text-left whitespace-pre-line'>
                        {storyInfo?.story || "No story content available."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ViewFeed;
