import React, { useEffect, useRef, useState } from 'react';
import Discovercourses from '../components/shared/discovercourses';
import profilepic from "../assets/profilepic.png"
import "../styles/profile.css"
import { UserInterface } from '../interfaces/userInterface';

function Profile(props:{openModal:(message:string,type:string)=> void}){

    const btnRef = useRef(null);

    
    const [displayName , setDisplayName ] = useState("");
    const [firstName , setFirstName ] = useState("");
    const [lastName , setLastName ] = useState("");
    const [role , setRole ] = useState("");
    const [errorSate , setErrorSate ] = useState(false);
    const [btnState , setBtnState] = useState("save-btn disabled");

    const [about , setAbout ] = useState("");

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>, field:string) => {
        let inputVal = event.target.value;

        if(field==="displayName") setDisplayName(inputVal);
        if(field==="firstName") setFirstName(inputVal);
        if(field==="lastName") setLastName(inputVal);
        if(field==="role"){
            setRole(inputVal);
            if(!isNaN(+inputVal) && inputVal !== "") setErrorSate(true)
            if(isNaN(+inputVal)) setErrorSate(false)
        } 
        

        if(checkFormPreviousState(field,inputVal) && !errorSate){
            setBtnState("save-btn")
        }
        else{
            setBtnState("save-btn disabled")
        }
    }

    const handleTextBoxChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        let inputVal = event.target.value;
        setAbout(inputVal);   
    }

    const areaOfInterest = ["Designer","Developer","Project Manager","Sales"]
    const [checkedState, setCheckedState] = useState([false,true,false,false]);

    const handleCheckOnChange = (index: number)=>{
        const updatedCheckedState = checkedState.map((item, position) =>
        position === index ? !item : item
      );
      setCheckedState(updatedCheckedState);

      if(checkFormPreviousState("interest",updatedCheckedState) && !errorSate){
        setBtnState("save-btn")
    }
    else{
        setBtnState("save-btn disabled")
    }

    }

    const [profession , setProfession] = useState("Student");

    const experienceArray = ["0-5","5-10","10 & Above"]
    const [experience , setExperience] = useState("5-10");
    
    const expertiseArray = ["Java","React","Backend"]
    const [expertise , setExpertise] = useState("React");

    const handleRadioChange = (value: string,field: string) =>{
        
        if(field==="profession") setProfession(value);
        if(field==="experience") setExperience(value);
        if(field==="expertise") setExpertise(value);
        
        if(checkFormPreviousState(field,value) && !errorSate){
            setBtnState("save-btn")
        }
        else{
            setBtnState("save-btn disabled")
        }
    }

    const saveData = (openModal: boolean)=>{

        let userData : UserInterface= {
            about,
            displayName,
            firstName,
            lastName,
            interest:checkedState,
            profession,
            experience,
            expertise,
            role
        };

        localStorage.setItem("userdetails",JSON.stringify(userData));

        if(openModal){
            props.openModal("Your profile is saved!","success")
        }
    }

    const checkFormPreviousState = (formfield:string, toCheck : any)=>{
        const savedUserData = localStorage.getItem("userdetails");
        if(savedUserData){
            let user = JSON.parse(savedUserData);
            if(formfield==="interest"){
                return JSON.stringify(user.interest) !== JSON.stringify(toCheck);
            }
            if(user[formfield] !== toCheck){
                return true;
            }
            return false;
        }
        return true;
    }

    useEffect(() => {
        const savedUserData = localStorage.getItem("userdetails");
        if(savedUserData){
            let user :UserInterface  = JSON.parse(savedUserData)
            console.log(user);
            setDisplayName(user.displayName);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setRole(user.role);
            setAbout(user.about);
            setCheckedState(user.interest);
            setProfession(user.profession);
            setExperience(user.experience);
            setExpertise(user.expertise);
        }
        else{
            saveData(false);
        }

    },[])

    return(
        <div className="container">
            <Discovercourses
              isCourses = {false}
              message = "My Profile"               
            />
            <div className="profile-outercontainer flex">
                <div className="profile-pic-container w-25">
                    <img src={profilepic} alt="profile pic" />
                </div>
                <div className="profile-details-container" >
                    <form>
                        <div className="profile-name-container flex" >
                            <div className="profile-displayname">
                                <label htmlFor="displayname" className="name-labels">Display Name</label>
                                <input type="text" name="displayname" value={displayName}
                                    onChange={(event) =>handleInputChange(event,"displayName")}
                                 className="nameinput" />
                            </div>
                            <div className="profile-firstname">
                                <label htmlFor="firstname" className="name-labels">First Name</label>
                                <input type="text" name="firstname" className="nameinput" value={firstName}
                                    onChange={(event) =>handleInputChange(event,"firstName")}
                                />
                            </div>
                            <div className="profile-lastname">
                                <label htmlFor="lastname" className="name-labels">Last Name</label>
                                <input type="text" name="lastname" className="nameinput" value={lastName}
                                    onChange={(event) =>handleInputChange(event,"lastName")}
                                />
                            </div>
                        </div>
                        <div className="about-container">
                            <label htmlFor="about" className="name-labels" >About Yourself</label>
                            <textarea name="about" className="nameinput textbox"  value={about}
                                onChange={(event) =>handleTextBoxChange(event)}
                            ></textarea>
                        </div>
                        <div className="interest-container mt-10">
                            <div className="name-labels">Your Area of Interest</div>
                            {areaOfInterest.map((interest,index)=>(
                                <div className="mt-20">
                                    <label className="check-box-label profile-options">{interest}
                                        <input type="checkbox" checked={checkedState[index]}
                                            onChange={() => handleCheckOnChange(index)}
                                        />
                                        <span className="custom-tick"></span>
                                    </label>                
                                </div>
                            ))}

                        </div>
                        <div className="profession-container">
                            <div className="name-labels">
                                Are you a student or Professional
                            </div>
                            <div className="mt-20">
                                <label className="radio-container profile-options">Student
                                    <input type="radio" name="profession"
                                        checked={profession === "Student" }
                                        onChange={() => handleRadioChange("Student","profession")}
                                     />
                                    <span className="radio-mark"></span>
                                </label>  
                                <label className="radio-container mt-10 profile-options">Professional
                                    <input type="radio" name="profession"
                                        checked={profession === "Professional" }
                                        onChange={() => handleRadioChange("Professional","profession")}
                                    />
                                    <span className="radio-mark"></span>
                                </label>  
                            </div>
                        </div>
                        {profession === "Professional" ? 
                        (<div className="professional-container mt-20">
                        <hr style={{border: "1px solid #E0E0E0"}} />
                            <div className="experience-container">
                                <div className="name-labels mt-20">
                                    How much of experience you have?
                                </div>
                                <div className="mt-10 flex">
                                    {experienceArray.map((exp,index)=>(
                                        <label className="radio-container profile-options ">{exp}
                                            <input type="radio" name="experience"
                                                checked={experience === exp }
                                                onChange={()=>handleRadioChange(exp,"experience")}
                                            />
                                            <span className="radio-mark"></span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="expertise-container mt-20">
                                <div className="name-labels">
                                    How much of experience you have?
                                </div>
                                <div className="mt-10 flex">
                                    {expertiseArray.map((tech,index)=>(
                                        <label key={"expertise-"+index} className="radio-container profile-options ">{tech}
                                            <input type="radio" name="expertise"
                                                checked={expertise === tech }
                                                onChange={() => handleRadioChange(tech,"expertise")}
                                            />
                                            <span className="radio-mark"></span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="role-container">
                            <div className="user-role">
                                <label htmlFor="userrole" className="name-labels">Mention your role</label>
                                <input type="text" name="userrole" value={role} className="nameinput mt-10"
                                    onChange={(event) => handleInputChange(event,"role")}
                                 />
                                 {errorSate ? 
                                 (<div className="error-msg">
                                    * Error Message : Please enter characters
                                 </div>) 
                                 : ""}
                            </div>
                            </div>

                            <hr style={{border: "1px solid #E0E0E0"}} />
                        
                        </div>)
                        : ""
                        }

                        <div className="save-btn-container">
                            <span className={btnState} ref={btnRef}
                                onClick={()=>saveData(true)}
                             >Save</span>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;