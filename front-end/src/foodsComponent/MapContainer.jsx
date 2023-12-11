import React, { useCallback, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import { useLoaderData } from 'react-router-dom';
const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 12.61023,
  lng: 37.46897,
};
function MapContainer() {
 const { isLoaded } = useJsApiLoader({
   googleMapsApiKey: "AIzaSyA39a4B7hOE80Ak9Ts6GoQCtDfGMki_2p8",
 });

 if(!isLoaded)return <div>Loading</div>
 return <Map/>
}

function Map(){

  return <GoogleMap zoom={10} center={center} mapContainerStyle={{width:'400px',height:'400px'}}>
    <Marker position={center}/>
  </GoogleMap>
  

}

export default MapContainer