import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import {sortPlacesByDistance} from "../loc.js"
import {fetchAvailablePlaces} from "../http.js"
import { useFetch } from '../hooks/useFetch.js';


const sortFetchedPlaces = async () => {

  const places =  await fetchAvailablePlaces();

    return new Promise((resolve) => {
       navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude );

        resolve(sortedPlaces)
      })
    })
}

export default function AvailablePlaces({ onSelectPlace }) {

    const {isFetching, fetchedData : availablePlaces , error } = useFetch(sortFetchedPlaces,[]);
  

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
