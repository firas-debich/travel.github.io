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
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
      navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
          setCoordinates({lat:latitude,lng:longitude})
      })
  },[])

  useEffect(()=>{
    setIsLoading(true)
     getPlacesData(bounds?.sw,bounds?.ne)
        .then((data)=>{
          setData(data)
          setIsLoading(false)
        })  
  },[bounds,coordinates])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={data}
          childClicked={childClicked}
          isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={data}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
   
    </>
  );
}

export default App;
