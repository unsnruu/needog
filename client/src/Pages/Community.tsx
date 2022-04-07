import React from "react";
import { Outlet } from "react-router-dom";

function Community() {
  return (
    <div>
      <nav id="submenu">
        <span>자유게시판</span>
        {" | "}
        <span>자원봉사</span>
        {" | "}
        <span>공지사항</span>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export { Community };
