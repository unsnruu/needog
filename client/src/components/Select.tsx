import React from "react";

type SelectProps = {
  optionItems: OptionItem[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export type OptionItem = { key: string; text: string; disabled?: boolean };

function Select({ optionItems, handleChange }: SelectProps) {
  if (!optionItems.length) return null;
  return (
    <select onChange={handleChange} defaultValue={optionItems[0].key}>
      {optionItems.map(({ key, text, disabled }) => (
        <option key={key} value={key} disabled={disabled || false}>
          {text}
        </option>
      ))}
    </select>
  );
}

export default Select;
