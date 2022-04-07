import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { HeaderMenu } from "./HeaderMenu";
import authAtom, { withIsLoggedIn } from "../recoil/auth";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(withIsLoggedIn);
  const setAuth = useSetRecoilState(authAtom);

  const handleClickLogOut = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    try {
      await axios.get("/auth/logout", {
        withCredentials: true,
      });
      setAuth((prev) => ({ user: {}, isLoggedIn: false }));
      console.log("성공적으로 로그아웃 되었습니다.");
    } catch (err) {
      console.log("로그아웃에 실패하셨습니다.");
      console.error(err);
    } finally {
      navigate("/");
    }
  };

  return (
    <header style={{ display: "flex" }}>
      <HeaderMenu />
      {isLoggedIn ? (
        <a href="/" onClick={handleClickLogOut}>
          로그아웃
        </a>
      ) : (
        <Link to="login">로그인</Link>
      )}
    </header>
  );
}

export { Header };
