import React from 'react'
import Modal from 'react-modal'
import AddEditBlog from './AddEditBlog';

const NoBlog = ({
    openAddEditModal, setOpenAddEditModal, fetchAllBlogs
}) => {
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
                    onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
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

export default NoBlog