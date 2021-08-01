import { courseInterface } from "./courseinterface";

export interface cartListInterface {
    cartItems:courseInterface[];
    updateWishList : (courseid:string,originalid ?:string)=> void;
    removeFromCart : (courseid:string)=> void;
    checkOut : (courseid:string)=> void;
    cartValue : number;
    openModal ?: (message:string,type:string)=> void;
}