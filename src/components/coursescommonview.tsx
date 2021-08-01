import React, { useRef, useState } from 'react';
import CoursesList from './home/courseslist';
import Paginator from './home/paginator';
import CartDetailsContainer from './cart-details-container';
import { homePageInterface } from '../interfaces/homePageInterface';
import search  from "../assets/search.svg"
import orderby  from "../assets/orderby.svg"

function CommonView(props:homePageInterface){

    const orderbyRef = useRef(null);
    const [ searchQuery , setSearchQuery] = useState("");
    const [ finalValueInSearch , setFinalValueInSearch] = useState("");

    const toggleOrderBy = ()=>{
        (orderbyRef.current as unknown as HTMLElement).classList.toggle("show");
    }

    const handleOrderBy = (cond:string)=>{
        toggleOrderBy();
        props.orderBy(cond, props.type);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setSearchQuery(event.target.value);
    }

    const handleInputEnter = (event: React.KeyboardEvent)=>{
        if (event.key === 'Enter') {
            searchTheCourse();
        }
    }

    const searchTheCourse = ()=>{
        if(props.searchCourse){
            props.searchCourse(searchQuery);
            setFinalValueInSearch(searchQuery)
        }
    }

    return(
            <div className="course-container">
                {props.renderedCourses.length === 0 ? 
                (<div className="course-list-container">
                    <div className="empty-cart" style={{marginTop:"50px"}}>
                        Sorry, we couldn't find any results for the {finalValueInSearch} 😟
                    </div>
                </div>) :
                (<div className="course-list-container">
                    <div className="course-header flex">
                        <p>All Courses</p>
                        <div style={{width:"90%", position:"relative"}}>
                            <div className="f-right orderby cpointer" 
                             onClick={(()=>toggleOrderBy())}
                            >
                            <span >
                                Course Price &nbsp;&nbsp;&nbsp;
                            </span>
                            <span>
                                <img src={orderby} alt="" className="orderby-icon" />
                            </span>
                            </div>
                            <div className="f-right order-options-container" ref={orderbyRef}>
                                <div className="order-options cpointer"
                                    onClick={()=> handleOrderBy("asc")}
                                >
                                Low to High
                                </div>
                                <div className="order-options cpointer"
                                onClick={()=> handleOrderBy("desc")}
                                >
                                High to Low
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="course-list">
                        <CoursesList
                            courses={props.renderedCourses}
                            addToCart={props.addToCart}
                            updateWishList={props.updateWishList}
                            type={props.type}
                            openModal={props.openModal}
                        />
                        {props.allCourses.length > 5 ?
                        (<Paginator
                            updatePageData={props.updatePageData}
                            pagecount={Math.ceil(props.allCourses.length/5)}
                        />)
                        : ""
                        }
                    </div>
                </div>
                )}
                <div className="cart-outer-container" id="cart-outer-container">
                <div className="cart-header-container">
                {props.type === "wishlist" ? (<div style={{marginBottom:"55px"}}></div>) : 
                (<div className="searchboxwrapper">
                    <input className="searchbox" type="text"
                        onChange={event => handleInputChange(event)}
                        onKeyPress={event => handleInputEnter(event)}

                     value={searchQuery} placeholder="Search here" id="s" />
                    <span className="searchsubmit"
                        onClick={()=> searchTheCourse()}
                    >
                        <img src={search} alt="search" className="search-icon" id="searchsubmit" />
                    </span>
                </div>)}
                </div>
                    <CartDetailsContainer 
                        cartItems={props.itemInCart}
                        cartValue={props.cartValue}
                    />
                </div>
            </div>
    );
}

export default CommonView;