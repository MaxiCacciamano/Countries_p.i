import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GetCountries, GetName } from "../../actions";
// import style from "./searchBar.module.css";


const SearchBar = () => {
    const [input, setInput] = useState("");
    
    const dispatch = useDispatch();

    const inputHandler = (e)=>{
        setInput(e.target.value);
    }

    const handlerClick = (e)=>{
        dispatch(GetName(input));
    }

    const handlerReset = () =>{
        dispatch(GetCountries());
    }

    return(
        <div>
            <input type="text"
             placeholder="Search by name..."
              name="input" 
              autoComplete="off"
              onChange={(e)=>{inputHandler(e)}}
              />
              <button onClick={handlerClick}>Search</button>
              <button onClick={handlerReset}>Reset</button>
       </div>
)
}

export default SearchBar;