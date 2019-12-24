# 로또추첨기

+ [로또 추첨기 컴포넌트](#로또-추첨기-컴포넌트)
+ [SetTimeout 여러 번 사용하기](#SetTimeout-여러-번-사용하기)
+ [ComponentdidUpdate](#ComponentdidUpdate)
+ [useEffect로 업데이트 감지하기](#useEffect로-업데이트-감지하기)
+ [useMemo와 useCallback](#useMemo와-useCallback)
+ [Hooks에 대한 자잘한 팁들](#Hooks에-대한-자잘한-팁들)


## 로또 추첨기 컴포넌트

지난 시간에 setInterval을 반드시 정해진 곳에서 사용해야 하나? <br>
정해진 곳에 안써도 된다. 하지만 쓰고나면 정리를 해줘야한다. <br>
useEffect에서 쓰지도 않아도 된다. <br>
클래스에서는 setInterval을 사용하고, componentWillUnmount에 반드시 정리해줘야한다. <br><br>

#### LottoClass.jsx
```js
const getWinNumber = () => {
    console.log('getWinNumbers');
}
```
console.log 하는 이유는 실행 몇번하는지 확인하기 위해서

#### LottoClass.jsx
```js
state = {
  winNumbers: getWinNumbers(), // 당첨 숫자들
  winBalls: [], // 당첨 숫자들은 여기 winBalls에 넣어준다.
  bonus: null, // 보너스 공
  redo: false, // 재 실행하기 위한 것
}

timeouts = [] // setTimeout를 여기 안에 담을 것임
```

#### Ball.jsx

Ball.jsx에 밑에보면 Hooks인가? 아닌가?

```js
import React from 'react';

const Ball = React.memo(({ number }) => {
...생략
```

> <strong>Hooks가 아니다.</strong>

```js
import React from 'react';

const Ball = React.memo(({ number }) => {
...생략

```
> 여기에서 보면, useState, useEffect가 없기때문이다. 그러기떄문에 <strong>함수컴포넌트</strong>라고한다. <br><strong>useState, useEffect등이 있어야만</strong> Hooks라고 한다.

그러면 뭐라고 부를까 ??
> <strong>고차컴포넌트</strong>라고한다.


## SetTimeout 여러 번 사용하기

시작하자마 실행하기 위해서는 componentDidMount()를 사용한다.

```js
componentDidMount() {
  console.log('didMount');
  this.runTimeouts();
  console.log('로또 숫자를 생성합니다.');
}
```

> Tip) <strong>let을 사용하면 클로저문제가 안 생긴다.</strong> es6에 오면 편해진 기능이다. <br>

#### Lottoclass.jsx
```js
timeouts = [];// 선언해주는 거 잊지말기!

runTimeouts = () => {
  console.log('runTimeouts');
  const { winNumbers } = this.state;
  for (let i = 0; i < winNumbers.length - 1; i++) {
    this.timeouts[i] = setTimeout(() => {
      this.setState((prevState) => {
        return {
          winBalls: [...prevState.winBalls, winNumbers[i]],
        };
      });
    }, (i + 1) * 1000);
  }
  ...생략
}
       
```
코드 설명 : <br>
winball의 숫자들을 넣어준다. <br>
react에서 배열에 값을 넣을 떄에는 push가 아니라 예전 prevState를 사용해서 값을 넣어준다. <br>


#### Lottoclass.jsx
```js
// ...생략했던 내용임
this.timeouts[6] = setTimeout(() => {
  this.setState({
    bonus: winNumbers[6],
    redo: true,
  });
}, 7000);
```
코드 설명 : <br>
"redo: true"를 써주는 이유는 마지막 번호가 나오면 true이 되어서 버튼을 보여주기 위해서 사용한다.<br>
그전까지 안 보여준다. <br>

setTimeout와 같은 것(setInterval)을 쓸 때 주의점!<br>
부모 컴포넌트는 자식 컴포넌트 없앨 수가 있다. 하지만, 여기서 setTimout을 항상 클리어를 해줘야한다. <br>
내가 원치 않은데 컴포넌트가 사라질 경우에는 클리어를 안해줘서 의도치 않은 문제가 생기는 거다. <br>
그리고, 클리어를 안해주면 메모리 상에 setTimout, setInterval가 계속 실행이 된다. 결국엔 메모리 누수현상이 얼어난다. 
그러고 나서 this.state에서 문제가 생겨서 에러메세지가 나온다.<br>
결국엔 componentWillUnmount를 사용해서 마지막까지 정리를 해줘야한다. <br>

```JS
componentDidMount() {
  console.log('didMount');
  this.runTimeouts();
  console.log('로또 숫자를 생성합니다.');
}

componentWillUnmount() {
  // 혹시나 setTimeout이 실행되지 않았는데 componentWillUnmount()가 발생할 수 있기때문에 this.timeouts.forEach를 사용해줬다.
  this.timeouts.forEach((v) => {
    // 마지막까지 정리를 해줘야한다.
    clearTimeout(v);
  });
}
```
> componentWillUnmount() {}를 꼼꼼하게 해줘야한다!! <br>
setInterval와 같은 경우에는 더더욱 주의를 해야한다.

브라우저 껐을 경우에는 완전히 종료된다. 그래서 componentWillUnmount()가 발생 안한다. <br>
<strong>여기서는 브라우저 끄지 않았을 때 생각</strong>하고, 부모컴포넌트가 자식컴포넌트를 없앴다고 생각해야 한다. <br>
항상 componentWillUnmount()에서 clearTimeout를 해주자!!! <br>
뭐든 생각하기 귀찮으면 componentWillUnmount를 해주는것만 잊지말기!!!<br>

## ComponentdidUpdate

결국에는 리액트에서 직접 dom을 건드는게 하나도 없다. state만 바꿔서 저절로 바꾸게한다.<br> 
state가 즉, 데이터만 바꿔준다 -> 이게 리액트에 장점이다.

#### 수정하기 전
```js
componentDidMount() {
  console.log('didMount');
  runTimeouts = () => {
      console.log('runTimeouts');
      const { winNumbers } = this.state;
      for (let i = 0; i < winNumbers.length - 1; i++) {
        this.timeouts[i] = setTimeout(() => {
          this.setState((prevState) => {
            return {
                // winball의 숫자들을 넣어준다. react에서 배열에 값을 넣을 떄에는 push가 아니라 예전 prevState를 사용해서 값을 넣어준다. 
              winBalls: [...prevState.winBalls, winNumbers[i]],
            };
          });
        }, (i + 1) * 1000);
      }
      // 보너스공
      this.timeouts[6] = setTimeout(() => {
        this.setState({
          bonus: winNumbers[6],
          redo: true,
        });
      }, 7000);
  };
  console.log('로또 숫자를 생성합니다.');
}
```

#### 수정하기 후 (runTimeouts를 메서드를 만들어줘서 메서드만 불러준다.)
```js
runTimeouts = () => {
  console.log('runTimeouts');
  const { winNumbers } = this.state;
  for (let i = 0; i < winNumbers.length - 1; i++) {
    this.timeouts[i] = setTimeout(() => {
      this.setState((prevState) => {
        return {
            // winball의 숫자들을 넣어준다. react에서 배열에 값을 넣을 떄에는 push가 아니라 예전 prevState를 사용해서 값을 넣어준다. 
          winBalls: [...prevState.winBalls, winNumbers[i]],
        };
      });
    }, (i + 1) * 1000);
  }
  // 보너스공
  this.timeouts[6] = setTimeout(() => {
    this.setState({
      bonus: winNumbers[6],
      redo: true,
    });
  }, 7000);
};

componentDidMount() {
  console.log('didMount');
  this.runTimeouts();
  console.log('로또 숫자를 생성합니다.');
}
```
componentDidUpdate는 어떤 상황에 사용할 건지 잘생각해야한다.<br>
componentDidUpdate에서는 조건문이 제일 중요하다. <br>
코드에 예로들면, Redo를 눌렀을 때 runTimeout이 동작하도록 코드 작성해야 한다.<br>
그리고, 조건문으로 감싸지 않으면 매번 this.runTimouts가 생긴다. 모르겠으면 조건문 없애보고 실행해보기 (엄청난 것을 보게 될 것이다.)<br>

```js
componentDidUpdate(prevProps, prevState) {
  // winBalls: [], bonus: null, redo: false 셋 중 사용해서 조건문을 걸게한다.
  console.log('didUpdate');
  // windballs가 0이 되는경우에 
  if (this.state.winBalls.length === 0) { // winBalls가 없을 때 실행된다.
    this.runTimeouts();
  }
  if (prevState.winNumbers !== this.state.winNumbers) {
    console.log('로또 숫자를 생성합니다.');
  }
}
```

> 마지막으로 <strong>react devtool로 성능최적화</strong>가 되었는지 확인해보기!! (렌더링확인하는 거임)


## useEffect로 업데이트 감지하기

기본 useEffect<br>
```js
useEffect(() => { }, []);  
```
빈 배열이면 componentDidMount와 동일, 즉 componentDidMount를 만들었다.<br>

```js
useEffect(() => {
  console.log('useEffect');
  for (let i = 0; i < winNumbers.length - 1; i++) {
    timeouts.current[i] = setTimeout(() => { 
      setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
    }, (i + 1) * 1000);
  }
  timeouts.current[6] = setTimeout(() => { // 보너스 볼
    setBonus(winNumbers[6]);
    setRedo(true);
  }, 7000);
  return () => { // ComponentWillUnmount는 return이다.
    timeouts.current.forEach((v) => {
      clearTimeout(v);
    });
  };
}, []); // 빈 배열이면 componentDidMount와 동일
// 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행
```
useEffect(() => { }, [인자없음]); : class에서 componentDidMount만 실행<br>
useEffect(() => { }, [인자있음]); : class에서 componentDidMount랑 componentDidUpdate 둘 다 수행<br>
return() : class에서 ComponentWillUnmount 수행<br><br>
class에서 보면 componentDidUpdate의 조건문을 "this.state.winBalls.length === 0" 해주었다.<br>
```js
componentDidUpdate(prevProps, prevState) {
  console.log('didUpdate');
  if (this.state.winBalls.length === 0) { 
    this.runTimeouts();
  }
}
```
그래서 빈배열에서도 class와 같이 "winBalls.length === 0" 이렇게 똑같이 해주었다.<br>
> 오류가 난다. <br>
> 여기서 오류는 useEffect가 초반에 2번 실행된다. <br>
> 처음부분에 winBalls.length === 0이라서 componentDidMount 실행되자마자 또 winBalls.length === 0이라서 한번 더 실행된다.<br>
> 오류를 해결하기위해서는 <strong>배열인자에서 바뀌는 시점에 값</strong>을 넣어줘야한다. "winBalls.length === 0" 가 아니라 "timeouts.current"다.<br>

여기에서 바뀌는 시점이 timeouts.current라고했는데 무수하게 많다. 어떻게 구별할 것인가?
```js
useEffect(() => {
  ...이하생략
}, [timeouts.current]); // <- 이 부분 구별할거임.
```

```js
for (let i = 0; i < winNumbers.length - 1; i++) {
  ...생략
  // 참고로 여기는 timeouts.current 바뀌는걸까 ? 
  timeouts.current[i] = setTimeout(() => { 
    // current[i] 배열요소 안에 값을 넣어주는 것이다 바뀌는것이 아니다!!
    setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
  }, (i + 1) * 1000);
}
```

```js
const onClickRedo = (() => {
  console.log('onClickRedo');
  console.log(winNumbers);
  setWinNumbers(getWinNumbers());
  setWinBalls([]);
  setBonus(null);
  setRedo(false);
  // 참고로 여기는 timeouts.current바뀌는걸까 ? 
  timeouts.current = []; 
  // [timeouts.current]가 언제바뀌는가? 여기에서 바뀐다. // 직접 바뀌는 부분이다. 왜냐하면, current에 직접넣어줘서
  // 예전 current랑 달라지기때문에 여기에서 바뀌는걸 감지한다.
}, [winNumbers]);
```
즉, 여기에 있는 timeouts.current가 useEffect의 배열인자에 바뀌는 값을 넣어주는 것이다! <br>

> useEffect는 class의 componentDidUpdate역할이랑 Hooks의 componentDidUpdate역할이랑 일치하기 않다는 것을 인지해야한다.

## useMemo와 useCallback

Hooks에서 
```js 
const lottoNumbers =() => getWinNumbers();
```
콘솔창에 보면 getWinNumbers가 자꾸 실행된다. 만약, 이게 랜더링할 때마다 10초씩 걸리면 시간이 많이걸린다. 그래서 getWinNumbers를 자꾸 실행하지 않고, 기억할 수 있게 useMemo가 있다.<br>
```js
const lottoNumbers = useMemo(() => getWinNumbers(), []); // 두 번째 배열이 가장 중요하다!
```
> 여기에서 두번 쨰 배열 요소가 바뀌면 lottoNumbers가 다시 실행된다.<br>
Hooks에 <strong>useMemo</strong>를 사용한다면, getWinNumbers()를 재실행되지 않고, 기억하고 있다. 그래서 콘솔창에서 보면 getWinNumbers가 한 번만 실행이 된다. 위와 설명했듯이, useMemo가 사용하지 않으면 getWinNumbers가 계속 실행된다.<br>

배열이 바꾸기 전까지 계속 결괏값을 기억하는 것이다!!<br>
추천 방법은 함수에다가 console.log 다 넣어주는 것도 좋다.<br><br>

### useMemo, useRef 비교   
<strong>useMemo</strong> :복잡한 함수 결괏값을 기억<br>
<strong>useRef</strong> : 일반 값을 기억<br><br>

### useMemo, useCallback 비교
<strong>useMemo</strong> 함수의 리턴값을 기억한다.<br>
<strong>useCallback</strong> 함수 전체를 기억한다.<br><br>

변경하기 전
```js
const onClickRedo = () => {
  console.log('onClickRedo');
  console.log(winNumbers);
  setWinNumbers(getWinNumbers());
  setWinBalls([]);
  setBonus(null);
  setRedo(false);
  timeouts.current = []; 
};
```
함수를 기억하지 않고, 렌더링할 때 마다 재 실행한다. 사실상 코드에서 useCallback없어도 문제없이 잘 실행이된다.<br>


변경하기 후(두 번째 배열에 인자 넣지 않을 경우)
```js
const onClickRedo = useCallback(() => {
  console.log('onClickRedo');
  console.log(winNumbers);
  setWinNumbers(getWinNumbers());
  setWinBalls([]);
  setBonus(null);
  setRedo(false);
  timeouts.current = []; 
}, []);
```
내가 리셋버튼을 눌렀을 때 콘솔창에 보면 winNumbers의 로또 번호가 전과 계속 동일하게 되어있다. 리셋버튼을 눌러도 로또번호가 바뀌지 않는다!! 그러므로 배열의 인자가 무척 중요하다는 것을 알 수 있다.<br>

> 여기 useCabllback에서는 함수자체를 기억해두고, 두 번째 배열에 빈 값이 들어있어서 함수컴포넌트가 재 실행되도 onClickRedo가 새로 실행되지 않는다. 또한, 함수를 기억하면서 한 번만 실행하고 싶으면 배열에 빈 값을 넣어준다.  <br>

이렇게 실행하면 어떻게 될까?<br>
변경하기 후(두 번째 배열에 인자 넣었을 경우)<br>
```js
const onClickRedo = useCallback(() => {
  console.log('onClickRedo');
  console.log(winNumbers);
  setWinNumbers(getWinNumbers());
  setWinBalls([]);
  setBonus(null);
  setRedo(false);
  timeouts.current = []; 
}, [winNumbers]);
```

위에 언급과 같이, useCallback으로 함수를 다 감싸주면 정상적으롤 움직이는 것은 문제가 없다. <br>
하지만, console.log(winNumbers);를 해보면 winNumbers를 기억을 해서 첫번째 숫자가 계속 콘솔에 찍힌다. 즉, 새로운 번호가 찍히는 줄 알았는데 번호가 바뀌지 않는다. 예전 값을 계속 가지고 있다. 두 번째 배열에 값이 없다. null이기 때문이다. <br>
결론은 두번 째 배열 인수를 꼭 넣어줘야한다. 두 번째 배열이 바뀔 때 마다 새로 실행이 되기떄문에 값을 넣어줘야 한다.<br>

### <strong>useEffect, useMemo, useCallback</strong>에서 두번 째 인자가 매우 중요하다.

그렇다면 함수마다 useCallback을 사용하는게 옳은 일이까? 반은 맞고, 반은 틀리다.<br>
onClick의 onClickRedo가 onClickRedo함수에 값을 넘겨줄려고 한다.<br>
```js
{bonus && <Ball number={bonus} onClick={onClickRedo} />}
```
useCallback에서 필수로 적용할 때가 있다. <strong>부모 컴포넌트가 자식 컴포넌트에게 함수를 넘길 때에는 useCallback을 꼭 해줘야한다.</strong> useCallback가 없으면 매번 새로운 함수가 생성이 된다.<br> 
부모 컴포넌트가 자식 컴포넌트에게 props를 넘겨줄 때 자식 컴포넌트의 props대답은<br> 
> "어? 부모로 받은 props가 바꼈네? 매번 새로운 props를 주네"

라고 인식해서 자식 컴포넌트가 헷갈려서 매번 새로운 렌더링한다.(<strong>리렌더링</strong>) 리렌더링 안해주기 위해서는 <strong>useCallback을 사용해서</strong> 자식 컴포넌트가 쓸데없이 리렌더링 되지않게 해준다. 그렇다면<br> 
>"부모로 받은 함수가 같구나!"<br>

라고 알아차릴 수 있다. <br>
그래서 부모 컴포넌트그가 자식 컴포넌트에 props을 넘길 때 useCallback 반드시 해줘야한다.<br> 

## Hooks에 대한 자잘한 팁들

Hooks는 순서가 중요하다!<br>
```js
if (조건) {
  const [redo, setRedo] = useState(false);
}
```
조건문안에 선언하는 것은 절대 안된다.<br>
또, useEffect안에서 useState를 넣으면안된다.
```js
useEffect(() => {
  useState();
})
```
<br>

```js
const lottoNumbers = useMemo(() => getWinNumbers(), []);
```
useMemo는 []바뀌기 전까지 return 값을 기억한다.<br><br> 
useCallback은 함수를 기억한다.<br>
```js 
useEffect(() => { ...내용물 }, []);
```
useEffect는 []바뀔 때 "...내용물"을 실행한다. <br><br> 


두가지 패턴에 대해서 설명할 것이다. 알아두는 것도 좋다.<br>
Tip) ComponentDidMount만 호출하고, ComponentDidUpdate는 호출하지 않는다. 또는, ajax요청할 경우
```js
useEffect(() => {
  // 여기서 ajax요청해도 상관없다.
  // react Hooks에서 ajax요청할 건데 이런식으로 해도 상관없다.
}, []);
```
Tip) ComponentDidUpdate만 호출하고, ComponentDidMount는 호출하지 않는다. 또는, ajax요청할 경우
```js
const mounted = useRef(false);
useEffect(() => {
  if(!mounted.current) { 
    mounted.current = true;
  } else {
    // 여기서 ajax요청해도 상관없다.
    // react Hooks에서 ajax요청할 건데 이런식으로 해도 상관없다. 대신에, 
    // 바뀌는 값에 따라 실행한다.
  }
}, [바뀌는 값]);
```
무엇보다 사용하면서 깨달아야한다. 

여기가지 useState, useRef, useEffect, useMemo, useCallback을 배웠다. 

