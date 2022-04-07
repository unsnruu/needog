import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <p>해당 페이지가 존재하지 않습니다.</p>
      <Link to="/" replace={true}>
        홈으로
      </Link>
    </div>
  );
}

export { NotFound };
