import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Routes, Route } from "react-router-dom";

import { boardCustomRender as render } from "../../test-utils";

import Board from "../Board";
import Write from "../Write";
import Missing from "../../Pages/Missing";

describe("pathname prop에 따른 board의 title 값의 변화", () => {
  test("/missing을 전달 시", () => {
    render(<Board />);
    const title = screen.getByText("실종 동물을 찾습니다");
    expect(title).toBeInTheDocument();
  });

  test("/care을 전달 시", () => {
    render(<Board />);
    const title = screen.getByText("동물을 보호 중입니다");
    expect(title).toBeInTheDocument();
  });
  test("/adoption을 전달 시", () => {
    render(<Board />);
    const title = screen.getByText("동물 입양");
    expect(title).toBeInTheDocument();
  });
});
//위의 test를 pass하면 주소는 missing으로 통일
describe("state를 통해 element가 잘 반영되었는지 확인", () => {
  test("form이 제대로 렌더링이 되는지 확인", () => {
    render(<Board />);
    const form = screen.getByRole("form", { name: "search form" });
    expect(form).toBeInTheDocument();
  });
});

describe("state를 제대로 받아 올 수 있는 지 확인하기", () => {
  test("pet state", () => {
    render(<Board />);

    const optionPet = screen.getByRole("option", { name: "강아지" });
    expect(optionPet).toHaveTextContent("강아지");
  });

  test("sido state", () => {
    render(<Board />);

    const optionSido = screen.getByRole("option", {
      name: "서울특별시",
    });
    expect(optionSido).toHaveTextContent("서울특별시");
  });
  test("sigungu state", async () => {
    render(<Board />);
    const optionSido = screen.getByRole("option", {
      name: "서울특별시",
    });
    const selectSido = screen.getByTestId("sido");
    userEvent.selectOptions(selectSido, optionSido);
    const optionSigungu = await screen.findByRole("option", { name: "종로구" });
    expect(optionSigungu).toHaveTextContent("종로구");
  });
});

describe("Router 기능이 제대로 작동하는지 테스트", () => {
  test("글쓰기 버튼을 누를 시에 제대로 페이지를 이동하는 지 확인", async () => {
    render(
      <Routes>
        <Route path="missing" element={<Missing />}>
          <Route index element={<Board />} />
          <Route path="write" element={<Write />} />
        </Route>
      </Routes>
    );

    const writeLink = screen.getByRole("link", { name: "글쓰기" });
    expect(writeLink).toBeInTheDocument();
    userEvent.click(writeLink);

    const writeHeading = screen.getByText("Write");
    expect(writeHeading).toBeInTheDocument();
  });
});
