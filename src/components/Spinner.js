import React from "react";
import image from "../images/loader.svg";

const Spinner = () => {
  return (
    <div style={style}>
      <img src={image} alt="" />
    </div>
  );
};

const style = {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default Spinner;
