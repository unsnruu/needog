import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { Grid, TextField, Button, Typography } from "@mui/material";

import userAtom from "../recoil/user";

interface AxiosReturnLogin {
  email: string;
  nickname: string;
  userId: string;
  snsId: string;
}
const getKeyByTargetId = (id: string) => id.split("-")[1];
function LogIn() {
  const [authInfo, setAuthInfo] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const handleClickSumbit = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const { data } = await axios.post<AxiosReturnLogin>(
        "/auth/login",
        authInfo,
        {
          withCredentials: true,
        }
      );
      const { nickname, snsId, userId } = data;

      setUser((prev) => ({ ...prev, nickname, userId, snsId }));
      navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인에 실패하셨습니다.");
    } finally {
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const key = getKeyByTargetId(target.id);
    setAuthInfo((prev) => ({ ...prev, [key]: target.value }));
  };

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={12}>
        HOME
      </Grid>
      <Grid item xs={8} container>
        <Grid item xs={12}>
          <TextField
            label="아이디"
            id="form-username"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="비밀번호"
            id="form-password"
            type="password"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} container sx={{ visibility: "hidden" }}>
          <Typography>아이디와 비밀번호를 확인해주세요</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            onClick={handleClickSumbit}
            fullWidth
          >
            로그인
          </Button>
        </Grid>
      </Grid>

      <Grid item container>
        <Grid item>
          <Link to="/signup">
            <Typography>회원 가입</Typography>
          </Link>
        </Grid>
        <Grid item>
          <Typography>아이디 찾기</Typography>
        </Grid>
        <Grid item>
          <Typography>비밀번호 찾기</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { LogIn };
