import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { MemoryRouter } from "react-router-dom";

const AllTheBoardProvider: React.FC = ({ children }) => {
  return (
    <RecoilRoot>
      <MemoryRouter initialEntries={["/missing"]}>{children}</MemoryRouter>
    </RecoilRoot>
  );
};

const boardCustomRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  render(ui, { wrapper: AllTheBoardProvider, ...options });
};

export { boardCustomRender };
