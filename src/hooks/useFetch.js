import { useEffect, useState } from "react";

export const useFetch = (fetchFn, initialValue) => {
    const [isFetching, setIsFetching] = useState(false);
    const [fetchedData, setFetchedData] = useState(initialValue);
    const [error, setError] = useState()

    useEffect(() => {
        const fetchData = async () => {
          setIsFetching(true);
          try{
            const data = await fetchFn();
            setFetchedData(data);
          }catch(error){
            setError({message : error.message || 'failed to load places'});
            setIsFetching(false);
          }
         
          setIsFetching(false);
        }
       
        fetchData();
    },[])

    return {isFetching, fetchedData, setFetchedData , error}

}