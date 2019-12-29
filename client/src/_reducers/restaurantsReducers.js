import {
   FETCH_RESTAURANTS,
   FETCH_RESTAURANT_BY_ID,
   FETCH_RESTAURANT_ADDRESS
  } from "../_constants/restaurantConst";
  
  const initialState = {
    restaurants: [],
    restaurantID: [],
    address: [],
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_RESTAURANTS:
        return {
          ...state,
          restaurants: action.payload
        };
        case FETCH_RESTAURANT_BY_ID:
          return {
            ...state,
            restaurantID: action.payload
          };
        case FETCH_RESTAURANT_ADDRESS:
          return{
            ...state,
            address : action.payload
          }  
      default:
        return state;
    }
  }