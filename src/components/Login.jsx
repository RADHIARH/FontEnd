import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import SingIn from "./SingIn";
import { Online } from "../redux/actions";
import { Authentication } from "../redux/actions";

const Login = (props) => {
  //  access data from store
  const state = useSelector((state) => state.reducer);
  // states
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [values, setvalues] = useState({
    email: "",
    password: "",
  });
  const [user, setuser] = useState([]);
  const [singIn, setsingIn] = useState(false);
  const [list, setlist] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
    } catch (err) {}
  };
  const getdata = async () => {
    const res = await fetch("https://cryptic-coast-57283.herokuapp.com/users");
    const listdata = await res.json();
    console.log(listdata);
    setlist(listdata);
  };
  // useEffect(() => {
  //     getdata();
  //     console.log(list)
  //  }, []);

  //  use History
  const history = useHistory();
  // use Dispatch
  // // functions
  // login
  const login = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://cryptic-coast-57283.herokuapp.com/login",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const tab = [];
    const data = await response.json();
    const user = JSON.stringify(data.user);
    tab.push(user);

    // save token in the localStorage

    if (user) {
      localStorage.setItem("TK", data.token);
      localStorage.setItem("user", tab);
      localStorage.setItem("iduser", data.user._id);
      history.push(`/listusers`);
    } else {
      document.getElementById("alertmessage").style.visibility = "visible";
    }
  };
  // sign in
  const SignIn = () => {
    // setsingIn(!singIn)
    history.push("/signIn");
  };
  return (
    <div>
      {/* login  */}
      <div
        className="col-md-6  offset-md-3 shadow   "
        style={{
          marginTop: "20px",
          border: "2px double black",
          borderRadius: "30px",
          backgroundColor: "#7D7D7F",
        }}
      >
        <div className="d-flex justify-content-center">
          <h1
            className="text-black "
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            Let's Talk
            <img
              alt=""
              src="data:image/jpeg;base64,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"
              style={{
                width: "100px",
                height: "90px",
                marginTop: "10px",
                borderRadius: "50%",
                marginLeft:"20px"
              }}
            />
          </h1>
          {/* <h1 style={{ marginTop: "20px", marginLeft: "10px" }}>أحكيلي</h1> */}
        </div>
        <form onSubmit={(e) => login(e)}>
          <div className="form m-4">
            <div
              className="d-flex "
              style={{ marginBottom: "20px", marginLeft: "35px" }}
            >
              <label
                className="label-control  fs-4  m-2"
                style={{ fontFamily: "Lobster Two, cursive", color: "black" }}
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="form-control"
                placeholder="Please enter your email"
              />
            </div>
            <div className="d-flex " style={{ marginBottom: "20px" }}>
              <label
                className="label-control fs-4  m-2"
                style={{ fontFamily: "Lobster Two, cursive", color: "black" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                name="password"
                onChange={(e) => setpassword(e.target.value)}
                className="form-control"
                placeholder="Please enter your password"
              />
            </div>
            <div className=" d-flex justify-content-center">
              <button
                className="btn "
                type="submit"
                style={{
                  fontFamily: "Lobster Two, cursive",
                  backgroundColor: "#FE92AA",
                }}
              >
                Submit
              </button>
            </div>
            <div
              className="alert alert-danger text-danger mt-2 text-center "
              id="alertmessage"
              style={{ visibility: "hidden" }}
              role="alert"
            >
              password or username is incorrect
            </div>
          </div>
        </form>
        {/* sign in */}
        <div className=" d-flex  justify-content-center">
          <button
            className="btn  fs-2 m-2"
            onClick={() => SignIn()}
            style={{
              color: "black",
              textDecoration: "none",
              fontFamily: "Dancing Script, cursive",
              borderColor: "white !important",
              backgroundColor: "#FE92AA",
            }}
          >
            {" "}
            Create an account
          </button>
        </div>
        {/* { singIn===true?
            <div  style={{width:"80%"}}>
            <SingIn/>
            </div>:
            null} */}
      </div>
    </div>
  );
};
export default Login;
