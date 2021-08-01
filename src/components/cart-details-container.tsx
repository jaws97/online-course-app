import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartDetailsinterface } from '../interfaces/cartDetailsInterface';
import CartItem from './cart/cartItem';

function CartDetailsContainer(props:cartDetailsinterface){


    return(
        <div className="cart-container">
            <div className="cart-items-container">
                <div className="cart-item-header">
                    Your cart details
                </div>
                <div style={{height:"290px"}} className="flex cart-items-holder">
                    {props.cartItems.length === 0 ? (<span className="no-items">Your cart is empty right now. 
                        Please add courses in the cart from the list</span>) : 
                   ( props.cartItems.map((course)=>(
                        <CartItem
                        page="courses"
                        course={course}
                        />
                    ))
                    
                    )}
                </div>
                <div className="cart-value-container">
                    <div className="flex">
                        <div className="w-50">
                            <span className="cart-text">
                                Total Cart Value
                            </span>
                            <span className="cart-text" style={{fontWeight:700}}>
                                Rs {props.cartValue}/-
                            </span>
                        </div>
                        {props.cartValue !==0 ? 
                        (
                            <Link to="/cart" className="checkout-text">
                                <div >
                                    Go to checkout
                                </div>
                            </Link>
                        )
                        : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartDetailsContainer;