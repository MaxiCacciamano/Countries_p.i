import React from "react";
// import style from "./country.module.css"
import { Link } from "react-router-dom";

const Country = ({img, name, subregion, id, activities})=>{
    return(
        <div>
        <Link to={`/countries/${id}`}/>

        <h2>{name}</h2>
        <img src={img} alt="Not found"/>
        <h3>{subregion}</h3>
        <h3>{activities}</h3>
        </div>
    )
}
export default Country;