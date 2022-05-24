import React from "react";
import { Grid, SelectChangeEvent, Button, Typography } from "@mui/material";
import Select from "./Select";

import { Items } from "../common/types";

interface SearchFormProps {
  items: Items;
  handleChange: (selectName: string) => (event: SelectChangeEvent) => void;
  handleClickSubmit: () => void;
}

export default function SearchForm({
  items,
  handleChange,
  handleClickSubmit,
}: SearchFormProps) {
  return (
    <Grid item xs={10} container role="form">
      <Grid
        item
        container
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Grid item xs={12} md={3} container>
          <Select
            name="pet"
            optionItems={items.pet}
            handleChange={handleChange("pet")}
          />
        </Grid>
        <Grid item xs={12} md={3} container>
          <Select
            name="sido"
            optionItems={items.sido}
            handleChange={handleChange("sido")}
          />
        </Grid>
        <Grid item xs={12} md={3} container>
          <Select
            name="sigungu"
            optionItems={items.sigungu}
            handleChange={handleChange("sigungu")}
          />
        </Grid>
        <Grid item xs={12} md={3} sx={{ height: "3rem" }}>
          <Button variant="contained" sx={{ height: "100%", width: "80%" }}>
            <Typography>검색하기</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
