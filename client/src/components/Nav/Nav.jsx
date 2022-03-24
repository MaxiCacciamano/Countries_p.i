import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import style from "../Nav/navBar.module.css";
import { connect, useDispatch } from "react-redux";
import SearchBar from "../Search/SearchBar.jsx";

import {
    GetCountries,
    orderAlpha,
    orderPop,
    orderPopRev,
    orderCont,
    showActiv
  } from "../../actions";
import { orderAlpaReverse } from "../../actions/index";
const NavBar=({
    GetCountries,
    orderAlpha,
    orderPop,
    orderPopRev,
    orderCont,
    showActiv
})=>{
    const [sort, setOrder] = useState("");
   const [region, setRegion] = useState("");
   const [activity, setActivity] = useState("");
   const dispatch = useDispatch();

   useEffect(() => {
       if (region) {
           GetCountries();
           if (region !== "all") {
               setTimeout(() => {
                   dispatch(orderCont(region));
                }, 20 );
            }
        }
    }, [region]);
    useEffect(()=>{
        if(sort==="all") GetCountries();
        else if(sort==="a-z") orderAlpha();
        else if(sort==="z-a") orderAlpaReverse();
        else if(sort==="↑ population") orderPop();
        else if(sort==="↓ population") orderPopRev();
    },[sort])
   
    const handlerActivity=(e)=>{
        e.preventDefault();
        setActivity(e.target.value)
    };


    const handlerSearch=(e)=>{
        e.preventDefault();
        GetCountries();
        setTimeout(()=>{
            dispatch(showActiv(activity))
        },200)
        console.log(activity);
        setActivity(" ");
    }


    return(
        <div>
            <Link to="/">
             Welcom  
            </Link>
            <div>
            <p>sort By</p>
            <select onChange={(event) => setOrder(event.target.value)}>
            <option value="all">-</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="↑ population">↑ population</option>
            <option value="↓ population">↓ population</option>
           </select>
            <SearchBar />
            </div>
            <div>
            <p>Filter by Continent</p>
            <select onChange={(event)=>setRegion(event.target.value)}>
                <option value="all">All</option>
                <option value="Americas">Americas</option>
                <option value="Europe">Europe</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
                <option value="Asia">Asia</option>
            </select>
            </div>
            <div>
                <label>Activity</label>
                <form>
                    <input
                    placeholder="Search your activity"
                    type="text"
                    autoComplete="off"
                    value={activity}
                    onChange={handlerActivity}
                    />
                    <button onClick={handlerSearch}>Search</button>
                </form>
            </div>
            <Link to="/activities">
                <p>Create an Activity</p>
            </Link>
        </div>
    )
}
const mapDispatchToProps = (dispatch)=>{
    return {
        orderAlpha:()=> dispatch(orderAlpha()),
        GetCountries:()=> dispatch(GetCountries()),
        orderCon:()=> dispatch(orderCont()),
        orderAlpaReverse:()=> dispatch(orderAlpaReverse()),
        showActiv:()=> dispatch(showActiv()),
        orderPop:()=> dispatch(orderPop()),
        orderPopRev:()=> dispatch(orderPopRev()),
    };
};

const mapStateToProps = (state)=>{
    return{
        countries: state.countries,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);