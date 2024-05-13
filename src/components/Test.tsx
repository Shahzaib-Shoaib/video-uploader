import React from "react";

export default function Test() {
  let test = "Babauska";
  function changeTest() {
    let test = "Mimin";
  }

  return (
    <div>
      <p onClick={changeTest}>{test}</p>
    </div>
  );
}
