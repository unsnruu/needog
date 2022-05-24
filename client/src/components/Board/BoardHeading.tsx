import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

interface BoardHeadingProps {
  title: string;
  isLoggedIn: boolean;
}
export default function BoardHeading({ title, isLoggedIn }: BoardHeadingProps) {
  return (
    <Grid item xs={12} container sx={{ marginBottom: "2rem" }}>
      <Grid item xs={12} container justifyContent={"center"}>
        <Typography sx={{ typography: "h3" }}>{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoggedIn && <Link to={"/missing/write"}>글쓰기</Link>}
      </Grid>
    </Grid>
  );
}
