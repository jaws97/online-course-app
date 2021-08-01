import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import Button from '../components/shared/button';
import Discovercourses from '../components/shared/discovercourses';
import { ProductDetailInterface } from '../interfaces/productDetailInterface';
import "../styles/product.css";
import courseData from "../assets/sampledata.json"
import clock from "../assets/clock.svg"
import wishlist from "../assets/wish-list.svg"
import { courseInterface } from '../interfaces/courseinterface';

function ProductDetailPage(props:ProductDetailInterface){

    var courseDummy : courseInterface = {
        cid :"",
        coursename :"",
        author : "",
        isWishlisted : false,
        actualprice : 0,
        discountedprice : 0,
        tags : [],
        isAddedInCart : false
    }

    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0,0,0,0);
    const today = new Date().getTime();
    const params : any =useParams();
    const [ chosenCourse, setChosenCourse] = useState(courseDummy);
    const [timeLeft , setTimeLeft] = useState(Math.ceil((tomorrow-today)/(1000*60*60)))
    

    useEffect(()=>{
        let course= courseData.find((course)=> course.coursename.toLowerCase() === params.coursename.split("-").join(" ").toLowerCase() );
        if(course){
            setChosenCourse(course);
        }
        
    },[])

    return(
        <>
        <div className="container">
            <Discovercourses 
            isCourses = {true}
            message = "Discover Latest Courses on"
            />
            <div className="bread-crumbs-container">
              <Link to="/courses"> 
                    <span style={{color: "#0F1317"}} className="cpointer"> All Courses {'>'} </span>
              </Link>
               <span style={{fontWeight:"bold"}}> {chosenCourse.coursename}</span>
            </div>
        </div>
        <div className="width-container">
            <div className="container">
                <h2>
                    {chosenCourse.coursename}
                </h2>
                <p>
                    {chosenCourse.coursename}
                </p>
                <div className="course-author" style={{color:"#FF9271"}}>
                   {chosenCourse.author}
                </div>
                <div className="flex" style={{marginTop:"5px"}}>
                    {chosenCourse.tags.map((tag)=>(
                        <Button 
                        text={tag}
                        class="tags btn custom"
                        />                        
                    ))

                    }

                </div>
            </div>
        </div>
        <div className="container flex">
            <div className="course-details-container">
            <p style={{font: "normal normal 300 18px/22px Montserrat", fontWeight:"bold"}}>
                Course Details
            </p>
                <p style={{font: "normal normal 300 18px/22px Montserrat"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p style={{font: "normal normal 300 18px/22px Montserrat"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p style={{font: "normal normal 300 18px/22px Montserrat"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p style={{font: "normal normal 300 18px/22px Montserrat"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p style={{font: "normal normal 300 18px/22px Montserrat"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div className="video-outer-container">
                <div className="video-container">
                    videpppppppppppppsdddsssssssss
                </div>
                <div className="course-pricing">
                    <div className="cart-text" style={{fontWeight:"bold"}}>
                        Rs&nbsp;{chosenCourse.discountedprice}/-
                    </div>
                    <div className="strikethrough  cart-text" style={{display:"block"}}>
                    Rs&nbsp;{chosenCourse.actualprice}/-
                    </div>
                    <div style={{margin: "10px 0px 10px 15px"}}>
                       <img src={clock} alt="clock" className="timer" />
                        <span className="orange" style={{fontWeight:"bold"}}>
                            &nbsp;&nbsp; {timeLeft} hours 
                        </span>
                        <span className="orange">
                            &nbsp;left for this price
                        </span>
                        
                    </div>
                    <div className="flex" style={{margin: "10px 0px 15px 15px"}}>
                        <Button
                            text="Add to cart"
                            class="btn cus-addcart"
                            addToCart={props.addToCart}
                            cid={chosenCourse.cid}
                            alreadyIncart={chosenCourse.isAddedInCart}
                            openModal={props.openModal}
                         />
                        <div className="wishlistdiv orange cpointer" 
                        onClick={()=> props.updateWishList(chosenCourse.cid)}
                        >
                            <span>
                                {chosenCourse.isWishlisted ? "Remove" : "Add to wishlist"}
                                </span>
                            <img src={wishlist} alt="" className="wishicon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ProductDetailPage;