import axios from "axios";
import React, { Fragment } from "react";
import useAuth from "/hook/useAuth";
// import FormData from "form-data";
// import fs from "fs";

const UploadImgBB = () => {
  const { postData } = useAuth();
  const [id, setId] = React.useState();
  const [first_name, setFirst] = React.useState();
  const [last_name, setLast] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState();
  const [password, setPassword] = React.useState();
  const [status, setStatus] = React.useState();
  const [file_type, setFiletype] = React.useState();
  const [picture, setPicture] = React.useState();
  console.log(
    "from data",
    first_name,
    last_name,
    email,
    phone,
    password,
    status,
    file_type,
    picture
  );
  // const handleSubmit = (e) => {
  //   let formData = new FormData();
  //   setPicture(formData.append("picture", e.target.picture?.files[0]));
  // };
  // const pictureHandle = () => {
  //   let formData = new FormData();
  //   formData.append("picture", e.target.picture.files[0]);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();     
    let formData = new FormData();         
    formData.append("id", id);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("status", status);
    formData.append("file_type", file_type);
    formData.append("picture", picture);
    // the image shoud be same {image,file direction}
    postData("https://misiapi.lamptechs.com/api/v1/patient/store",  
      formData
      // id,
      // first_name,
      // last_name,
      // email,
      // phone,
      // password,
      // status,
      // file_type,
     );
    // formData.append("picture", e.target.picture.files[0]);
  };

  return (
    <Fragment>
      <form
        onSubmit={
          handleSubmit
          // console.log("post data patient ", {
          //   id,
          //   first_name,
          //   last_name,
          //   email,
          //   phone,
          //   password,
          //   status,
          //   file_type,
          //   picture,
          // })
        }
      >
        <input type="text" id="" value="0" name="id" className="hidden" />
        <input
          type="text"
          name="id"
          id="id"
          className="hidden  mx-1"
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          name="first_name"
          id="first_name"
          className=" mx-1"
          placeholder="first"
          onChange={(e) => setFirst(e.target.value)}
        />
        <input
          type="text"
          name="last_name"
          id="last_name"
          className=" mx-1"
          placeholder="last"
          onChange={(e) => setLast(e.target.value)}
        />
        <input
          type="text"
          name="email"
          id="email"
          className=" mx-1"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="phone"
          id="phone"
          className=" mx-1"
          placeholder="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          name="password"
          id="password"
          className=" mx-1"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          name="status"
          id="status"
          className=" mx-1"
          placeholder="status"
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          type="text"
          name="file_type"
          id="file_type"
          className="  mx-1 text-dark"
          onChange={(e) => setFiletype(e.target.value)}
          placeholder="file_type"
        />
        <input
          type="file"
          name="picture"
          className=""
          id=""
          onChange={(e) => setPicture(e.target.files[0])}
          //onChange={(e) => setPicture(e.target.picture)}
        />

        <input
          type="submit"
          value="Upload data"
          // onChange={(e) => e.target.first_name}
        />
      </form>
    </Fragment>
  );
};

export default UploadImgBB;
