const toggleFavorite = (item, isFavorite, setFav, fav, setIsFavorite) => {
    const secretKey = localStorage.getItem('secretKey');
    let favoritePosts = JSON.parse(localStorage.getItem('favoritePosts')) || [];

    if (isFavorite) {
        setFav(fav - 1);
        favoritePosts = favoritePosts.filter(favItem => !(favItem.id === item.id && favItem.secretKey === secretKey));
    } else {
        setFav(fav + 1);
        favoritePosts.push({
            secretKey: secretKey,
            id: item.id,
            username: item.username
        });
    }

    localStorage.setItem('favoritePosts', JSON.stringify(favoritePosts));
    setIsFavorite(!isFavorite);
};

export default toggleFavorite;