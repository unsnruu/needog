import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import HeaderMenu from "./HeaderMenu";
import userAtom, { withIsLoggedIn } from "../recoil/user";

function Header() {
  const navigate = useNavigate();

  const isLoggedIn = useRecoilValue(withIsLoggedIn);
  const setUser = useSetRecoilState(userAtom);

  const handleClickLogOut = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    try {
      await axios.get("/auth/logout", {
        withCredentials: true,
      });
      setUser((prev) => ({ userId: null, nickname: null, snsId: null }));
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

export default Header;

//? loading상태에 따라서 아예 fallback 처리를 해버리는 게 나으려나
