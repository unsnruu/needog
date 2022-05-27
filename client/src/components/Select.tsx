import React from "react";
import {
  Select as MuiSelect,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { OptionItem } from "../common/types";

type SelectProps = {
  optionItems: OptionItem[] | null;
  handleChange: (event: SelectChangeEvent) => void;
  selected: string;
};

function Select({ selected, optionItems, handleChange }: SelectProps) {
  if (!optionItems) return null;

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <MuiSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selected}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </MuiSelect>
    </FormControl>
  );
}

export default Select;
