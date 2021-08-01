import React from 'react';
import CartContainer from '../components/cart/cartcontainer';
import Discovercourses from '../components/shared/discovercourses';
import { cartListInterface } from '../interfaces/cartListInterface';


function Cart(props:cartListInterface){
    return(
        <div className="container">
            <Discovercourses
            isCourses = {false}
            message = "Shopping Cart" />
            <CartContainer
                cartItems={props.cartItems}
                updateWishList={props.updateWishList}
                removeFromCart={props.removeFromCart}
                checkOut={props.checkOut}
                cartValue={props.cartValue}
                openModal={props.openModal}
             />
        </div>
    );
}

export default Cart;