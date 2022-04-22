import React from "react";
import { Link, Outlet } from "react-router-dom";

import Post from "../components/Post";
import { SearchForm } from "../components/Form";

interface PostType {
  id: number;
  author: string;
  text: string;
  titile: string;
}

function Care() {
  return <Outlet />;
}

export { Care };
