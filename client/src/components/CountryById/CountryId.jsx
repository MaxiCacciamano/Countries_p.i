import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../../actions/index";
import  Activity  from '../Countries/ActivityDetail';
// import style from "./countryId.module.css";

const CountryId = ()=>{
    const detailtCountry = useSelector((state)=>state.detailtCountry);
    const dispatch = useDispatch();

    let {id} = useParams();
    useEffect(()=>{
        dispatch(getDetail(id));
    },[id]);

    console.log(detailtCountry, "country detail");

    return (
        <div>
            <button>
                <Link to="/countries">Back countries</Link>
            </button>
            <div>
                <h1>{detailtCountry.name}</h1>
                <h3>{detailtCountry.id}</h3>
                <img src={detailtCountry.img} alt="Not found"/>
                <h4>Region:{detailtCountry.region}</h4>
                <h5>Subregion:{detailtCountry.subregion}</h5>
                <h5>Capital:{detailtCountry.capital}</h5>
                <h5>Area:{detailtCountry.area}</h5>
                <h5>Population:{detailtCountry.population}</h5>
                <div>
                    <Activity countryName={detailtCountry.name} activities={detailtCountry.activities}/>
                </div>
            </div>
        </div>
    );
};

export default CountryId;