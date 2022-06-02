import React from "react";
import Header from "../../components/Header";

import Profile from "../../components/Profile";

function Home() {
  return (
    <>
      <Header />
      <main>
        <div>배너가 둥둥</div>
        <div>공지 사항</div>
        <div>이용 방법?</div>
        <div>후원 광고 등등</div>
        <Profile />
      </main>
    </>
  );
}

export { Home };
