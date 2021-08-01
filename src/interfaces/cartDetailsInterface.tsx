import { MutableRefObject } from "react";
import { courseInterface } from "./courseinterface";

export interface cartDetailsinterface {
    cartItems:courseInterface[];
    cartValue : number;
}