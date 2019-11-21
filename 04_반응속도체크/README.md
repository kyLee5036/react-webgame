# 반응속도체크


+ [React 조건문](#React-조건문)
+ [setTimeout 넣어 반응속도 체크](#setTimeout-넣어-반응속도-체크)
+ [성능 체크하기](#성능-체크하기)
+ [반응속도체크 Hooks 전환](#반응속도체크-Hooks-전환)
+ [useState, useRef의 차이점](#useState,-useRef의-차이점)

## React 조건문

render(JSX에서는)안 에서는 for문, if문을 사용할 수 없다. 쓸 수 있는 방법은 있는데, 지저분해진다. <br>

## 조건문 사용방법
<strong>빈 배열</strong> 경우에는 합계, 평균 구할 수 없다. 그래서 div태그를 안 보여주게한다.
```javascript
<div>average time : {this.state.result.reduce((a,c) => a + c / this.state.result.length )}ms</div>
```
false, undefined, null은 jsx에서 태그없음을 의미한다.
리액트에서의 조건문 사용하는 방법 (삼항 연산자를 사용한다.)

```javascript
{this.state.result.length === 0 
    ? null
    : <>
    <div>average time : {this.state.result.reduce((a,c) => a + c / this.state.result.length )}ms</div>
    }
    </>  
```

함수를 사용하는 경우도 있다.

```javascript
renderAverge = () => {
    this.state.result.length === 0 
    ? null
    : <>
    <div>average time : {this.state.result.reduce((a,c) => a + c / this.state.result.length )}ms</div>
    }
    </> 
  }

 render() {
    return (
      <>
        {this.renderAverge()}  
      </>
    )
  }
```
## setTimeout 넣어 반응속도 체크

## 성능 체크하기


성능체크 할 때에는 console.log()를 찍어서 확인해봐야 한다. <br>
console.log()해서 input의 입력창에 입력하면 입력한 만큼 출력이 나온다. 결국에는, 한 번 사용할 것을 계속 사용하기 때문에 문제가 된다. <br>
해결하기위해서는 useEffect를 배워야한다음에 useMemo, useCallback을 사용해야한다.. (나중에 배움) <br>


## 반응속도체크 Hooks 전환

여기서 <strong>Class</strong>에서는 setTimeout, Interval은 <strong>this</strong>를 사용한다. 
```javascript
setTimeout(() => {
  this.setState({
    state: 'now',
    message: '지금 출력',
  });
},

```

하지만, Hooks랑 방식이 다르다.
```javascript
import React, {useState, useRef} from 'react';

const timeout = useRef(null);
const startTime = useRef(0);
const endTime = useRef(0);

timeout.current = setTimeout(() => {
  setState('now');
  setMessage('지금 클릭');
  startTime.current = new Date();
}, 
...이하생략
```
Hooks에서 setTimeout, Interval을 사용할 때에는 <strong>useRef</strong>를 사용해야한다. <br>
<strong>Hooks</strong>에서 <strong>useRef</strong>로 표현한다. <strong>Class</strong>에서는 <strong>this</strong>로 표현한다. (추가적인 기능이라고 보면된다.)
그리고 useRef사용하기때문에 <strong>cureent</strong>를 <strong>반드시</strong> 사용해줘야한다. 

## <strong>useState</strong>, <strong>useRef</strong>의 차이점
<strong>useState</strong>를 하면 return부분이 다시 실행되지만, <br>
<strong>useRef</strong>를 사용하면 return부분이 다시 실행되지 않는다. <br>
결론적으로 말해본다면, <strong>반드시 불필요한 렌더링을 막아야한다</strong>.<br>
예시로, setInterval하는데 화면이 자주 바뀌는 것은 있을 수 없는 일이다!!!<br>
<strong>useState</strong>는 화면이 바뀌면 return부분이 다시 렌더링이 된다. <br>
여기서, 만약 값이 바껴도 렌더링 다시 하고 싶지않을 때에는 <strong>useRef</strong>를 사용하면된다.<br><br>
결국에는, <strong>useRef</strong>에는 값이 바뀌기도 하고, 화면에 영향이 미치지 않고 싶을때 사용한다. (화면이 바뀌지 않고, 값이 자주 변경될 때)<br>

```javascript 
const timeout = useRef(null);
const startTime = useRef(0);

timeout.current = setTimeout(() => {
  setState('now');
  setMessage('지금 클릭');
  startTime.current = new Date();

...이하생략
```

여기서 <strong>timeout.current</strong>는 <strong>useRef</strong>로 대입 하는 걸로 렌더링이 되지않는다. (값만 변하는 중이다.)<br>
하지만, <strong>setState</strong>하는 순간 렌더링이 된다.<br>

<strong>setTimeout</strong>, <strong>setInterval</strong>는 <strong>useRef</strong>를 사용한다. (화면이 바뀌지 않고, 값이 자주 변경될 때 )
화면을 바뀌는 것을 하고싶지 않고, 값이 바뀌는 것을 사용할 때에는 <strong>useRef</strong>를 한다.

### <strong>useRef</strong>는 <strong>무조건 current로 접근</strong>해야한다!!! current안하면 값이 제대로 안 나온다.



