import React from "react";
import { useRecoilValue } from "recoil";

import userAtom, { withIsLoggedIn } from "../recoil/user";

function Profile() {
  const user = useRecoilValue(userAtom);
  const isLoggedIn = useRecoilValue(withIsLoggedIn);

  if (!isLoggedIn) return null;
  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <h3>환영합니다</h3>
      <h3>{user.nickname}님</h3>
    </div>
  );
}

export default Profile;
