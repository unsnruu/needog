import React from "react";
import { Outlet } from "react-router-dom";

function Missing() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Missing;
