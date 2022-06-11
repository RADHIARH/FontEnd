import React from "react";
import { useDispatch } from "react-redux";
import { TiDelete } from "react-icons/ti";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import EditProfile from "./EditProfile";
import EditPicture from "./EditPicture";
import { BsXCircle } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import Editpass from "./Editpass";
import { useEffect } from "react";

const Userprofile = () => {
  const userr = JSON.parse(localStorage.getItem("user"));
  const iduser = localStorage.getItem("iduser");

  //  useHistory
  const history = useHistory();
  //  states
  const [users, setusers] = useState([]);
  const [user, setuser] = useState([userr]);
  const [show, setshow] = useState(false);
  const [editpic, seteditpic] = useState(false);
  const [editpassword, seteditpassword] = useState(false);
  const user_id = localStorage.getItem("iduser");
  // useDispatch

  // functions
  const Edit = () => {
    setshow(!show);
    seteditpassword(false);
  };
  const Editpicture = () => {
    seteditpic(!editpic);
  };
  const removefriendfromlist = async (idfriend) => {
    const response = await fetch("/removefriend", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
      body: JSON.stringify({
        idfriend,
        iduser,
      }),
    });

    const data = await response.json();
    const id = data._id;
    const idusr = users.findIndex((e) => e._id === id);
    let grp = [...users];
    grp[idusr] = data;
    setusers(grp);
  };

  const gotohome = () => {
    history.push(`/listusers`);
  };
  const EditPassword = () => {
    seteditpassword(!editpassword);
    setshow(false);
  };
  const SignOut = () => {
    localStorage.clear();
    history.push("/login");
  };

  useEffect(() => {
    let ismounted = true;

    //get users
    const getusers = async () => {
      const response = await fetch("/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-xsrf-token": localStorage.getItem("TK"),
        },
      });

      if (ismounted) {
        const data = await response.json();
        console.log("usersss" + JSON.stringify(data));
        setusers(data);
      }
    };

    // get user

    getusers();

    return () => {
      ismounted = false;
    };
  }, []);

  return (
    <div className="d-flex ">
      <div className="col-md-4   " style={{ marginTop: "50px" }}>
        {editpic && <EditPicture id={user_id} />}
      </div>
      <div className=" col-md-4 ">
        <div className=" card   m-5 ">
          {users
            .filter((ele) => ele._id === iduser)
            .map((el) => {
              return (
                <>
                  <h5 className="text-center">My Account</h5>
                  <div
                    className="card-header text-center"
                    style={{ backgroundColor: "#FF64FF" }}
                  >
                    <img src={el.img} alt=" " className="useravatar" />
                    <h5>{el.username}</h5>
                    <button
                      className="btn btn-outline-dark fw-bold"
                      onClick={() => Editpicture()}
                      style={{
                        marginLeft: "10px",
                        fontSize: "10px",
                        height: "40px",
                      }}
                    >
                      <AiFillEdit />
                      Edit Profile Picture
                    </button>
                  </div>
                  <div
                    className="card-body "
                    style={{ backgroundColor: "#F2F2F2" }}
                  >
                    <div className="d-flex">
                      <h6>Email :{el.email}</h6>
                    </div>
                    <hr className="dropdown-divider" />
                    <h6>Friends List</h6>
                    <div>
                      <div className="row">
                        {el.friendsList.map((element) => {
                          return (
                            <>
                              {users
                                .filter((ele) => ele._id === element.idfriend)
                                .map((user) => {
                                  return (
                                    <>
                                      <div
                                        className="col-md-11 m-1 d-flex  shadow"
                                        style={{ border: "1px solid #BFBFBF" }}
                                        key={user.id}
                                      >
                                        <div className="col-md-3 m-2">
                                          <button
                                            className="btn btn-outline-dark  "
                                            style={{ border: "none" }}
                                          >
                                            {" "}
                                            <img
                                              alt=""
                                              src={user.img}
                                              className="avatar2"
                                            />
                                          </button>
                                        </div>
                                        <div className="col-md-5 mt-4 ">
                                          <h6
                                            id={user.username}
                                            style={{
                                              fontSize: "15px",
                                              visibility: "visible",
                                            }}
                                          >
                                            {user.username}
                                          </h6>
                                        </div>
                                        <div className="col-md-3 m-2 mt-4">
                                          <TiDelete
                                            style={{
                                              fontSize: "25px",
                                              marginBottom: "15px",
                                              float: "right",
                                            }}
                                            onClick={() =>
                                              removefriendfromlist(user._id)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                            </>
                          );
                        })}
                      </div>
                    </div>

                    <hr className="dropdown-divider" />
                    <div className="d-flex m-4">
                      <button
                        className="btn btn-outline-dark fw-bold"
                        onClick={() => Edit()}
                        style={{
                          marginLeft: "10px",
                          fontSize: "10px",
                          height: "40px",
                        }}
                      >
                        <AiFillEdit />
                        Edit Profile Info
                      </button>
                      <button
                        className="btn btn-outline-dark fw-bold"
                        onClick={() => EditPassword()}
                        style={{
                          marginLeft: "10px",
                          fontSize: "10px",
                          height: "40px",
                        }}
                      >
                        <AiFillEdit />
                        Edit Password
                      </button>
                    </div>

                    <hr className="dropdown-divider" />
                    {users
                      .filter((user) => user._id === user_id)
                      .map((el) => {
                        return (
                          <div
                            className="btn d-flex justify-content-center"
                            style={{
                              backgroundColor: "#FF64FF",
                              fontFamily: "Lobster Two, cursive",
                            }}
                            onClick={() => SignOut(el.email, el.password)}
                          >
                            SignOut
                          </div>
                        );
                      })}
                  </div>
                </>
              );
            })}
        </div>
      </div>
      <div className="col-md-4" style={{ marginTop: "50px" }}>
        {show === true ? (
          <EditProfile id={user_id} />
        ) : editpassword === true ? (
          <Editpass id={user_id} />
        ) : null}
      </div>
      <div>
        <button
          className="btn btn-dark p-1 "
          style={{ width: "50px", height: "45px" }}
        >
          {" "}
          <BsXCircle onClick={() => gotohome()} style={{ fontSize: "30px" }} />
        </button>
      </div>
    </div>
  );
};

export default Userprofile;
