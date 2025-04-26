import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import {sortPlacesByDistance} from "../loc.js"
import {fetchAvailablePlaces} from "../http.js"

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces ]= useState([]);
  const [error,setError] = useState();

  useEffect(() => {
    setIsFetching(true);
    const fetchPlaces = async () => {
      try{
        const places  = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude )
          setAvailablePlaces(sortedPlaces)
        });


      }catch(error){
          setError({message : error.message || 'could not fetch places'});
          setIsFetching(false);
        }
        setIsFetching(false);
    }
    fetchPlaces();
  },[])

  if(error){
    return <Error title="An error occured" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
