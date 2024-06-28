import React, { useEffect, useState } from 'react';
import SinglePost from "../components/SinglePost";
import Pagination from "../components/Pagination";
import http from '../plugins/http';
import useStore from "../store/store";
import {updateFavoritePostsAndCount} from "../plugins/upFav";

const FavPage = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;
    const { fav, setFav } = useStore();
    useEffect(() => {
        const updateFav = async () => {
            await updateFavoritePostsAndCount(setFav);
        };
        updateFav();
    }, [setFav]);
    useEffect(() => {
        const fetchAllPosts = async () => {
            const favoritePosts = JSON.parse(localStorage.getItem('favoritePosts')) || [];
            const allPosts = await http.get('http://167.99.138.67:1111/getallposts');
            const secretKey = localStorage.getItem('secretKey');
            const favFiltered = favoritePosts.filter(fav =>
                fav.secretKey === secretKey && allPosts.data.some(post => post.id === fav.id)
            );
            const favIDs = favFiltered.map(fav => fav.id);
            const filteredPosts = allPosts.data.filter(post => favIDs.includes(post.id));
            setPosts(filteredPosts);
        };
        fetchAllPosts();
    }, [fav]);

    useEffect(() => {
        setCurrentPage(1);
    }, [posts, fav]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const LastPost = currentPage * postsPerPage;
    const FirstPost = LastPost - postsPerPage;
    const currentPosts = posts.slice(FirstPost, LastPost);

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <h2 className="mt-3">Favorite Posts</h2>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                    {currentPosts.length === 0 ? (
                        <p>No favorite posts found.</p>
                    ) : (
                        currentPosts.map((post) => (
                            <div key={post.id} className="">
                                <SinglePost item={post}/>
                            </div>
                        ))
                    )}
                </div>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default FavPage;
