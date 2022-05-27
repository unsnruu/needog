import React, { useState } from "react";
import { Grid, SelectChangeEvent, Button, Typography } from "@mui/material";
import Select from "./Select";

import { useRecoilValue } from "recoil";
import petAtom from "./../recoil/pet";
import sidoAtom from "./../recoil/sido";
import sigunguAtom from "./../recoil/sigungu";

import { SearchKey, Selected } from "../common/types";

interface SearchFormProps {
  selected: Selected;
  handleChangePet: (event: SelectChangeEvent) => void;
  handleChangeSido: (event: SelectChangeEvent) => void;
  handleChangeSigungu: (event: SelectChangeEvent) => void;
}

export default function SearchForm({
  selected,
  handleChangePet,
  handleChangeSido,
  handleChangeSigungu,
}: SearchFormProps) {
  //default items를 recoil을 사용해서 가져오기
  //UI를 렌더링하는 용도로만 사용되므로 Board에서 관리할 필요 없다.
  const petItem = useRecoilValue(petAtom);
  const sidoItem = useRecoilValue(sidoAtom);
  const sigunguItem = useRecoilValue(sigunguAtom);

  //sido를 셀렉트 하면, sigungu가 초기화 되게끔 수정해야 한다.
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
            id="pet"
            selected={selected.pet}
            optionItems={petItem}
            handleChange={handleChangePet}
          />
        </Grid>
        <Grid item xs={12} md={3} container>
          <Select
            id="sido"
            selected={selected.sido}
            optionItems={sidoItem}
            handleChange={handleChangeSido}
          />
        </Grid>
        <Grid item xs={12} md={3} container>
          <Select
            id="sigungu"
            selected={selected.sigungu}
            optionItems={sigunguItem[selected.sido]}
            handleChange={handleChangeSigungu}
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
