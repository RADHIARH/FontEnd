import React from "react";
import { useState, useEffect } from "react";

const UpdateImageProfile = () => {
  const iduse = localStorage.getItem("iduser");
  // Hooks
  const [image, setimage] = useState({});
  const [users, setusers] = useState([]);
  const [url, seturl] = useState();
  const [show, setshow] = useState(true);
  //useEffect
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
    // get  groups messages

    getusers();

    return () => {
      ismounted = false;
    };
  }, []);

  const reset = () => {
    setshow(false);
  };
  const update = async (e) => {
    const formData = new FormData();
    // formData.append(fieldName, file)

    // Example code
    formData.append("image", image);

    e.preventDefault();

    try {
      await fetch("/uploadimage", {
        method: "POST",
        headers: {
          iduser: iduse,
        },
        body: formData,
      })
        .then((res) => res.text())
        .then((resBody) => {
          console.log(resBody);
        });
        
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {show === true ? (
        <div
          className="card-body  shadow"
          style={{ backgroundColor: "#BFBFBF" }}
        >
          <h5
            className="text-center"
            style={{ fontFamily: "Lobster Two, cursive", color: "black" }}
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
            <input
              type="submit"
              value="update"
              class="btn btn-success"
              style={{ backgroundColor: "#FF64FF" ,border:"none"}}
            />
          </form>
          <input
            style={{ backgroundColor: "#BFBFBF" }}
            type="button"
            className="btn btn bg-white "
            value="Cancel"
            onClick={() => reset()}
          />
        </div>
      ) : null}
    </>
  );
};

export default UpdateImageProfile;
