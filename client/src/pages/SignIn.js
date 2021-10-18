import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "../components/Login";
import Register from "../components/Register";
import { useCookies } from "react-cookie";
import assetSignIn from "../assets/SignIn.jpeg";
import Swal from "sweetalert2";

const SignIn = props => {
  const [, setCookies] = useCookies(["token"]);
  const [label, setLabel] = useState("Login");

  const onSubmitLogin = async event => {
    event.preventDefault();
    const response = await axios
      .post("http://localhost:5000/users/login", {
        email: event.target.email.value,
        password: event.target.password.value
      })
      .catch(error => error.response);
    if (response && response.status === 200) {
      setCookies("token", response.data.token, { path: "/" });
      if (props.location.state) {
        props.history.push({
          pathname: props.location.state.redirect
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: response.data.message
      });
    }
  };

  const onSubmitRegister = async event => {
    event.preventDefault();
    const response = await axios
      .post("http://localhost:5000/users/register", {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        password: event.target.password.value
      })
      .catch(error => error.response);
    if (response && response.status === 201) {
      setCookies("token", response.data.token, { path: "/" });
      if (props.location.state) {
        props.history.push({
          pathname: props.location.state.redirect
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: response.data.message
      });
    }
  };

  return (
    <div className="flex h-screen">
      <img className="w-full" src={assetSignIn} alt="SignIn" />
      <div className="flex flex-col items-center w-full">
        <ol className="flex justify-center list-none w-full my-4">
          <li
            className="cursor-pointer p-4 w-2/5 text-center rounded-l-full"
            style={{
              backgroundColor:
                label === "Login" ? "rgba(52, 211, 153)" : "rgba(254, 202, 202)"
            }}
            onClick={event => setLabel(event.target.innerHTML)}
          >
            Login
          </li>
          <li
            className="cursor-pointer p-4 w-2/5 text-center rounded-r-full"
            style={{
              backgroundColor:
                label === "Register"
                  ? "rgba(52, 211, 153)"
                  : "rgba(254, 202, 202)"
            }}
            onClick={event => setLabel(event.target.innerHTML)}
          >
            Register
          </li>
        </ol>
        {label === "Login" ? (
          <Login onSubmitLogin={onSubmitLogin} />
        ) : (
          <Register onSubmitRegister={onSubmitRegister} />
        )}
      </div>
    </div>
  );
};

export default SignIn;
