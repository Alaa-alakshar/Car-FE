import React, {useState, useEffect, useContext} from 'react'
import { NavLink } from "react-router-dom";

import { UserContext } from "../App"

const ExploreRentcar = () => {

    const {state, dispatch} = useContext(UserContext)


    const Loginbutton= () =>{
        
        if(state){
            return <div> 
                <button className="btn"><NavLink className="nav-link" to="/signout">logout</NavLink></button>      
            </div>
        }
        else{
            return <div>  
                    <button className="btn"><NavLink className="nav-link" to="/signin">login</NavLink></button>
                    
                </div>
        }
    
    }



    const [renttcarsData, setrenttcarsData] = useState([]);

    const exploreRentcar = async () =>{
        try {
            const res = await fetch ('/exploreRentcarData', {
                method: 'GET',
            });

            const data = await res.json();

            setrenttcarsData(data)
          

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        exploreRentcar();
    }, [])

    

    const alertDiv = document.getElementById("alertDiv")
    const handleClick = () =>{
        if(alertDiv.style.display === "none"){
            alertDiv.style.display = "flex"
            window.alert("Please signin to rent the car!");
        }
        else{
            alertDiv.style.display = "flex"
        }
    }


    const hideAlert = () => {
        if(alertDiv.style.display === "flex"){
            alertDiv.style.display = "none"
        }
        else{
            alertDiv.style.display = "none"
        }
    }


    return (
        <>

            <header className="header">
            <div id="menu-btn" className="fas fa-bars"></div>
            <NavLink className="logo" to="/"> <span>car</span>Book </NavLink>

            <nav className="navbar">
                <NavLink  to="/">Home</NavLink>
                <NavLink to="/rentcar">Rent car</NavLink>
            </nav>
            <div id="login-btn">
                <Loginbutton />
            </div>
            </header>

            <div id="alertDiv" >
            <p>Have you liked it?</p>
            <button className='btn' onClick={hideAlert}><NavLink to="/rentcar" className="nav-link">Rent Now</NavLink></button>
        </div>


        <div className="explorecarsDiv">

        {renttcarsData.map((renttcarsData, index) =>  
        
        <div className = "explorecarsImg"  key={renttcarsData._id}>    

            <img src={renttcarsData.filePath} alt="" style={{width: "80%", height: "70%"}} onClick={handleClick}/>
            <h4><b>{renttcarsData.brand}</b></h4>
            <p>{renttcarsData.model}</p>
            </div>
        )}

        </div>
        </>
    )
}

export default ExploreRentcar