import {FETCH_RESTAURANTS, FETCH_RESTAURANT_BY_ID,FETCH_RESTAURANT_ADDRESS} from '../_constants/restaurantConst';
import axios from "axios";

export const setRestaurant = restaurants =>{
    return {
        type:FETCH_RESTAURANTS,
        payload:restaurants
    };
}
export const setRestaurantByID = restaurants =>{
  return {
      type:FETCH_RESTAURANT_BY_ID,
      payload:restaurants
  };
}
export const setRestaurantAddress = address =>{
  return {
      type:FETCH_RESTAURANT_ADDRESS,
      payload:address
  };
}

export const fetchRestaurants = () => dispatch => {
    return axios
      .get("/api/restaurants/list")
      .then(res => {
        return dispatch(setRestaurant(res.data));
      })
      .catch(err =>
        console.log("ERror",err)
      );
  };
  export const fetchRestaurantByID = (id) => dispatch => {
    return axios
      .get(`/api/restaurants/search/${id}`)
      .then(res => {
        console.log(res.data);
        return dispatch(setRestaurantByID(res.data));
      })
      .catch(err =>
        console.log("ERror",err)
      );
  };

  export const fetchRestaurantAddress = (id) => dispatch => {
    return axios
      .get(`/api/restaurants/address/${id}`)
      .then(res => {
        console.log(res.data);
        return dispatch(setRestaurantAddress(res.data));
      })
      .catch(err =>
        console.log("ERror",err)
      );
  };
 

   