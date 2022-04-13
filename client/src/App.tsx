import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";

import Header from "./components/Header";
import Footer from "./components/Footer";
import userAtom from "./recoil/user";

import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/404";
import { Adoption } from "./Pages/Adoption";
import Missing, { Board, Write } from "./Pages/Missing/";
import { Care } from "./Pages/Care";
import { Community } from "./Pages/Community";
import { LogIn } from "./Pages/LogIn";
import { SignUp } from "./Pages/SignUp";

function App() {
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    async function init() {
      console.log("FUNC: init");
      try {
        const { data: user } = await axios.get("/init", {
          withCredentials: true,
        });
        setUser((prev) => user);
      } catch (err) {
        console.log("세션 아이디를 통해 로그인 할 수 없습니다.");
      }
    }
    init();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="adoption" element={<Adoption />}></Route>
        <Route path="missing" element={<Missing />}>
          <Route path="write" element={<Write />}></Route>
          <Route index element={<Board />}></Route>
        </Route>
        <Route path="care" element={<Care />}></Route>
        <Route path="community" element={<Community />}></Route>
        <Route path="login" element={<LogIn />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
