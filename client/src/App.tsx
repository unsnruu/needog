import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/404";
import { Adoption } from "./Pages/Adoption";
import { Missing } from "./Pages/Missing";
import { Care } from "./Pages/Care";
import { Community } from "./Pages/Community";
import { SignIn } from "./Pages/SignIn";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="adoption" element={<Adoption />}></Route>
        <Route path="missing" element={<Missing />}></Route>
        <Route path="care" element={<Care />}></Route>
        <Route path="community" element={<Community />}></Route>
        <Route path="signin" element={<SignIn />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
