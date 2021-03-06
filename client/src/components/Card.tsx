import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export interface CardProp {
  id: number;
  title: string;
  author: string;
  pathname: string;
}

const CardWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin: 5px;
  padding: 5px;
  border: 2px solid black;
  border-radius: 1rem;
  overflow: hidden;
  text-decoration: none;
  &:visited {
    color: inherit;
  }
`;

function Card({ id, author, title, pathname }: CardProp) {
  return (
    <CardWrapper>
      <Link to={`/${pathname}/post/${id}`} style={{ backgroundColor: "white" }}>
        <img alt="이미지"></img>
      </Link>
      <h3>{title}</h3>
      <h4>{author}</h4>
    </CardWrapper>
  );
}

export default Card;
