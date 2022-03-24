import React from 'react';
import {Link} from 'react-router-dom';
import style from './Landing.module.css';


export function LandinPage(){
    return (
        <div >
          <div className={style.title}>
            <h1>Discover te world</h1>
          </div>
            <button className={style.btn} >
            <Link  to="/countries" className={style.home}  >
              Home
            </Link>
          </button>
        </div>
    )
}
export default LandinPage;