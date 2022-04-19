import React, { ReactElement } from "react";

import Select, { OptionItem } from "../Select";

interface FormProps {
  children: ReactElement;
  selectItems: SelectItem[];
  handleSumbit: (e: React.FormEvent) => void;
  handleChangeSelect: (e: React.ChangeEvent) => void;
}
interface SelectItem {
  selectId: string;
  optionItems: OptionItem[];
}

function Form({
  children,
  selectItems,
  handleSumbit,
  handleChangeSelect,
}: FormProps) {
  return (
    <form onSubmit={handleSumbit}>
      {children}
      {selectItems.map(({ selectId, optionItems }) => (
        <select key={selectId} onChange={handleChangeSelect}>
          {optionItems.map(({ text, key }) => (
            <option key={key}>{text}</option>
          ))}
        </select>
      ))}
    </form>
  );
}

export default Form;
