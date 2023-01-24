import React from "react";
import "./leftSide.css";
import RightSide from "./ClientApplication";
import Navbar from "../../home/navBar";
function ClientReg() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="my_row">
          <div id="direction" className="left_side">
            <img
              style={{ height: "650px", width: "650px" }}
              src={process.env.PUBLIC_URL + "register.jpg"}
            />
          </div>

          <div id="direction" className=" right_side ">
            <RightSide />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientReg;
