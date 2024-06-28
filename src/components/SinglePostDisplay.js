import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import convertTimestamp from "../plugins/date";
import useStore from "../store/store";
import http from '../plugins/http';
import toggleFavorite from "../plugins/toggleFavorite";
import EditPostModal from "./Edit";

const SinglePostDisplay = ({ item }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(item.title);
    const [editImage, setEditImage] = useState(item.image);
    const [message, setMessage] = useState('');
    const [editDescription, setEditDescription] = useState(item.description);
    const [isFavorite, setIsFavorite] = useState(false);
    const { fav, setFav } = useStore();
    const username = localStorage.getItem('user');

    useEffect(() => {
        const secretKey = localStorage.getItem('secretKey');
        const favoritePosts = JSON.parse(localStorage.getItem('favoritePosts')) || [];
        const postIsFavorite = favoritePosts.some(fav => fav.id === item.id && fav.secretKey === secretKey);
        setIsFavorite(postIsFavorite);
    }, [item.id]);

    const handleDelete = async () => {
        const sKey = localStorage.getItem('secretKey');
        const del_post = {
            secretKey: sKey,
            id: item.id
        };
        const response = await http.post('http://167.99.138.67:1111/deletepost', del_post);
        if (response.message === `post successfully deleted`) {
            let favoritePosts = JSON.parse(localStorage.getItem('favoritePosts')) || [];
            favoritePosts = favoritePosts.filter(fav => fav.id !== item.id);
            localStorage.setItem('favoritePosts', JSON.stringify(favoritePosts));
            window.location.href = `/posts/${username}`;
        } else {
            alert(`Failed to delete post. ${response.message}`);
        }
    };

    const handleEdit = async (event) => {
        event.preventDefault();

        const secretKey = localStorage.getItem('secretKey');
        const up_post = {
            secretKey: secretKey,
            title: editTitle,
            image: editImage,
            description: editDescription,
            id: item.id
        };

        const response = await http.post('http://167.99.138.67:1111/updatepost', up_post);
        if (!response.success) {
            setMessage(response.message);
        } else {
            window.location.reload();
        }
    };

    return (
        <div className="w-100 brd-line p-3">
            <div className="row">
                <div className="col">
                    <img className="brd-line single_post_pic" src={item.image} alt=""/>
                </div>

                <div className="col">
                    <Link className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                          to={"/posts/" + item.username}>
                        <h5 className="mt-1 overflow-hidden">
                            Blog by: {item.username}
                        </h5>
                    </Link>
                    <div className="d-flex align-items-center">
                        <Link className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                              to={"/posts/" + item.username + `/` + item.id}>
                            <h3 title={item.title} className="mt-3 single_post_header">{item.title}</h3>
                        </Link>
                        <button className="btn"  onClick={() => toggleFavorite(item, isFavorite, setFav, fav, setIsFavorite)}>
                            <i className={`bi bi-star${isFavorite ? '-fill' : ''}`}
                               style={{color: isFavorite ? 'yellow' : 'white'}}></i>
                        </button>
                    </div>

                    <p className="mb-2">{convertTimestamp(item.timestamp)}</p>
                    <h6 title={item.description} className="single_post_header">
                        {item.description}
                    </h6>
                    <div className="d-flex gap-3 mt-3">
                        {username === item.username && (
                            <>
                                <button className="btn btn-warning" onClick={() => setIsEditing(true)}>Edit</button>
                                <button className="btn btn-danger" onClick={handleDelete}>Remove</button>
                            </>
                        )}
                    </div>
                    <EditPostModal
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        handleEdit={handleEdit}
                        editTitle={editTitle}
                        setEditTitle={setEditTitle}
                        editImage={editImage}
                        setEditImage={setEditImage}
                        editDescription={editDescription}
                        setEditDescription={setEditDescription}
                        message={message}
                        setMessage={setMessage}
                    />
                </div>
            </div>
        </div>
    );
};

export default SinglePostDisplay;
