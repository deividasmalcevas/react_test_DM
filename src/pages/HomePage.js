import React, {useEffect} from 'react';
import Login from "../components/Login";
import AllPostsPage from "./AllPostsPage";
import useStore from "../store/store";
import {updateFavoritePostsAndCount} from "../plugins/upFav";
const HomePage = () => {
    const { setFav } = useStore();

    useEffect(() => {
        const updateFav = async () => {
            await updateFavoritePostsAndCount(setFav);
        };
        updateFav();
    }, [setFav]);
    const isLoggedIn = localStorage.getItem('secretKey') !== null;
    return (
        <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
                <AllPostsPage/>
            ) : (
                <Login/>
            )}
        </ul>
    );
};

export default HomePage;