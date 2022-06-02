import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getBasePathname } from "../apis/getBasePathname";
import Header from "../components/Header";

function Care() {
  const { pathname } = useLocation();
  const baseUrl = useMemo(() => getBasePathname(pathname), [pathname]);

  return (
    <>
      <Header />
      <Outlet context={baseUrl} />
    </>
  );
}

export { Care };
