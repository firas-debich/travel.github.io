import React, { useState,useEffect,createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles.js";

function List({places,childClicked,isLoading,type,setType,rating,setRating}) {
 
  const [ref, setRef] = useState([])
  const classes = useStyles();
  useEffect(()=>{
        const refs = Array(places?.length).fill().map((_,i)=>ref[i]|| createRef())
        setRef(refs)
  },[places])
 
  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attraction around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ):
      <>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="3">Above 3.0</MenuItem>
          <MenuItem value="4">Above 4.0</MenuItem>
          <MenuItem value="4.5">Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places?.map((place, idx) => {
            return  (
                <Grid  item key={idx} xs={12} ref={ref[idx]}>
              <PlaceDetails  selected={Number(childClicked) === idx} refProp={ref[idx]} place={place} />
            </Grid>
          );
        })}
      </Grid>
      </>}
    </div>
  );
}

export default List;
