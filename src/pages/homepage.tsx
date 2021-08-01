import React from 'react';
import CommonView from '../components/coursescommonview';
import Discovercourses from '../components/shared/discovercourses';
import { homePageInterface } from '../interfaces/homePageInterface';

function HomePage(props : homePageInterface){
    return (
        <div className="container">
            <Discovercourses
             isCourses = {true}
             message = "Discover Latest Courses on"
             />
            <CommonView
            renderedCourses={props.renderedCourses}
            allCourses={props.allCourses}
            updatePageData={props.updatePageData}
            updateWishList={props.updateWishList}
            addToCart={props.addToCart}
            itemInCart={props.itemInCart}
            type={props.type}
            cartValue={props.cartValue}
            openModal= {props.openModal}
            orderBy={props.orderBy}
            searchCourse={props.searchCourse}
            />
            
        </div>
    );
}

export default HomePage;