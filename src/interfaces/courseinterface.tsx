export interface courseInterface{
    cid:string;
    coursename: string;
    author: string;
    isWishlisted: boolean;
    actualprice: number;
    discountedprice: number;
    tags:string[];
    isAddedInCart: boolean;
}