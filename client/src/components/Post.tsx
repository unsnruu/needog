import styled from "styled-components";

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  background-color: gray;
`;

function Post() {
  return (
    <Wrapper>
      <h3>게시물 제목</h3>
      <img alt="이미지"></img>
      <p>세부 내용 ...</p>
    </Wrapper>
  );
}

export default Post;
