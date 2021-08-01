import React from 'react';
import { courseListInterface } from '../../interfaces/courseListInterface';
import Course from './course';


function CoursesList(props:courseListInterface){
    return(
        <div >
            {/* <Course /> */}
            {props.courses.map((course) =>(
                <Course 
                    course={course}
                    addToCart={props.addToCart}
                    updateWishList={props.updateWishList}
                    type={props.type}
                    openModal= {props.openModal}
                />
            ))}
        </div>
    );
}

export default CoursesList;