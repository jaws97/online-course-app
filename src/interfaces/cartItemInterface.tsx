import { courseInterface } from "./courseinterface";

export interface cartIteminterface {
    course : courseInterface;
    page:string;
    updateWishList ?: (courseid:string,originalid ?:string)=> void;
    removeFromCart ?: (courseid:string)=> void;
}