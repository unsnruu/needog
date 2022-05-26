import React, { useState } from "react";
import { Grid, SelectChangeEvent, Button, Typography } from "@mui/material";
import Select from "./Select";

import { useRecoilValue } from "recoil";
import petAtom from "./../recoil/pet";
import sidoAtom from "./../recoil/sido";
import sigunguAtom from "./../recoil/sigungu";

import { Items, Selected } from "../common/types";

interface SearchFormProps {
  createChangeHandler: (selected: string) => (event: SelectChangeEvent) => void;
}

export default function SearchForm({ createChangeHandler }: SearchFormProps) {
  //default data를 recoil을 사용해서 가져오기
  //UI를 렌더링하는 용도로만 사용되므로 Board에서 관리할 필요 없다.
  const defaultPet = useRecoilValue(petAtom);
  const defaultSido = useRecoilValue(sidoAtom);
  const defaultSigungu = useRecoilValue(sigunguAtom);
  const [items, setItems] = useState({
    pet: defaultPet,
    sido: defaultSido,
    sigungu: defaultSigungu,
  });

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
