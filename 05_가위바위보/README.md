# 가위바위보

+ [리액트 라이프사이클 소개](#리액트-라이프사이클-소개)
+ [setInterval과 라이프사이클 연동하기](#setInterval과-라이프사이클-연동하기)
+ [가위바위보 게임 만들기](#가위바위보-게임-만들기)
+ [고차 함수와 Q&amp;A](#고차-함수와-Q&amp;A)
+ [고차 함수에서의 에러](#고차-함수에서의-에러)
+ [Hooks와 useEffect](#Hooks와-useEffect)
+ [클래스와 Hooks 라이프사이클 비교](#클래스와-Hooks-라이프사이클-비교)

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
비동기 요청 정리를 많이 한다.
```javascript
componentWillUnmount(){ // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 한다.

} 
```

### 클래스의 경우 순서 (다시 말하지만, Hooks랑 하는 방식이 다르다.)

1. constructor(class안에서 일어난다. 보통 constructor는 생략을 한다. 코드보면 알 수 있음.) 
2. [렌더링] : render(){  {}에서 뭔가가 일어난다 !!! }  
3. ref설정 한 부분, 예시) <input> input안에서 ref={this.inputRef} 설정 한 부분
4. 렌더링 시작한다.
5. 화면이 보인다 .
6. componentDidMount() 실행한다.
7. setState/props 바뀔 경우에는 <strong>8번</strong>이 시작한다. 
8. shouldComponentUpdate(nextprops, nextState, nextContent) <br>{return true}<br> 리턴이 true가 될 때 (false경우에는 리 렌더링이 안 일어난다.) 
9. render[리 렌더링] 일어난다 
10. 리렌더 링 후에는 conponentDidUpdate()가 실행된다.
11. 부모(부모 컴포넌트)가 나(자식 컴포넌트)를 없앴을 때 componentWillUnmount() 
12. 소멸


 
## setInterval과 라이프사이클 연동하기

componentDidMount(){} -> 비동기 요청을 많이 한다.<br>
componentWillUnmount(){} -> 비동기 요청 <strong>정리</strong>를 많이 한다.<br>


```javascript
componentDidMount(){
    setInterval( () => {
        console.log('aaa');
    }, 1000)
} 
```
#### 문제점 : <br>
> 먼저, setInterval에서의 1000의 의미는 일정시간 1초마다 반복작업 계속 해준다.<br>
> 여기서 문제는 컴포넌트가 사라져야하는데 setInterval 실행 취소를 안 해주는 것이 문제이다. (리액트가 그렇게 똑똑하지 않다.)<br>
> 예로 들면, 웹사이트 껐는데 setInterval로 인해 계속 실행이 된다. 그리고 다시 웹 사이트를 키면, 기존의 있던 setInterval이랑 추가된 setInterval이 2개가 있다.<br>
> 결국에는 setInterval를 없애지않으면 setInterval가 자꾸 생겨서 메모리가 차다가 터진다. 이걸 <strong>메모리 누수</strong>라고한다.<br>

### 해결방안 : (componentDidMount, componentWillUnmount)를 사용할 경우
```javascript
interval; // interval 변수 설정을 해준다.
componentDidMount(){
    this.interval = setInterval( () => { // 변수 안에다가 setInterval를 사용한다.
        console.log('aaa');
    }, 1000)
} 

componentWillUnmount(){ // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 한다.
    clearInterval(this.interval) // clearInterval를 사용해서 setInterval를 삭제한다
} 

```
#### 해결방안<br>
> <strong>메모리 누수를 해결</strong>하기 위해서는 완료되지 않은 비동기는 <strong>componentWillUnmount를 사용</strong>해서 처리를 해야한다.<br>
setInterval, setTimeout은 메모리라고 해도 무방하다.<br>
> <strong>componentWillUnmount()</strong>를 사용하는 것만으로도 안되고, <strong>clearInterval(사용했던 변수)도 같이 사용</strong>해준다.<br>
(componentWillUnmount, clearInterval같이 사용)<br>
componentDidMount(), componentWillUnmount()는 서로 짝이되어서 동작해야한다.<br>


### 자바스크립트 클로저 문재해결

여기 코드에서 <strong>클로저 문제</strong>가 있다.<br>
> <strong>비동기 함수 바깥에 변수를 참조</strong>하면 <strong>클로저</strong>가 발생한다. 항상 조심해야한다. 자바스크립트쪽에 지식이다.<br>

```javascript
componentDidMount() { 
    // const {imgCoord} = this.state; 여기에 설정되어 있었는데 클로저 문제로인해서 setInterval안에 넣어주었다.
    this.interval = setInterval(() => {
        // 클로저 문제때문에 interval 밑에 가야한다. (자바스크립트 문제임.)
        const {imgCoord} = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            });
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    }, 1000)
}

```

## 가위바위보 게임 만들기

#### RSPClass.jsx 참조


## 고차 함수와 Q&amp;A

메서드에 함수를 호출하는 부분 

바꾸기 <strong>전</strong> 모습

```javascript
<button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
<button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
<button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
```

```javascript
onClickBtn = (choice) => {
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    ...내용생략
};

```

바꾸고 난 <strong>후</strong>에 모습 : ()을 삭제한다.<br>
```javascript
<button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
<button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
<button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
```

```javascript
onClickBtn = (choice) => () => {
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    ...내용생략
};

```
() => 를 한개 더 추가를 해줘야한다.<br>


<strong>매개변수</strong>가 있을 경우에는 (바꾸기 <strong>전</strong>에 모습)
```javascript
<button id="rock" className="btn" onClick={(매개변수) => this.onClickBtn('바위')}>바위</button>
```


```javascript
onClickBtn = (choice) => {
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    ...내용생략
};
```


<strong>매개변수</strong>가 있을 경우에는 (바꾸기 <strong>후</strong>에 모습) : ()을 삭제한다.

```javascript
<button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
```

```javascript
onClickBtn = (choice) => (매개변수) => {
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    ...내용생략
};
```

(매개변수) => 를 한개 더 추가를 해줘야한다. (매개변수도 같이 추가해줘야한다.)
### 즉, 함수를 연달아 사용한다.

## 고차 함수에서의 에러

함수 컴포넌트에서는 

```jsx
...생략

const onClickBtn = (chooice) => {
 ...내용생략
}

return (
<>
    <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
    <div>
    <button id="id" className="btn" onClick={onClickBtn('바위')}>바위</button>
    <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
    <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
    </div>
</>
);

```
이 상태로 사용한다면, 

> Too many re-renders. React limits the number of renders to prevent an infinite loop.


해결하기 위해서는 
```jsx
const onClickBtn = (chooice) => () => {

}
```
위에 <strong>(  )</strong>를 추가하였더니 에러가 사라졌다.


클래스 컴포넌트에서의 에러내용은 

> Uncaught Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.


둘 다 보면 공통점인게 <strong>React limits the number of nested updates to prevent infinite loops.</strong>가 있다.
아무래도 렌더링하면서 무한루프를 맴돌고 있고 때문이다. 
그래서 고차함수에서 해결하는 방법도 있을 것이다. 

## Hooks와 useEffect

```javascript 
import React, {useEffect} from 'react';
```

Hooks는 라이프사이클이 없는데 흉내를 낼 수 있다. 그것이 <strong>useEffect</strong>이다.<br>

componentDidMount() { }<br>
componentWillUnmount() { }<br>
에서는 Hooks에 사용을 못한다.<br>

라이플사이클을 대체한다.<br>


```javascript
// componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
useEffect(() => { 
    return () => { // componentWillUnmount의 역할을 한다.
    }
}, []); // 빈 배열로 일단 생성을 한다. 클로저 실수해서 일어났을 때, 두 번째 인수가 해결해주는 역할을 한다.
```
두 번째 인수 배열에 넣은 값(예제에서는 imgCoord)들이 바뀔 때 useEffect가 실행된다. <br>
함수형은 렌더링할 때 통째로 다시 실행한다. <br>
1대1 대응은 아님의 의미<br>

```javascript
useEffect(() => { 
    console.log('다시 실행');
    interval.current = setInterval(changeHand, 100);
    return () => { // 
        console.log('종료');
        clearInterval(interval.current);
    }
}, [imgCoord]); // 클로저 문제를 해결하기위해 적어줘야 한다.
```
### 설명중요!!!
콘솔창에 보면 실행 -> 「다시 실행, 종료」무한반복해서 이상할텐데, 이상한게 아니다.<br>
componentDidMount가 아니라 useEffect에서는 두번쨰 배열(이미지 코드:imgCoord)가 바뀔 떄마다 전체부분(useEffect)이 다시 실행된다. <br>
즉, 매번 clearInterval을 하기 떄문에 그냥 setTimeout을 하는 것과 동일하다.<br>
윗 줄 보충설명) 즉, setInterval을 실행했다가 clearInterval로 setInterval을 종료시킨다.<br><br>

그렇다면, 배열을 없애면 어떻게 될까? 처음에만 실행하고 <strong>다시 실행되지 않는다.</strong><br>
```javascript
useEffect(() => { 
    console.log('다시 실행');
    interval.current = setInterval(changeHand, 100);
    return () => { // 
        console.log('종료');
        clearInterval(interval.current);
    }
}, []); 
```
한 번만 실행되고, 실행되지 않는다.<br>
cf) 참조하고싶으면, 배열에 여러 개 넣어줄 수도 있다. <br>
useEffect를 여러번 사용할 수있다.<br>
<strong>배열에는 !꼭! useEffect를 다시 실행할 값만 넣어야 한다.</strong> 이렇게 안 할경우에는 동작이 이상해진다.<br>
배열안에 : }, [imgCoord]); imgCoord말고 score, result를 넣어서 확인해보면 안다.

이해가 안되면 코드를 외우는게 좋을 수도 있다. <br>


## 클래스와 Hooks 라이프사이클 비교

class의 경우 componentDidMount나 ComponentDidUpdate에서 모든 state를 조건문으로 분기 처리한다.


### 클래스랑 Hooks의 라이플사이클 견해.
|class인 견해|result|imgCoord|score|
|:---:|:---:|:---:|:---:|
|**ComponentDidMount**||||
|**ComponentDidUpdate**||||
|**ComponentWillUnmont**||||

> ComponentDidMount(ComponentDidUpdate, ComponentWillUnmont)가 result, imgCoord, score을 한 꺼번에 사용(처리)을 할 수 있다.

|hooks인 견해|ComponentDidMount|ComponentDidUpdate|ComponentWillUnmont|
|:---:|:---:|:---:|:---:|
|**result**||||
|**imgCoord**||||
|**score**||||

> result하나가 ComponentDidMount, ComponentDidUpdate, ComponentWillUnmont를 useEffect안에서 사용(처리)을 할 수 있다.
              

#### 보충설명
class인 경우

> ComponentDidMount안에 setState를 사용해서 imgCoord, score, result를 한 번에 이용할 수 있다. <br> ComponentDidUpdate, ComponentWillUnmont에도 동일 (단, 코드의 기능에 따라 전부 안 넣어 줄 수도 있다.)
```javascript
ComponentDidMount() {
    this.setState({
        imgCoord: 3,
        score: 1,
        result: 2
    })
}
```

Hooks인 경우

> useEffect를 사용하고, 배열 안 인수에 따라 사용할 수 있는 ImgCoord, Score, result가 바뀐다. <br>(배열 안에 인수가 하나일 수도있고, 없을수도 있고, 여러개 일수도 있다.)
```javascript
useEffect(() => {
    setImgCoord();
    setScore();
}, [imgCoord, score]);

useEffect(() => {
    setImgCoord();
    setResult();
}, [result]);
```
