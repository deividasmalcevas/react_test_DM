import React, {useEffect, useState} from 'react';
import http from '../plugins/http';
import {updateFavoritePostsAndCount} from "../plugins/upFav";
import useStore from "../store/store";


const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [flashError, setFlashError] = useState(false);
    const { setFav } = useStore();

    useEffect(() => {
        const updateFav = async () => {
            await updateFavoritePostsAndCount(setFav);
        };
        updateFav();
    }, [setFav]);

    const username = localStorage.getItem(`user`)

    const isValidImageUrl = (url) => {
        return (/\.(jpg|jpeg|png|gif)$/i).test(url);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isValidImageUrl(image)) {
            setFlashError(true);
            setMessage('Invalid image URL. Please enter a URL that ends with .jpg, .jpeg, .png, or .gif.');
            setTimeout(() => setFlashError(false), 3000);
            return;
        }
        let secretKey = localStorage.getItem('secretKey');
        let post = {
            secretKey: secretKey,
            title: title,
            image: image,
            description: description
        };
        const response = await http.post('http://167.99.138.67:1111/createpost', post);
        if (!response.success) {
            setFlashError(true);
            setMessage(response.message);
            setTimeout(() => setFlashError(false), 3000);
        } else {
            window.location.href = `/posts/${username}`;
        }
    };
    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card w-50">
                <div className="card-body">
                    <h1 className="card-title mb-4">Create Post</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input type="text" className="form-control" id="title" value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image URL:</label>
                            <input type="text" className="form-control" id="image" value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea className="form-control" id="description" value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn mt-3 btn-primary">Create Post</button>
                    </form>
                    {message && <div className={`mt-3 alert alert-info ${flashError ? 'flash' : ''}`}>{message}</div>}
                </div>
            </div>
        </div>
    );
};

export default CreatePostPage;
