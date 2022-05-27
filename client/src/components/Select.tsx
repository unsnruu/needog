import React from "react";
import {
  Select as MuiSelect,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { SearchKey, OptionItem } from "../common/types";

type SelectProps = {
  id: SearchKey;
  optionItems: OptionItem[] | null;
  selected: string;
  handleChange: (event: SelectChangeEvent) => void;
};

export default function Select({
  id,
  selected,
  optionItems,
  handleChange,
}: SelectProps) {
  if (!optionItems) return null;

  return (
    <FormControl fullWidth>
      <InputLabel id={`select-label-${id}`}>${getAliasById(id)}</InputLabel>
      <MuiSelect
        labelId={`select-label-${id}`}
        id={`select-${id}`}
        value={selected}
        label={getAliasById(id)}
        onChange={handleChange}
      >
        {optionItems.map(({ key, text, disabled }) => (
          <MenuItem key={key} disabled={disabled ? true : false}>
            {text}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

function getAliasById(id: "pet" | "sido" | "sigungu") {
  switch (id) {
    case "pet":
      return "반려 동물";
    case "sido":
      return "시/도";
    case "sigungu":
      return "시/군/구";
  }
}
