# 가위바위보

+ 리액트 라이프사이클 소개
+ setInterval과 라이프사이클 연동하기
+ 가위바위보 게임 만들기
+ 고차 함수와 Q&amp;A
+ Hooks와 useEffect
+ 클래스와 Hooks 라이프사이클 비교

## 리액트 라이프사이클 소개

componentDidMount(){} : 컴포넌트가 첫 렌더링된 후
conponentDidUpdate(){} : 리 렌더링 후
componentWillUnmount(){} : 컴포넌트가 제거되기 직전 

클래스의 경우 순서
constroctor -> render [렌 더링] -> ref -> componentDidMount()
-> 화면 -> setState/props 바뀔 때 -> shouldComponentUpdate(true) -> render[리 렌더링]-> conponentDidUpdate()
-> 부모가 나를 없앴을 때 -> componentWillUnmount() -> 소멸
 
## setInterval과 라이프사이클 연동하기

componentDidMount(){} -> 비동기 요청을 많이 한다.

componentWillUnmount(){} -> 비동기 요청 정리를 많이 한다.