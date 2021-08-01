import { courseInterface } from "./courseinterface";

export interface ProductDetailInterface{
    // course : courseInterface;
    updateWishList : (courseid:string,originalid ?:string)=> void;
    addToCart : (courseid:string)=> void;
    openModal ?: (message:string,type:string)=> void;
}