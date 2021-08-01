import React,{useEffect,  useState} from 'react';
import {Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import courseData from "./assets/sampledata.json"
import WishList from './pages/wishlistpage';
import HomePage from './pages/homepage';
import Cart from './pages/cartpage';
import Profile from './pages/profile';
import { courseInterface } from './interfaces/courseinterface';
import CustomModal from './modal/custommodal';
import tick  from "./assets/noun_tick_1611480.svg";
import error  from "./assets/noun_exclamation_939973.svg";
import ProductDetailPage from './pages/productdetailpage';

function App() {

  const location = useLocation();
  const history = useHistory();

  const [completeCourseList, setCompleteCourseList] = useState(courseData.slice(0));
  const [courseList, setCourseList] = useState(courseData.slice(0,4));
  const [itemInCart, setItemInCart] = useState<courseInterface[]>(courseData.filter((course)=> course.isAddedInCart));
  const [cartValue, setCartValue] = useState(getInitialCartValue);
  const [modalState, setModalState] = useState(false);
  const [modalIcon, setModalIcon] = useState(tick);
  const [modaltext, setModaltext] = useState("");
  // const [pageCount, setPageCount] = useState();

  const addToCart = (cid:string)=>{
      let course = courseData.find((course : courseInterface)=> course.cid === cid);
      if(course){
        const tempArray = [...itemInCart];
        course.isAddedInCart = true;
        tempArray.push(course);
        setItemInCart(tempArray);
        let value = cartValue;
        value += course.discountedprice;
        setCartValue(value);

        openModal("Course successfully added in the cart","success");
      }
  }

  function getInitialCartValue(){
    let amount = 0;
    courseData.map((course)=>{
      if(course.isAddedInCart){
        amount += course.discountedprice
      }
    })
    return amount;
  }


  const updateWishList = (cid:string,origin ?:string)=>{
      console.log(cid)
      console.log(origin,"origin")
      let tempCourses =  [...completeCourseList];;
      if(origin === "courses"){
        console.log("Inside here")
        tempCourses = [...courseList];
      }
      console.log(tempCourses)
      // let coursesInrendered = [...courseList];
      // let coursesInTotal = [...completeCourseList];
      // coursesInrendered.find(course=> cid===course.cid)!.isWishlisted = !(coursesInrendered.find(course=> cid===course.cid)!.isWishlisted);
      tempCourses.find(course=> cid===course.cid)!.isWishlisted = !(tempCourses.find(course=> cid===course.cid)!.isWishlisted);
      // setCompleteCourseList(coursesInTotal)
      console.log(tempCourses)
      if(origin === "delete") tempCourses = tempCourses.filter((course)=> course.isWishlisted);

      setCourseList(tempCourses);

  }


  const updatePageData = (index:number)=>{
      console.log("Home pae index ", index);
      let startIndex = (index-1)*4
      let endIndex = (index*4) >= completeCourseList.length ? completeCourseList.length : (index*4)
      const courses = completeCourseList.slice(startIndex,endIndex);

      setCourseList(courses);
  }

  const removeFromCart = (cid:string)=>{
    let course = itemInCart.find((course : courseInterface)=> course.cid === cid);
    
    if(course){
      const tempArray = itemInCart.filter((course : courseInterface)=> course.cid !== cid);
      course.isAddedInCart = false;
      setItemInCart(tempArray);
      let value = cartValue;
      value -= course.discountedprice;
      setCartValue(value)
    }

  }

  const checkOut = (cid:string)=>{
    courseData.map((course)=>{
      if(course.isAddedInCart){
        course.isAddedInCart = false;
      }
    })
    setCompleteCourseList(courseData);
    setItemInCart([]);
    setCartValue(0);
    setModalState(true);
    history.push("/courses")
  }

  const closeModal = ()=>{
    setModalState(false);
  }

  const openModal = (message:string,type:string)=>{
    setModaltext(message);
    if(type==="error"){
      setModalIcon(error);
    }
    if(type==="success"){
      setModalIcon(tick);
    }
    setModalState(true)
  }


  const orderBy = (condition:string,path ?:string)=>{
    
    let compCourses : courseInterface[] = [];
    if(condition==="asc"){
      compCourses =  courseData.sort((a,b)=> a.discountedprice - b.discountedprice);
    }
    if(condition==="desc"){
      compCourses =  courseData.sort((a,b)=> b.discountedprice - a.discountedprice);
    }

    if(path==="wishlist") compCourses = compCourses.filter((course)=> course.isWishlisted)

    setCompleteCourseList(compCourses)
    setCourseList(compCourses.slice(0,4))

  }

  const searchCourse = (query:string)=>{
    let tempArray : courseInterface []= [];

    if(query=== ""){
      setCompleteCourseList(courseData);
      setCourseList(courseData.slice(0,4));

      return;
    }

    courseData.map((course)=>{
      console.log(query)
        if(course.coursename.toLowerCase().includes(query) || 
        course.tags.includes(query.toLowerCase()) || 
        course.author.toLowerCase().includes(query.toLowerCase())){
          console.log(course)
          tempArray.push(course);
        }
    })
    let endIndex = 4 >= tempArray.length ? tempArray.length : 4
    setCompleteCourseList(tempArray);
    setCourseList(tempArray.slice(0,endIndex));


  }

  useEffect(() => {
    // runs on location, i.e. route, change
    console.log('handle route change here', location);
    console.log(location.pathname)
    if(location.pathname === "/wishlist"){
      const filteredCourses = completeCourseList.filter((course)=> course.isWishlisted);
      setCompleteCourseList(filteredCourses)
      let endIndex =  filteredCourses.length >= 4 ? filteredCourses.length : 4
      setCourseList(filteredCourses.slice(0,endIndex))
    }

    if(location.pathname === "/courses"){
      setCompleteCourseList(courseData)
      setCourseList(courseData.slice(0,4))
    }

    if(location.pathname === "/cart"){
      setCompleteCourseList(courseData)
      setCourseList(courseData.filter((course)=> course.isAddedInCart))
    }

    console.log(courseList)

  }, [location])

  return (
    <>
      <Header />
      {modalState ? <CustomModal
        icon={modalIcon}
        message={modaltext}
        closeModal={closeModal}
       /> : ""}
      <Switch>
        <Route path="/courses">
            <HomePage
            renderedCourses={courseList}
            allCourses={completeCourseList}
            updatePageData={updatePageData}
            updateWishList={updateWishList}
            addToCart={addToCart}
            itemInCart={itemInCart}
            type="courses"
            cartValue={cartValue}
            openModal={openModal}
            orderBy={orderBy}
            searchCourse={searchCourse}
            />
        </Route>

        <Route path="/wishlist">
            <WishList
            renderedCourses={courseList}
            allCourses={completeCourseList}
            updatePageData={updatePageData}
            updateWishList={updateWishList}
            addToCart={addToCart}
            itemInCart={itemInCart}
            type="wishlist"
            cartValue={cartValue}
            orderBy={orderBy}
           />
        </Route>

        <Route path="/cart">
          <Cart 
            cartItems={itemInCart}
            updateWishList={updateWishList}
            removeFromCart={removeFromCart}
            checkOut={checkOut}
            cartValue={cartValue}
            openModal={openModal}
          />
        </Route>

        <Route path="/profile">
          <Profile
           openModal={openModal}
           />
        </Route>
        
        <Route path="/course-detail/:coursename">
            <ProductDetailPage
                updateWishList={updateWishList}
                addToCart={addToCart}
                openModal={openModal}
             />
        </Route>
        <Redirect to="/courses" />
      </Switch>
      
    </>
  );
}

export default App;
