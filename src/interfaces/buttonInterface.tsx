export interface buttonInterface {
    text: string;
    class: string;
    alreadyIncart ?: boolean;
    addToCart ?: (cid:string)=>void;
    cid?: string;
    checkout ?: (cid:string)=>void;
    closeModal ?: ()=> void;
    openModal ?: (message:string,type:string)=> void;
}