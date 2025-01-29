import { useAuth, useClerk } from '@clerk/clerk-react';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/api';
import Loader from '../Components/Loader';
import BlogCard from '../Components/Blogs/BlogCard';
import Navbar from '../Components/Navbar';
import ViewFeed from '../Components/Blogs/ViewFeed';
import Modal from 'react-modal';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

const BlogsFeed = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isSignedIn, getToken } = useAuth();
    const { user } = useClerk();

    const [openViewModal, setOpenViewModal] = useState({
        isShown: false,
        data: null,
    });

    const fetchAllBlogs = async () => {
        if (!isSignedIn) return; // Prevent API call if user is not signed in

        if (blogs.length > 0) return; // Skip if blogs are already fetched

        try {
            if (user) {
                setLoading(true); // Ensure loading is set before fetching

                const token = await getToken();
                const response = await axiosInstance.get('/blogs/blogs-feed', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setBlogs(response.data?.blogs || []); // Ensure an empty array if no blogs found
            } else {
                console.error('User or session is missing. Cannot fetch blogs.');
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
            toast.error('Failed to fetch blogs. Please try again later.');
        } finally {
            setLoading(false); // Stop loading after fetching
        }
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

    useEffect(() => {
        if (!isSignedIn) return; // Wait for authentication before making API calls
        fetchAllBlogs();
    }, [isSignedIn]); // Fetch when user is signed in

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-4xl mx-auto mt-14">
                {/* Heading Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-teal-600 mb-2">Welcome to the Wanderblog Universe! 🌟</h1>
                    <p className="text-lg text-gray-700">
                        "Discover stories from all walks of life. From passionate opinions to creative inspirations, explore the world one blog at a time."
                    </p>
                </div>

                {/* Blogs Section */}
                {loading ? (
                    <p className="text-center text-teal-500 text-xl">Loading blogs... Hang tight! 🚀</p>
                ) : blogs.length === 0 ? (
                    <p className="text-center text-gray-600 text-xl">No blogs found. Be the first to share your story! ✨</p>
                ) : (
                    <>
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
                                    onEdit={() => {}}
                                    onClick={() => handleViewStory(blog)}
                                    onFavouriteClick={() => updateIsFavourite(blog)}
                                    likes={blog.likes || 0}
                                    views={blog.views || 0}
                                />
                            ))}
                        </div>

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
                            <ViewFeed
                                storyInfo={openViewModal.data || null}
                                onClose={() => {
                                    setOpenViewModal((prevState) => ({
                                        ...prevState,
                                        isShown: false,
                                    }));
                                }}
                            />
                        </Modal>

                        <ToastContainer />
                    </>
                )}
            </div>
        </>
    );
}

export default BlogsFeed;
