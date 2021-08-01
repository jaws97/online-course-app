export interface ModalInterface{
    icon:string;
    message:string;
    coursename ?:string;
    closeModal : ()=> void;
}