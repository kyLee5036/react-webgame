# 지뢰찾기

+ [Context API 소개와 지뢰찾기](#Context-API-소개와-지뢰찾기)


시작하기 전에
#### index.html
```html
<!-- ... 위 생략 -->
<script src="./dist/app.js"></script>
```

#### package.json
<pre><code>...생략
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack"
},
...생략
</code></pre>

위와 같이 설정으로 바꿔준다면 dist라는 폴더에 app.js가 빌드되어서 나온다.


## Context API 소개와 지뢰찾기

이전에서 useReducer를 배웠다. <br>

useReducer는 state가 여러개 일 때 하나로 묶어둔다. state를 바꿀 때에는 action을 dispath해서 바꾼다.<br>

> Redux와 useReducer의 차이점 <br>
> Redux는 state를 동기적으로 바뀐다.<br>
> useReducer는 state가 비동기적으로 바뀐다. <br>

### 이번에는 <strong>Context API</strong> 이다.

<strong>context-api</strong>를 사용하면 그 아래에 있는 어떠한 컴포넌트 값을 바로 받을 수 있다.<br>
부모 컴포넌트를 거치지 않고 바로바로 값을 받을 수 있다는 장점이 있다.<br>


기본 셋팅 설정
#### 1) MineSearch.jsx
```jsx
import React, {useReducer} from 'react';
import Table from './Table';

const initalState = {
  tableData: [],
};

const reducer = (state, action) => {
  switch (action.type) {
  
    default:
      return state;
  }
};

const MineSearch = () => {

  const [state, dispatch] = useReducer(reducer, initalState);

  return (
    <Table />
  )
}

export default MineSearch;
```

#### 2) Table.jsx, Tr.jsx, Td.jsx 는 기본셋팅 생략

> 더 추가 해줄 것이 생겼다. 이번에는 입력창이 3개과 버튼이 있고, 타이머, 결과창까지 있다.

#### 3) MineSearch.jsx 

수정 해준다... (타이머랑 Form태그랑, 결과가 추가되어서..)
```jsx
import React, {useReducer} from 'react';
import Table from './Table';

const initalState = {
  tableData: [],
  timer: 0,
  result: '',
};

const reducer = (state, action) => {
  switch (action.type) {
  
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <>
      <Form /> // Fomr태그를 추가해준다.
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </>
  );
};

export default MineSearch;
```

#### 3) Form.jsx

Form태그가 추가되었으니까 `<Form />` <- 추가되어진거 위에 있음<br>
Form태그 안에 세로, 가로, 지뢰 설정해주는 입력창 3개를 만들어 줄 것이다.<br>

```jsx
import React, {useState, useCallback} from 'react';

const Form = () => {
  const [row, setRow] = useState(10); // 세로 - 줄
  const [cell, setCell] = useState(10); // 가로 -칸
  const [mine, setMine] = useState(10); // 지뢰

  const onChangeRow = useCallback((e) => { // useCallback으로 불필요한 렌더링을 막아준다. 습관을 가지는게 좋다.
    setRow(e.target.value);
  }, []);
  const onChangeCell = useCallback((e) => { // useCallback으로 불필요한 렌더링을 막아준다. 습관을 가지는게 좋다.
    setCell(e.target.value);
  }, []);
  const onChangeMine = useCallback((e) => { // useCallback으로 불필요한 렌더링을 막아준다. 습관을 가지는게 좋다.
    setMine(e.target.value);
  }, []);
  
  return (
    <div>
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
    </div>
  );
}

export default Form;
```

> 복습) value랑 onChange랑 쌍으로 연결 해줘야한다. 안 그러면 오류가 일어난다.

다음부터 가장중요한게 있다. `<button></button>` 버튼 클릭으로 지뢰찾기 맵을 만들어준다.

#### 4) Form.jsx
```jsx
  ... 이하 생략
  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  // 이게 중요하다. 여기에다가 context-api를 적용할 것이다.
  const onClickBtn = useCallback( () => {

  }, []);
  
  return (
    <div>
      ... 이하 생략
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>시작</button>
    </div>
  );
}

export default Form;
```

#### 5) MinSearch.jsx (설명하는 부분이라서 코드 안 적어도 된다. )

```jsx
... 위 생략
const [state, dispatch] = useReducer(reducer, initalState);
return (
  <>
    <Form /> // Form에다가 dispatch를 넘겨준다.

    // <Form dispatch={dispatch} /> // 원래였으면 옆과 같이 dispatch를 넘겨주는데 
    // 이번에서 context-api를 사용할 것이다.
    // context-api를 사용하면 그 아래에 있는 어떠한 컴포넌트 값을 바로 받을 수 있다.
    // 부모 컴포넌트를 거치지 않고 바로바로 값을 받을 수 있다는 장점이 있다.
    <div>{state.timer}</div>
    <Table />
    <div>{state.result}</div>
  </>
);
};

export default MineSearch;
```

context-api의 사용은 이 다음부터 할 것이다. 먼저 여기까지 기본 셋팅 설정을 해준다.



