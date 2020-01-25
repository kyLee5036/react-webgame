# 지뢰찾기

+ [Context API 소개와 지뢰찾기](#Context-API-소개와-지뢰찾기)
+ [createContexnt와 Provider](#createContexnt와-Provider)


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


## createContexnt와 Provider

1. createContext를 만들어주기<br>
2. Provider로 감싸주기<br>
3. Provider안에 값 들을 넣어주기<br>

#### 1) MineSearch.jsx
```jsx
// createContext를 선언해준다
import React, {useReducer, createContext} from 'react'; 

// reateContext를 만든다
const TableContext = createContext({
  // 여기 안에다가 기본 값(초기 값)을 넣을 수가 있다.
  
});
.. 이하 생략
```
createContext를 선언해준다.


#### 2) MineSearch.jsx
```jsx
... 위 생략
const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initalState);

  return (
    <>
      {/*  Provider를 사용해야만 그 해당하는 컴포넌트 접근할 수 있다.*/}
      {/* tableData, dispatch  넣어주면  해당하는 컴포넌트가 tableData랑 dispatch에 접근 할 수가 있다.*/}
      <TableContext.Provider value={{ tableData : state.tableData, dispatch }}>
        <Form /> 
        <div>{state.timer}</div>
        <Table />
        <div>{state.result}</div>
      </TableContext.Provider>
    </>
  )
}
```
위에 TableContext를 선언했던 것에다가 Provider도 추가해준다. <br>
전달 할 값들을 value에 적어준다. (여기서는 tableData랑 dispatch의 값을 넘겨 줄 것이다.) <br>

#### 3) MineSearch.jsx
```jsx
// TableContext를 다른 곳에 사용하기 위해서 export를 해주기
export const TableContext = createContext({
  // 일단 모양만 맞춰주면 된다. 모양을 맞춰주기!!
  tableData: [],
  dispatch: () => {},
});
```
TableContext에 모양 갖추기

#### 4) Form.jsx
```jsx
import React, {useState, useCallback, useContext} from 'react'; // useContext를 선언
import {TableContext} from './MineSearch'// TableContext를 가져오기


const {dispatch} = useContext(TableContext); // dispatch를 사용할 수가 있다.
```


Tip) Context-api가 참고로 성능 최적화하기가 힘들다. 그리고 밑에 처럼 사용하면 안된다. <br>
`<TableContext.Provider value={{ tableData : state.tableData, dispatch }}>` <br>
왜냐하면 MineSearch.jsx가  리 렌더링을 할 떄마다 객체가 새로 생기기 때문에이다.  <br>
즉, 자식들도 매번 새로 리 렌더링을 해서 성능적으로 문제가 된다. <br>

> 그러기 때문에 캐싱을 해줘야한다. 캐싱은 <strong>useMemo</strong>를 사용하면 된다. <br>

#### 5) MinSearch.jsx
```jsx
import React, {useReducer, createContext, useMemo} from 'react'; // useMemo를 선언

  ... 위 생략

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const value = useMemo(() => {
    { tableData : state.tableData, dispatch }
  }, [state.tableData]);
  // state.tableData가 바뀔 때마다 value를 갱신해주면 된다. 
  // 이런식으로 useMemo로 캐싱을 해줘야만 성능저하가 덜 일어난다.
  // 그리고 dispatch는 빈 배열안에 사옹안해도 된다. 항상 같게 유지하기 떄문이다.

return (
    <>
      // 위에 value를 캐싱해주었다.
      <TableContext.Provider value={value}>
    </>
  );
}
```


#### 6) Form.jsx
```jsx
// 이게 중요하다. 여기에다가 context-api를 적용할 것이다.
  const onClickBtn = useCallback( () => {
    dispatch({
      type: START_GAME, row, cell ,mine 
      // START_GAME을 하는 순간, 여기서 row, cell, mine은 데이터를 넘겨준다.
    })
  }, [row, cell ,mine]);
```


#### 7) MineSearch.jsx
```jsx

export const START_GAME = 'START_GAME'
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: 
    return { // Form.jsx에서 row, cell ,mine 값을 넘겨줘서 받는다.
      ...state,
      // 넘겨 줘서 받았던 걸로 지뢰를 테이블이랑 지뢰를 심을 것이다.
      // Form.jsx에서 row, cell ,mine 값을 넘겨줘서 받을 떄에는 action을 사용한다.
      // 식이 복잡하기 때문에 plantMine라는 함수를 생성해주었다.
      tableData : plantMine(action.row, action.cell, action.mine)
      
    }
    default:
      return state;
  }
};
```


#### 8) MineSearch.jsx
```jsx
// 지뢰 상태를 코드로 만들 것이다.
export const CODE = {
  MINE : -7, // 지뢰 칸
  NORMAL : -1,          // 정상 칸
  QUESTION : -2,        // 물음 표
  FALG : -3,            // 깃발
  QUESTION_MINE : -4,   // 물음표 지뢰
  FLAG_MINE : -5,       // 깃발 지뢰
  CLICKED_MINE : -6,    // 클릭 지뢰
  OPENED : 0,           // 칸을 연칸 : 0 이상이면 전부 OPEND 열리도록 한다.
  // OPENED는 설계적으로 0으로 해주었다.
}
```


* * *
* * *
* * *

### createContexnt와 Provider의 소스 코드
#### MineSearch.jsx
```jsx
import React, {useReducer, createContext, useMemo} from 'react';
import Table from './Table';
import Form from './Form';

// 지뢰 상태를 코드로 만들 것이다.
export const CODE = {
  MINE : -7, // 지뢰 칸
  NORMAL : -1,          // 정상 칸
  QUESTION : -2,        // 물음 표
  FALG : -3,            // 깃발
  QUESTION_MINE : -4,   // 물음표 지뢰
  FLAG_MINE : -5,       // 깃발 지뢰
  CLICKED_MINE : -6,    // 클릭 지뢰
  OPENED : 0,           // 칸을 연칸 : 0 이상이면 전부 OPEND 열리도록 한다. 
}

export const TableContext = createContext({
  tableData: [ 
    // 일단 임시로 이렇게 만들었다. 이런 식으로 데이터가 들어온다는 의미임. 상관 안해도된다!!! 
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, ],
    [-1, -1, -1, -1, -7, -7, -7, -1, -1, -1, -1, -1, -1, -1, -1, ],
    [],
    [],
    [],
  ],
  dispatch: () => {},
});

const initalState = {
  tableData: [],
  timer: 0,
  result: '',
};

export const START_GAME = 'START_GAME'

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: 
    return { 
      ...state,
      tableData : plantMine(action.row, action.cell, action.mine)
    }
    default:
      return state;
  }
};

const MineSearch = () => {

  const [state, dispatch] = useReducer(reducer, initalState);

  const value = useMemo(() => {
    { tableData : state.tableData, dispatch }
  }, [state.tableData]);

  return (
    <>
      <TableContext.Provider value={value}>
        <Form /> 
        <div>{state.timer}</div>
        <Table />
        <div>{state.result}</div>
      </TableContext.Provider>
    </>
    
  );
};

export default MineSearch;
```

#### Form.jsx
```jsx
import React, {useState, useCallback, useContext} from 'react';
import {TableContext, START_GAME} from './MineSearch'

const Form = () => {
  const [row, setRow] = useState(10); // 세로 - 줄
  const [cell, setCell] = useState(10); // 가로 -칸
  const [mine, setMine] = useState(10); // 지뢰
  const {dispatch} = useContext(TableContext);

  const onChangeRow = useCallback((e) => { // useCallback으로 불필요한 렌더링을 막아준다. 습관을 가지는게 좋다.
    setRow(e.target.value);
  }, []);
  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);
  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  // 이게 중요하다. 여기에다가 context-api를 적용할 것이다.
  const onClickBtn = useCallback( () => {
    dispatch({
      type: START_GAME, row, cell ,mine // START_GAME을 하는 순간, 여기서 row, cell, mine은 데이터를 넘겨준다.
    })
  }, [row, cell ,mine]);
  
  return (
    <div>
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>시작</button>
    </div>
  );
}

export default Form;
```

* * *
* * *