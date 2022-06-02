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
  const [form, setForm] = useState({ id: "", pwd: "" });
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const handleClickSumbit = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const { data } = await axios.post<AxiosReturnLogin>("/auth/login", form, {
        withCredentials: true,
      });
      const { nickname, snsId, userId } = data;
      console.log(data);
      setUser((prev) => ({ ...prev, nickname, userId, snsId }));
    } catch (err) {
      console.log("로그인에 실패하셨습니다.");
    } finally {
      navigate("/", { replace: true });
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const key = getKeyByTargetId(target.id);
    setForm((prev) => {
      return { ...prev, [key]: target.value };
    });
  };

  return (
    <Grid container>
      <Grid item>
        <TextField label="아이디" />
      </Grid>
      <Grid item>
        <TextField label="비밀번호" />
      </Grid>
      <Button variant="contained" type="submit" onClick={handleClickSumbit}>
        로그인
      </Button>
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
