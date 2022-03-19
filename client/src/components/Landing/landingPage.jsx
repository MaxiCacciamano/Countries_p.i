import React from 'react';
import {Link} from 'react-router-dom';
import Style from "./Landing.module.css";

export default function LandinPage(){
    return (
        <div>
            <h1>Bienvenidos paises</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}