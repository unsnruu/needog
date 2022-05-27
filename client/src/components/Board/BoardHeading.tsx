import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

interface BoardHeadingProps {
  pathname: string;
}
export default function BoardHeading({ pathname }: BoardHeadingProps) {
  const title = getTitleByPathname(pathname);
  return (
    <Grid item xs={12} container sx={{ marginBottom: "2rem" }}>
      <Grid item xs={12} container justifyContent={"center"}>
        <Typography sx={{ typography: "h3" }}>{title}</Typography>
      </Grid>
    </Grid>
  );
}

function getTitleByPathname(pathname: string): string {
  switch (pathname) {
    case "/missing":
      return "실종";
    case "/care":
      return "보호";
    case "adoption":
      return "입양";
    default:
      return "알 수 없는 주소";
  }
}
