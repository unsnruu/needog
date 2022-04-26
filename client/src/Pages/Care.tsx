import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getBaseUrl } from "../common";

function Care() {
  const { pathname } = useLocation();
  const baseUrl = useMemo(() => getBaseUrl(pathname), [pathname]);

  return <Outlet context={baseUrl} />;
}

export { Care };
