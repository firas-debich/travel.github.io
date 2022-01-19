import React ,{useEffect,useState}from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import {getPlacesData} from './api/index';


function App() {
  const [data , setData]=useState([])
  const [coordinates , setCoordinates]=useState({})
  const [bounds , setBounds]=useState(null)

  useEffect(()=>{
      navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
          setCoordinates({lat:latitude,lng:longitude})
      })
  },[])

  useEffect(()=>{
     getPlacesData(bounds?.sw,bounds?.ne)
        .then((data)=>{
          setData(data)
        })  
  },[bounds,coordinates])
  console.log(data);
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
