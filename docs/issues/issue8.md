# Issue 008: Dependent한 데이터를 관리하기

[파일 구조](../images/issue8-data-structure.png)

(1)
`SearchForm`으로 명명한 component가 있다.
이 컴포넌트는 크게 `Items`와 `Selected` 상태를 다루어 컴포넌트를 렌더링 한다.
각각의 상태는 `pet, sido, sigungu`로 세분화된 데이터를 가지고 있다.

(2)
특이한 사실은 Items에서 sigungu 데이터가 처음 데이터를 가져오는 과정,
그리고 Selected에서 sigungu의 데이터가 변하는 과정에서 일정부분
sido에 의존하고 있다는 사실이다.

(3)
그 결과 데이터를 fetching하는 과정이 복잡해지고
`Select` 컴포넌트에서 경고가 발생하는 원인이 되었다.

(4)
Select 컴포넌트가 작동하는 방식을 설명하기 이전에
Items > sigungu 데이터를 페칭하는 과정을 미리 설명하려고 한다.
Items > sigungu는 selcted > sido에 의존한다.
sido가 선택되면 api를 통해서 데이터를 그때그때 fetch한다.

(5)
프로젝트에서는 MUI에서 제공하는 `<Select>`를 사용한다.
`<Select>`와 HTLMSelectElement는 value를 attribute로 갖고 있으며, change event를 통해서 이 값을 수정할 수 있다.

(6)
다시 경고가 발생하는 이유로 돌아와 보자.
아쉽게도 경고를 찍어놓은 화면이 없지만 경고를 요약하자면 이런 말이 었다.

> sigungu Select에서 현재 갖고 있는 Option에 해당되지 않는 값이 value의 값으로 설정되어 있습니다.

(7)
구현하고자 하는 점은

1.  유저가 `<option>`으로 렌더링된 Items > sido 중 하나를 고르면, Selected > sido가 새롭게 설정된다.
2.  그 다음 Items > sido를 감싸서 렌더링 하는 `<Select>`의 value 값이 변화한다.
3.  Selected > sido가 새롭게 설정되었으므로, 총괄적으로 데이터를 다루고 있는 Board의 차원에서 Selected > sigungu 역시 null로 초기화 된다.
4.  Items > sigungu를 렌더링하는 `<Select>`의 value를 수정한다.

(8)
문제는 4까지 플로우가 진행되지 않는다는 사실이다. sido의 `<Select>`는 change event를 통해서 직접적으로 value의 값이 변한다. 반면 sigungu의 `<Select>`는 change event가 발생하지 않았다. 따라서 Selected > sigungu의 값은 변화되었더라도 sido의 `<Select>`의 value의 값은 그대로 유지된다.

## 해결방법

몇가지 해결 방법이 있다.

### 기획단계에서의 수정

- 가장 손쉬운 방법이라고 생각한다. 다른 사이트를 참고했을 때 시군구까지는 데이터로 다루지 않는 점에서 착안했다. 따라서 시/군/구를 아예 다루지 않는다.

### sigungu 또한 전역 데이터로 다루기

- sido의 경우 많은 양이 아니기 때문에 api를 통해서 그때 그때 데이터를 받아오기 보다는 전역 데이터로 미리 값을 하드코딩 해 두었다. 마찬가지로 sigungu또한 전역 데이터로 통해서 관리한다면, fetch 로직을 삭제할 수 있다. 또한 데이터를 wate-fall로 전달할 필요가 없으므로 훨씬 데이터의 관리가 쉬워진다.

### useContext, createContext를 사용하기

- 별도의 패키지가 필요 없다는 점에서 처음에는 괜찮아 보였다. 그러나 Selected와 Items가 Board의 지역 변수로 선언되어 있다는 점을 생각했을 때 useContext를 사용할 수 없다. export가 불가능하기 때문이다. 만약 prop을 통해 water-fall 방식으로 넘긴다면 지금과 별 차이가 없기 때문에 실패.

## 결론

일단은 빠른 해결을 위해서 *기획 단계에서 수정*하기로 했다. 이후에 필요에 따라서 전역 데이터로서의 방법을 생각해 보기로 했다.
