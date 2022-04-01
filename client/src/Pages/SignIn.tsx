import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:8000/signin",
      data: { id, pwd },
    });
    navigate("/", { replace: true });
  };
  const handleChangeId = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setId(target.value);
  };
  const handleChangePwd = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(target.value);
  };

  return (
    <div>
      <form action="">
        <label htmlFor="id">아이디</label>
        <input type="text" id="id" onChange={handleChangeId} value={id} />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          onChange={handleChangePwd}
          value={pwd}
        />
        <button type="submit" onClick={handleClick}>
          로그인
        </button>
      </form>
    </div>
  );
}

export { SignIn };
