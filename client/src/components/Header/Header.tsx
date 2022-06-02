import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import HeaderMenu from "../Header/HeaderMenu";
import userAtom, { withIsLoggedIn } from "../../recoil/user";
import { Grid, Typography } from "@mui/material";
import StyledLink from "../StyledLink";

function Header() {
  const navigate = useNavigate();
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
    <Grid container sx={{ height: "3rem" }}>
      <HeaderMenu />
      <HeaderAuth handleClickLogOut={handleClickLogOut} />
    </Grid>
  );
}

export default Header;

interface HeaderAuthProps {
  handleClickLogOut: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
function HeaderAuth({ handleClickLogOut }: HeaderAuthProps) {
  const isLoggedIn = useRecoilValue(withIsLoggedIn);

  return (
    <Grid
      item
      xs={4}
      container
      justifyContent={"flex-end"}
      alignItems={"center"}
    >
      {isLoggedIn ? (
        <StyledLink to="/" onClick={handleClickLogOut}>
          <Typography>로그아웃</Typography>
        </StyledLink>
      ) : (
        <StyledLink to="/login">
          <Typography>로그인</Typography>
        </StyledLink>
      )}
    </Grid>
  );
}
