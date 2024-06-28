import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from "../store/store";
import {updateFavoritePostsAndCount} from "../plugins/upFav";

const Navigation = () => {
    const isLoggedIn = localStorage.getItem('secretKey') !== null;
    const user = localStorage.getItem('user');
    function LogOut() {
        localStorage.removeItem('secretKey');
        window.location.href = '/';
    }
    const { fav, setFav } = useStore();
    useEffect(() => {
        const updateFav = async () => {
            await updateFavoritePostsAndCount(setFav);
        };
        updateFav();
    }, [setFav]);

    return (
        <div className= 'sticky-top'>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse ms-5 me-5" id="navbarNav">
                        <ul className="navbar-nav ">
                            {!isLoggedIn ? (
                                <div className="d-flex align-items-center">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center">
                                    <li className="nav-item">
                                        <div
                                            className="just-pointer d-flex flex-column justify-content-center align-items-center">
                                            <img className="icon"
                                                 src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                                                 alt="pfp"/>
                                            <p className="icon-text">{user}</p>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={`/posts/${user}`}>My Blogs</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/favorites">
                                            Favorites {fav > 0 &&
                                            <span className="badge bg-secondary">{fav}</span>}
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/create">Create</Link>
                                    </li>

                                </div>
                            )}
                        </ul>
                        <ul className="navbar-nav mx-auto">
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Browse</Link>
                                </li>
                            )}
                        </ul>

                        <ul className="navbar-nav ms-auto">
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <button onClick={LogOut} className="btn btn-danger">Logout</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="line"></div>
        </div>
    );
};

export default Navigation;
