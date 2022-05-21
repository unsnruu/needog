import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getBasePathname } from "../apis/getBasePathname";

interface AxiosReturn {
  id: number;
  title: string;
  author: string;
  json: string;
  pet: string;
  sido: string;
  sigungu: string;
}
type Params = { id: string };

function Post() {
  const { id } = useParams<Params>();
  const { pathname } = useLocation();
  const baseUrl = useMemo(() => getBasePathname(pathname), [pathname]);

  const [content, setContent] = useState<Content>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function initPost() {
      try {
        const { data } = await axios.post<AxiosReturn>(
          `/${baseUrl}/post/${id}`,
          {
            CancelToken: source.token,
          }
        );
        if (!data) return;
        const { title, author, json, pet, sido, sigungu } = data;
        setTitle((prev) => title);
        setAuthor((prev) => author);
        setContent((prev) => JSON.parse(json));
      } catch (err) {
        console.log(`Error on initPost`);
      } finally {
      }
    }
    initPost();

    return () => source.cancel("Axios has canceled on Post.tsx");
  }, [id, baseUrl]);

  if (content === null) return null;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>제목: {title}</h2>
        <h3>작성자: {author}</h3>
      </div>
      <PostContent content={content} />
    </div>
  );
}

function PostContent({ content }: { content: Content }) {
  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
    content,
  });

  return <EditorContent editor={editor} />;
}

export { Post };
