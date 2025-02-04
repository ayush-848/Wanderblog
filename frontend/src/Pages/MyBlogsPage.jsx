import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import BlogCard from "../Components/Blogs/BlogCard";
import axiosInstance from "../utils/api";
import AddEditBlog from "../Components/Blogs/AddEditBlog";
import ViewBlog from "../Components/Blogs/ViewBlog";
import Modal from 'react-modal'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoBlog from "../Components/Blogs/NoBlog";
import { useClerk } from "@clerk/clerk-react";
import Loader from "../Components/Loader";
import deleteImage from "./../utils/deleteImage";

const BlogsPage = () => {
	const [blogs, setBlogs] = useState([]);
	const [error, setError] = useState(false);
	const [isPageLoading, setIsPageLoading] = useState(true); // Manage page loading state
	const { user, session } = useClerk();

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
			const token = await session.getToken();

			const response = await axiosInstance.get("/blogs/get-all-blogs",
				{
					headers: {
						Authorization: `Bearer ${token}`, // Include the token in the Authorization header
					},
				}
			);

			if (response.data && response.data.blogs) {
				setBlogs(response.data.blogs);
			}
			else {
				setBlogs([]);
			}

		} catch (error) {
			console.error("An unexpected error occurred while fetching blogs:", error);
			toast.error("Failed to fetch blogs. Please try again later.");
			setError(true);
		} finally {
			setTimeout(() => {
				setIsPageLoading(false);
			}, 1000);
		}
	};

	const updateIsFavourite = async (blogData) => {
		const blogId = blogData._id;

		try {
			const token = await session.getToken();
			const response = await axiosInstance.put(
				`/blogs/update-is-favourite/${blogId}`,
				{ isFavourite: !blogData.isFavourite },
				{
					headers: {
						Authorization: `Bearer ${token}`, // Include the token in the Authorization header
					},
				}
			);

			if (response.data && response.data.story) {
				await axiosInstance.put(`/blogs/update-like-count/${blogId}`, {
					increase: !blogData.isFavourite,
				});
				toast.success("Story updated successfully.");
				fetchAllBlogs();
			}
		} catch (error) {
			console.error("Failed to update the favorite status:", error);
			toast.error("Failed to update the favorite status. Please try again later.");
		}
	};

	const handleEdit = (data) => {
		setOpenAddEditModal({ isShown: true, type: "edit", data });
	};

	const handleViewStory = async (data) => {
		setOpenViewModal({ isShown: true, data });

		try {
			await axiosInstance.put(`/blogs/update-view-count/${data._id}`);
			fetchAllBlogs();
		}
		catch (error) {
			console.error("Failed to update view count:", error);
		}
	};

	const deleteBlog = async (data) => {
		const blogId = data._id;
		const fileId = data.fileId;
	
		try {
			const token = await session.getToken();
	
			if (!token) {
				toast.error("Authentication failed. Please log in again.");
				return;
			}
	
			// Step 1: Delete Image (if exists)
			if (fileId) {
				const imageDeleted = await deleteImage(fileId);
				if (!imageDeleted) {
					console.warn("Image deletion failed. Proceeding to delete blog.");
				}
			}
	
			// Step 2: Delete Blog
			const response = await axiosInstance.delete(`/blogs/delete-blog/${blogId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
	
			if (response.data && !response.data.error) {
				toast.error("Story Deleted Successfully");
				setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
				fetchAllBlogs();
			}
			
		} catch (error) {
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			  ) {
				console.error(error.response.data.message);
				setError(error.response.data.message);
			  }
			  else {
				//handle unexprected errors
				setError("An unexpected error occured. PLease try again");
			  }
		}
	};
	

	useEffect(() => {
		if (user && session) {
			fetchAllBlogs();
			setIsPageLoading(false);
		}

	}, [user, session]);

	if (isPageLoading) {
		return <Loader />
	}

	if (error) {
		return (
			<div className="flex justify-center items-center text-xl">
				Failed to load blogs. Please try again later.
			</div>
		);
	}

	if (blogs.length === 0) {
		return (
			<NoBlog
				openAddEditModal={openAddEditModal}
				setOpenAddEditModal={setOpenAddEditModal}
				fetchAllBlogs={fetchAllBlogs}
			/>
		)
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
				onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
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
				onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
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
					onDeleteClick={() => { deleteBlog(openViewModal.data) }}
				/>
			</Modal>



			<ToastContainer />
		</>
	);
};

export default BlogsPage;
