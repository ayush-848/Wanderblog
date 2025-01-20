import React, { useEffect, useState } from "react";
import Navbar from "./../../Components/Navbar";
import BlogCard from "../../Components/Blogs/BlogCard";
import axiosInstance from "../../utils/api";
import AddEditBlog from "./AddEditBlog";
import ViewBlog from "./ViewBlog";
import Modal from 'react-modal'
import { MdAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogsPage = () => {
	const [blogs, setBlogs] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const [openAddEditModal, setOpenAddEditModal] = useState({
		isShown: false,
		type: "add",
		data: null,
	});

	const [openViewModal, setOpenViewModal] = useState({
		isShown: false,
		data: null,
	});

	const fetchAllBlogs = async () => {
		try {
			const response = await axiosInstance.get("/get-all-blogs");
			if (response.data && response.data.blogs) {
				setBlogs(response.data.blogs);
			}
		} catch (error) {
			console.error("An unexpected error occurred:", error);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = () => {
		setOpenAddEditModal({ isShown: true, type: "edit", data: data });
	};

	const handleViewStory = async (data) => {
		setOpenViewModal({ isShown: true, data });

		try {
			await axiosInstance.put(`/update-view-count/${data._id}`);
			fetchAllBlogs();
		}
		catch (error) {
			console.error("Failed to update view count:", error);
		}
	};

	const updateIsFavourite = async (blogData) => {
		const blogId = blogData._id;

		try {
			const response = await axiosInstance.put(
				"/update-is-favourite/" + blogId, {
					isFavourite: !blogData.isFavourite,
				}
			);

			if (response.data && response.data.story) {
				// Update the like count based on whether it's being favorited or unfavorited
				if(blogData.isFavourite){
					await axiosInstance.put(`/update-like-count/${blogId}`, { increase: false });
				}
				else {
					await axiosInstance.put(`/update-like-count/${blogId}`, { increase: true });
				}
				
				toast.success("Story Updated Successfully");
				fetchAllBlogs();
			}
		} catch (error) {
			console.log("An unexpected error occured. Please try again.");
		}
	};

	useEffect(() => {
		fetchAllBlogs();

		return () => { };
	}, []);

	if (error) {
		return (
			<div className="flex justify-center items-center text-xl">
				Failed to load blogs. Please try again later.
			</div>
		);
	}

	if (blogs.length === 0) {
		return (
			<div className="flex flex-col justify-center items-center mt-20">
				<p className="text-xl"> No Blogs Found!</p>
				<p className="text-xl mt-4">Let's create some Blog !</p>

				<button
					className="bg-red-400 hover:bg-red-600 transition duration-300 text-white px-4 py-3 text-xl rounded-md cursor-pointer mt-6"
					onClick={() => {
						setOpenAddEditModal({
							isShown: true,
							type: "add",
							data: null,
						});
					}}
				>
					Create Blog
				</button>

				{/* Conditionally render AddEditBlog */}
				{openAddEditModal.isShown && (
					<Modal
						isOpen={openAddEditModal.isShown} // Changed isOpen to open
						onRequestClose={() => { }}
						style={{
							overlay: {
								backgroundColor: "rgba(0,0,0,0.5)",
								zIndex: 999,
							},
						}}
						appElement={document.getElementById("root")}
						className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
					>
						<AddEditBlog
							type={openAddEditModal.type}
							storyInfo={openAddEditModal.data}
							onClose={() =>
								setOpenAddEditModal({
									isShown: false,
									type: "add",
									data: null,
								})
							}
							getAllBlogs={fetchAllBlogs}
						/>
					</Modal>
				)}
			</div>
		);
	}

	return (
		<>
			<Navbar />
			<div className="bg-gray-100 min-h-screen p-4 my-16">
				<div className="flex flex-col justify-center mb-4">
					<h1 className="text-3xl font-bold text-center mb-6">
						Latest Blogs
					</h1>

					<button
						className="bg-yellow-400 hover:bg-yellow-500 mx-auto px-4 py-4 rounded-lg font-sans"
						onClick={() => {
							setOpenAddEditModal({
								isShown: true,
								type: "add",
								data: null,
							});
						}}
					>
						Create a New Blog
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{blogs.map((blog) => (
						<BlogCard
							key={blog._id}
							imageUrl={blog.imageUrl}
							title={blog.title || "Untitled"}
							story={blog.story || "No story available."}
							date={blog.visitedDate || "N/A"}
							visitedLocation={blog.visitedLocation || "Unknown"}
							isFavourite={blog.isFavourite || false}
							onEdit={() => handleEdit(blog)}
							onClick={() => handleViewStory(blog)}
							onFavouriteClick={() => updateIsFavourite(blog)}
							likes={blog.likes || 0}
							views={blog.views || 0}
						/>
					))}
				</div>
			</div>

			<Modal
				isOpen={openAddEditModal.isShown}
				onRequestClose={() => { }}
				style={{
					overlay: {
						backgroundColor: "rgba(0,0,0,0.2)",
						zIndex: 999,
					},
				}}
				appElement={document.getElementById("root")}
				className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
			>
				<AddEditBlog
					type={openAddEditModal.type}
					storyInfo={openAddEditModal.data}
					onClose={() => {
						setOpenAddEditModal({
							isShown: false,
							type: "add",
							data: null,
						});
					}}
					getAllBlogs={fetchAllBlogs}
				/>
			</Modal>

			<Modal
				isOpen={openViewModal.isShown}
				onRequestClose={() => { }}
				style={{
					overlay: {
						backgroundColor: "rgba(0,0,0,0.2)",
						zIndex: 999,
					},
				}}
				appElement={document.getElementById("root")}
				className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
			>
				<ViewBlog
					storyInfo={openViewModal.data || null}
					onClose={() => {
						setOpenViewModal((prevState) => ({
							...prevState,
							isShown: false,
						}));
					}}
					onEditClick={() => {
						setOpenViewModal((prevState) => ({
							...prevState,
							isShown: false,
						}));
						handleEdit(openViewModal.data || null);
					}}
					onDeleteClick={() => { }}
				/>
			</Modal>

			<button
				className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
				onClick={() => {
					setOpenAddEditModal({
						isShown: true,
						type: "add",
						data: null,
					});
				}}
			>
				<MdAdd className="text-[32px] text-white" />
			</button>

			<ToastContainer />
		</>
	);
};

export default BlogsPage;
