import React, { useMemo } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { getBasePathname } from "../apis/getBasePathname";

function Missing() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Missing;
