import React from "react";
import { useState } from "react";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";
import { TiTick } from "react-icons/ti";
import { BsCircleFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CgSmileSad } from "react-icons/cg";
import { addmessage } from "../redux/actions";
import { addgroup } from "../redux/actions";
import { deletemsg } from "../redux/actions";
import { addmember } from "../redux/actions";
import { sendMessageGroup } from "../redux/actions";
import { Leavegroup } from "../redux/actions";
import { Viewmessage } from "../redux/actions";
import { sendInvit } from "../redux/actions";
import Header from "./Header";
import { useParams } from "react-router-dom";
import InputEmoji from "react-input-emoji";

const Listusers = () => {
  // connect to store

  // get item from localStorage
  const iduse = localStorage.getItem("iduser");
  // states
  const [grouptoshow, setgrouptoshow] = useState([]);
  const [ignored, forceupdate] = useReducer((x) => x + 1, 0);

  const [message, setmessage] = useState();
  const [showg, setshowg] = useState(false);
  const [users, setusers] = useState([]);
  const [filter, setfilter] = useState([]);
  const [user, setuser] = useState([]);
  const [iduser, setid] = useState();
  const [ms, setms] = useState();
  const [show, setshow] = useState(true);
  const [group, setgroup] = useState(false);
  const [groupname, setgroupname] = useState();
  const [groups, setgroups] = useState([]);
  const [messagesgroups, setmessagesgroups] = useState([]);
  const [usermessages, setusermessages] = useState([]);
  //

  // send message in a group
  const addmessagetoGroup = async (e, idgroup) => {
    e.preventDefault();
    const response = await fetch("/addmsgroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
      body: JSON.stringify({
        iduse,
        idgroup,
        message,
      }),
    });
    const data = await response.json();
    setmessagesgroups([...messagesgroups, data]);
    setmessage("");
  };

  // send message
  const sendmessage = async (e, id_receiver) => {
    e.preventDefault();
    const res = await fetch("/addmessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
      body: JSON.stringify({
        iduse,
        id_receiver,
        message,
      }),
    });
    const data = await res.json();
    setmessage("");
    setusermessages([...usermessages, data]);
  };
  // // deletemessage
  const deletems = async (e, idmessage) => {
    e.preventDefault();
    const res = await fetch(`/deletemessage/${idmessage}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
    });
    const data = await res.json();
    setusermessages(usermessages.filter((element) => element._id !== data));
  };

  // Dispatch
  const dispatch = useDispatch();
  // search user
  const searchUser = (user) => {
    const tab = users.filter((el) =>
      el.username.toUpperCase().includes(user.toUpperCase())
    );
    setfilter(tab);
  };
  // set message to viewed

  // /showuser
  const showUser = async (idus) => {
    const t = users.filter((element) => element._id === idus);
    setuser(t);
    setshow(true);
    console.log("iduser1" + iduse);
    console.log("iduser2" + idus);
    const response = await fetch("/setviewed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
      body: JSON.stringify({
        iduse,
        idus,
      }),
    });
  };

  // send invitation
  const sendinvitation = async (idfriend) => {
    const response = await fetch("/sentinvit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
      body: JSON.stringify({
        iduse,
        idfriend,
      }),
    });
    const data = await response.json();
    const id = data._id;
    // user
    let userr = [...user];

    const userid = user.findIndex((ele) => ele._id === id);
    userr[userid] = data;
    setuser(userr);
    ///users
    const idusr = users.findIndex((e) => e._id === id);
    let grp = [...users];
    grp[idusr] = data;
    setusers(grp);

    alert(" Votre invitation  a été envoyée");
  };
  // addtolistfriends
  const addgroupname = () => {
    setgroup(!group);
  };
  // add new group
  const addgrp = async () => {
    const response = await fetch("/addgroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
      body: JSON.stringify({
        groupname,
      }),
    });
    const data = await response.json();
    setgroupname("");
    setgroups([...groups, data]);
  };
  const hover = (id) => {
    document.getElementById(id).style.visibility = "visible";
  };
  // show group
  const showgroup = (idg) => {
    const gr = groups.filter((e) => e._id === idg);
    setshowg(true);
    setshow(false);
    setgrouptoshow(gr);
  };
  // join group
  const joingroup = async (idgroup) => {
    const response = await fetch("/joingroup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
      body: JSON.stringify({
        iduse,
        idgroup,
      }),
    });

    const data = await response.json();
    const id = data._id;
    const idgrp = groups.findIndex((e) => e._id === id);
    let grp = [...groups];
    grp[idgrp] = data;
    setgroups(grp);
  };
  // leave group
  const Leavegrp = async (idgroup) => {
    const response = await fetch("/leavegroup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
      body: JSON.stringify({
        iduse,
        idgroup,
      }),
    });

    const data = await response.json();
    const id = data._id;
    const idgrp = groups.findIndex((e) => e._id === id);
    let grp = [...groups];
    grp[idgrp] = data;
    setgroups(grp);
  };

  useEffect(() => {
    let ismounted = true;
    // getgroups
    const getgroups = async () => {
      const response = await fetch(
        "https://cryptic-coast-57283.herokuapp.com/groups",
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

        setgroups(data);
      }
    };
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
        console.log("usersss" + JSON.stringify(data));
        setusers(data);
        setfilter(data);
      }
    };
    // get  groups messages

    const getgroupsmessage = async () => {
      const response = await fetch("https://cryptic-coast-57283.herokuapp.com/groupsmsg", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-xsrf-token": localStorage.getItem("TK"),
        },
      });
      if (ismounted) {
        const data1 = await response.clone().json();
        setmessagesgroups(data1);
      }
    };
    // get usermessages
    const getmessages = async () => {
      const response = await fetch(
        "https://cryptic-coast-57283.herokuapp.com/messages",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-xsrf-token": localStorage.getItem("TK"),
          },
        }
      );

      if (ismounted) {
        const data = await response.clone().json();
        setusermessages(data);
      }
    };
    getusers();
    getmessages();
    getgroups();
    getgroupsmessage();

    return () => {
      ismounted = false;
    };
  }, []);

  return (
    <div>
      <div className="row d-flex justify-content-center">
        <Header />
      </div>
      <div className="d-flex col-md-12 ">
        {/* list users  part 1 */}
        <div
          className="col-md-2  mt-4 listusers bg-white  shadow"
          style={{ border: "3px solid black" }}
        >
          <input
            type="text"
            className="form-control m-2"
            id="exampleFormControlInput1"
            placeholder=" search a user"
            defaultValue=""
            style={{ width: "90%", border: "2px solid black" }}
            onChange={(event) => searchUser(event.target.value)}
          />
          <div className="col mt-4 mb-4 ">
            {filter
              .filter((user) => user._id !== iduse)
              .map((ele) => {
                return (
                  <div
                    className="row m-1"
                    key={ele._id}
                    style={{ width: "200px" }}
                  >
                    <button
                      className="btn btn-outline-dark mt-2 "
                      onClick={() => showUser(ele._id)}
                      style={{ border: "none", height: "45px" }}
                    >
                      <img src={ele.img} alt="" className="avatar" />
                      <BsCircleFill
                        className="m-1 "
                        style={{ color: ele.actif === true ? "green" : "red" }}
                        onMouseOver={() =>
                          (document.getElementById(
                            ele.username
                          ).style.visibility = "visible")
                        }
                        onMouseLeave={() =>
                          (document.getElementById(
                            ele.username
                          ).style.visibility = "hidden")
                        }
                      />
                      {ele.username.substr(0, 11)}
                      {/* {usermessages.filter(element=>element.id_sender==="6299fd6798d6a5148ca7c6d4").reduce(
                                    (acc, current) => (current.from===ele.id && current.to===iduse && current.vue===false  ? acc+1: acc),0)>0 ? 
                                        <p style={{fontSize:"13px",color:"green",fontWeight:"bold"}}>
                                            {ele.messages.reduce(
                                                (acc, current) => (current.from===ele.id && current.to===iduse && current.vue===false  ? acc+1: acc),0)} new messages
                                        </p>  
                                        : null
                                }        */}

                      {usermessages.reduce(
                        (acc, current) =>
                          current.id_sender === ele._id &&
                          current.id_receiver === iduse &&
                          current.vue === false
                            ? (acc = acc + 1)
                            : acc,
                        0
                      ) > 0 ? (
                        <p
                          style={{
                            fontSize: "13px",
                            color: "green",
                            fontWeight: "bold",
                          }}
                        >
                          {usermessages.reduce(
                            (acc, current) =>
                              current.id_sender === ele._id &&
                              current.id_receiver === iduse &&
                              current.vue === false
                                ? (acc = acc + 1)
                                : acc,
                            0
                          )}
                          newmessages
                        </p>
                      ) : null}

                      <div
                        className="bg-black text-white"
                        id={ele.username}
                        style={{ visibility: "hidden", width: "150px" }}
                      >
                        <h6>
                          {ele.actif === true ? " is online" : " is offline"}
                        </h6>
                      </div>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        {/* ShowUser part 2  */}
        <div
          className="col-md-8 m-4"
          style={{
            position: "relative",
            backgroundColor: "#FF64FF",
            border: "3px solid grey",
          }}
        >
          {show === true ? (
            <div className="userDiscuss">
              {user.map((element) => (
                <>
                  <div
                    className="card col-md-4 mt-4  offset-md-4 bg-light"
                    key={element._id}
                    style={{}}
                  >
                    <div className="card-header justify-content-center d-flex">
                      {" "}
                      <img alt="" src={element.img} className="avatar" />
                      <h5 style={{ marginLeft: "10px" }}>{element.username}</h5>
                    </div>
                    <div className="card-body text-center">
                      {element.email}
                      {element.friendsList.find((e) => e.idfriend === iduse) ? (
                        <h6>
                          {" "}
                          Friend <TiTick />
                        </h6>
                      ) : element.invitations.find(
                          (e) => e.idfriend === iduse && e.accepted === false
                        ) ? (
                        <label className="form-label">Invitation sent</label>
                      ) : (
                        <input
                          type="button"
                          className="btn btn-outline-dark  fw-bold"
                          onClick={() => sendinvitation(element._id)}
                          defaultValue=" Add to Friends List"
                          style={{
                            width: "150px",
                            fontSize: "13px",
                            marginTop: "10px",
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* show messages */}
                  <div
                    className="col"
                    style={{
                      marginTop: "20px",
                      marginBottom: "55px",
                      marginLeft: "40px",
                    }}
                  >
                    {usermessages.map((el) => {
                      return el.id_receiver === element._id &&
                        el.id_sender === iduse ? (
                        <div className="d-flex">
                          <div
                            className="row m-3 shadow "
                            onMouseOver={() =>
                              (document.getElementById(
                                el._id
                              ).style.visibility = "visible")
                            }
                            onMouseLeave={() =>
                              (document.getElementById(
                                el.msg
                              ).style.visibility = "hidden")
                            }
                            style={{
                              borderRadius: "10px",
                              backgroundColor: "#CCCCCC",
                              width: "350px",
                              height: "50px",
                            }}
                          >
                            <div className="col">
                              <h5 className="mt-2">{el.message} </h5>
                            </div>
                            <div
                              className=" col-md-3 d-flex"
                              id={el._id}
                              style={{
                                visibility: "hidden",
                                marginTop: "10px",
                              }}
                            >
                              <AiFillDelete
                                className="m-2"
                                onClick={(e) => deletems(e, el._id)}
                                style={{ width: "100px" }}
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <p className="p-2">
                              {el.vue === false ? (
                                <TiTickOutline style={{ fontSize: "20px" }} />
                              ) : (
                                <TiTick style={{ fontSize: "20px" }} />
                              )}
                            </p>
                          </div>
                        </div>
                      ) : el.id_sender === element._id &&
                        el.id_receiver === iduse ? (
                        <div
                          className="row"
                          style={{
                            marginLeft: "300px",
                            marginTop: "20px",
                            width: "450px",
                            height: "50px",
                            borderRadius: "10px",
                          }}
                        >
                          <div className="col-md-3">
                            {users
                              .filter((e) => e._id === el.id_sender)
                              .map((el) => {
                                return (
                                  <h6 className="mt-3">
                                    {el.username.split(" ")[1]}
                                  </h6>
                                );
                              })}
                          </div>
                          <div
                            className="col  shadow bg-light"
                            style={{ borderRadius: "10px" }}
                          >
                            {" "}
                            <h5 className="mt-2">{el.message}</h5>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                  {/* send message to friend */}
                  <form onSubmit={(e) => sendmessage(e, element._id)}>
                    <div
                      className="  d-flex"
                      style={{
                        width: "720px",
                        position: "absolute",
                        bottom: "5px",
                        left: "20px",
                        marginLeft: "80px",
                      }}
                    >
                      {/* <InputEmoji
                                                    name="message"
                                                    onChange={setms}
                                                    cleanOnEnter
                                                    placeholder="Type a message"
                                                    /> */}
                      <input
                        id="form"
                        type="text"
                        class="form-control"
                        value={message}
                        onChange={(e) => setmessage(e.target.value)}
                        name="msg"
                      />
                      <button
                        class="btn btn-primary"
                        value="SEND"
                        style={{ marginLeft: "10px" }}
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </>
              ))}
            </div>
          ) : showg === true && show === false ? (
            // group card description part 3
            <div className="groupDiscuss">
              {grouptoshow[0].members.find((e) => e.iduser === iduse) ? (
                grouptoshow.map((el) => {
                  return (
                    <div className="col-md-8">
                      <div className="col-md-6  offset-md-4 mt-4">
                        <div className="card">
                          <div className="card-header    text-center fs-4">
                            <h4 className="">
                              {" "}
                              <span className="fw-bold"> {el.name} </span>Group
                            </h4>
                          </div>
                          <div className="card-body  ">
                            <h6>members: </h6>
                            <hr className="dropdown-divider" />
                            <div
                              className="row"
                              style={{
                                marginTop: "20px",
                                marginBottom: "55px",
                                marginLeft: "5px",
                              }}
                            >
                              {el.members.map((member) => {
                                return (
                                  <>
                                    {users
                                      .filter(
                                        (element) =>
                                          element._id === member.iduser
                                      )
                                      .map((user) => {
                                        return (
                                          <div className="col-md-3">
                                            <div>
                                              <img
                                                alt=""
                                                src={user.img}
                                                className="avatar"
                                                onMouseOver={() =>
                                                  (document.getElementById(
                                                    user._id
                                                  ).style.visibility =
                                                    "visible")
                                                }
                                                onMouseLeave={() =>
                                                  (document.getElementById(
                                                    user._id
                                                  ).style.visibility = "hidden")
                                                }
                                              />
                                            </div>
                                            <div
                                              id={user._id}
                                              style={{ visibility: "hidden" }}
                                            >
                                              <p
                                                style={{
                                                  fontSize: "10px",
                                                  fontWeight: "500",
                                                }}
                                              >
                                                {user.username}
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*  group discussion */}
                      <div className=" col m-5 ">
                        {messagesgroups
                          .filter((group) => group.id_group === el._id)
                          .map((el) => {
                            return (
                              <div className="d-flex">
                                <div className="col mb-4">
                                  <>
                                    {users
                                      .filter(
                                        (user) => user._id === el.id_sender
                                      )
                                      .map((element) => {
                                        return (
                                          <div className="row mb-4">
                                            <div className="col-md-2"></div>
                                            {element._id === iduse ? (
                                              <div className="col-md-4">
                                                {" "}
                                                <h6>Vous</h6>
                                              </div>
                                            ) : (
                                              <div className="col-md-4">
                                                {" "}
                                                <h6>{element.username}</h6>
                                              </div>
                                            )}
                                            <div className="row">
                                              <div className="col-md-2">
                                                <img
                                                  alt=""
                                                  src={element.img}
                                                  className="avatar2"
                                                />
                                              </div>
                                              <div
                                                className="col-md-8 p-2 shadow"
                                                style={{
                                                  borderRadius: "10px",
                                                  backgroundColor: "#CCCCCC",
                                                  height: "50px",
                                                }}
                                              >
                                                {" "}
                                                <h5>{el.message}</h5>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      {/* send message to group */}
                      <form onSubmit={(e) => addmessagetoGroup(e, el._id)}>
                        <div
                          className="  d-flex"
                          style={{
                            width: "720px",
                            position: "absolute",
                            bottom: "5px",
                            left: "20px",
                            marginLeft: "80px",
                          }}
                        >
                          {/* <InputEmoji
                                                    name="message"
                                                    onChange={setms}
                                                    cleanOnEnter
                                                    placeholder="Type a message"
                                                    /> */}
                          <input
                            id="messsage"
                            type="text"
                            class="form-control"
                            value={message}
                            onChange={(e) => setmessage(e.target.value)}
                            name="msg"
                          />
                          <button
                            class="btn btn-primary"
                            value="SEND"
                            style={{ marginLeft: "10px" }}
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                  );
                })
              ) : (
                <h4
                  className="text-center m-4 "
                  style={{ fontFamily: "Lobster Two, cursive", color: "black" }}
                >
                  Sorry <CgSmileSad />
                  .....you must join the group to show discussion{" "}
                </h4>
              )}
            </div>
          ) : null}
        </div>
        {/* groups list */}
        <div
          className="col-s-4 mt-4 shadow bg-white"
          style={{ border: "3px solid black", position: "relative" }}
        >
          <h3
            className="text-center m-1"
            style={{ fontFamily: "Lobster Two, cursive", color: "black" }}
          >
            Groups
          </h3>
          <hr style={{ height: "3px", color: "black" }}></hr>
          <div>
            {groups.map((e) => {
              return (
                <>
                  <div className="d-flex m-2">
                    <button
                      onClick={() => showgroup(e._id)}
                      onMouseOver={() => hover(e.name)}
                      onMouseLeave={() =>
                        (document.getElementById(e.name).style.visibility =
                          "hidden")
                      }
                      className="  btn btn-dark  text-center avatar  border-2"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    >
                      <i
                        className={`fa-solid fa-${e.name
                          .toLowerCase()
                          .slice(0, 1)} `}
                        style={{ fontSize: "25px" }}
                      ></i>
                    </button>
                    <div
                      className="col shadow  p-2 bg-black"
                      id={e.name}
                      style={{
                        width: "60px",
                        height: "40px",
                        visibility: "hidden",
                        borderRadius: "10px",
                      }}
                    >
                      <h6 className="text-white">{e.name.slice(0, 7)}</h6>
                    </div>
                    {e.members.find((user) => user.iduser === iduse) ? (
                      <input
                        type="button"
                        className="btn btn-dark text-white mt-1"
                        value="Leave"
                        onClick={() => Leavegrp(e._id)}
                        style={{
                          width: "60px",
                          height: "40px",
                          fontSize: "15px",
                          marginLeft: "15px",
                          visibility: "visible",
                          position: "",
                        }}
                      />
                    ) : (
                      <input
                        type="button"
                        className="btn btn-dark text-white mt-1"
                        defaultValue="Join"
                        id={e._id}
                        onClick={() => joingroup(e._id)}
                        style={{
                          width: "60px",
                          height: "40px",
                          fontSize: "15px",
                          marginLeft: "17px",
                          visibility: "visible",
                          position: "",
                        }}
                      />
                    )}
                  </div>
                </>
              );
            })}
          </div>
          <div
            className="d-flex "
            style={{ position: "absolute", bottom: "5px", left: "20px" }}
          >
            <button className="btn btn-outline-dark border-0">
              {" "}
              <AiOutlinePlusCircle
                onClick={() => addgroupname()}
                style={{ width: "40px", height: "50px", color: "green" }}
              />
              Add new group
            </button>
          </div>
          {group === true ? (
            <div className="d-flex m-2">
              <input
                className=""
                type="text"
                onChange={(e) => setgroupname(e.target.value)}
                value={groupname}
                id="groupname"
                style={{ width: "70%", border: "2px solid black" }}
                placeholder="add a group name "
              />
              <button
                className="btn btn-outline-dark"
                onClick={() => addgrp()}
                style={{ marginLeft: "10px", border: "2px solid black" }}
              >
                Add
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Listusers;
