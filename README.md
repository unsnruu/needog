# Project/ Needog

## 들어가면서

### 왜 이 프로젝트를 시작하게 되었나요?

처음에는 [Node JS 교과서](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=246391275)에 등장하는 클론 프로젝트를 혼자서 구현해 보기 위해서 시작했습니다. 혼자 프론트를 구현하다보니 서버에 대한 이해와 통신이 필요로 하는 상황이었습니다. _하지만_ 단순히 똑같은 프로젝트를 또 다시 재현하는 일은 크게 도움이 되지 않을 거라는 생각이 들었습니다. 예전부터 관심이 있던 동물 구조와 입양 사이트를 한 번 제작해보면 좋겠다는 생각에 시작하게 되었습니다.

### 프로젝트의 방향성

기존에 운영하고 있는 사이트를 참고해서 설계를 시작했습니다. 다만 기존 사이트의 기능은 비슷하게 구현하되 UX 측면에서 보다 깔끔하고 세련된 방향으로 디자인하고 싶었습니다. <br/>
또한 서버와 클라이언트 간 어떻게 데이터 통신이 이루어지는 지를 중점적으로 탐구하면서 구현하고자 했습니다. 그를 통해 리액트의 `useEffect`를 비롯한 _hooks_ 에 대한 이해도를 상승시키고 싶었습니다.<br/>
이후에 가능하다면 `Code-Splitting`이나 React`<Suspense>`를 통한 `SSR` 아키텍쳐를 도입하고자 합니다.

---

## 사용한 기술 스택(Libraries I Used)

### Client

- React
- Typescript
- Recoil
- React-router-dom
- Styled-components
- Axios

### Server

- Express
- Passport
- Mysql2

---

## Todos

이후에 추가적으로 진행할 작업에 관해서는 [여기](./docs/todos.md)에 기록하였습니다.

---

## Logs

업데이트나 프로젝트와 관련된 기록은 [여기](./docs/logs.md)에서 확인해 주세요.

---

## Issues

프로젝트를 하면서 겪은 문제에 관해서는 [여기](./docs/issues.md)에 정리되어 있습니다.
