import { Link } from "react-router-dom";
import Countries from "../Countries/Countries.jsx";
import React, { useEffect } from "react";
import { GetCountries } from "../../actions/index";
import { useDispatch } from "react-redux";
import Nav from "../Nav/Nav.jsx";

export function Home(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetCountries());
    },[dispatch]);

    return (
        <div>
            <Nav/>
            <div>
                <Countries/>
            </div>
        </div>
    );
}

export default Home;