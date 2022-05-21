import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getBasePathname } from "../apis/getBasePathname";

function Care() {
  const { pathname } = useLocation();
  const baseUrl = useMemo(() => getBasePathname(pathname), [pathname]);

  return <Outlet context={baseUrl} />;
}

export { Care };
