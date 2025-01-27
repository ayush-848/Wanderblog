import React from 'react'
import moment from "moment/moment";
import { FaHeart } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import nullImage from '../../../../backend/uploads/placeholder.png'

const BlogCard = ({
	imageUrl,
	title,
	date,
	story,
	visitedLocation,
	isFavourite,
	onFavouriteClick,
	onClick,
	likes,
	views,

}) => {
	const imageSrc = imageUrl && imageUrl !== 'null' ? imageUrl : nullImage;

	return (
		<div className="border rounded-lg overflow-hidden bg-white hover:shadow-slate-200 transition-all ease-in-out relative cursor-poiner mx-auto">
			<img
				src={imageSrc}
				alt={title}
				className="w-full h-100 min-h-[265px] max-w-[502px] max-h-[300px] object-cover rounded-lg"
				onClick={onClick}
				onError={(e) => e.target.src = nullImage}
			/>

			<button
				className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-4 right-4"
				onClick={onFavouriteClick}
			>
				<FaHeart
					className={`icon-btn ${isFavourite ? "text-red-500" : "text-white"}`}
				/>
			</button>

			<div className="p-4" onClick={onClick}>
				<div className="flex-items-center gap-3">
					<div className="flex-1">
						<h6 className="text-sm font-medium">{title}</h6>
						<span className="text-xs text-slate-500">
							{date ? moment(date).format("Do MMM YYYY") : "-"}
						</span>
					</div>
				</div>

				<p className="text-xs text-slate-600 mt-2">
					{story?.slice(0, 60)}
				</p>

				<div className='flex justify-between'>
					<div className="inline-flex items-center justify-between gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-2 py-1">
						<GrMapLocation className="text-sm" />
						{visitedLocation.map((item, index) =>
							visitedLocation.length === index + 1
								? `${item}`
								: `${item}, `
						)}


					</div>

					<div className='inline-flex items-center gap-2 text-[14px] bg-cyan-200/40 rounded mt-3 px-2 py-1'>
						<FaEye className='text-sm text-slate-900' /> {views}

						<FaHeart className='text-sm text-red-500' /> {likes}
					</div>
				</div>

			</div>
		</div>
	)
}

export default BlogCard