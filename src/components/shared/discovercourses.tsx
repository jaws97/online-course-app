import React from 'react';
import reactlogo from '../../logo.svg';
import "../../styles/home.css";

function Discovercourses(props:{isCourses:boolean,message:string}){
    return(
        <div className="discover-container">
            <div className="text-container">
                <span><h3>{props.message}</h3></span>
                {props.isCourses ? 
                (<span><h3>React</h3></span>) : ""
                }
            </div>
            <div>
                <img src={reactlogo} alt="React logo" className="react-logo" />
            </div>
        </div>
    );
}

export default Discovercourses;