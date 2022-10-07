import axios from "axios";
import React, { Fragment } from "react";

const UploadImgBB = () => {
  const [url, setUrl] = React.useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    //console.log("formData", formData);
    // the image shoud be same {image,file direction}
    formData.append("image", e.target.image.files[0]);
    formData.append("key", `${"a60beb62f28493bd1386e7018b9e271d"}`);
    //console.log("formData", formData);
    axios.post("https://api.imgbb.com/1/upload", formData).then((res) => {
      alert("success");
      //setUrl(res.data.data.url);
    });
  };
  console.log(url);
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" id="" />
        <input type="submit" value="Upload Image" />
      </form>
    </Fragment>
  );
};

export default UploadImgBB;
