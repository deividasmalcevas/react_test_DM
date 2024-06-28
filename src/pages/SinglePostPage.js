import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import http from "../plugins/http";
import SinglePostDisplay from "../components/SinglePostDisplay";
import useStore from "../store/store";
import {updateFavoritePostsAndCount} from "../plugins/upFav";


const SinglePostPage = () => {
    const { setFav } = useStore();

    useEffect(() => {
        const updateFav = async () => {
            await updateFavoritePostsAndCount(setFav);
        };
        updateFav();
    }, [setFav]);

    const [data, setData] = useState([]);
    const { name, id } = useParams();
    useEffect(() => {
        http.get(`http://167.99.138.67:1111/getsinglepost/${name}/${id}`)
            .then(res => setData(res.data))
    }, [])
    return (
        <div className="d-flex flex-wrap justify-content-center gap-3">
            {data ?  <SinglePostDisplay item={data} key={data.id}/> : <h2>This post does not exist</h2>}
        </div>
    );
};

export default SinglePostPage;