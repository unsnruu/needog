//Todo : 로그인 시에만 이 페이지 방문 가능하도록 navigate해야한다.
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";

// import Select from "./Select";
// import Menubar from "./Editor/Menubar";

// import useRegion from "../apis/useRegion";
// import { OptionItem } from "../common/types";
// import { petInitItems } from "../data";

function Write() {
  const [title, setTitle] = useState("");
  const location = useLocation();
  console.log(location);
  // const navigate = useNavigate();

  // const editor = useEditor({
  //   extensions: [StarterKit, Image],
  //   content: `
  //     <h2>
  //       Hi there,
  //     </h2>
  //   `,
  // });

  // const items: ItemsType = {
  //   pet: [{ key: "null", text: "동물 선택", disabled: true }, ...pet.items],
  //   sido: [{ key: "*", text: "지역 선택", disabled: true }, ...sido.items],
  //   sigungu: [
  //     { key: "*", text: "상세 지역 선택", disabled: true },
  //     ...sigungu.items,
  //   ],
  // };

  // const handleChanges: HandleChangesType = {
  //   pet: ({ target }: HandleChangeSelect) => {
  //     setPet((prev) => ({ ...prev, selected: target.value }));
  //   },
  //   sido: ({ target }: HandleChangeSelect) => {
  //     setSido((prev) => ({ ...prev, selected: target.value }));
  //   },
  //   sigungu: ({ target }: HandleChangeSelect) => {
  //     setSigungu((prev) => ({ ...prev, selected: target.value }));
  //   },
  //   title: ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  //     setTitle(target.value);
  //   },
  // };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // };
  // const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();

  //   if (!editor) throw new Error("Editor hasn't defined");

  //   if (pet.selected === "null") {
  //     window.alert("동물의 종류를 선택해 주세요");
  //     return;
  //   } else if (sido.selected === "*") {
  //     window.alert("지역을 선택해 주세요");
  //     return;
  //   } else if (sigungu.selected === "*") {
  //     window.alert("상세 지역을 선택해 주세요");
  //     return;
  //   } else if (!title.trim().length) {
  //     window.alert("제목이 비었습니다.");
  //     return;
  //   }

  //   try {
  //     await axios.post(
  //       `${baseUrl}/write`,
  //       {
  //         title,
  //         pet: pet.selected,
  //         sido: sido.selected,
  //         sigungu: sigungu.selected,
  //         json: editor.getJSON(),
  //       },
  //       { withCredentials: true }
  //     );
  //   } catch (err) {
  //     console.log("Failed to submit");
  //   }

  //   navigate(`/${baseUrl}`, { replace: true });
  // };

  return (
    <div>
      <h2>Write</h2>
    </div>
  );
  // return (
  //   <div id="page-write">
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label htmlFor="title">제목</label>
  //         <input type="text" onChange={handleChanges.title} />
  //       </div>
  //       <div>
  //         <Select
  //           name="pet"
  //           optionItems={items.pet}
  //           handleChange={handleChanges.pet}
  //         />
  //         {
  //           <Select
  //             name="sido"
  //             optionItems={items.sido}
  //             handleChange={handleChanges.sido}
  //           />
  //         }
  //         {sido.selected === "*" || (
  //           <Select
  //             name="sigungu"
  //             optionItems={items.sigungu}
  //             handleChange={handleChanges.sigungu}
  //           />
  //         )}
  //       </div>
  //       <div>
  //         {editor && <Menubar editor={editor} />}
  //         <EditorContent editor={editor} />
  //       </div>
  //       <button onClick={handleClick}>작성 완료</button>
  //     </form>
  //   </div>
  // );
}

export default Write;
