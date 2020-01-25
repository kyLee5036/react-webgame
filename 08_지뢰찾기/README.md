# 지뢰찾기

+ [Context API 소개와 지뢰찾기](#Context-API-소개와-지뢰찾기)
+ [createContexnt와 Provider](#createContexnt와-Provider)
+ [useContext 사용해 지뢰 칸 렌더링](#useContext-사용해-지뢰-칸-렌더링)


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

  const value = useMemo(() => (
    { tableData : state.tableData, dispatch }
  ), [state.tableData]);
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
  NORMAL : -1,          // 정상 칸(닫혀 있는 칸)
  QUESTION : -2,        // 물음 표
  FALG : -3,            // 깃발
  QUESTION_MINE : -4,   // 물음표 지뢰
  FLAG_MINE : -5,       // 깃발 지뢰
  CLICKED_MINE : -6,    // 클릭 지뢰
  OPENED : 0,           // 칸을 연칸 : 0 이상이면 전부 OPEND 열리도록 한다.
  // OPENED는 설계적으로 0으로 해주었다.
}
```

## useContext 사용해 지뢰 칸 렌더링

plantMine이라는 함수를 구현하겠다. <br>

#### 1) MineSearch.jsx
```jsx
// 지뢰를 심는 함수
const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candiate = Array(row*cell).fill.map((arr, i) => { // 0 ~ 99 칸
    return i;
  });
  const shuffle = [];
  while ( candiate.length > row * cell - mine ) { 
    const chosen = candiate.splice(Math.floor(Math.random() * candiate.length), 1)[0]; 
    shuffle.push(chosen);
  }
  const data = []; 
  for ( let i = 0; i < row; i ++ ) { // 테이블 데이터을 구현
    const rowData = [];
    data.push(rowData);
    for ( let j = 0; j < cell; j ++ ) {
      rowData.push(CODE.NORMAL);
    }
  }

  for ( let k = 0; k < shuffle.length; k++ ) { // 칸 위치 찾기
    const ver = Math.floor(shuffle[k] / cell ); 
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data; // tableData에 지뢰를 심는다
};

```
코드 내용모르겠으면 javascript 강좌에서 보면 된다.<br>

화면 구성을 안해서 에러가 나오므로. 화면 구성도 해준다.<br>

#### 2) Table.jsx, Tr.jsx, Td.jsx는 생략하겠음 (틱택토이랑 비슷하므로)

console.log의 결과내용이
<pre><code>0: (10) [-1, -1, -1, -1, -1, -1, -1, -7, -7, -1]
1: (10) [-1, -7, -1, -1, -1, -1, -1, -1, -1, -1]
2: (10) [-7, -1, -1, -1, -1, -1, -7, -1, -1, -1]
3: (10) [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
4: (10) [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
5: (10) [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
6: (10) [-1, -1, -7, -7, -1, -1, -7, -1, -1, -1]
7: (10) [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
8: (10) [-1, -1, -1, -1, -1, -1, -1, -1, -7, -1]
9: (10) [-1, -1, -1, -1, -1, -1, -1, -7, -1, -1]</code></pre>

-1이 정상적인 칸, -7이 지뢰 칸이다. <br>
데이터가 잘 전달 되었다는 것을 볼 수 있다. <br>
그 다음에는 context-api를 활용해서 화면을 그려 볼 것이다.<br>

#### 3) Table.jsx
context-api를 적용 해볼 것이다. <br>
```jsx
import React, {useContext} from 'react';
import Tr from './Tr';
import { TableContext } from './MineSearch';
const Table = () => {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      { Array(tableData.length).fill().map((tr, i) => <Tr />) }
    </table>
  )
}
export default Table;
```

#### 4) Tr.jsx
```jsx
import React, {useContext} from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

const Tr = () => {
  const { tableData } = useContext(TableContext);
  return (
    <tr>
      { tableData[0] && Array(tableData[0].length).fill().map(() => 
        <Td />) 
      }
      // tableData[0]는 에러 나올 것 같아서 잠깐 보호연산자를 넣어줬다.
      // 왜냐하면 tableData[0]가 undefined가 나올 수 있기때문이다 
    </tr>
  )
  
}

export default Tr;
```

Tr.jsx를 코드 작성하고 에러 없이 잘 작동이 된다. <br>
`backend.js:6 Warning: Each child in a list should have a unique "key" prop.` <br>
일단, key와 같은 에러는 일단 생략한다. <br>

이제는 지뢰가 나오도록 설정을 할 것이다. <br>
지뢰를 나오게 하기 전에 몇번 쨰 줄, 몇번 쨰 칸을 알아 볼려고 한다. <br>

#### 5) Table.jsx

```jsx
return (
  <table>
    // 테이블에서 몇 번쨰 줄의 값 알려준다.
    { Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />) }
    // rowIndex 값을 넘겨준다.
  </table>
)
```

#### 6) Tr.jsx
```jsx
// 파라미터에서 rowIndex를 받는다.
const Tr = ({ rowIndex }) => {

  const { tableData } = useContext(TableContext);
  return (
    <tr>
      // Tr에서 몇 번째 칸의 값 알려준다. (추가로, 테이블에 있었던 몇 번 째줄도 같이 값을 넘겨준다)
      { tableData[0] && Array(tableData[0].length).fill().map(() => 
      <Td rowIndex={rowIndex} cellIndex={i}/>
      ) }
    </tr>
  )
}
```
여기까지하면 몇번 째 칸, 몇번 째 줄도 알게 된다. td에 rowIndex, cellIndex를 console.log하면된다. <br><br>


이제 테이블에 실제 데이터를 넣어볼 것이다. <br>
(console.log의 데이터가 아니라 화면에 보이도록 할 것이다)<br>

#### 7) Td.jsx
```jsx
import React, {useContext} from 'react';
import { TableContext } from './MineSearch';

