import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import http from "../plugins/http";
import SinglePost from "../components/SinglePost";
import Pagination from "../components/Pagination";
import useStore from "../store/store";
import {updateFavoritePostsAndCount} from "../plugins/upFav";


const UserPostPage = () => {
    const { setFav } = useStore();

    useEffect(() => {
        const updateFav = async () => {
            await updateFavoritePostsAndCount(setFav);
        };
        updateFav();
    }, [setFav]);
    const { name } = useParams();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await http.get(`http://167.99.138.67:1111/getuserposts/${name}`);
            setData(response.data);
        };
        fetchPosts();
    }, [name]);

    const LastPost = currentPage * postsPerPage;
    const FirstPost = LastPost - postsPerPage;
    const currentPosts = data.slice(FirstPost, LastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <h2 className="mt-3">Posts by {name}</h2>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3">
                {currentPosts.length === 0 ?
                    <div className="d-flex mt-3 justify-content-center">
                        <h3>Empty</h3>
                    </div> :
                    currentPosts.map((x, i) => <SinglePost item={x} key={i} />)
                }
            </div>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={data.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default UserPostPage;
