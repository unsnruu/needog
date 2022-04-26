# Todos

[README.md로 돌아가기](../README.md)

---

## **구체적인 구현과 관련하여**

## Server

- [ ] db table 구축하기
  - [ ] missings table 생성하기d
  - [ ] 'cares' table 생성하기
  - [ ] users을 중심으로 foreign 키 설정하기
- [ ] `passport`에서 failure message나 flash message 전달하도록 하기
- [ ] Adoption router 구현

## Client

- [ ] 로그인 실패시 응답화면 출력하기
  - [ ] 비밀번호/아이디를 틀리거나 해결하자
  - [ ] 아예 서버와 통신이 실패했을 시 해결하자
- [x] 시군구/구/동 주소를 받아오는 api 설계하자
- [ ] `components/Form` 에서 submit 이벤트 처리 구현하기
  - [ ] 어떤 구조로 처리할지 구조를 생각해 보자
  - [ ] Write / Search 두 가지 경우에서 재사용이 가능하도록 만들자
- [x] `pages/Write.tsx`에서 throttle 구현하기 -> 안하는 걸로
- [ ] Post에서 삭제 버튼 구현하기
- [ ] searchForm 부분에서 이후에 ux의 개선을 위해서 `<optgroup/>`을 도입하기
- [ ] search fetching logic 완성하기
- [ ] `Card.tsx`
  - [ ] key 값으로 card의 아이디 부여
  - [ ] 클릭 시 card의 Post 페이지로 이동하게끔 이벤트 설정
- [ ] `tiptap`을 활용해서 `Card.tsx`와 `Write.tsx`를 만들기
- [ ] Card에서 어떤 내용을 보이도록 해야할까?
- [ ] 이미지 전송하는 방법 찾기
- [ ] skeleton loader 도입하기
- [ ] Adoption page 구현

---

## **이후 계획과 관련하여**

## Client

### 기본적인 기능 구현하기

- [ ] data fetching
- [ ] event
- [ ] state 관리

### suspense/ code-splitting 도입하기

- [ ] React Suspense, React @18기준으로 익히기

### 스타일 구현하기

- [ ] styled-components 사용하기

### 기타

- [ ] 테스팅 코드 도입하기
- [ ] React Helmet 공부하기

## Sever
