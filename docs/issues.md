# Issues

[README.md로 돌아가기](../README.md)

## 목차

- [✅-issue-001-탭-페이지-간에-로그인-상태를-어떻게-공유할-수-있을까](#✅-issue-001-탭-페이지-간에-로그인-상태를-어떻게-공유할-수-있을까)
- [❌-issue-002-서버에서-session-데이터를-어떻게-관리할-수-있을까](#❌-issue-002-서버에서-session-데이터를-어떻게-관리할-수-있을까)

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

2. 일단은 `max-age`를 설정하여서 서버측에서도 세션이 일정 시간이 지나면 만료된 세션 데이터임을 알 수 있도록 해보았다. 그런데 _max-age_ 를 설정하면 클라이언트 측에서 세션 쿠키로 인식하지 못했다. _max-age_ 를 가지면 영구적 쿠키가 되어서 브라우저에서 쿠키를 삭제하지 않았다.

3. 아무래도 `session-file-storage`를 사용하는 한계인 것 같다. 실제로는 `Redis`와 같은 _database_ 를 따로 설정한다고 하는데 아무래도 _database_ 측에서 따로 설정을 통해서 세션을 독립적을 삭제하는 것 같다.