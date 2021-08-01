import { courseInterface } from "./courseinterface";

export interface courseListInterface{
    addToCart : (courseid:string)=> void;
    updateWishList : (courseid:string)=> void;
    courses : courseInterface[];
    type: string;
    openModal ?: (message:string,type:string)=> void;
}