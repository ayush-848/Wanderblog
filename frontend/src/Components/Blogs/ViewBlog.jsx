import moment from 'moment'
import React from 'react'
import { GrMapLocation } from 'react-icons/gr'
import { MdClose, MdUpdate, MdDeleteOutline } from 'react-icons/md'

const ViewBlog = ({
    storyInfo, onClose, onEditClick, onDeleteClick
}) => {
    return (
        <div className='relative'>
            <div className='flex items-center justify-end'>
                <div>
                    <div className='flex items-center gap-3 bg-cyan-50/50 rounded-l-lg'>
                        <button className='btn-small' onClick={onEditClick}>
                            <MdUpdate className='text-lg' /> UPDATE STORY
                        </button>

                        <button className='btn-small btn-delete' onClick={onDeleteClick}>
                            <MdDeleteOutline className='text-lg' /> Delete
                        </button>

                        <button className='' onClick={onClose}>
                            <MdClose className='text-xl text-slate-400' />
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div className='flex-1 flex flex-col gap-2 py-4'>
                    <h1 className='text-2xl text-slate-950 my-2'>
                        {storyInfo && storyInfo.title}
                    </h1>

                    <div className='flex items-center justify-between gap-3 my-auto'>
                        <span className='text-xs text-slate-950'>
                            {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
                        </span>

                        <div className='inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1'>
                            <GrMapLocation className='text-sm' />
                            {storyInfo &&
                                storyInfo.visitedLocation.map((item, index) =>
                                    storyInfo.visitedLocation.length === index + 1
                                        ? `${item}`
                                        : `${item}, `
                                )
                            }
                        </div>
                    </div>

                    <img
                        src={storyInfo && storyInfo.imageUrl}
                        alt="selected"
                        className='w-full h-[300px] object-cover rounded-lg my-2'
                    />

                    <div className='mt-4'>
                        <p className='text-sm text-slate-600 leading-6 text-justify whitespace-pre-line'>
                            {storyInfo.story}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewBlog