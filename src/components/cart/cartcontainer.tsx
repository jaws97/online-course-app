import React, { useEffect, useState } from 'react';
import { cartListInterface } from '../../interfaces/cartListInterface';
import Button from '../shared/button';
import CartItem from './cartItem';
import "../../styles/cart.css"


function CartContainer(props: cartListInterface){

    const [amountSaved, setAmountSaved] = useState(0);

    useEffect(()=>{
        let amount = 0;
        props.cartItems.map((course)=>{
            if(course.actualprice !== course.discountedprice){
                amount += (course.actualprice - course.discountedprice);
            }
        })

        setAmountSaved(amount);
    },[])

    return(
            <div className="course-container">
                <div className="course-list-container">
                    <div className="cart-header">
                        <p>{props.cartItems.length} {props.cartItems.length  === 1 ?"Course" : "Courses"} in Cart</p>
                    </div>
                    {props.cartItems.length === 0 ?
                    (<div className="empty-cart">
                        Looks like you haven't added any courses in the cart 😟
                    </div>):
                    (<div className="course-list">
                        {props.cartItems.map((item,index)=>(
                            <CartItem
                                key={index}
                                course={item}
                                page="cart"
                                updateWishList={props.updateWishList}
                                removeFromCart = {props.removeFromCart}
                                
                            />
                        ))}
                    </div>)
                    }
                </div>
                <div className="cart-outer-container" id="cart-outer-container">
                    <div className="cart-value-outer-container">
                            <div className="mt-4 total-text">
                                Total Amount
                            </div>
                            <h2 className="cart-amount-value">
                                Rs {props.cartValue}/-
                            </h2>
                            {props.cartValue !== 0 ?  
                            (<>
                                {amountSaved>0 ? 
                                (<div className="ml-5 green">
                                    You have saved Rs&nbsp;{amountSaved}/-
                                </div>):
                                (<div style={{marginBottom:"30px"}}></div>)
                                }
                                <div className="mt-5 ml-5">
                                    <Button
                                        text="Checkout"
                                        class="btn add-cart"
                                        checkout={props.checkOut}
                                        openModal={props.openModal}
                                    />
                                </div>
                            </>
                            )
                            : ""
                            }
                    </div>
                </div>
            </div>
    );
}

export default CartContainer;