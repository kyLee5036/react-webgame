# 로또추첨기

+ [로또 추첨기 컴포넌트](#로또-추첨기-컴포넌트)
+ [SetTimeout 여러 번 사용하기](#SetTimeout-여러-번-사용하기)
+ [ComponentdidUpdate](#ComponentdidUpdate)
+ useEffect로 업데이트 감지하기
+ useMemo와 useCallback
+ Hooks에 대한 자잘한 팁들


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