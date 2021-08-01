import React,{useState,useEffect} from 'react';
import rightarrow from "../../assets/rightcoloredarrow.svg"
import leftarrow from "../../assets/leftcoloredarrow.svg"
import "../../styles/home.css"

function Paginator(props:{pagecount:number,updatePageData:(index:number)=>void}){

    const [currentPage, setCurrentPage] = useState(1)
    const [pageCountList, setPageCountList] = useState([1])

    const changePageNumber = (index:number)=>{
        console.log(index)
        setCurrentPage(index)
        props.updatePageData(index)
    }
    
    const changePageNumberUsingArrow = (type:string)=>{
        
        if((!pageCountList.includes(currentPage + 1) && type==="inc") || (!pageCountList.includes(currentPage-1) && type==="dec")) return;

        if(type === "inc"){
            setCurrentPage(currentPage+1)
            props.updatePageData(currentPage+1)
        }
        if(type==="dec"){
            setCurrentPage(currentPage - 1)
            props.updatePageData(currentPage-1)
        }
    }

    useEffect(()=>{
        var tempArray : number []=  [];
        for(let i=1;i<props.pagecount+1;i++){
            tempArray.push(i)
        }
        setPageCountList(tempArray);
    },[props.pagecount])

    return(
        <div className="pageination-container">
            <div>
                <img src={leftarrow} className="cpointer" alt="leftarrow" onClick={()=>changePageNumberUsingArrow("dec")} />
            </div>
            <div>
                {pageCountList.map((count:number,index:number)=>(
                    <span className={index+1 === currentPage ? "currentPage pagenumbers" :"pagenumbers"} key={index+1} id={"page-"+ (index+1).toString()}
                     onClick={()=>changePageNumber(index+1)}
                     >{count}</span>
                ))}
            </div>
            <div>
            <img src={rightarrow} className="cpointer" alt="rightarrow" onClick={()=>changePageNumberUsingArrow("inc")} />
            </div>
        </div>
    );
}

export default Paginator;