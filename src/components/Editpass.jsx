import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

const Editpass = (props) => {
  const userid = localStorage.getItem("iduser");
  //  Hooks
  const [show, setshow] = useState(true);
  const [users, setusers] = useState([]);
  const [password, setpassword] = useState();
  const [lastpassword, setlastpassword] = useState();

  //  functions
  const reset = () => {
    setshow(false);
  };
  const reset2 = () => {
    document.getElementById("errorpassword").style.visibility = "hidden";
  };
  const getusers = async () => {
    const response = await fetch("/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
    });

    const data = await response.json();
    setusers(data);
  };

  const update = async (e) => {
    e.preventDefault();
    const response = await fetch("/updatepassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
      body: JSON.stringify({
        userid,
        password,
        lastpassword,
      }),
    });
    const data = await response.json();

    console.log("response" + JSON.stringify(data));

    if (data.res) {
      document.getElementById("alertmessage").style.visibility = "visible";
      reset2();
    } else if (data.message) {
      document.getElementById("errorpassword").style.visibility = "visible";
      console.log("nooo");
    }
  };
  // useEffect

  useEffect(() => {
    getusers();
  }, []);
  return (
    <div>
      {show === true ? (
        <div className="shadow" style={{ backgroundColor: "#BFBFBF" }}>
          <h4
            className="text-center m-4"
            style={{ fontFamily: "Lobster Two, cursive", color: "black" }}
          >
            Edit Password
          </h4>
          {users
            .filter((e) => e._id === userid)
            .map((user) => {
              return (
                <>
                  <form onSubmit={(e) => update(e)}>
                    <div
                      className="d-flex"
                      style={{ marginTop: "15px", marginLeft: "15px" }}
                    >
                      <label
                        style={{
                          fontFamily: "Lobster Two, cursive",
                          color: "black",
                        }}
                      >
                        Last Password{" "}
                      </label>
                      <input
                        type="password"
                        id="lastpass"
                        onChange={(e) => setlastpassword(e.target.value)}
                        className="form-control"
                        style={{ width: "60%", marginLeft: "44px" }}
                      />
                    </div>
                    <div
                      className="d-flex"
                      style={{ marginTop: "15px", marginLeft: "15px" }}
                    >
                      <label
                        style={{
                          fontFamily: "Lobster Two, cursive",
                          color: "black",
                        }}
                      >
                        New Password{" "}
                      </label>
                      <input
                        type="password"
                        id="ps"
                        className="form-control"
                        onChange={(e) => setpassword(e.target.value)}
                        style={{ width: "60%", marginLeft: "40px" }}
                      />
                    </div>
                    <div
                      className="text-danger "
                      id="errorpassword"
                      style={{ marginLeft: "150px", visibility: "hidden" }}
                    >
                      {" "}
                      <label id="errorpassword">
                        Last password is incorrect
                      </label>
                    </div>
                    <div className="d-flex " style={{ marginLeft: "140px" }}>
                      <button
                        type="submit"
                        className="btn  m-2"
                        style={{
                          backgroundColor: "#FF64FF",
                          fontFamily: "Lobster Two, cursive",
                        }}
                      >
                        Save Changes
                      </button>
                      <button
                        className="btn  m-2"
                        style={{
                          backgroundColor: "#FF64FF",
                          fontFamily: "Lobster Two, cursive",
                        }}
                        onClick={() => reset()}
                      >
                        Cancel
                      </button>
                    </div>
                    <div
                      class="alert alert-secondary text-success"
                      id="alertmessage"
                      style={{ visibility: "hidden" }}
                      role="alert"
                    >
                      Successfully Saved{" "}
                      <i class="fa-solid fa-circle-check"></i>
                    </div>
                  </form>
                </>
              );
            })}
        </div>
      ) : null}
    </div>
  );
};

export default Editpass;
