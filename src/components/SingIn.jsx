import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adduser } from "../redux/actions";
import { useHistory } from "react-router-dom";
const Singin = () => {
  // useDispatch
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState();
  const history = useHistory();

  // states
  const [show, setshow] = useState(true);
  // functions
  const sign = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://cryptic-coast-57283.herokuapp.com/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            phone,
          }),
        }
      );
      const data = response.json();
      if (data) {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
    // dispatch(adduser(username,email,password,phone,img))
    // alert(`Welcome .....${document.getElementById("username").value}`);
    setshow(false);
  };
  return (
    <div
      className="col-md-5  offset-md-3 shadow"
      style={{
        backgroundColor: "#7D7D7F",
        marginTop: "100px",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <p
        style={{
          fontFamily: "Dancing Script, cursive",
          fontSize: "30px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Register to our application
      </p>
      {show === true ? (
        <div style={{ margin: "40px" }}>
          <form onSubmit={(e) => sign(e)}>
            <input
              type="text"
              className="form-control m-3"
              style={{ width: "90%" }}
              value={username}
              onChange={(e) => setusername(e.target.value)}
              id="username"
              placeholder="Please enter your username"
            />
            <input
              type="text"
              className="form-control m-3"
              style={{ width: "90%" }}
              value={email}
              onChange={(e) => setemail(e.target.value)}
              id="email"
              placeholder="Please enter your email"
            />
            <input
              type="text"
              className="form-control m-3"
              style={{ width: "90%" }}
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              id="phone"
              placeholder="Please enter your phone number"
            />
            <input
              type="password"
              className="form-control m-3"
              style={{ width: "90%" }}
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Please enter your password"
            />

            <div style={{ marginLeft: "20px", marginTop: "30px" }}>
              <button
                className="btn"
                type="submit"
                style={{ backgroundColor: "#FE92AA", width: "370px" }}
              >
                Sign IN
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Singin;
