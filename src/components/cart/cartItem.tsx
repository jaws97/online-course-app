import React from 'react';
import { cartIteminterface } from '../../interfaces/cartItemInterface';
import "../../styles/cart.css"
import bin from "../../assets/noun_Delete_3715928.svg"

function CartItem(props : cartIteminterface){

    const handleDelete = (cid:string)=>{
        if(props.removeFromCart){
            props.removeFromCart(cid)
        }
    }

    const handleWishlist = (cid:string)=>{
        if(props.updateWishList){
            props.updateWishList(cid)
        }
    }

    return(
        <>
        { props.page === "courses" ?
        (<div className="card-body cart-body">
            <div className="flex">
                <div className="image-holder">
                    <span className="image-alt small"></span>
                </div>
                <div className="cart-course">
                    {props.course.coursename}
                </div>
            </div>
            <div className="cart-amount">
                Rs&nbsp;{props.course.discountedprice}/-
            </div>
        </div>)
        :
        (<div className="card-body cart-body flex cpointer">
            <div className="separate-container">
                <div className="image-holder">
                    <span className="image-alt small"></span>
                </div>
                <div className="cart-course">
                    <span>
                        {props.course.coursename}
                    </span>
                    <span className="authorname">
                        {props.course.author}
                    </span>
                </div>
            </div>
            <div className="separate-container justify-flexend">
                <div className={props.course.isWishlisted ? "movewish disabled" : "movewish active"}
                    onClick={()=> handleWishlist(props.course.cid)}
                >
                    {props.course.isWishlisted ? "Remove from wishlist" : "Move to wishlist"}
                </div>
                <div className="cart-amount pt-4">
                    Rs&nbsp;{props.course.discountedprice}/-
                </div>
                <div>
                    <img src={bin} className="bin" alt="delete"
                        onClick={()=> handleDelete(props.course.cid)}
                    />
                </div>
            </div>
        </div>)
        }
        </>
    );
}

export default CartItem;