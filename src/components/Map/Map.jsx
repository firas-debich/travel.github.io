import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles.js";
import {mapStyles} from "./mapStyles"
function Map({setCoordinates , setBounds ,coordinates,places,setChildClicked,WeatherData}) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI: true, zoomControl: true ,styles:mapStyles}}
        onChange={(e)=>{
            setCoordinates({lat:e.center.lat,lng:e.center.lng})
            setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw})
        }}
        onChildClick={(child) => setChildClicked(child)}
        yesIWantToUseGoogleMapApiInternals
      >
           {places?.length && places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place?.latitude)}
            lng={Number(place?.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place?.photo ? place?.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt=""
                  />
                  <Rating name="read-only" size="small" value={Number(place?.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}
         {WeatherData?.list?.length && WeatherData?.list.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" alt=""/>
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
