import React, { useEffect, useState } from 'react';
import http from "../plugins/http";
import SinglePost from "../components/SinglePost";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import useStore from "../store/store";
import {updateFavoritePostsAndCount} from "../plugins/upFav";


const AllPostsPage = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;
    const { filters } = useStore();
    const { setFav } = useStore();

    useEffect(() => {
        const updateFav = async () => {
            await updateFavoritePostsAndCount(setFav);
        };
        updateFav();
    }, [setFav]);

    useEffect(() => {
        http.get("http://167.99.138.67:1111/getallposts")
            .then(res => {
                const sortedData = res.data.sort((a, b) => {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                });
                setData(sortedData);
            });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    const applyFilters = (data) => {

        let filtered = data;
        if (filters.useUsername) {
            filtered = filtered.filter(post =>
                post.username.toLowerCase().includes(filters.username.toLowerCase())
            );
        }
        if (filters.useTitle) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(filters.title.toLowerCase())
            );
        }
        if (filters.useDate) {
            const fromDate = new Date(filters.dateFrom);
            const toDate = new Date(filters.dateTo);
            toDate.setHours(23, 59, 59, 999);
            filtered = filtered.filter(post => {
                const postDate = new Date(post.timestamp);
                return postDate >= fromDate && postDate <= toDate;
            });
        }
        return filtered;
    };

    const filteredData = applyFilters(data);
    const LastPost = currentPage * postsPerPage;
    const FirstPost = LastPost - postsPerPage;
    const currentPosts = filteredData.slice(FirstPost, LastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <Filter />
            <div className="d-flex flex-wrap justify-content-center gap-3">
                {currentPosts.map((x, i) => <SinglePost item={x} key={i} />)}
            </div>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={filteredData.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};
export default AllPostsPage;
