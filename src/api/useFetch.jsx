import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [err,setErr] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if(!res.ok){
                        throw Error('Error data')
                    }
                    return res.json()
                })
                .then(data => {
                    setData(data)
                    setIsPending(false)
                    setErr(null)
                }
                )
                .catch(error => {
                    setIsPending(false)
                    setErr(error.message)
                });
        },2000)

    }, [url]);
    return {data,isPending,err};
}
export default useFetch;