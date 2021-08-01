import { courseInterface } from "./courseinterface";

export interface homePageInterface{
    addToCart : (courseid:string)=> void;
    updateWishList : (courseid:string)=> void;
    updatePageData : (index:number)=> void;
    orderBy : (condition:string, path ?:string)=> void;
    renderedCourses : courseInterface[];
    allCourses : courseInterface[];
    itemInCart: courseInterface[];
    type:string;
    cartValue : number;
    openModal ?: (message:string,type:string)=> void;
    searchCourse ?: (message:string)=> void;

}