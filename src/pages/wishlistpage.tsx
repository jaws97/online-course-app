import React from 'react';
import CommonView from '../components/coursescommonview';
import Discovercourses from '../components/shared/discovercourses';
import { homePageInterface } from '../interfaces/homePageInterface';

function WishList(props : homePageInterface){
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
            orderBy={props.orderBy}
            />
        </div>
    );
}

export default WishList;