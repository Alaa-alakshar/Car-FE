import React, {useState, useEffect, useContext} from 'react'
import { NavLink, useLocation, useHistory } from "react-router-dom";

import { UserContext } from "../App"

const Rentcarreviews = () => {

    const {state, dispatch} = useContext(UserContext)

    let location = useLocation();
    const selectedcarId = location.state
    const [userData, setUserData] = useState({id:"", name:"", email:"", message:""});
    const [renttcarsData, setrenttcarsData] = useState({
        id: "",
        brand : "",
        model : "",
        year : "",
        color : "",
        seats : "",
        rent : "",
        fileName : "",
        filePath : "",
        fileType : "",
        fileSize : ""
    });
    const [allrenttcarReviews, setAllrenttcarReviews] = useState([]);

    const sendId = async () =>{
        try {
            const res = await fetch("/sendReviewRentcarId", {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    selectedcarId
                })
            })

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        sendId();
    }, [])

    const reviewcarData = async () =>{
        try {
            const res = await fetch ('/getRentcarReviews', {
                method: 'GET',
            });

            const data = await res.json();
            setrenttcarsData({
            id : data.findcar._id,
            brand : data.findcar.brand,
            model : data.findcar.model,
            year : data.findcar.year,
            color : data.findcar.color,
            seats : data.findcar.seats,
            rent : data.findcar.rent,
            fileName : data.findcar.fileName,
            filePath : data.findcar.filePath,
            fileType : data.findcar.fileType,
            fileSize : data.findcar.fileSize
            })
            
            setUserData({...userData, id:data.findUser._id, name:data.findUser.name, email:data.findUser.email})

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        reviewcarData();
    }, [])



    const getallreviews = async () =>{
        try {
            const res = await fetch ('/getallreviewsforselectedrentcar', {
                method: 'GET',
            });

            const data = await res.json();

            setAllrenttcarReviews(data.allReviews);

        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getallreviews();
    }, [])



    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value });
    }



     
    const submitReviews = async (e) =>{
        e.preventDefault();

        const {id, name, email, message}= userData;

        const res = await fetch('/postrentcarreviews',{
            method:'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                id, name, email, message, selectedcarId
            })
        });

        const data = await res.json();


        if(data.status === 500 || !data){
            window.alert("reviews not submited");
            console.log("reviews not submited");
        }
        else if(data.status===201){
            window.alert("reviews submited");
            setUserData({...userData, message:""});
        }
        else{
            window.alert("reviews submited");
            setUserData({...userData, message:""});
        }
    }


    
   
    
    const Loginbutton= () =>{
        
        if(state){
            return <div> 
                <button ><NavLink className="btn" to="/signout">logout</NavLink></button>      
            </div>
        }
        else{
            return <div>  
                    <button ><NavLink className="btn" to="/signin">login</NavLink></button>
                    
                </div>
        }
    }


    return (
        <>
            <header className="header">
                <div id="menu-btn" className="fas fa-bars"></div>
                <NavLink className="logo" to="/"> <span>car</span>Book </NavLink>
                <nav className="navbar">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/rentcar">Rent cars</NavLink>
                </nav>
                <div id="login-btn">
                <Loginbutton />
                </div>
            </header>
            

            
            <div className = "reviewsdiv">    

                <img src={renttcarsData.filePath} alt="" style={{width: "80%", height: "70%"}}/>
                <h4><b>{renttcarsData.brand}</b></h4>
                <p>Model : {renttcarsData.model}</p>
                <p>Year : {renttcarsData.year}</p>
                <p>Color : {renttcarsData.color}</p>
                <p>Seats : {renttcarsData.seats}</p>
                <p>Rent : {renttcarsData.rent}</p>

            </div>
                   
            
        <section className="contact" id="contact">
            <h1 className="heading"><span>Reviews</span></h1>

            {allrenttcarReviews.map((allrenttcarReviews) => 
                    <div className = "reviewsli"  key={allrenttcarReviews._id}>
                            <ul>
                                <li style={{wordSpacing: "10px"}}>{allrenttcarReviews.name} :- {allrenttcarReviews.comments}</li>
                            </ul> 
                        </div>
                     
            )}

            <div className="row">
                <form method="POST">
                    <h3>write your reviews</h3>
                    <input type="text" name="name" value={userData.name} onChange={handleInputs} placeholder="your name" className="box"/>
                    <input type="email" name="email" value={userData.email} onChange={handleInputs} placeholder="your email" className="box"/>
                    <textarea placeholder="your reviews" name="message" value={userData.message} onChange={handleInputs} className="box" cols="30" rows="10"></textarea>
                    <input type="submit" value="submit reviews" onClick={submitReviews} className="btn"/>
                </form>

            </div>

        </section>
        </>
    )
}

export default Rentcarreviews
