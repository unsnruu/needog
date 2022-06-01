//todo
//[ ] 비밂번호 확인과 비밀번호가 일치하지 않을 경우 경고 발생하게 만들기
//[ ] 입력이 잘 못된 필드에 대해서 효과를 주기: 빨갛게 outline이 된다거나 등등

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
  username: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}
function SignUp() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const isEmptyString = (value: string) => (value === "" ? true : false);
  const isFilledIn = (userInfoKey: keyof UserInfo) =>
    userInfo[userInfoKey] === "" ? false : true;
  const isAllFilledIn = (userInfo: UserInfo): boolean => {
    const keys = Object.keys(userInfo) as Array<keyof UserInfo>;
    for (let key of keys) {
      if (isEmptyString(userInfo[key])) return false;
    }
    return true;
  };
  const isSamePassword = () => {
    if (userInfo.password === userInfo.passwordConfirm) return true;
    else return false;
  };

  const handleClickSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      if (!isAllFilledIn(userInfo)) {
        let message = "모든 필드가 채워지지 않았습니다.";
        setError(message);
        setOpen(true);
        throw new Error(message);
      }
      if (!isSamePassword()) {
        let message = "비밀번호를 다시 확인해 주세요";
        setError(message);
        setOpen(true);
        throw new Error(message);
      }
      const result = await axios.post("/auth/signup", { ...userInfo });
      console.log(result);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      console.error("계정 만들기에 실패함");
    }
  };
  //event handlers
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => {
      return { ...prev, [target.id]: target.value };
    });
  };
  const handleBlur = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    if (!isFilledIn(target.id as keyof UserInfo)) {
      //todo 다 채워지지 않았다면 어떤 <상태를 이용>해서 form field에 뜨도록
    }
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
        <SignUpForm handleChange={handleChange} handleBlur={handleBlur} />
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

export { SignUp };

type TextFieldItem = {
  id: string;
  label: string;
  type: "text" | "password";
};
interface SigunUpFormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}
function SignUpForm({ handleChange, handleBlur }: SigunUpFormProps) {
  const textfieldItems: TextFieldItem[] = [
    { id: "username", label: "아이디", type: "text" },
    { id: "nickname", label: "닉네임", type: "text" },
    { id: "password", label: "비밀번호", type: "password" },
    { id: "passwordConfirm", label: "비밀번호 확인", type: "password" },
  ];
  const textFieldStyle: SxProps<Theme> = {
    marginBottom: "1rem",
  };

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
            required
            onBlur={handleBlur}
          />
        </Grid>
      ))}
    </Grid>
  );
}
function SingUpHeader() {
  return (
    <Grid item xs={12} md={12} container justifyContent={"center"}>
      <Typography>회원가입</Typography>
    </Grid>
  );
}
