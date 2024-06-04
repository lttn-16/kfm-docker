import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from 'axios';

const Welcome = () => {
  const [val, setVal] = useState("");
  
  const handleSubmit = async () => {
    await axios.post(
      "http://api.localhost/reports",
      {duration: +val},
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
      }
    );
    setVal("")
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: "url('https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149007819.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundAttachment: "fixed",
      }}
    >
      <div style={{marginBottom: "60px", fontSize: "30px"}}>Số phút đi trễ</div>
      <TextField
        id="standard-basic"
        label="Số phút"
        variant="standard"
        style={{ width: "30%" }}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <Button style={{marginTop: "20px"}} variant="contained" onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default Welcome;
