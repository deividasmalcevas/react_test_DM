const http = {
    post: async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
    get: async (url) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
};

export default http;
