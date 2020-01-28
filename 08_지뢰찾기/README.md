# 지뢰찾기

+ [Context API 소개와 지뢰찾기](#Context-API-소개와-지뢰찾기)
+ [createContexnt와 Provider](#createContexnt와-Provider)
+ [useContext 사용해 지뢰 칸 렌더링](#useContext-사용해-지뢰-칸-렌더링)
+ [왼쪽 오른쪽 클릭 로직 작성하기](#왼쪽-오른쪽-클릭-로직-작성하기)
+ [지뢰 개수 표시하기](#지뢰-개수-표시하기)
+ [빈 칸들 한 번에 열기](#빈-칸들-한-번에-열기)

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
  FLAG : -3,            // 깃발
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
        background: '#444', // 회색
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

## 왼쪽 오른쪽 클릭 로직 작성하기

일단 클릭했을 때 셀을 여는것부터 하겠다.


#### 1) MineSearch.jsx
```jsx
...위 생략
export const OPEN_CELL = 'OPEN_CELL'

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: 
    return { 
      ...state,
      tableData : plantMine(action.row, action.cell, action.mine)
    };
    case OPEN_CELL : // OPEN_CELL 을 td에서 dispatch를 해준다.
      // 칸을 클릭하는데 클릭한 칸을 opend로 바꿔준다.
      // 불면성을 유지하기 위해서 밑 코드를 작성한다.
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]]; 
      // action.row, action.cell은 td에서 값을 받아온다.
      tableData[action.row][action.cell] = CODE.OPENED; 

      return {
        ...state,
        tableData,
      }

    default:
      return state;
  }
};
...이하 생략
```

#### 2) Td.jsx
```jsx
...위 생략
const Td = ({rowIndex, cellIndex}) => {
  const { tableData, dispatch } = useContext(TableContext); // dispatch를 추가해준다.

  const onClickTd = useCallback(() => {
    dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex})
  }, []);

  return (
    <td
      style={ getTdStyle(tableData[rowIndex][cellIndex]) }
      onClick={onClickTd}
    > { getTdText(tableData[rowIndex][cellIndex]) } </td> 
  )
  
}
...이하 생략
```

여기까지 코드 작성하면 클릭하는 순간 클릭한 td는 흰색으로 변해서 보인다. <br>

지금 문제는 지뢰클릭해도 바꾸는데 나중에 구현하겠다. <br>

#### 3) Td.jsx

```jsx

const getTdText = (code) => {
  switch (code) {
    ...생략
    case CODE.CLICKED_MINE: 
      return '뻥';
    ...생략
  }
};

const Td = ({rowIndex, cellIndex}) => {
  const { tableData, dispatch } = useContext(TableContext); 

  const onClickTd = useCallback(() => {
    // 칸 상태별로 클릭했을 때 동작이 다르도록 switch문으로 구별해준다. 
    switch (tableData[rowIndex][cellIndex]) { 
      // 이미 연 칸, 깃발(보통, 지뢰), 물음표(보통, 지뢰) 5개는 클릭해도 아무것도 안되게 한다.
      case CODE.OPENED:     
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL: // 일반 칸 클릭 했을 때 
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex});
        return;
      case CODE.MINE: // 지뢰클릭 했을 때 뻥 터지게 한다.
        dispatch({type : CLICK_MINE, row: rowIndex, cell: cellIndex})
    
      default:
        break;
    }
    
  }, [tableData[rowIndex][cellIndex]]); // 배열은 바뀌는 값을 넣어준다. 잊지말기!
...이하 생략
```
계속 이어서..

#### 4) Td.jsx
```jsx
const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL: // 기본적으로 컴은 칸으로 한다.
    case CODE.MINE:
      return {
        background: '#444', // 회색
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white',
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow',
      }
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red',
      }
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
    case CODE.CLICKED_MINE: 
      return '뻥';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?'
    default:
      return '';
  }
};
```
위 내용을 추가해준다. <br>

여기서부터 마우스 이벤트를 추가하겠다. (왼쪽 클릭(onClick), 오른쪽 클릭(onContextMenu)) <br>

#### 5) Td.jsx
```jsx
const onRightClickTd = useCallback((e) => {
    e.preventDefault(); // 해주는 이유가 오른쪽 클릭하면 창을 안 나오기 위해서이다.
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE: // 지뢰, 보통칸 클릭햇을 때에는 깃발로
        dispatch({ type : FLAG_CELL, row: rowIndex, cell: cellIndex});
        return; // return이든 break이든 끊어줘야 함
      case CODE.FLAG_MINE:
      case CODE.FLAG: // 깃발( 보통, 지뢰)을 클릭했을 때에는 물음표로
        dispatch({ type : QUESTION_CELL, row: rowIndex, cell: cellIndex});
        return; // return이든 break이든 끊어줘야 함
      case CODE.QUESTION:
      case CODE.QUESTION_MINE: // 물음표( 보통, 지뢰)을 클릭했을 때에는 물음표로
        dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
        return; // return이든 break이든 끊어줘야 함
      default:
        return; // return이든 break이든 끊어줘야 함
    }
  }, [tableData[rowIndex][cellIndex]] );
```

여기까지 dispatch의 type을 5개 만들었으니까 reducer에서 코드 작성을 해주면 된다. <br>

TIP ) action을 (dispatch의 type)을 추상적으로 만들고, 구현은 나중에 하는 것도 좋다. <br>

여기서 지뢰를 클릭하면 중단되도록 halted를 추가한다. <br>
#### 6) MineSearch.jsx
```jsx
const initalState = {
  tableData: [],
  timer: 0,
  result: '',
  halted: false, // halted가 '중단된' 의미..
};

... 위 생략
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: 
    return { 
      ...state,
      tableData : plantMine(action.row, action.cell, action.mine),
      halted: false, // 게임 시작할 때에는 hatled를 false를 해준다.
    };
    ...생략
    case CLICK_MINE: {// 지뢰를 클릭할 경우 게임오버하기위해서 halted를 한다.
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE; 
      return {
        ...state,
        tableData,
        halted: true, // 게임을 멈추기 위해서 추가하였다. 
      }
    }
  ...이하 생략
```

#### 7) MineSearch.jsx

아까 Td.jsx(5번)을 구현하였다.

```jsx
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';


const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: 
    return { 
      ...state,
      tableData : plantMine(action.row, action.cell, action.mine),
      halted: false, // 게임 시작할 때에는 hatled를 false를 해준다.
    };
    case OPEN_CELL : {// OPEN_CELL 을 td에서 dispatch를 해준다.
      // 칸을 클릭하는데 클릭한 칸을 opend로 바꿔준다.
      // 불면성을 유지하기 위해서 밑 코드를 작성한다.
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED; 
      return {
        ...state,
        tableData,
      }
    }
    case CLICK_MINE: {// 지뢰를 클릭할 경우 게임오버하기위해서 halted를 한다.
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE; 
      return {
        ...state,
        tableData,
        halted: true, // 게임을 멈추기 위해서 추가하였다. 
      }
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      // 일반 칸에서 지뢰가 있을 경우, 없을 경우 (보여주는 화면은 똑같지만, 데이터가 다르다는 것을 잊지말기)
      if (tableData[action.row][action.cell] === CODE.MINE) { 
        tableData[action.row][action.cell] = CODE.FLAG_MINE; 
      } else {
        tableData[action.row][action.cell] = CODE.FLAG; 
      }
      return {
        ...state,
        tableData,
      }
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      // 깃발 중에서도 지뢰가 있을 경우, 없을 경우  (보여주는 화면은 똑같지만, 데이터가 다르다는 것을 잊지말기) 
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) { 
        tableData[action.row][action.cell] = CODE.QUESTION_MINE; 
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION; 
      }
      return {
        ...state,
        tableData,
      }
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      // 물음표 중에서도 지뢰가 있을 경우, 없을 경우  (보여주는 화면은 똑같지만, 데이터가 다르다는 것을 잊지말기)
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) { 
        tableData[action.row][action.cell] = CODE.MINE; 
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL; 
      }
      return {
        ...state,
        tableData,
      }
    }

    default:
      return state;
  }
};
```

여기서 잠깐 halted를 수정하겠다.

#### 8) MineSearch.jsx
```jsx
export const TableContext = createContext({
  tableData: [],
  halted: true, // context-api에 halted를 추가해주고 true로 바꿔준다.
  dispatch: () => {},
});
const initalState = {
  tableData: [],
  timer: 0,
  result: '',
  halted: true, // halted가 '중단된' 의미.., halted를 true로 바꿔준다.
};

...위 생략

const MineSearch = () => {
const {tableData, halted, timer, result} = state;

  const value = useMemo(() => (
    { tableData : tableData, dispatch, halted: halted }
  ), [tableData, halted]);
};
```
Context-api에 halted를 추가시켜서 value에도 halted를 넣어주었다.

#### 9) Td.jsx
```jsx
const Td = ({rowIndex, cellIndex}) => {
  const { tableData, dispatch, halted } = useContext(TableContext); // useContext에 halted를 넣어준다.
  console.log(halted);
  const onClickTd = useCallback(() => {
    if (halted) { // hatlted가 true가 되면 게임 중단 시켜준다. 
    // true가 되면 이쪽으로 넘어온다
      return;
    }
    switch (tableData[rowIndex][cellIndex]) { 
      ...생략
    }
  }, [tableData[rowIndex][cellIndex]], halted ); 
  // 셀을 클릭하면 halted도 true가 false 자꾸 판단해야하기 떄문에 배열에도 추가해준다.

  const onRightClickTd = useCallback((e) => {
    e.preventDefault(); // 해주는 이유가 오른쪽 클릭하면 창을 안 나오기 위해서이다.
    if (halted) { // hatlted가 true가 되면 게임 중단 시켜준다.
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      ...생략
    }
  }, [tableData[rowIndex][cellIndex]], halted );
  // 셀을 클릭하면 halted도 true가 false 자꾸 판단해야하기 떄문에 배열에도 추가해준다.

```
여기까지 따라했는데 오류가 나온다 <br>

중단 오류는 <br>
바꾸기 전 (onClickTd, onRightClickTd) 둘 다 적용 <br>
`}, [tableData[rowIndex][cellIndex]], halted );` <br>
바꾸기 후 (onClickTd, onRightClickTd) 둘 다 적용 <br>
`}, [tableData[rowIndex][cellIndex], halted] );` <br>

오른쪽 클릭 에러<br>
오류 내용 : 일반 칸에는 흰색, 지뢰 칸에는 빨간색이다. <br>
MineSearch, Td의 FALG철자가 틀려서 FALG의 관련된 철자를 전부 FLAG로 바꾸어 주었다. <br>
통일성의 문제가 있었다.  <br>


## 지뢰 개수 표시하기

칸을 여는데 빈 칸을 눌렀을 때 주변에 지뢰를 몇 개인지 알려준다. <br>
빈 칸들만 여러개 열었는데 주변 칸이 한 방에 열리도록 (재귀함수 사용) - 다음 강의에서<br>


#### 1) MineSearch.jsx 

내 기준으로 주변 칸 검사를 한다. <br>
윗 줄, 아랫 줄은 조심해서 해야한다. <br>

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: 
    return { 
      ...state,
      tableData : plantMine(action.row, action.cell, action.mine),
      halted: false, 
    };
    case OPEN_CELL : {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED; 
      // 내가 누른 칸이 있으면 주위 8칸을 검사한다.
      // 끝 부분 클릭할 때에는 8칸이 아니라 5칸이다 (없는 칸이 있다. 잘 따지고 들어가야한다.)
      let around = [];
      // 윗줄이 빈 칸일 경우
      if ( tableData[action.row - 1] ) {
        // 윗 줄 3칸을 넣어준다.
        around.concat(
          tableData[action.row - 1][action.cell -1], 
          tableData[action.row - 1][action.cell],
          tableData[action.row - 1][action.cell + 1],
        );
      }
      // 내 기준 왼쪽 칸, 오른 쪽 칸을 넣어준다.
      around.concat(
        tableData[action.row][action.cell - 1],
        tableData[action.row][action.cell + 1],
      );
      // 아래 줄이 빈 칸일 경우
      if ( tableData[action.row + 1] ) {
        // 윗 줄 3칸을 넣어준다.
        around.concat(
          tableData[action.row + 1][action.cell -1], 
          tableData[action.row + 1][action.cell],
          tableData[action.row + 1][action.cell + 1],
        );
      } 
      // 그러면 5칸 또는 8칸을 검사하게 된다.

      return {
        ...state,
        tableData,
      }
    }
    ... 생략
```



#### 2) MineSearch.jsx

지뢰의 주변 갯수를 세아린다.

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: 
    return { 
      ...state,
      tableData : plantMine(action.row, action.cell, action.mine),
      halted: false, /
    };
    case OPEN_CELL : {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      let around = [];
      if ( tableData[action.row - 1] ) {
        around.concat(
          tableData[action.row - 1][action.cell -1], 
          tableData[action.row - 1][action.cell],
          tableData[action.row - 1][action.cell + 1],
        );
      }
      around.concat(
        tableData[action.row][action.cell - 1],
        tableData[action.row][action.cell + 1],
      );
      if ( tableData[action.row + 1] ) {
        around.concat(
          tableData[action.row + 1][action.cell -1], 
          tableData[action.row + 1][action.cell],
          tableData[action.row + 1][action.cell + 1],
        );
      } 
      // 주변에 지뢰를 찾아서 갯수를 검사한다.
      const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v));
      // 갯수를 세고 나서는
      tableData[action.row][action.cell] = count; // 갯수가 표시가 될 것이다.

      return {
        ...state,
        tableData,
      }
      ...생략
```

하지만, 문제가 있어서 에러가 있다. 에러를 해결하겠다.<br>
`console.log(count);` 하면 빈 배열이 나온다.<br>


#### 3) MineSearch.jsx
```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: 
    return { 
      ...state,
      tableData : plantMine(action.row, action.cell, action.mine),
      halted: false, 
    };
    case OPEN_CELL : {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      let around = [];
      if ( tableData[action.row - 1] ) {
        around = around.concat(
          tableData[action.row - 1][action.cell -1], 
          tableData[action.row - 1][action.cell],
          tableData[action.row - 1][action.cell + 1],
        );
      }
      around = around.concat(
        tableData[action.row][action.cell - 1],
        tableData[action.row][action.cell + 1],
      );
      if ( tableData[action.row + 1] ) {
        around = around.concat(
          tableData[action.row + 1][action.cell -1], 
          tableData[action.row + 1][action.cell],
          tableData[action.row + 1][action.cell + 1],
        );
      } 
      const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
      console.log(around, count); // 확인하면서 코딩하기!!
      tableData[action.row][action.cell] = count; 

      return {
        ...state,
        tableData,
      }
```
concat에 around를 추가해주었다.  <br>
소스 코드 <br>
`const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;` 로 바꿈. <br>
(뒤에 갯수를 알기위해서 length를 추가해주어야 한다.) <br>

하지만, 화면에 갯수도 나오지가 않는다. 화면에 나오도록 할 것이다. <br>
화면에 텍스트 나오기 위해서는 (getTdText) 유심히 보기 (혼자 해보기!!!!)<br>

#### 4) Td.jsx
```jsx
const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL: // 기본적으로 빈 칸으로 한다.
      return '';
    case CODE.MINE: // 일단 디버깅이 편하도록 지뢰 칸을 X로 한다. 나중에 X를 지우면 된다.
      return 'X';
    case CODE.CLICKED_MINE: 
      return '뻥';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?'
    default:
      return code || ''; 
      // 기본 값은 code(갯수)를 나오게하고 (또는) 0일 나올경우에는 ''(빈 칸)으로 해주었다.
  }
};
```
화면에 텍스트가 나오지 않았으니까 텍스트 쪽을(getTdText) 유심히 본다. <br>

여기서부터 칸을 열었을 때 한꺼번에 여는게 어렵다. <br>
자바스크립트랑 리액트 구현방식이 다르다. <br>
리액트에서는 엄청난 렌더링이 발생하기 때문에 기존 방식이랑 많이 다르다. <br>
그래서, OPEN_CELL에서부터 확인을 해야한다. 물론 재귀함수를 써야하긴 해야한다. <br>

다음강의부터 한다.<br>



## 빈 칸들 한 번에 열기

코드로 설명하겠다. <br>
그리고 OPEN_CELL 밖에 없음.. <br>
무진장하게 어려움..... <br>

#### 1) MineSearch.jsx (OPEN_CELL)
```jsx
case OPEN_CELL : {
  const tableData = [...state.tableData];
  tableData[action.row] = [...state.tableData[action.row]];
  let around = [];
  if ( tableData[action.row - 1] ) {
    around = around.concat( 
      tableData[action.row - 1][action.cell -1], 
      tableData[action.row - 1][action.cell],
      tableData[action.row - 1][action.cell + 1],
    );
  }
  around = around.concat(
    tableData[action.row][action.cell - 1],
    tableData[action.row][action.cell + 1],
  );
  if ( tableData[action.row + 1] ) {
    around = around.concat(
      tableData[action.row + 1][action.cell -1], 
      tableData[action.row + 1][action.cell],
      tableData[action.row + 1][action.cell + 1],
    );
  }

  const count = around.filter( (v) => 
    [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE]
    .includes(v)).length;
  console.log(around, count);
  tableData[action.row][action.cell] = count; 

  // 위에 까지 count로 주변 갯수가 몇 개인지 확인했는데 주변 갯수가 하나도 없다면!!!!
  if (count === 0 ) {
    // 주변 칸들을 여는데 내 옆칸이 빈 칸이면 또 내 옆에 빈 칸을 찾아서 빈 칸을 계속 찾을 것이다. 
    // 여기서 까다로운게 MaxiumCallStack이 나오기 떄문에 조심해야한다.
  } else {

  }

  return {
    ...state,
    tableData,
  }
}
```

#### 2) MineSearch.jsx (OPEN_CELL)
```jsx
case OPEN_CELL : {
  const tableData = [...state.tableData];
  // 불변성을 지키게 위해서 객체를 만들어 줬느데 옆 칸들도 계속 열기 때문에
  // 어떤 칸이 불변성이 안 지킬지지 모르기 때문에 모든 칸을 새로 만들어준다.
  tableData.forEach((row, i) => {
    tableData[i] = [...row];　// 모든 칸들을 새로 객체로 만들어준다
  });
  let around = [];
  if ( tableData[action.row - 1] ) {
    around = around.concat( 
      tableData[action.row - 1][action.cell -1], 
      tableData[action.row - 1][action.cell],
      tableData[action.row - 1][action.cell + 1],
    );
  }
  around = around.concat(
    tableData[action.row][action.cell - 1],
    tableData[action.row][action.cell + 1],
  );
  if ( tableData[action.row + 1] ) {
    around = around.concat(
      tableData[action.row + 1][action.cell -1], 
      tableData[action.row + 1][action.cell],
      tableData[action.row + 1][action.cell + 1],
    );
  }

  const count = around.filter( (v) => 
    [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE]
    .includes(v)).length;
  console.log(around, count);
  tableData[action.row][action.cell] = count; 

  // 위에 까지 count로 주변 갯수가 몇 개인지 확인했는데 주변 갯수가 하나도 없다면!!!!
  if (count === 0 ) {
    // 주변 칸들을 여는데 내 옆칸이 빈 칸이면 또 내 옆에 빈 칸을 찾아서 빈 칸을 계속 찾을 것이다. 
    // 여기서 까다로운게 MaxiumCallStack이 나오기 떄문에 조심해야한다.
  } else {

  }

  return {
    ...state,
    tableData,
  }
}

```

#### 3) MineSearch.jsx (OPEN_CELL)
```jsx
case OPEN_CELL : {
  const tableData = [...state.tableData];
  // 불변성을 지키게 위해서 객체를 만들어 줬느데 옆 칸들도 계속 열기 때문에
  // 어떤 칸이 불변성이 안 지킬지지 모르기 때문에 모든 칸을 새로 만들어준다.
  tableData.forEach((row, i) => {
    tableData[i] = [...row];　// 모든 칸들을 새로 객체로 만들어준다
  });
  const checkAround = (row, cell) => { // 내 기준으로 검사하는 함수 
  // 함수안에 칸들을 넣어주었다.
    let around = [];
    if ( tableData[row - 1] ) { // 매개 변수를 했기 때문에 action. 을 없앤다.
      around = around.concat( 
        tableData[row - 1][cell -1],  // 매개 변수를 했기 때문에 action. 을 없앤다.
        tableData[row - 1][cell], // 매개 변수를 했기 때문에 action. 을 없앤다.
        tableData[row - 1][cell + 1], // 매개 변수를 했기 때문에 action. 을 없앤다.
      ); 
    }
    around = around.concat(
      tableData[row][cell - 1],
      tableData[row][cell + 1],
    );
    if ( tableData[row + 1] ) {
      around = around.concat(
        tableData[row + 1][cell -1], 
        tableData[row + 1][cell],
        tableData[row + 1][cell + 1],
      );
    }

    const count = around.filter( (v) => 
      [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE]
      .includes(v)).length;
    console.log(around, count);
    tableData[action.row][action.cell] = count; 
    if (count === 0 ) {

    } else {

    }
    checkAround(action.row, action.cell);

  };

  return {
    ...state,
    tableData,
  }
}
```

#### 4) MineSearch.jsx (OPEN_CELL)
```jsx
case OPEN_CELL : {
  const tableData = [...state.tableData];
  tableData.forEach((row, i) => {
    tableData[i] = [...row];
  });
  const checkAround = (row, cell) => { // 내 기준으로 검사하는 함수 
    let around = [];
    if ( tableData[row - 1] ) { // 매개 변수를 했기 때문에 action. 을 없앤다.
      around = around.concat( 
        tableData[row - 1][cell -1], 
        tableData[row - 1][cell],
        tableData[row - 1][cell + 1],
      );
    }
    around = around.concat(
      tableData[row][cell - 1],
      tableData[row][cell + 1],
    );
    if ( tableData[row + 1] ) {
      around = around.concat(
        tableData[row + 1][cell -1], 
        tableData[row + 1][cell],
        tableData[row + 1][cell + 1],
      );
    }

    const count = around.filter( (v) => 
      [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE]
      .includes(v)).length;
    console.log(around, count);
    tableData[action.row][action.cell] = count; 
    if (count === 0 ) {
      const near = []; // 모양이 비슷한데 여기에는 주변 칸들을 클릭할 것이다.
      if ( row - 1 > -1 ) { // 제일 위에 클릭한 경우는 내 보다 윗 칸은 없어서 
        // 밑에 부분을 없애준다.
        near.push([row - 1, cell - 1]);
        near.push([row - 1, cell]);
        near.push([row - 1, cell + 1]);
      }
      near.push([row, cell - 1]);
      near.push([row, cell]);
      near.push([row, cell + 1]);
      if ( row - 1 > tableData.length ) { // 제일 아래 칸도 내 보다 더 아래 칸 없으니까
        // 빝에 부분도 없애준다
        near.push([row + 1, cell - 1]);
        near.push([row + 1, cell]);
        near.push([row + 1, cell + 1]);
      }
      near.filter(v => !!v).forEach((n) => {
        checkAround(n[0], n[1]);
      });

    } else {

    }
  };
  checkAround(action.row, action.cell);

  return {
    ...state,
    tableData,
  }
}
```

#### 5) MineSearch.jsx (OPEN_CELL)
```jsx
case OPEN_CELL : {
  const tableData = [...state.tableData];
  tableData.forEach((row, i) => {
    tableData[i] = [...row];
  });
  const checkAround = (row, cell) => { 
    // 클릭하는 기준은 내가 닫힌 칸인 아닌 경우에만 걸러줘야한다.
    if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION]
          .includes(tableData[row][cell])
    ) {
      return; // 지뢰 있는 칸, 열린 칸은 안 열게 해준다.
    }
    // 좌우가 undfined를 여기서 걸러줄것이다. 방금 filter삭제 한 쪽
    // ------>>  여기에 이동한 필터가 이쪽에 온다!!

      // 왜? 옆 쪽 부분은 신경 안 쓰는지?? 이건 자바스크립트 특성이 있다.
    let around = [];
    if ( tableData[row - 1] ) { 
      around = around.concat( 
        tableData[row - 1][cell -1], 
        tableData[row - 1][cell],
        tableData[row - 1][cell + 1],
      );
    }
    around = around.concat(
      // 특히 여기서 윗 칸이 없으면 undefined가 되어서 에러가 나온다.
      // 좌, 우칸이 없으면 undifned가 되어서 filter를 해서 자제적으로 없애준다. 밑쪾에도 설명 똑같이 있다.
      tableData[row][cell - 1],
      tableData[row][cell + 1],
    );
    if ( tableData[row + 1] ) {
      around = around.concat(
        tableData[row + 1][cell -1], 
        tableData[row + 1][cell],
        tableData[row + 1][cell + 1],
      );
    }

    // 여기에서 filter를 해주기 때문에 자동적으로 사라져버린다. filter를 해서 undefined를 사라져버린다.
    const count = around.filter( (v) => 
      [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE]
      .includes(v)).length;
    console.log(around, count);
    tableData[action.row][action.cell] = count; 
    if (count === 0 ) {
      const near = []; 
      if ( row - 1 > -1 ) {
        near.push([row - 1, cell - 1]);
        near.push([row - 1, cell]);
        near.push([row - 1, cell + 1]);
      }
      near.push([row, cell - 1]);
      near.push([row, cell]);
      near.push([row, cell + 1]);
      if ( row - 1 > tableData.length ) {
        near.push([row + 1, cell - 1]);
        near.push([row + 1, cell]);
        near.push([row + 1, cell + 1]);
      }
      // 다시 필터를 여기서 해주는게 아니고 다시 바꾼다. ------>> 이동
      near.forEach((n) => { 
        checkAround(n[0], n[1]); 
      });

    } else {

    }
  };
  checkAround(action.row, action.cell);

  return {
    ...state,
    tableData,
  }
}
```

#### 6) MineSearch.jsx (OPEN_CELL)
```jsx
case OPEN_CELL : {
  const tableData = [...state.tableData];
  tableData.forEach((row, i) => {
    tableData[i] = [...row];
  });
  // 여기에서 중요한게 한 번 검사한 부분은 다시 검사하지 않도록 방지를 해야한다.
  // 그렇지 않다면 콜 스택이 터져버린다. 그래서 캐싱을 해줘야한다.
  // 이 방식이 다이나믹 프로그래밍이랑 비슷하다. 한 번 계산 한 곳은 계산하지 않는다.
  const checked = []; // checked라는 배열을 만들어준다.
  const checkAround = (row, cell) => { 
    if ( [CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell]) ) {
      return; 
    }
    
    // 이 부분이 상하좌우 아닌 경우 필터링
    if ( row < 0 || row > tableData.length || cell < 0 || cell > tableData[0].length ) {
      return;
    }
    // 이미 검사한 칸이면
    if ( checked.includes(row + ',' + cell) ) { // row, cell을 (0, 0) 이런 행식
      return;
      // checked에 검사했면 checked에 넣어준다.
    } else {
      checked.push(row + ',' + cell); 
    }
    

    let around = [];
    if ( tableData[row - 1] ) { 
      around = around.concat( 
        tableData[row - 1][cell -1], 
        tableData[row - 1][cell],
        tableData[row - 1][cell + 1],
      );
    }
    around = around.concat(
      tableData[row][cell - 1],
      tableData[row][cell + 1],
    );
    if ( tableData[row + 1] ) {
      around = around.concat(
        tableData[row + 1][cell -1], 
        tableData[row + 1][cell],
        tableData[row + 1][cell + 1],
      );
    }
    const count = around.filter( (v) => 
      [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE]
      .includes(v)).length;
    console.log(around, count);
    tableData[action.row][action.cell] = count; 
    if (count === 0 ) {
      const near = []; 
      if ( row - 1 > -1 ) {
        near.push([row - 1, cell - 1]);
        near.push([row - 1, cell]);
        near.push([row - 1, cell + 1]);
      }
      near.push([row, cell - 1]);
      near.push([row, cell + 1]);
      if ( row + 1 > tableData.length ) {
        near.push([row + 1, cell - 1]);
        near.push([row + 1, cell]);
        near.push([row + 1, cell + 1]);
      }
      // 위쪽에 코드 바껴진 쪽 보이나요?? 상하좌우 아닌 경우 필터링 쪽에 있다.
      near.forEach((n) => { 
        checkAround(n[0], n[1]); 
      });

    } else {

    }
  };
  checkAround(action.row, action.cell);

  return {
    ...state,
    tableData,
  }
}

```

#### 7) MineSearch.jsx (OPEN_CELL)
```jsx
case OPEN_CELL : {
  const tableData = [...state.tableData];
  tableData.forEach((row, i) => {
    tableData[i] = [...row];
  });
  // 여기에서 중요한게 한 번 검사한 부분은 다시 검사하지 않도록 방지를 해야한다.
  // 그렇지 않다면 콜 스택이 터져버린다. 그래서 캐싱을 해줘야한다.
  // 이 방식이 다이나믹 프로그래밍이랑 비슷하다. 한 번 계산 한 곳은 계산하지 않는다.
  const checked = []; // checked라는 배열을 만들어준다.
  const checkAround = (row, cell) => { 
    if ( [CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell]) ) {
      return; 
    }
    
    // 이 부분이 상하좌우 아닌 경우 필터링
    if ( row < 0 || row > tableData.length || cell < 0 || cell > tableData[0].length ) {
      return;
    }
    // 이미 검사한 칸이면
    if ( checked.includes(row + ',' + cell) ) { // row, cell을 (0, 0) 이런 행식
      return;
      // checked에 검사했면 checked에 넣어준다.
    } else {
      checked.push(row + ',' + cell); 
    }
    

    let around = [];
    if ( tableData[row - 1] ) { 
      around = around.concat( 
        tableData[row - 1][cell -1], 
        tableData[row - 1][cell],
        tableData[row - 1][cell + 1],
      );
    }
    around = around.concat(
      tableData[row][cell - 1],
      tableData[row][cell + 1],
    );
    if ( tableData[row + 1] ) {
      around = around.concat(
        tableData[row + 1][cell -1], 
        tableData[row + 1][cell],
        tableData[row + 1][cell + 1],
      );
    }
    const count = around.filter( (v) => 
      [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE]
      .includes(v)).length;
    console.log(around, count);
    tableData[action.row][action.cell] = count; 
    if (count === 0 ) {
      const near = []; 
      if ( row - 1 > -1 ) {
        near.push([row - 1, cell - 1]);
        near.push([row - 1, cell]);
        near.push([row - 1, cell + 1]);
      }
      near.push([row, cell - 1]);
      near.push([row, cell + 1]);
      if ( row + 1 > tableData.length ) {
        near.push([row + 1, cell - 1]);
        near.push([row + 1, cell]);
        near.push([row + 1, cell + 1]);
      }
      // 위쪽에 코드 바껴진 쪽 보이나요?? 상하좌우 아닌 경우 필터링 쪽에 있다.
      near.forEach((n) => { 
        if ( tableData[n[0][1]] !== CODE.OPENED ) { // 이미 주변 칸이 연 칸이 아니라면
          // 다시 필터링 해준다. 
          // 주변 칸이 닫힐 경우에만 열어준다.
          checkAround(n[0], n[1]); 
        }
      });

    } else {

    }
  };
  checkAround(action.row, action.cell);

  return {
    ...state,
    tableData,
  }
}

```




#### 8) MineSearch.jsx (OPEN_CELL)
```jsx
case OPEN_CELL : {
  const tableData = [...state.tableData];
  tableData.forEach((row, i) => {
    tableData[i] = [...row];
  });
  // 여기에서 중요한게 한 번 검사한 부분은 다시 검사하지 않도록 방지를 해야한다.
  // 그렇지 않다면 콜 스택이 터져버린다. 그래서 캐싱을 해줘야한다.
  // 이 방식이 다이나믹 프로그래밍이랑 비슷하다. 한 번 계산 한 곳은 계산하지 않는다.
  const checked = []; // checked라는 배열을 만들어준다.
  const checkAround = (row, cell) => { 
    if ( [CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell]) ) {
      return; 
    }
    
    // 이 부분이 상하좌우 아닌 경우 필터링
    if ( row < 0 || row > tableData.length || cell < 0 || cell > tableData[0].length ) {
      return;
    }
    // 이미 검사한 칸이면
    if ( checked.includes(row + ',' + cell) ) { // row, cell을 (0, 0) 이런 행식
      return;
      // checked에 검사했면 checked에 넣어준다.
    } else {
      checked.push(row + ',' + cell); 
    }
    

    let around = [];
    if ( tableData[row - 1] ) { 
      around = around.concat( 
        tableData[row - 1][cell -1], 
        tableData[row - 1][cell],
        tableData[row - 1][cell + 1],
      );
    }
    around = around.concat(
      tableData[row][cell - 1],
      tableData[row][cell + 1],
    );
    if ( tableData[row + 1] ) {
      around = around.concat(
        tableData[row + 1][cell -1], 
        tableData[row + 1][cell],
        tableData[row + 1][cell + 1],
      );
    }
    const count = around.filter( (v) => 
      [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE]
      .includes(v)).length;
    console.log(around, count);
    tableData[action.row][action.cell] = count; 
    if (count === 0 ) {
      const near = []; 
      if (row - 1 > -1) {
        near.push([row -1, cell - 1]);
        near.push([row -1, cell]);
        near.push([row -1, cell + 1]);
      }
      near.push([row, cell - 1]);
      near.push([row, cell + 1]);
      if (row + 1 < tableData.length) {
        near.push([row + 1, cell - 1]);
        near.push([row + 1, cell]);
        near.push([row + 1, cell + 1]);
      }
      near.forEach((n) => { 
        if ( tableData[n[0][1]] !== CODE.OPENED ) { 
          checkAround(n[0], n[1]); 
        }
      });

    } else {

    }
  };
  checkAround(action.row, action.cell);

  return {
    ...state,
    tableData,
  }
}

```


#### 9) MineSearch.jsx (OPEN_CELL)

이 부분 틀린 부분인데 나중에 비교해보기!!

```jsx
case OPEN_CELL : {
  const tableData = [...state.tableData];
  tableData.forEach((row, i) => {
    tableData[i] = [...row];
  });
  const checked = []; // checked라는 배열을 만들어준다.
  const checkAround = (row, cell) => { 
    if ( [CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell]) ) {
      return; 
    }
    // 이 부분이 상하좌우 아닌 경우 필터링
    if ( row < 0 || row > tableData.length || cell < 0 || cell > tableData[0].length ) {
      return;
    }
    // 이미 검사한 칸이면
    if ( checked.includes(row + ',' + cell) ) { // row, cell을 (0, 0) 이런 행식
      return;
      // checked에 검사했면 checked에 넣어준다.
    } else {
      checked.push(row + ',' + cell); 
    }
    
    let around = [];
    if ( tableData[row - 1] ) { 
      around = around.concat( 
        tableData[row - 1][cell -1], 
        tableData[row - 1][cell],
        tableData[row - 1][cell + 1],
      );
    }
    around = around.concat(
      tableData[row][cell - 1],
      tableData[row][cell + 1],
    );
    if ( tableData[row + 1] ) {
      around = around.concat(
        tableData[row + 1][cell -1], 
        tableData[row + 1][cell],
        tableData[row + 1][cell + 1],
      );
    }
    const count = around.filter( (v) => // 주변 칸 갯수 세기
      [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE]
      .includes(v)).length;
    console.log(around, count);
    tableData[action.row][action.cell] = count; 
    if (count === 0 ) {
      const near = []; 
      if (row - 1 > -1) {
        near.push([row -1, cell - 1]);
        near.push([row -1, cell]);
        near.push([row -1, cell + 1]);
      }
      near.push([row, cell - 1]);
      near.push([row, cell + 1]);
      if (row + 1 < tableData.length) {
        near.push([row + 1, cell - 1]);
        near.push([row + 1, cell]);
        near.push([row + 1, cell + 1]);
      }
      near.forEach((n) => { 
        if ( tableData[n[0][1]] !== CODE.OPENED ) { 
          checkAround(n[0], n[1]); 
        }
      });

    } else { // else 필요없음

    }
  };
  checkAround(action.row, action.cell);

  return {
    ...state,
    tableData,
  }
}

```

#### 10) MineSearch.jsx (OPEN_CELL)

이게 맞는 경우임
```jsx
case 'OPEN_CELL': {
  const tableData = [...state.tableData];
  tableData.forEach((row, i) => {
    tableData[i] = [...row];
  });
  const checked = [];
  const checkAround = (row, cell) => {
    // 위에 row >= tableData.length 되어 있는데 나중에 수정하기 공부하다가 !!
    if (row < 0 || row > tableData.length || cell < 0 || cell > tableData[0].length) {
      return;
    }
    if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
      return;
    }
    if (checked.includes(row + '/' + cell)) {
      return;
    } else {
      checked.push(row + '/' + cell);
    }
    let around = [
      tableData[row][cell - 1], tableData[row][cell + 1],
    ];
    if (tableData[row - 1]) {
      around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
    }
    if (tableData[row + 1]) {
      around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]]);
    }
    const count = around.filter(function (v) {
      return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
    }).length;
    if (count === 0) { // 주변칸 오픈
      if (row > -1) {
        const near = [];
        if (row - 1 > -1) {
          near.push([row -1, cell - 1]);
          near.push([row -1, cell]);
          near.push([row -1, cell + 1]);
        }
        near.push([row, cell - 1]);
        near.push([row, cell + 1]);
        if (row + 1 < tableData.length) {
          near.push([row + 1, cell - 1]);
          near.push([row + 1, cell]);
          near.push([row + 1, cell + 1]);
        }
        near.filter(v => !!v).forEach((n) => {
          if (tableData[n[0]][n[1]] !== CODE.OPENED) {
            checkAround(n[0], n[1]);
          }
        })
      }
    }
    tableData[row][cell] = count;
  };
  checkAround(action.row, action.cell);
  return {
    ...state,
    tableData,
  };
}

```
