import React from "react";
import { Grid, TextField, SxProps, Theme } from "@mui/material";

type TextFieldItem = {
  id: string;
  label: string;
  type: "text" | "password";
};
interface SigunUpFormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SignUpForm({ handleChange }: SigunUpFormProps) {
  const textfieldItems: TextFieldItem[] = [
    { id: "username", label: "아이디", type: "text" },
    { id: "nickname", label: "닉네임", type: "text" },
    { id: "password", label: "비밀번호", type: "password" },
    { id: "passwordConfirm", label: "비밀번호 확인", type: "password" },
  ];
  const textFieldStyle: SxProps<Theme> = {
    marginBottom: "1rem",
  };

  const isFilledIn = (value: string) => (value === "" ? false : true);
  const handleBlur = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    if (!isFilledIn(target.value)) {
      //todo 다 채워지지 않았다면 어떤 <상태를 이용>해서 form field에 뜨도록s
      console.log("It's empty");
    }
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
            onBlur={handleBlur}
            fullWidth
            required
          />
        </Grid>
      ))}
    </Grid>
  );
}
