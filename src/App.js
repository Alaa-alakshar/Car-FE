import React, { createContext, useReducer, useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AdminSignin from "./components/AdminSignin";
import AdminSignout from "./components/AdminSignout";
import AddCars from "./components/dashboardComponents/AddCars";
import Rentcarreports from "./components/dashboardComponents/Rentcarreports";
import Availableusers from "./components/dashboardComponents/Availableusers";
import Getrentcars from "./components/dashboardComponents/Getrentcars";
import Mycart from "./components/Mycart";
import Rentacar from "./components/Rentacar";
import Rentcarcart from "./components/Rentcarcart";
import Rentcarreviews from "./components/Rentcarreviews";
import Signout from "./components/Signout";
import ExploreRentcar from "./components/ExploreRentcar";
// comment
import { initialState, reducer } from "../src/reducer/UseReducer";
import {
  adminInitialState,
  adminreducer,
} from "../src/reducer/UseReducerAdmin";

export const UserContext = createContext();
export const AdminContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [adminState, dispatchadmin] = useReducer(
    adminreducer,
    adminInitialState
  );

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Route exact path="/">
          {" "}
          <Home />{" "}
        </Route>
        <Route path="/signin">
          {" "}
          <Signin />{" "}
        </Route>
        <Route path="/signup">
          {" "}
          <Signup />{" "}
        </Route>
        <Route path="/signout">
          {" "}
          <Signout />{" "}
        </Route>
        <Route path="/mycart">
          {" "}
          <Mycart />{" "}
        </Route>
        <Route path="/rentcar">
          {" "}
          <Rentacar />{" "}
        </Route>
        <Route path="/rentcarcart">
          {" "}
          <Rentcarcart />{" "}
        </Route>
        <Route path="/rentcarreviews">
          {" "}
          <Rentcarreviews />{" "}
        </Route>
        <Route path="/exploreRentcars">
          {" "}
          <ExploreRentcar />{" "}
        </Route>
      </UserContext.Provider>

      <AdminContext.Provider value={{ adminState, dispatchadmin }}>
        <Route path="/adminsignin">
          {" "}
          <AdminSignin />{" "}
        </Route>
        <Route path="/adminsignout">
          {" "}
          <AdminSignout />{" "}
        </Route>
        <Route path="/dashboard">
          {" "}
          <Dashboard />{" "}
        </Route>
        <Route path="/addCars">
          {" "}
          <AddCars />{" "}
        </Route>
        <Route path="/rentcarsreports">
          {" "}
          <Rentcarreports />{" "}
        </Route>
        <Route path="/availableusers">
          {" "}
          <Availableusers />{" "}
        </Route>
        <Route path="/getrentcarsforadmin">
          {" "}
          <Getrentcars />{" "}
        </Route>
      </AdminContext.Provider>
    </>
  );
};

export default App;
