import React, {useState, useEffect, useContext} from 'react'
import { NavLink, useHistory } from "react-router-dom";

import { UserContext } from "../App"

const Rentacar = () => {

    const {state, dispatch} = useContext(UserContext)

    const history = useHistory(); 

    const [rentcarsData, setRentcarsData] = useState([]);

    const allRentcars = async () =>{
        try {

            if(!state){
                window.alert("Please signin to see all available cars for rent!")
                history.push('/signin')
            }

            const res = await fetch ('/getRentcarData', {
                method: 'GET',
            });

            const data = await res.json();
            setRentcarsData(data)
            
           

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        allRentcars();
    }, [])


    const specsDiv = document.getElementsByClassName("specsDivRentcar");
    const carDiv = document.getElementsByClassName("cardivRentcar");
    const formDiv = document.getElementsByClassName("formDivRentcar");

    const showDetails= (e) =>{
        let currentcar = e.target.id;
            if(specsDiv[currentcar].style.display === "none" && carDiv[currentcar].style.display === "block"){
                carDiv[currentcar].style.display = "none";
                specsDiv[currentcar].style.display = "block";
            }
            else{
                carDiv[currentcar].style.display = "block"
                specsDiv[currentcar].style.display = "none"

            }
    }

    const showcar= (e) =>{
        let currentcar = e.target.id;
            if(specsDiv[currentcar].style.display === "block" && carDiv[currentcar].style.display === "none"){
                specsDiv[currentcar].style.display = "none";
                carDiv[currentcar].style.display = "block";
            }
            else{
                specsDiv[currentcar].style.display = "block"
                carDiv[currentcar].style.display = "none"
            }
    }

    const [rentHours, setRentHours] = useState('')
    const handleInputs = (e) =>{
        let value = e.target.value;
        setRentHours(value);
    }

    const addToCart= (e) =>{
        let currentcar = e.target.id;
        if(formDiv[currentcar].style.display === "none" && specsDiv[currentcar].style.display === "none" && carDiv[currentcar].style.display === "block"){
            carDiv[currentcar].style.display = "none";
            specsDiv[currentcar].style.display = "none";
            formDiv[currentcar].style.display = "block";
        }
        else{
            formDiv[currentcar].style.display = "none"
            specsDiv[currentcar].style.display = "none"
            carDiv[currentcar].style.display = "block"
        }
    }

    const showcarAgain = (e) =>{
        let currentcar = e.target.id;
        if(formDiv[currentcar].style.display === "block" && specsDiv[currentcar].style.display === "none" && carDiv[currentcar].style.display === "none"){
            carDiv[currentcar].style.display = "block";
            specsDiv[currentcar].style.display = "none";
            formDiv[currentcar].style.display = "none";
        }
        else{
            formDiv[currentcar].style.display = "block"
            specsDiv[currentcar].style.display = "none"
            carDiv[currentcar].style.display = "none"
        }
    }

    const proceedToCart= async (e) =>{
        e.preventDefault();
        let itemId = e.target.id;
       

        const res = await fetch("/addrentcartocart", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                itemId, rentHours
            })
        })
        
        const data = await res.json();

        if(res.status === 500 || !data){
            window.alert("Something went wrong");
        }
        else{
            window.alert("Item added. Please click on Go To cart to complete the purchase");
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



    const [searchText, setSearchText] = useState('');

    const searchTextBtn = async () =>{
        const res = await fetch("/searchRentcar", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                searchText
            })
        })

        getSearchData();
    }



    const getSearchData = async () =>{
        try {
            const res = await fetch ('/rentcarsearchCategory', {
                method: 'GET',
            });

            const data = await res.json();
            
            setRentcarsData(data)                
          
            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        
            <header className="header">
                <div id="menu-btn" className="fas fa-bars"></div>
                <NavLink className="logo" to="/"> <span>car</span>Book </NavLink>
                <nav className="navbar">
                <NavLink className="nav-link" to="/">Home</NavLink>
                    
                <NavLink className="nav-link" to="/rentcarcart">Go To Cart</NavLink>
                
                <input type="text" name="name"  placeholder="Search car" style={{ width: "30%", height: "8%"}}value={searchText} onChange={(e)=>setSearchText(e.target.value)}className="btn"/>
                <button type="submit" onClick={searchTextBtn} className="btn"><i className="fa fa-search"></i></button>
                </nav>
                <div id="login-btn">
                <Loginbutton />
                </div>

            </header> 

            <div className="rentcarcard">

                {rentcarsData.map((rentcarsData, index) => 
                    
                        [<div className = "cardivRentcar"  key={rentcarsData._id}>    

                            <img src={rentcarsData.filePath} alt="" style={{width: "80%", height: "70%"}}/>
                            <h4>{rentcarsData.brand}</h4>
                            <p>{rentcarsData.model}</p>

                            <div style={{display: "flex", gap: "15px"}}>
                            <button className='cardbtn' id={index}  onClick={showDetails}>Details</button><br/>
                            <button className='cardbtn' id={index}  onClick={addToCart}>Add To Cart</button><br/>
                            </div>
                        </div>,

                        <div className ="specsDivRentcar" key={new Date}>
                        
                            <p>Brand : {rentcarsData.brand}</p>
                            <p>Model : {rentcarsData.model}</p>
                            <p>Year : {rentcarsData.year}</p>
                            <p>Color : {rentcarsData.color}</p>
                            <p>Seats : {rentcarsData.seats}</p>
                            <p>Rent Per Hour : {rentcarsData.rent}</p>
                            <p style={{color: "red"}}>Availibility : {rentcarsData.availability +" hours"}</p>
                            
                            <div style={{display: "flex", gap: "15px"}}>
                            <button className='cardbtn' ><NavLink className="nav-link" to={{pathname: '/rentcarreviews', state:{id: rentcarsData._id}}} >car Reviews</NavLink></button>
                            <button className='cardbtn' id = {index} onClick={showcar}>show car</button>
                            </div>
                        </div>,

                        <div className = "formDivRentcar"  key={index}>

                            <form method="POST" >
                             <h3>Before click on proceed please enter for how many hours do you want to rent the car</h3><br/>   
                            <label htmlFor="lname">Rent Hours: </label><br/>
                            <input type="text"  className='cardbtn' name="rentforhours" value={rentHours} onChange={handleInputs} placeholder="Enter rent hours" /><br/>
                            
                            <input type="submit" className='cardbtn' value="Proceed" id={rentcarsData._id} onClick={proceedToCart}/>
                            </form> 
                            <button className='cardbtn' id = {index} onClick={showcarAgain}>show car</button>    
                            
                        </div>]    
                   
                )}
            </div>


        </>
    )
}

export default Rentacar
