import axios from 'axios'
import { useState, useEffect } from 'react'
import { Project } from '../interface'

export default function useFetch(url: string, shouldFetch = true) {
    const [data, setData] = useState<Project[] | Project>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {
        const controller = new AbortController()
        if (shouldFetch) {
            (async () => {
                setLoading(true)
                try {

                    const response = await axios.get(url, { signal: controller.signal })
                    setData(response.data);
                } catch (err) {
                    setError(true);
                } finally {
                    setLoading(false);
                }
            })();
        }

        return () => controller?.abort()
    }, [url]);

    return { loading, error, data, setData }

}
