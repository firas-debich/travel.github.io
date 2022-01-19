import React from 'react'
import {Chip,CardActions,CardContent,CardMedia,Card,Button,Typography,Box}  from "@material-ui/core"
import  LocationOnIcon from "@material-ui/icons/LocationOn"
import  PhoneIcon from "@material-ui/icons/Phone"
import Rating from "@material-ui/lab/Rating"
import useStyles from './styles.js';
function PlaceDetails({place}) {
    const classes = useStyles();
    return (
      <Card elevation={6}>
          <CardMedia
            style={{height:350}}
            image={place.photo ? place.photo.images.large.url : 'https://media-cdn.tripadvisor.com/media/photo-s/1a/18/3a/cb/restaurant-le-47.jpg'}
            title={place.name}
          
          
          />


      </Card>
    )
}

export default PlaceDetails
