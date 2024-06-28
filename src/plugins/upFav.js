import http from '../plugins/http';

const updateFavoritePostsAndCount = async (setFav) => {
    try {
        const allPostsResponse = await http.get('http://167.99.138.67:1111/getallposts');
        if (!allPostsResponse.success) {
            throw new Error('Failed to fetch all posts.');
        }

        const allPosts = allPostsResponse.data;
        let favoritePosts = JSON.parse(localStorage.getItem('favoritePosts')) || [];
        const allPostIds = allPosts.map(post => post.id);
        const updatedFavoritePosts = favoritePosts.filter(fav => allPostIds.includes(fav.id));
        localStorage.setItem('favoritePosts', JSON.stringify(updatedFavoritePosts));

        const secretKey = localStorage.getItem('secretKey');
        const filteredFavoritePosts = updatedFavoritePosts.filter(fav => fav.secretKey === secretKey);
        setFav(filteredFavoritePosts.length);
    } catch (error) {
        console.error('Error updating favorite posts:', error);
        throw error;
    }
};

export { updateFavoritePostsAndCount };
