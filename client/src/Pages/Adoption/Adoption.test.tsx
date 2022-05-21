import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import Adoption from "./Adoption";
import Board from "../../components/Board";

test("/adoption에서 Board 컴포넌트 렌더링하기", () => {
  render(
    <MemoryRouter initialEntries={["/adoption"]}>
      <Routes>
        <Route path="adoption" element={<Adoption />}>
          <Route index element={<Board />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  const board = screen.getByTestId("board-container");
  expect(board).toBeInTheDocument();
});
