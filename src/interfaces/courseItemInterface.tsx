import { courseInterface } from "./courseinterface";

export interface courseItemInterface{
    addToCart : (courseid:string)=> void;
    updateWishList : (courseid:string,originalid ?:string)=> void;
    course : courseInterface;
    type : string;
    openModal ?: (message:string,type:string)=> void;
}