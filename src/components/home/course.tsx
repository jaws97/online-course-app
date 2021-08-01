import React from 'react';
import { courseItemInterface } from '../../interfaces/courseItemInterface';
import yellowstar from "../../assets/star.svg"
import greystar from "../../assets/greystar.svg"
import bin from "../../assets/noun_Delete_3715928.svg"
import rightarrow from "../../assets/rightarrow.svg"
import Button from '../shared/button';
import { Link } from 'react-router-dom';

function Course(props: courseItemInterface){
    
    return(
        <div className="card-body flex cpointer">
            <div className="image-holder">
                <span className="image-alt"></span>
            </div>
            <div className="course-name">
                <span>
                    {props.course.coursename}
                </span>
                <div className="tag-container">
                    {props.course.tags.map((tagname)=>(
                        <Button 
                            text={tagname}
                            class="btn tags"
                        />
                    ))}
                </div>
            </div>
            <div className="author">
            {props.course.author}
            </div>
            {props.type === "courses" ?
            (<div className="wishListIcon">
                {/* {props.course.isWishlisted ? (<img src={yellowstar} alt="grey" />) : (<img src={greystar} alt="yellow" />)} */}
                <img src={props.course.isWishlisted ? yellowstar : greystar} 
                    alt={props.course.isWishlisted ? "yellowstar" : "greystar"} 
                    onClick={()=>props.updateWishList(props.course.cid,"courses")}
                    />
            </div>)
            : ""
            }
            <div className="price">
                Rs&nbsp;{props.course.discountedprice}/-
            </div>
            <div className={props.course.actualprice === props.course.discountedprice ? "actual-price" : "strikethrough actual-price"}>
                {props.course.actualprice === props.course.discountedprice ? "-" : "Rs "+props.course.actualprice}
            </div>
            <div className="cart-btn">
                    <Button 
                        // text={props.course.isAddedInCart ? "Go to Cart" : "Add to cart"}
                        text="Add to cart"
                        class="btn add-cart"
                        addToCart={props.addToCart}
                        cid={props.course.cid}
                        alreadyIncart={props.course.isAddedInCart}
                        openModal={props.openModal}
                    />
            </div>
            {props.type === "wishlist" ?
            (<div className="wishListIcon cpointer">
                <img src={bin} alt="delete" 
                    onClick={()=>props.updateWishList(props.course.cid,"delete")}
                    />
            </div>)
            : ""
            }
            <div className="view">
                <Link to={"/course-detail/"+props.course.coursename.split(" ").join("-")}>
                    <img src={rightarrow} className="cpointer" alt=">" />
                </Link>
            </div>
        </div>
    );
}

export default Course;