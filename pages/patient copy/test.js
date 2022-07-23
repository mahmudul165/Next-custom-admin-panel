import React from "react";

function FileUpload() {
  const [file, setFile] = React.useState("");
  // function handleUpload(event) {
  //   setFile(event.target.files[0]);
  // }
  console.log("file", URL.createObjectURL(file));
  return (
    <div id="upload-box">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      {file && <img src={URL.createObjectURL(file)} alt={file.name} />}
    </div>
  );
}

export default function App() {
  return <FileUpload />;
}
