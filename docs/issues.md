# Issues

## Convention

✅: 해결이 완료된 이슈<br/>
❌: 미해결 상태로 잠시 보류 중인 이슈<br/>
⭐️: 현재 진행중인 이슈

---

[README.md로 돌아가기](../README.md)

## 목차

- [✅ 001: 탭 페이지 간 로그인 상태 공유](#✅-issue-001-탭-페이지-간에-로그인-상태를-어떻게-공유할-수-있을까)
- [❌ 002: 서버에서 session 관리](#❌-issue-002-서버에서-session-데이터를-어떻게-관리할-수-있을까)
- [⭐️ 003: 컴포넌트에서 데이터 로직 분리하기](#⭐️-issue-003-컴포넌트에서-데이터-로직을-분리해서-설계하기)
- [❌ 004: 대한민국 지역 api와 경기도 지역 코드에서의 문제](#⭐️-issue-004-대한민국-지역-api와-경기도-지역-코드의-문제)
- [✅ 005: axios의 ReturnType 설정하기 ](#✅-issue-005-axios의-return-type-설정하기)
- [✅ 006: tiptap의 자료구조를 json형태로 mysql 서버에 저장하는데 실패](#✅-issue-006-tiptap의-자료구조를-json형태로-mysql-서버에-저장하는데-실패하는-문제)
- [✅ 007: tiptap의 content 수정이 안되는 문제](#✅-issue-007-tiptap의-configuration에서-content-옵션을-수정하기)

---

## ✅ Issue 001: 탭 페이지 간에 로그인 상태를 어떻게 공유할 수 있을까?

1. 네이버는 어떻게 로그인 이후 탭 간에 로그인 상태를 연결할 수 있을까 하는 생각이 들었다. 게다가 브라우저가 종료되지 않더라도 naver 페이지(들)만 꺼지면 자동으로 로그아웃이 되는 것이었다.

2. 일단 떠오르는 건 `cookie, local storage, session storage`를 사용하면 될 것 같다. 그런데 _session storage_ 는 페이지 세션에 한정되므로 탭 간에 상태를 공유하는 것은 불가능하므로 배제되었다.<br/>
   그럼 _cookie_ 나 _local storage_ 를 사용할 수 있을 것 같다.
   local storage는 영구적으로 유지되므로, 수명을 정할 수 있는 cookie에 비해 보안성에서 보다 취약할 것이라고 예상되서 탈락이다.
   **따라서 cookie를 사용해야 할 것 같다.** 하지만 세션 쿠키는 브라우저가 종료되어야만 사라지는데 어떻게 탭이 사라진 것만으로 구현하지...

3. 알고보니 (1)의 전제가 잘못되었다. _"~~게다가 브라우저가 종료되지 않더라도 naver 페이지(들)만 꺼지면 자동으로 로그아웃이 되는 것이었다.~~"_ 는 내가 왜인지 몰라도 잘못 알고 있었던 것이었다. 네이버도 동일하게 브라우저가 종료시에 session cookie가 만료되면서 로그아웃된다.

## ❌ Issue 002: 서버에서 session 데이터를 어떻게 관리할 수 있을까?

1. 세션 쿠키를 연구하는 과정에서 궁금증이 생겼다. 클라이언트 쪽에서는 (단순히 세션 id를 담은 쿠키가 아니라)세션 쿠키가 브라우저의 종료와 함께 삭제되지만 서버측에서는 어떻게 세션 데이터를 삭제할 수 있을까?

2. 일단은 `max-age`를 설정하여서 서버측에서도 세션이 일정 시간이 지나면 만료된 세션 데이터임을 알 수 있도록 해보았다. 그리고 `session-file-store`에 `rolling` 옵션을 적용해서 서버와 통신이 있을 시에 _max-age_ 를 갱신하는 식으로 설정해 두었다. 그런데 _max-age_ 를 설정하면 클라이언트 측에서 세션 쿠키로 인식하지 못했다. _max-age_ 를 가지면 영구적 쿠키가 되어서 브라우저에서 쿠키를 삭제하지 않았다.

3. 아무래도 `session-file-storage`를 사용하는 한계인 것 같다. 실제로는 `Redis`와 같은 _database_ 를 따로 설정한다고 하는데 아무래도 _database_ 측에서 따로 설정을 통해서 세션을 독립적으로 삭제하는 것 같다. oracle의 문서를 보는데 아무래도 db의 자체적인 로직으로 삭제 작업을 수행하는 것처럼 보인다.

## ⭐️ Issue 003: 컴포넌트에서 데이터 로직을 분리해서 설계하기

1. 사실 이게 예전에 `react`에서 사용되던 presenter/container 방식인 것을 알고는 있다. 그러나 컴포넌트가 재사용 가능하다는 점을 생각했을 때, 컴포넌트에서 데이터를 관리하는 로직을 분리시켜야 한다는 생각이 들었다. 이 프로젝트의 경우 최종적으로 _page_ 가 최상위 _container_ 이므로 모든 데이터에 관한 로직을 _page_ 내부에서 관리하는 식으로 진행하고 싶었다.
2. 아니면 차라리 `atomic design`으로 진행을 했어야 했나하는 생각도 든다. 예전에 언뜻 지나가며 공부하기로는 component가 순수하길 바라는 지금의 의도가 _atomic design_ 과 더 어울릴 것 같다는 생각이 든다.
3. 일단은 어렵게 접근하지 말고 차근차근 풀어나가도록 한다. 첫 번째로 state는 _water fall_ 방식으로 다루기로 한 상태에서 여러 가지 방법을 시도해 보기로 했다.
   1. `recoil`과 같이 작은 단위의 데이터를 관리하는 _useState_ 를 여러개 선언해서 관리해보았다. 이 경우 너무 많은 선언이 생기면서 오히려 전체적으로 복잡해졌다.
   2. _useReducer_ 을 사용해보았다. `form`에서 다루는 모든 데이터를 _useReducer_ 로 다루기로 하고 1과는 반대로 모든 데이터를 그 아래에 쑤셔넣었다. 한 곳에서 데이터를 관리하니 마음은 편했지만, 관리나 활용에 어려움이 생길 것 같았다.
   3. state를 _rendering_ 과 _fetch_ 라는 목적에 따라 구분하기로 했다. 일단은 이걸로 만족스럽다. _useState_ 를 사용했는데 굳이 _useReducer_ 를 사용할 정도의 복잡한 로직이 필요 없었기 때문이다.

## ❌ Issue 004: 대한민국 지역 API와 경기도 지역 코드의 문제

1. 경기도는 규모에 비해 '도'로 나눠져 있어서 [해당 API](https://juso.dev/docs/reg-code-api/)에서 분류가 조금 이상하게 작동한다. 수원이나 성남이 대표적인 예시이다. 다른 지역은 모두 '구' 단위로 통일되어서 나타난다면, 수원과 성남, 일산같은 규모가 큰 시는 '시'와 '구' 모두 등장하게 된다.
2. API의 설명에 따르면 `법정동코드는 총 10자리로 구성되어 있으며 오른쪽부터 두자리씩 잘라 분류를 나누고 있`다고 하지만, 실제로는 2, 3, 5의 구성으로 되어있어서 생기는 문제 같기도 하다. 아마 과거에는 2자리씩 실제로 구분했을지도 모르겠지만, 인천의 지역구를 조회하려는 query를 보낼 때 2자리 규칙을 지키면 제대로 된 지역구를 받아오는데 실패한다. 연수구, 미추홀구, 계산구 등이 포함되지 않기 때문이다.
3. client에서는 큰 문제가 지금으로서는 없어 보이지만, server 측에서 DB에 저장할 때 그리고 그 데이터를 fetch할 때 문제가 발생할 것 같다. 경기도 성남시의 코드는 `4113000000`이고 경기도 성남시 분당구는 `4113500000`이지만, 성남시를 조회할 때 성남시 분당구를 포함해서 보여줘야 하는 문제가 발생한다. 그렇다고 세번째와 네번째 자리만을 이용하자니 다른 지역에서 문제가 발생한다. 그리고 경기도의 경우 구단위가 아니라 시단위로 지역 데이터를 받아오므로, 결국에 경기도에 한해서는 별도의 조치가 필요하는 상황은 전혀 변하지 않는다. 이 문제는 어쩔 수 없이 하드 코딩으로 해결해야하나 싶기도 하다.
4. 살펴보니 **경기도 만의 문제가 아니어서** 아무래도 _server_ 쪽에서 처리해야야 할 것 같다. 시군구의 코드를 3자리로 설정하고 조회할 때 시와 구가 같이 나오는 경우, 시의 세번째 자리의 값은 항상 0이므로 이 경우 서버측에서 0-9까지의 값을 모두 포함해서 반환하면 될 것 같기도 하다. 예를 들면 110을 조회하면 110, 111, 112, ... 119까지를 모두 포함해서 반환하는 셈이다.
5. 최후의 방법으로는 내가 지역 DB를 자체적으로 만들어서 관리하는 방법도 있을 것 같다.

## ✅ Issue 005: Axios의 Return Type 설정하기

1. Axios의 반환값을 설정하는 방법을 자꾸만 잊는 바람에 쓸데없이 시간을 낭비하게 된다.
2. Axios의 반환값은 Generic을 통해서 설정한ㄱ다. 가령 `const result = await axios.post<T>(url,{})`와 같은 식이다. 이때 T로 예시를 든 Generic에 들어가는 값은 `result={...,data:T}`로 설정된다. 따라서 T를 `interface { data:{} }`까지 설정할 필요는 없다. 그럼에도 나는 자꾸만 data까지 설정하려고 해서 문제가 발생한다. 유의할 것!
3. Post를 DB에서 받아오는 과정에서도 `map 함수를 사용할 수 없다`는 경고메세지가 뜨는데 왜 이럴까 싶었다. useEffect가 문제일까 싶어서(괜히 모든 문제는 여기일 것 같다) 들여다 봤지만, 독립적으로 작동하는 useEffect가 서로 충돌할 리도 없을 터였다. 다시 보니까 어이없게도 Object를 posts state에 넣어두고는 map을 쓰려고 해서 생긴 문제였다.

## ✅ Issue 006: tiptap의 자료구조를 JSON형태로 MySQL 서버에 저장하는데 실패하는 문제

1. `tiptap`으로 작성한 게시글의 내용을 tiptap의 고유한 데이터 타입으로 MySQL에 저장하고, 다시 불러와 게시글로 보여주려고 했다. tiptap에서 자체적으로 DOM의 자료구조를 반환하는 메서드를 제공하므로 그걸 활용하고자 했다. `getJson()`을 사용하면 JSON 형식으로 자료구조를 받아 MySQL에 저장하면 되는 아주 간단한 문제라고 생각했다.
2. 먼저 MySQL에서 JSON 형식을 제공하는 지 찾아보았다. 블로그들을 보니 JSON 타입으로 저장이 가능하다고 한다. 실제로 Workbench에서 테이블의 컬럼 타입을 선택하는 칸에 JSON을 선택할 수 있었다. 그럼 문제가 간단해졌다. 바로 서버측으로 데이터를 보내서 저장하게끔 하였다. 그런데 계속 _syntax error_ 가 발생했다.
3. 결국 stackoverflow와 여러 블로그들을 뒤져보고 그 결과를 대입해 보아도 문제가 사라지지 않았다.
   1. 처음에는 SQL 문법에 문제가 있는 줄 알았다.(따지고 보면 이게 정답이었다). 문법을 고치고 escape로 쓰이는 `?`도 도입해 보았다.
   2. 이상하게도 workbench에서는 제대로 동작했다.
4. 정말 오랫동안 검색과 검색을 끝마친 후에 이에 대해서 설명해 주는 블로그를 찾았다. 결론은 아직 mysql2가 json형식을 제공하지 않는다는 것이었다. 최신 MySQL은 JSON 형식을 제공하지만, mysql(package)에서는 아직 제공하지 않는 모양이었다. 이후에 오류를 다시보니 버전을 확인하라고 써있었다. 알고 있었지만 그럴리가 없다고 생각했기 때문에 확인조차 하지 않은 것이었다. 결국 JSON을 TEXT로 대신하니 제대로 작동하였다.
5. 참고 : [Node.js : Sequelize Mysql 버전이 json타입을 지원하지 않을 때](https://uju-tech.tistory.com/48)

## ✅ Issue 007: tiptap의 configuration에서 content 옵션이 수정 안되는 문제

1. MySQL 서버에 저장된 tiptap의 content 자료구조를 서버측에서 받아와, `Post.tsx`에서도 tiptap을 활용해보고자 했다.
2. 그런데 useEffect를 사용해 서버측에서 response를 받아 content를 갱신해보려 했지만 뜻대로 되지 않았다.
   1. 일단 editor configuration의 content 옵션에는 임의의 값을 설정하려고 했다. 그 후 useState를 통해서 관리되는 content의 값을 useEffect를 통해 서버측에서 받아온 값으로 업데이트 하려고 했다.
   2. 그런데 예상과는 달리 콘텐츠의 수정이 불가능 했다. 아무래도 useEditor를 호출하면서 이미 고정된 값으로 content가 정해지는 것 같았다.
   3. 이후에 documentation을 뒤져서 content를 수정하는 method(`editor.command.insertContent()`)를 찾았다.
   4. 이를 활용해서 Content 데이터를 받아온다면 useEffect에서 수정하도록 하였다.
3. 또 다른 방법이 있다.
   1. 아예 PostContainer을 만들어서 Post를 반환하도록 하였다.
   2. Container에서 useEffect를 사용하여 Content 타입의 데이터를 받아와서 Post로 넘겨주는 식으로 만들었다.
4. 둘 다 제대로 작동했다. 처음에는 굳이 컴포넌트를 두개로 나눌 필요 없는 2번 방법이 좋다고 생각했다. 그런데 아무래도 로우레벨 API를 사용하는 2번 방법 보다는 3번이 보다 협엽과 이후의 수정을 생각한다면 좋을 것 같다고 느꼈다.

```tsx
// 2번 방법
function Post() {
  const { id } = useParams<{ id: string }>();

  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
    content: "",
  });

  useEffect(() => {
    async function init() {
      try {
        if (!editor) return;
        const { data } = await axios.post<AxiosReturn>(`/missing/post/${id}`);
        editor.commands.clearContent();
        editor.commands.insertContent(JSON.parse(data.json));
      } catch (err) {}
    }
    init();
  }, [id, editor]);

  return <EditorContent editor={editor} />;
}
// 3번 방법
function Post() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<Content>(null);

  useEffect(() => {
    async function init() {
      try {
        const { data } = await axios.post<AxiosReturn>(`/missing/post/${id}`);
        setContent((prev) => JSON.parse(data.json));
      } catch (err) {}
    }
    init();
  }, [id]);

  if (content === null) return null;
  return <PostInner content={content} />;
}

function PostInner({ content }: { content: Content }) {
  const editor = useEditor({
    extensions: [StarterKit],
    editable: true,
    content,
    onCreate({ editor }) {
      editor.setOptions();
    },
  });
  if (content === null) return <div>Loading</div>;
  return <EditorContent editor={editor} />;
}
```

### 참고

- https://tiptap.dev/guide/output#listening-for-changes
- https://tiptap.dev/api/events
