import {GET_COUNTRIES} from "../actions/ActionNames";


const initialState = {
  countries: [],
}

function RootReducer(state = initialState, action){
  switch(action.type){
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      }
      default: return state;
    
  }
}
export default RootReducer;