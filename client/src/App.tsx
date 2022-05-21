import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";

import Header from "./components/Header";
import Footer from "./components/Footer";
import userAtom from "./recoil/user";

import { Home } from "./Pages/Home/Home";
import { NotFound } from "./Pages/404";
import Adoption from "./Pages/Adoption/Adoption";
import Missing from "./Pages/Missing";
import Board from "./components/Board";
import Write from "./components/Write";
import { Care } from "./Pages/Care";
import { Community } from "./Pages/Community";
import { LogIn } from "./Pages/LogIn";
import { SignUp } from "./Pages/SignUp";
import { Post } from "./components/Post";

function App() {
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function initApp() {
      try {
        const { data: user } = await axios.get("/init", {
          withCredentials: true,
          cancelToken: source.token,
        });
        setUser((prev) => user);
      } catch (err) {
        console.error(`Error on initApp`, err);
      }
    }
    initApp();
    return () => source.cancel("Axios has canceled on initApp");
  }, [setUser]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="adoption" element={<Adoption />}>
          <Route index element={<Board />}></Route>
          <Route path="write" element={<Write />}></Route>
        </Route>
        <Route path="missing" element={<Missing />}>
          <Route index element={<Board />}></Route>
          <Route path="write" element={<Write />}></Route>
          <Route path="post/:id" element={<Post />}></Route>
        </Route>
        <Route path="care" element={<Care />}>
          <Route index element={<Board />}></Route>
          <Route path="write" element={<Write />}></Route>
          <Route path="post/:id" element={<Post />}></Route>
        </Route>
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
