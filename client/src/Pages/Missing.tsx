import React, { useMemo } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { getBasePathname } from "../apis/getBasePathname";
import Header from "../components/Header";

function Missing() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Missing;
