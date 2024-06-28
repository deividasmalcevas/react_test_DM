import React from 'react';

const EditPostModal = ({
       isEditing,
       setIsEditing,
       handleEdit,
       editTitle,
       setEditTitle,
       editImage,
       setEditImage,
       editDescription,
       setEditDescription,
       message,
       setMessage,
   }) => {
    const isValidImageUrl = (url) => {
        return (/\.(jpg|jpeg|png|gif)$/i).test(url);
    };
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        if (!isValidImageUrl(editImage)) {
            setMessage('Invalid image URL. Please enter a URL that ends with .jpg, .jpeg, .png, or .gif.');
            return;
        }
        handleEdit(event);
    };

    return (
        <div className={`modal ${isEditing ? 'show d-block' : ''}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between">
                        <h5 className="modal-title text-black">Edit Post</h5>
                        <button type="button" className="close" onClick={() => setIsEditing(false)}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label className="text-black" htmlFor="editTitle">Title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="editTitle"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-black" htmlFor="editImage">Image URL:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="editImage"
                                    value={editImage}
                                    onChange={(e) => setEditImage(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-black" htmlFor="editDescription">Description:</label>
                                <textarea
                                    className="form-control"
                                    id="editDescription"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                />
                            </div>
                            {message && (
                                <div className="mt-3 alert bg-danger text-light alert-info">
                                    {message}
                                </div>
                            )}
                            <button type="submit" className="btn mt-3 btn-primary">Update Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPostModal;
