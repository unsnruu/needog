import React, { useState } from "react";
import { Grid, SelectChangeEvent, Button, Typography } from "@mui/material";
import Select from "./Select";

import { useRecoilValue } from "recoil";
import petAtom from "./../recoil/pet";
import sidoAtom from "./../recoil/sido";
import sigunguAtom from "./../recoil/sigungu";

import { Selected } from "../common/types";

interface SearchFormProps {
  selected: Selected;
  createChangeHandler: (selected: string) => (event: SelectChangeEvent) => void;
}

export default function SearchForm({
  createChangeHandler,
  selected,
}: SearchFormProps) {
  //default items를 recoil을 사용해서 가져오기
  //UI를 렌더링하는 용도로만 사용되므로 Board에서 관리할 필요 없다.
  const PetItem = useRecoilValue(petAtom);
  const SidoItem = useRecoilValue(sidoAtom);
  const SigunguItem = useRecoilValue(sigunguAtom);

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
            optionItems={PetItem}
            handleChange={createChangeHandler("pet")}
            selected={selected.pet}
          />
        </Grid>
        <Grid item xs={12} md={3} container>
          <Select
            optionItems={SidoItem}
            handleChange={createChangeHandler("sido")}
            selected={selected.sido}
          />
        </Grid>
        <Grid item xs={12} md={3} container>
          <Select
            optionItems={selected.sido ? SigunguItem[selected.sido] : null}
            handleChange={createChangeHandler("sigungu")}
            selected={selected.sigungu}
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
