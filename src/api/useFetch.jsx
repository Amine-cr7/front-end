import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return data;
}
export default useFetch;