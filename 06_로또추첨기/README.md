# 로또추첨기

+ [로또 추첨기 컴포넌트](#로또-추첨기-컴포넌트)
+ SetTimeout 여러 번 사용하기
+ ComponentdidUpdate
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
