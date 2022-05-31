//todo
//[ ] 비밂번호 확인과 비밀번호가 일치하지 않을 경우 경고 발생하게 만들기

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  AlertTitle,
  SxProps,
  Theme,
} from "@mui/material";

interface UserInfo {
  userId: string;
  password: string;
  nickname: string;
}
type IsAllFillInReturn = ["SUCCESS", null] | ["FAIL", string];
const isAllFilledIn = ({
  userId,
  password,
  nickname,
}: UserInfo): IsAllFillInReturn => {
  if (userId !== "" && password !== "" && nickname !== "") {
    return ["SUCCESS", null];
  }
  return ["FAIL", "비어있는 칸이 있습니다."];
};
function SignUp() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: "",
    password: "",
    nickname: "",
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      console.log(userInfo);
      const [result, message] = isAllFilledIn(userInfo);
      if (result === "FAIL") {
        throw new Error(message);
      }
      await axios.post("/auth/signup", { ...userInfo });
      navigate("/", { replace: true });
    } catch (error) {
      setOpen(true);
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => {
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
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          <AlertTitle>회원 가입 실패</AlertTitle>
        </Alert>
      </Snackbar>
    </>
  );
}

export { SignUp };

interface SigunUpFormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface TextFieldItem {
  id: string;
  label: string;
  type: "text" | "password";
}
function SignUpForm({ handleChange }: SigunUpFormProps) {
  const textFieldStyle: SxProps<Theme> = {
    marginBottom: "1rem",
  };
  const textfieldItems: TextFieldItem[] = [
    { id: "userId", label: "아이디", type: "text" },
    { id: "nickname", label: "닉네임", type: "text" },
    { id: "password", label: "비밀번호", type: "password" },
    { id: "re-password", label: "비밀번호 확인", type: "password" },
  ];
  return (
    <Grid item container justifyContent={"center"}>
      {textfieldItems.map(({ id, label, type }) => (
        <Grid key={`${id}-grid`} item xs={12} md={8} sx={textFieldStyle}>
          <TextField
            id={id}
            label={label}
            type={type}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      ))}
    </Grid>
  );
}
