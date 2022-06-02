import React from "react";
import { Grid, Typography } from "@mui/material";
import { ReactComponent as LogoIcon } from "../../images/needog-logo-v2.svg";
import StyledLink from "../StyledLink";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const MenuWrapper = styled(Grid)`
  & > div {
    margin-right: 1rem;
  }
`;

function HeaderMenu() {
  return (
    <MenuWrapper
      item
      xs={8}
      container
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      <Grid item>
        <Link to="/">
          <LogoIcon />
        </Link>
      </Grid>
      <Grid item>
        <StyledLink to="/missing">
          <Typography>실종</Typography>
        </StyledLink>
      </Grid>
      <Grid item>
        <StyledLink to="/care">
          <Typography>보호</Typography>
        </StyledLink>
      </Grid>
      <Grid item>
        <StyledLink to="/adoption">
          <Typography>입양</Typography>
        </StyledLink>
      </Grid>
      <Grid item>
        <StyledLink to="/community">
          <Typography>커뮤니티</Typography>
        </StyledLink>
      </Grid>
    </MenuWrapper>
  );
}
export default HeaderMenu;
