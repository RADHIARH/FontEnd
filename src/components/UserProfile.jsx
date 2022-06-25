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
import UpdateImageProfile from "./UpdateImageProfile";

const Userprofile = () => {
  const userr = JSON.parse(localStorage.getItem("user"));
  const iduser = localStorage.getItem("iduser");

  //  useHistory
  const history = useHistory();
  //  states
  const [users, setusers] = useState([]);
  const [deteleacc, setdeleteacc] = useState(false);
  const [user, setuser] = useState([userr]);
  const [show, setshow] = useState(false);
  const [editpic, seteditpic] = useState(false);
  const [editpassword, seteditpassword] = useState(false);
  const [image, setimage] = useState({});
  const [editpicture, seteditpicture] = useState(true);
  const [password, setpassword] = useState();
  const [imageuser, setimageuser] = useState("");

  // useDispatch

  // functions
  const deleteaccount = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://cryptic-coast-57283.herokuapp.com/deleteuser",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-xsrf-token": localStorage.getItem("TK"),
        },
        body: JSON.stringify({
          iduser,
          password,
        }),
      }
    );
    const data = await response.json();
    if (data) {
      history.push("/login");
    } else {
      document.getElementById("errorpassword").style.visibility = "visible";
    }
  };
  const Edit = () => {
    setshow(!show);
    seteditpassword(false);
  };
  const Editpicture = () => {
    seteditpic(!editpic);
  };
  const removefriendfromlist = async (idfriend) => {
    const response = await fetch(
      "https://cryptic-coast-57283.herokuapp.com/removefriend",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-xsrf-token": localStorage.getItem("TK"),
        },
        body: JSON.stringify({
          idfriend,
          iduser,
        }),
      }
    );

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

  const reset = () => {
    seteditpic(false);
  };
  const reset2 = () => {
    setdeleteacc(false);
  };
  const update = async (e) => {
    const formData = new FormData();
    // formData.append(fieldName, file)

    // Example code
    formData.append("image", image);

    e.preventDefault();

    try {
      const response = await fetch(
        "https://cryptic-coast-57283.herokuapp.com/uploadimage",
        {
          method: "POST",
          headers: {
            iduser: iduser,
          },
          body: formData,
        }
      );
      const data = await response.json();
      const id = data._id;
      const newusers = [...users];
      newusers[id] = data;
      setusers(newusers);
      setimageuser(data.img);
    } catch (err) {
      console.log(err);
    }
    alert("profile picture was successfully updated ");
  };

  useEffect(() => {
    let ismounted = true;

    //get users
    const getusers = async () => {
      const response = await fetch(
        "https://cryptic-coast-57283.herokuapp.com/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-xsrf-token": localStorage.getItem("TK"),
          },
        }
      );

      if (ismounted) {
        const data = await response.json();
        setusers(data);
      }
    };

    // get user

    getusers();

    return () => {
      ismounted = false;
    };
  }, []);
  const deleteacc = () => {
    setdeleteacc(true);
  };
  return (
    <div className="d-flex ">
      <div className="col-md-4   " style={{ marginTop: "50px" }}>
        {editpic && (
          <div
            className="card-body  shadow"
            style={{ backgroundColor: "#BFBFBF" }}
          >
            <h5
              className="text-center"
              style={{
                fontFamily: "Lobster Two, cursive",
                color: "black",
                marginBottom: "30px",
              }}
            >
              {" "}
              Update Profile Picture{" "}
            </h5>
            <form onSubmit={(e) => update(e)} enctype="multipart/formdata">
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => setimage(e.target.files[0])}
              />
              <br></br>
              <input
                type="submit"
                value="update"
                class="btn btn-success"
                style={{
                  backgroundColor: "#FE92AA",
                  border: "none",
                  marginTop: "20px",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
              />
              <input
                style={{ backgroundColor: "#FE92AA", marginTop: "20px" }}
                type="button"
                className="btn btn bg-white "
                value="Cancel"
                onClick={() => reset()}
              />
            </form>
          </div>
        )}
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
                    style={{ backgroundColor: "#FE92AA" }}
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
                                        style={{
                                          border: "1px solid #BFBFBF",
                                          height: "70px",
                                        }}
                                        key={user.id}
                                      >
                                        <div
                                          className="col-md-3 mt-2 "
                                          style={{}}
                                        >
                                          <button
                                            className="btn btn-outline-dark  "
                                            style={{ border: "none" }}
                                          >
                                            {" "}
                                            <img
                                              alt=""
                                              src={user.img}
                                              className="avatar3"
                                            />
                                          </button>
                                        </div>
                                        <div className="col-md-5 mt-4 ">
                                          <p
                                            id={user.username}
                                            style={{
                                              fontSize: "11px",
                                              visibility: "visible",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {user.username}
                                          </p>
                                        </div>
                                        <div
                                          className="col-md-3  "
                                          style={{ marginTop: "20px" }}
                                        >
                                          <TiDelete
                                            style={{
                                              fontSize: "25px",
                                              marginBottom: "5px",
                                              float: "right",
                                              color: "red",
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
                      .filter((user) => user._id === iduser)
                      .map((el) => {
                        return (
                          <>
                            <div
                              className="btn d-flex justify-content-center"
                              style={{
                                backgroundColor: "#FE92AA",
                                fontFamily: "Lobster Two, cursive",
                              }}
                              onClick={() => SignOut(el.email, el.password)}
                            >
                              SignOut
                            </div>
                            <div
                              className="btn d-flex  mt-2 justify-content-center"
                              style={{
                                backgroundColor: "red",
                                fontFamily: "Lobster Two, cursive",
                              }}
                              onClick={() => deleteacc()}
                            >
                              Delete Account
                            </div>
                          </>
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
          <EditProfile id={iduser} />
        ) : editpassword === true ? (
          <Editpass id={iduser} />
        ) : deteleacc === true ? (
          <div className=" shadow bg-white p-3">
            <div style={{ position: "relative", marginBottom: "30px" }}>
              <h5 className="text-center">Delete your account </h5>
              <button
                className="btn p-1 "
                style={{
                  width: "50px",
                  position: "absolute",
                  right: "0px",
                  top: "0px",
                }}
              >
                {" "}
                <BsXCircle
                  onClick={() => reset2()}
                  style={{ fontSize: "30px" }}
                />
              </button>
            </div>

            <form onSubmit={(e) => deleteaccount(e)}>
              <input
                className="form-control m-2"
                type="password"
                placeholder="enter your password"
                style={{ width: "300px" }}
                onChange={(e) => setpassword(e.target.value)}
              />
              <input
                type="submit"
                value="Delete"
                className="btn btn-danger m-2"
                style={{ width: "300px" }}
              ></input>{" "}
              <label
                id="errorpassword"
                style={{ marginLeft: "50px", visibility: "hidden" }}
              >
                Last password is incorrect
              </label>
            </form>
          </div>
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
