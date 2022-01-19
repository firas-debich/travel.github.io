import axios from "axios";

const URL = process.env.REACT_APP_API_URL;
const WURL = process.env.REACT_APP_WEATHER_URL;
export const getPlacesData = async (type, sw, ne) => {
  const options = {
    params: {
      bl_latitude: sw.lat,
      tr_latitude: ne.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
    },
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_API_HOST,
      "x-rapidapi-key": process.env.REACT_APP_API_KEY,
    },
  };
  try {
    const {
      data: { data },
    } = await axios.get(`${URL}${type}/list-in-boundary`, options);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat,lng) => {
  
  try {
    if(lat && lng){
  
      const WOptions = {
        params: {
          lat:lat,
          lon:lng,
        },
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_API_WEATHER_HOST,
          "x-rapidapi-key": process.env.REACT_APP_API_WEATHER_KEY,
        },
      };
      const { data } = await axios.get(WURL,WOptions);
      console.log(data);
      return data
    }
    
  } catch (error) {
    console.log(error);
  }
};
