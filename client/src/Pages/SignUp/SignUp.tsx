//todo
//[ ] 비밂번호 확인과 비밀번호가 일치하지 않을 경우 경고 발생하게 만들기
//[ ] 입력이 잘 못된 필드에 대해서 효과를 주기: 빨갛게 outline이 된다거나 등등
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Typography,
  Button,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import SignUpForm from "./SignUpForm";
import { UserInfoKeys, UserInfoState, DisplayState } from "./types";

export default function SignUp() {
  const navigate = useNavigate();
  //local states
  const [userInfo, setUserInfo] = useState<UserInfoState>({
    username: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const checkers = {
    isSamePassword() {
      if (userInfo.password === userInfo.passwordConfirm) return true;
      else return false;
    },
    isIncludingSpecialCh(str: string) {
      return str.match(/[^\w]/) ? true : false;
    },
    isEmptyString(value: string) {
      return value === "" ? true : false;
    },
    isAllFilledIn(userInfo: UserInfoState) {
      const keys = Object.keys(userInfo) as Array<keyof UserInfoState>;

      for (let key of keys) {
        if (this.isEmptyString(userInfo[key])) return false;
      }
      return true;
    },
  };

  const handleClickSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      if (!checkers.isAllFilledIn(userInfo)) {
        let message = "빈칸을 확인해주세요";
        setError(message);
        setOpen(true);
        throw new Error(message);
      }
      if (!checkers.isSamePassword()) {
        let message = "비밀번호를 다시 확인해 주세요";
        setError(message);
        setOpen(true);
        throw new Error(message);
      }
      if (checkers.isIncludingSpecialCh(userInfo.username)) {
        throw new Error("아이디에 특수문자가 들어가 있습니다");
      }

      const result = await axios.post("/auth/signup", { ...userInfo });
      console.log(result);
      navigate("/", { replace: true });
    } catch (error) {}
  };
  //event handlers
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => {
      return { ...prev, [target.id]: target.value };
    });
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
    setError("");
    //todo: setError가 동시에 되면서 ui가 어그러지는 현상 발생. setTimeout 사용을 고려해 볼 것
  };
  return (
    <>
      <Grid container justifyContent={"center"} aria-label="양식">
        <SingUpHeader />
        <SignUpForm handleChange={handleChange} />
        <Grid item xs={10} container>
          <Button variant="contained" onClick={handleClickSubmit} fullWidth>
            가입하기
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      </Snackbar>
    </>
  );
}

function SingUpHeader() {
  return (
    <Grid item xs={12} md={12} container justifyContent={"center"}>
      <Typography>회원가입</Typography>
    </Grid>
  );
}

// const getEmptyFields = (userInfo: UserInfoState) => {
//   const results: Partial<UserInfoKeys>[] = [];

//   const keys = Object.keys(userInfo) as Array<keyof UserInfoState>;
//   for (let key of keys) {
//     if (isEmptyString(userInfo[key])) results.push(key);
//   }
//   return results;
// };

// const emptyFields = getEmptyFields(userInfo);
// if (emptyFields.length) {
//   const newDisplay: DisplayState = {
//     nickname: "none",
//     password: "none",
//     passwordConfirm: "none",
//     username: "none",
//   };
//   emptyFields.forEach((field) => (newDisplay[field] = "block"));
//   setDisplay((prev) => newDisplay);

//   let message = "모든 필드가 채워지지 않았습니다.";
//   throw new Error(message);
// }
