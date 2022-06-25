import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { editinfo } from '../redux/actions';
import {useEffect } from 'react';

const Editprofile = (props) => {
    const state = useSelector((state) => state.reducer);
    const iduse=localStorage.getItem('iduser')
      // states
    const [show, setshow] = useState(true);
    const [user, setuser] = useState([]);
    const [users, setusers] = useState([]);
    const [username, setusername] = useState();
    const [email, setemail] = useState();
    const [phone, setphone] = useState();
  

    // functions
 
    const reset=()=>{
        setshow(false);
    }
    const getusers=async()=>{
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

    const data=await response.json();
    setusers(data);

      
    }
    const getuserconnected=async()=>{
    const res = await fetch("https://cryptic-coast-57283.herokuapp.com/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
    });
    const user=await res.json();
     setuser(user);
      }
    useEffect(() => {
     getusers();
     getuserconnected();
    }, []);
    const update=async(e)=>{
          e.preventDefault();
         const response = await fetch(
           "https://cryptic-coast-57283.herokuapp.com/updateuser",
           {
             method: "PUT",
             headers: {
               "Content-Type": "application/json",
               "x-xsrf-token": localStorage.getItem("TK"),
             },
             body: JSON.stringify({
               iduse,
               username,
               email,
               phone,
             }),
           }
         );
       const data=response.json();
       const iduser=data._id;
       const newusers=[...users];
       newusers[iduser]=data;
      setusers(newusers);
            
 document.getElementById("alertmessage").style.visibility="visible"
    }

    
    return (
        <div>
          {show===true?
            <div className=" shadow  "  style={{backgroundColor:"#BFBFBF",paddingLeft:"20px"}}>
              <h4 className='text-center m-4' style={{fontFamily: 'Lobster Two, cursive',color:"black"}}>Edit Informations</h4>
                {users.filter(e=>e._id===iduse).map(user=>{
                      return (
                        <>
                          <form onSubmit={(e) => update(e)}>
                            <div
                              className="d-flex"
                              style={{ marginTop: "15px", marginLeft: "10px" }}
                            >
                              <label
                                style={{
                                  fontFamily: "Lobster Two, cursive",
                                  color: "black",
                                }}
                              >
                                Username{" "}
                              </label>
                              <input
                                id="username"
                                type="text"
                                defaultValue={user.username}
                                onChange={(e) => setusername(e.target.value)}
                                className="form-control text-center"
                                style={{ width: "60%", marginLeft: "10px" }}
                              />
                            </div>
                            <div
                              className="d-flex"
                              style={{ marginTop: "15px", marginLeft: "10px" }}
                            >
                              <label
                                style={{
                                  fontFamily: "Lobster Two, cursive",
                                  color: "black",
                                }}
                              >
                                Email{" "}
                              </label>
                              <input
                                type="text"
                                id="email"
                                defaultValue={user.email}
                                onChange={(e) => setemail(e.target.value)}
                                className="form-control text-center"
                                style={{ width: "60%", marginLeft: "40px" }}
                              />
                            </div>
                            <div
                              className="d-flex"
                              style={{ marginTop: "15px", marginLeft: "10px" }}
                            >
                              <label
                                style={{
                                  fontFamily: "Lobster Two, cursive",
                                  color: "black",
                                }}
                              >
                                Phone{" "}
                              </label>
                              <input
                                type="text"
                                id="phone"
                                defaultValue={user.phone}
                                onChange={(e) => setphone(e.target.value)}
                                className="form-control text-center"
                                style={{ width: "60%", marginLeft: "34px" }}
                              />
                            </div>
                            <div
                              className="d-flex"
                              style={{ marginLeft: "75px", marginTop: "10px" }}
                            >
                              <button
                                className="btn  m-2"
                                type="submit"
                                style={{
                                  backgroundColor: "#FE92AA",
                                  fontFamily: "Lobster Two, cursive",
                                }}
                              >
                                Save Changes
                              </button>
                              <button
                                className="btn  m-2"
                                style={{
                                  backgroundColor: "#FE92AA",
                                  fontFamily: "Lobster Two, cursive",
                                }}
                                onClick={() => reset()}
                              >
                                Cancel
                              </button>
                            </div>
                            <div
                              class="alert alert-secondary text-success  "
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
                  })
                  }
            </div>
           :null }
        </div>
    );
}

export default Editprofile;
