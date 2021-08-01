import React from 'react';
// import { useHistory } from 'react-router-dom';
import { buttonInterface } from '../../interfaces/buttonInterface';

function Button(props : buttonInterface) {

    // const history = useHistory();
    
    const handleClick = ()=>{
        console.log(props)
        let cid= props.cid ? props.cid : "c20";
        console.log(props)
        if(props.addToCart ){
            // if(props.text==="Go to Cart"){
            //     history.push("/cart")
            //     return;
            // }
            if(props.alreadyIncart && props.openModal){
                props.openModal("Already Exist in cart","error");
                return;
            }
            props.addToCart(cid);
        }
        if(props.checkout){
            if(props.openModal){
                props.openModal("You have successfully placed your order","success");
                props.checkout(cid);
            }
        }
        if(props.closeModal){
            props.closeModal();
        }

    }

    return (
        <span className={props.class}
            onClick={()=>handleClick()}
        >
            {props.text}
        </span>
    );
}

export default Button;