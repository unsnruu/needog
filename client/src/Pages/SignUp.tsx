import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [newUser, setNewUser] = useState({ userId: "", pwd: "", nickname: "" });
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("/auth/signup", { ...newUser });
    } catch (err) {
      window.alert("Failed to Sign up");
    } finally {
      navigate("/", { replace: true });
    }
  };
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser((prev) => {
      return { ...prev, [target.id]: target.value };
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="userId">아이디</label>
      <input type="text" id="userId" onChange={handleChange} />
      <label htmlFor="nickname">닉네임</label>
      <input type="text" id="nickname" onChange={handleChange} />
      <label htmlFor="pwd">비밀번호</label>
      <input type="password" id="pwd" onChange={handleChange} />
      <button type="submit">가입하기</button>
    </form>
  );
}

export { SignUp };
