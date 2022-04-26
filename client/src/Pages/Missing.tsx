import React, { useMemo } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { getBaseUrl } from "../common";

function Missing() {
  const { pathname } = useLocation();
  const baseUrl = useMemo(() => getBaseUrl(pathname), [pathname]);

  return (
    <>
      <Outlet context={baseUrl} />
    </>
  );
}

export default Missing;
