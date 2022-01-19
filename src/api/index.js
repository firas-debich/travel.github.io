import axios from "axios";


const URL = process.env.REACT_APP_API_URL

export  const getPlacesData = async(sw,ne)=>{
    const options = {
 
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        
        },
        headers: {
          'x-rapidapi-host':process.env.REACT_APP_API_HOST ,
          'x-rapidapi-key': process.env.REACT_APP_API_KEY
        }
      };
    try{
        const {data:{data}} = await axios.get(URL,options)
        return data ;
    }
    catch(error){
        console.log(error);
    }



}