const Td = ({rowIndex, cellIndex}) => {
  // 실제데이터는 useContext로 받는다
  const { tableData } = useContext(TableContext); // tableData는 useContext의 TableContext의 값을 받는다.

  return (
    <td>{tableData[rowIndex][cellIndex]}</td> 
    // 몇번 째 칸, 몇번 째 줄은 부모의 props로부터 받는다.
    // 그러면 내 데이터가 뭔지 정확하게 구상을 할 수 있다.
  )
  
}

export default Td;
```
여기까지하면 화면에 -1, -7이 보일 것이다.<br>
`<td>{tableData[rowIndex][cellIndex]}</td> `실행을 해준다면 <br>
데이터뿐만 아니라 현재 보이는 화면에도 값이 보인다. <br>
(설명어려워서 대충 이렇다는 식으로 이해..)<br>


이제는 화면에 -1, -7이 보이는데 좀 화려하게 꾸며볼 것이다. <br>
#### 8) Td.jsx 
```jsx
// getTdText, getTdStyle를 추가한다.
const getTdStyle = (code) => {};
const getTdText = (code) => {}

const Td = ({rowIndex, cellIndex}) => {
  const { tableData } = useContext(TableContext); 
  return (
    // 셀의 코드(데이터)의 기반으로 칸을 표시, 스타일을 정할 것이다.
    // 리액트가 좋은게 데이터에 따라서 알아서 화면을 바꿔준다.
    <td
      style={ getTdStyle(tableData[rowIndex][cellIndex]) }
    > { getTdText(tableData[rowIndex][cellIndex]) } </td> 
  )  
}

```

#### 9) Td.jsx
```jsx
import { CODE, TableContext } from './MineSearch'; // CODE를 import 잊지말기

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL: // 기본적으로 컴은 칸으로 한다.
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.OPENED:
      return {
        background: 'white',
      };
    default: 
      return {
        background: 'white',
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL: // 기본적으로 빈 칸으로 한다.
      return '';
    case CODE.MINE: // 일단 디버깅이 편하도록 지뢰 칸을 X로 한다. 나중에 X를 지우면 된다.
      return 'X';
    default:
      return '';
  }
};
```

