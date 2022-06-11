import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editimage } from "../redux/actions";

const EditPicture = (props) => {
  const iduse = localStorage.getItem("iduser");
  // use dispatch
  const dispatch = useDispatch();
  // states
  const [show, setshow] = useState(true);
  // useRef
  const inputFile = useRef(null);
  // functions
  const changephoto = async (url) => {
    const res = await fetch("/editpic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
      body: JSON.stringify({
        url,
        iduse,
      }),
    });
    setshow(false);
  };

  const openfileDialog = () => {
    inputFile.current.click();
  };
  const reset = () => {
    setshow(false);
  };
  return (
    <div>
      {show === true ? (
        <div className=" card photo ">
          <div className="card-body p-1" style={{ backgroundColor: "#BFBFBF" }}>
            <h5
              className="text-center"
              style={{ fontFamily: "Lobster Two, cursive", color: "black" }}
            >
              {" "}
              Update Profile Picture{" "}
            </h5>
            <ul className="list-group">
              <li className="list-group-item">
                <input
                  type="file"
                  ref={inputFile}
                  id="fileLoader"
                  style={{ display: "none" }}
                  onInput={(event) =>
                    changephoto(`./images/${event.target.value.substr(12)}`)
                  }
                />
                <input
                  type="button"
                  className="btn bg-white"
                  id="import"
                  value="Import picture"
                  onClick={() => openfileDialog()}
                />
              </li>
              <li className="list-group-item">
                <input
                  type="button"
                  className="btn btn bg-white "
                  value="Cancel"
                  onClick={() => reset()}
                />
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditPicture;
