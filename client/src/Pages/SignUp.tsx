import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Grid, Typography, TextField, Button, Snackbar } from "@mui/material";

function SignUp() {
  const [newUser, setNewUser] = useState({ userId: "", pwd: "", nickname: "" });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      await axios.post("/auth/signup", { ...newUser });
    } catch (err) {
      setOpen(true);
    } finally {
      navigate("/", { replace: true });
    }
  };
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser((prev) => {
      return { ...prev, [target.id]: target.value };
    });
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Grid container justifyContent={"center"} aria-label="양식">
        <Grid item xs={12} md={12} container justifyContent={"center"}>
          <Typography>회원가입</Typography>
        </Grid>
        <SignUpForm handleChange={handleChange} />
        <Grid item xs={10} container>
          <Button variant="contained" onClick={handleClickSubmit} fullWidth>
            가입하기
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} />
    </>
  );
}

export { SignUp };

//todo
// 비밂번호 확인과 비밀번호가 일치하지 않을 경우 경고 발생하게 만들기

interface SigunUpFormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function SignUpForm({ handleChange }: SigunUpFormProps) {
  return (
    <Grid item container justifyContent={"center"}>
      <Grid item xs={12} md={5}>
        <TextField
          id="userId"
          label="아이디"
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <TextField
          id="nickname"
          label="닉네임"
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <TextField
          id="pwd"
          label="비밀번호"
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <TextField label="비밀번호 확인" fullWidth />
      </Grid>
    </Grid>
  );
}
