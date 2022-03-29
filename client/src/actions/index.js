import axios from "axios";
import {  
    GET_COUNTRIES,
    GET_NAME,
    GET_DETAIL,
    ORD_ALPHA,
    ORD_ALPHA_REV,
    ORD_POP,
    ORD_POP_REV,
    ORD_CONTINENT,
    SHOW_ACTIV,} from "../actions/ActionNames";
 
export function GetCountries(){
     return async function (dispatch) {
         var res = await axios.get("http://localhost:3001/countries");
         return dispatch({
             type: GET_COUNTRIES,
             payload: res.data
         })
     }
}
export function GetName(name){
    return async function (dispatch) {
        try{
            const res = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({type: GET_NAME, payload: res.data})
        }
        catch(err){
            console.log("Someting we weong", err);
        }
    };
}

export function getDetail(id) {
    return async (dispatch) => {
      const res = await axios.get(`http://localhost:3001/countries/${id}`);
      dispatch({ type: GET_DETAIL, payload: res.data });
    };
  }

export function orderAlpha(){
    return{
      type: ORD_ALPHA,
    }
  }

export function orderAlpaReverse(){
    return{
        type:ORD_ALPHA_REV,
    }
}

export function orderPop(){
    return{
        type:ORD_POP,
    }
}

export function orderPopRev(){
    return{
        type: ORD_POP_REV
    }
}

export const orderCont = (payload) => {
    return {
      type: ORD_CONTINENT,
      payload,
    };
  };

export const showActiv = (payload)=>{
    return{
        type:SHOW_ACTIV,
        payload,
    }
}
    export function createCountry(activity){
    return async function(){
        try{
            console.log("body de from"+activity)
            const newAct = await axios.post("http://localhost:3001/activities",
            activity
            );
            console.log("newAct");
        }
        catch(err){throw new Error(err);}
    }

};
