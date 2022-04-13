import React from "react";
import { Link } from "react-router-dom";

function HeaderMenu() {
  return (
    <nav>
      <Link to="/">Logo</Link>
      {" | "}
      <Link to="missing">실종</Link>
      {" | "}
      <Link to="care">보호</Link>
      {" | "}
      <Link to="adoption">입양</Link>
      {" | "}
      <Link to="community">커뮤니티</Link>
    </nav>
  );
}
export default HeaderMenu;
