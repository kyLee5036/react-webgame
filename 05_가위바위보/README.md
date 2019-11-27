# 가위바위보

+ [리액트 라이프사이클 소개](#리액트-라이프사이클-소개)
+ setInterval과 라이프사이클 연동하기
+ 가위바위보 게임 만들기
+ 고차 함수와 Q&amp;A
+ Hooks와 useEffect
+ 클래스와 Hooks 라이프사이클 비교

## 리액트 라이프사이클 소개

### componentDidMount, conponentDidUpdate, componentWillUnmount

```javascript 
componentDidMount() { }
componentDidUpdate() { }
componentWillUnmount() { }
```

컴포넌트에 일생들을 라이프사이클이라고 불러진다.<br>
setInterval, clearInterval에서 <strong>Hooks만들 때 더 주의</strong>있게 해야한다.<br>

##### componentDidMount
렌더가 처음 실행되고 componentDidMount()가 실행된다.<br>
리렌더링 할 때에는 다시 나타나지 않는다. <strong>처음에만 나온다!!!(2번이상 나오지 않는다.)</strong><br>
```javascript
componentDidMount(){ // 컴포넌트가 첫 렌더링된 후

} 
```
##### conponentDidUpdate
```javascript
conponentDidUpdate(){ // 리 렌더링 후

} 
```
##### componentWillUnmount
부모가 나의 컴포넌트 없앴을 때에도 사용된다.<br>
componentDidMount()가 실행했던 것을 제거한다.<br>
```javascript
componentWillUnmount(){ // 컴포넌트가 제거되기 직전

} 
```

### 클래스의 경우 순서 (다시 말하지만, Hooks랑 하는 방식이 다르다.)

1. constructor(class안에서 일어난다. 보통 constructor는 생략을 한다. 코드보면 알 수 있음.) 
2. [렌더링] : render(){  {}에서 뭔가가 일어난다 !!! }  
3. ref설정 한 부분, 예시) <input> input안에서 ref={this.inputRef} 설정 한 부분
4. 렌더링 시작한다.
5. 화면이 보인다 .
6. componentDidMount() 실행한다.
7. setState/props 바뀔 경우에는 <strong>8</strong>이 시작한다. 
8. shouldComponentUpdate(nextprops, nextState, nextContent) <br>{return true}<br> 리턴이 true가 될 때 (false경우에는 리 렌더링이 안 일어난다.) 
9. render[리 렌더링] 일어난다 
10. 리렌더 링 후에는 conponentDidUpdate()가 실행된다.
11. 부모(부모 컴포넌트)가 나(자식 컴포넌트)를 없앴을 때 componentWillUnmount() 
12. 소멸


 
## setInterval과 라이프사이클 연동하기

componentDidMount(){} -> 비동기 요청을 많이 한다.

componentWillUnmount(){} -> 비동기 요청 정리를 많이 한다.