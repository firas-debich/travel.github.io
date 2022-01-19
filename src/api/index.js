import axios from "axios";


const URL = process.env.REACT_APP_API_URL
const options = {
 
    params: {
      bl_latitude: '11.847676',
      tr_latitude: '12.838442',
      bl_longitude: '109.095887',
      tr_longitude: '109.149359',
    
    },
    headers: {
      'x-rapidapi-host':process.env.REACT_APP_API_HOST ,
      'x-rapidapi-key': process.env.REACT_APP_API_KEY
    }
  };
export  const getPlacesData = async()=>{
    try{
        const {data:{data}} = await axios.get(URL,options)
        return data ;
    }
    catch(error){
        console.log(error);
    }



}