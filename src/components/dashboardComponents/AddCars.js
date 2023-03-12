import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

import { AdminContext } from "../../App";

const AddCars = () => {
  const { adminState, dispatchadmin } = useContext(AdminContext);
  const [open, setOpen] = useState(false);

  const history = useHistory();
  const [file, setFile] = useState();
  const [car, setcar] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    enginecc: "",
    maxpower: "",
    airbags: "",
    rearcamera: "",
    price: "",
    retailprice: "",
    quantity: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setcar({ ...car, [name]: value });
  };

  const handleFile = (e) => {
    const myfile = e.target.files[0];
    setFile({ ...car, myfile });
  };

  const postData = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("brand", file.brand);
    formData.append("model", file.model);
    formData.append("year", file.year);
    formData.append("color", file.color);
    formData.append("enginecc", file.enginecc);
    formData.append("maxpower", file.maxpower);
    formData.append("airbags", file.airbags);
    formData.append("rearcamera", file.rearcamera);
    formData.append("price", file.price);
    formData.append("retailprice", file.retailprice);
    formData.append("quantity", file.quantity);
    formData.append("myfile", file.myfile);

    const res = await fetch("/addcars", {
      method: "POST",
      body: formData,
    });
  };

  const initialState = {
    brand: "",
    model: "",
    year: "",
    color: "",
    seats: "",
    price: "",
    rent: "",
  };
  const [rentFile, setRentFile] = useState();
  const [rentcar, setRentcar] = useState(initialState);

  let rentName, rentValue;

  const handleRentInputs = (e) => {
    rentName = e.target.name;
    rentValue = e.target.value;

    setRentcar({ ...rentcar, [rentName]: rentValue });
  };

  const handleRentFile = (e) => {
    const myrentfile = e.target.files[0];
    setRentFile({ ...rentcar, myrentfile });
  };

  const postRentData = async (e) => {
    e.preventDefault();
    let rentData = new FormData();
    rentData.append("brand", rentFile.brand);
    rentData.append("model", rentFile.model);
    rentData.append("year", rentFile.year);
    rentData.append("color", rentFile.color);
    rentData.append("seats", rentFile.seats);
    rentData.append("price", rentFile.price);
    rentData.append("rent", rentFile.rent);
    rentData.append("myrentfile", rentFile.myrentfile);

    const res = await fetch("/addrentcars", {
      method: "POST",
      body: rentData,
    })
      .then((res) => {
        if (res.ok) {
          setOpen(true);
          setRentcar(initialState);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
          ;<i className=""></i>
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
              <span className="allLinks_name">Available Rent cars</span>
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

        <div className="home-content">
          <div className="sales-boxes">
            {/* Rent File */}
            <div className="recent-sales box">
              <h1 className="heading">
                <span>Add Cars For Rent</span>
              </h1>
              <form
                method="POST"
                className="addcarform"
                name="rentform"
                id="myrentform"
              >
                <label htmlFor="fname">Brand: </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={rentcar.brand}
                  onChange={handleRentInputs}
                  placeholder="Enter car Brand"
                />
                <br />
                <label htmlFor="lname">Model: </label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  value={rentcar.model}
                  onChange={handleRentInputs}
                  placeholder="Enter car Model"
                />
                <br />
                <label htmlFor="fname">Year: </label>
                <input
                  type="text"
                  name="year"
                  id="year"
                  value={rentcar.year}
                  onChange={handleRentInputs}
                  placeholder="Manufacturing Year"
                />
                <br />
                <label htmlFor="fname">Color: </label>
                <input
                  type="text"
                  name="color"
                  id="color"
                  value={rentcar.color}
                  onChange={handleRentInputs}
                  placeholder="Enter car Color"
                />
                <br />
                <label htmlFor="lname">Seats: </label>
                <input
                  type="text"
                  name="seats"
                  id="seats"
                  value={rentcar.seats}
                  onChange={handleRentInputs}
                  placeholder="Enter car Seats"
                />
                <br />
                <label htmlFor="lname">car Price: </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={rentcar.price}
                  onChange={handleRentInputs}
                  placeholder="Enter car price"
                />
                <br />
                <label htmlFor="lname">car Rent: </label>
                <input
                  type="text"
                  name="rent"
                  id="rent"
                  value={rentcar.rent}
                  onChange={handleRentInputs}
                  placeholder="Enter rent per hour"
                />
                <br />
                <label htmlFor="fname">Picture: </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleRentFile}
                />
                <div className="button">
                  <input type="submit" name="submit" onClick={postRentData} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          you have successfully added a car
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddCars;
