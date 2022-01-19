import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData ,getWeatherData} from "./api/index";

function App() {
  const [data, setData] = useState([]);
  const [WeatherData, setWeatherData] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filtredPlaces, setFilteredPlaces] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    const filtered = data?.filter((place) => Number(place.rating) >= rating);

    setFilteredPlaces(filtered);
  }, [rating]);
  useEffect(() => {
    if (bounds){

      setIsLoading(true);
      getWeatherData(coordinates.lat,coordinates.lng)
      .then((data)=>setWeatherData(data))
      getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
        
        setData(data?.filter((place) => place?.name && place?.num_reviews > 0));
        setFilteredPlaces(null)
        setRating('');
        setIsLoading(false);
      });
    }
  }, [bounds, type]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };
  return (
    <>
      <CssBaseline />
      <Header    onPlaceChanged={onPlaceChanged}  onLoad={onLoad}/>
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filtredPlaces ? filtredPlaces : data}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filtredPlaces ? filtredPlaces : data}
            setChildClicked={setChildClicked}
            WeatherData={WeatherData}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
