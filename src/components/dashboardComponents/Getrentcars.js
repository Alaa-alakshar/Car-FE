import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import { AdminContext } from "../../App";

const Getrentcars = () => {
  const { adminState, dispatchadmin } = useContext(AdminContext);

  const [getcars, setGetcars] = useState([]);

  const getallrenttcars = async () => {
    try {
      const res = await fetch("/getAvailableRentcars", {
        method: "GET",
      });

      const data = await res.json();
      setGetcars(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallrenttcars();
  }, []);

  let carIdFromDashBoard;
  const deleteUser = (e) => {
    carIdFromDashBoard = e.target.id;

    return fetch("/deleteRentcarFromDashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carIdFromDashBoard,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          const deletedCar = await res.json();
          const cars = [...getcars];
          const filteredCars = cars.filter((_) => _._id != deletedCar._id);
          setGetcars(filteredCars);
        }
      })
      .catch((e) => console.log(e));
  };

  const Loginbutton = () => {
    if (adminState) {
      return (
        <div>
          <button className="logoutbtnDash">
            <NavLink className="nav-link" to="/adminsignout">
              logout
            </NavLink>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="logoutbtnDash">
            <NavLink className="nav-link" to="/signin">
              login
            </NavLink>
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <div className="sidebar">
        <div className="logo-details">
          <i className=""></i>
          <span className="logo_name1">car</span>
          <span className="logo_name">Book</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink className="dashlinks" to="/dashboard">
              <i className="bx bx-grid-alt"></i>
              <span className="allLinks_name">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="dashlinks" to="/addcars">
              <i class="fa-sharp fa-solid fa-square-plus"></i>
              <span className="allLinks_name">Add Cars</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="dashlinks" to="/getrentcarsforadmin">
              <i class="fa-sharp fa-solid fa-car"></i>
              <span className="allLinks_name">Available Rent Cars</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="dashlinks" to="/rentcarsreports">
              <i class="fa-solid fa-sack-dollar"></i>
              <span className="allLinks_name">Rent cars Income</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="dashlinks" to="/availableusers">
              <i class="fa-solid fa-users"></i>
              <span className="allLinks_name">Available Users</span>
            </NavLink>
          </li>
        </ul>

        <div className="logoutbtnDashDiv">
          <Loginbutton />
        </div>
      </div>

      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <span className="dashboard">Dashboard</span>
          </div>

          <div className="profile-details">
            <span className="admin_name">Admin</span>
          </div>
        </nav>

        <div className="salecartableDiv">
          <h1 className="heading">
            <span>Available Rent cars</span>
          </h1>

          <table className="salecartable">
            <thead>
              <tr>
                <th>BRAND </th>
                <th>MODEL </th>
                <th>RENT </th>
                <th>PRICE </th>
                <th>AVAILABILITY </th>
                <th>DELETE </th>
              </tr>
            </thead>

            {getcars.map((getcars) => (
              <tbody key={getcars._id}>
                <tr>
                  <td>{getcars.brand}</td>
                  <td>{getcars.model}</td>
                  <td>{getcars.rent}</td>
                  <td>{getcars.price} $</td>
                  <td>{getcars.availability} hours</td>
                  <td>
                    <button
                      id={getcars._id}
                      onClick={deleteUser}
                      className="btn"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </section>
    </>
  );
};

export default Getrentcars;
