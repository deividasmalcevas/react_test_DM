import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import convertTimestamp from "../plugins/date";
import useStore from "../store/store";
import toggleFavorite from "../plugins/toggleFavorite";

const SinglePost = ({ item }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { fav, setFav } = useStore();

    useEffect(() => {
        let secretKey = localStorage.getItem('secretKey');
        const favoritePosts = JSON.parse(localStorage.getItem('favoritePosts')) || [];
        const postIsFavorite = favoritePosts.some(fav => fav.id === item.id && fav.secretKey === secretKey);
        setIsFavorite(postIsFavorite);
    }, [item.id]);

    return (
        <div className="brd-line d-flex flex-column align-items-center justify-content-start p-3">
            <img className="brd-line post_img" src={item.image} alt=""/>
            <div className="d-flex">
                <Link className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                      to={"/posts/" + item.username + `/` + item.id}>
                    <h5 title={item.title} className="post_header mt-3">{item.title}</h5>
                </Link>
                <button className="btn"  onClick={() => toggleFavorite(item, isFavorite, setFav, fav, setIsFavorite)}>
                    <i className={`bi bi-star${isFavorite ? '-fill' : ''}`}
                       style={{color: isFavorite ? 'yellow' : 'white'}}></i>
                </button>
            </div>
            <Link className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                  to={"/posts/" + item.username}>
                <h6 className="mt-1 post_user">
                    {item.username}
                </h6>
            </Link>
            <p className="mb-2">{convertTimestamp(item.timestamp)}</p>
        </div>
    );
};

export default SinglePost;
