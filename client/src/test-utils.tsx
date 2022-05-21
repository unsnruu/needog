import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { RecoilRoot } from "recoil";

const AllTheBoardProvider: React.FC = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

const boardCustomRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  render(ui, { wrapper: AllTheBoardProvider, ...options });
};

export { boardCustomRender };
