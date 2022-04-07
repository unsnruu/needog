import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";

import authAtom from "../recoil/auth";

function LogIn() {
  const [form, setForm] = useState({ id: "", pwd: "" });
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data: user } = await axios.post("/auth/login", form, {
        withCredentials: true,
      });
      setAuth((prev) => ({ user, isLoggedIn: true }));
      console.log("성공적으로 로그인하셨습니다.");
    } catch (err) {
      console.log("로그인에 실패하셨습니다.");
    } finally {
      navigate("/", { replace: true });
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, [target.id]: target.value };
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">아이디</label>
        <input type="text" id="id" onChange={handleChange} value={form.id} />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="pwd"
          onChange={handleChange}
          value={form.pwd}
        />
        <button type="submit">로그인</button>
      </form>
      <div>
        <Link to="/signup">회원 가입</Link>
        <span>아이디 찾기</span>
        <span>비밀번호 찾기</span>
      </div>
    </div>
  );
}

export { LogIn };
