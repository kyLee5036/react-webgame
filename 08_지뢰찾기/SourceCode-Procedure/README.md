+ [createContexnt와 Provider](#createContexnt와-Provider)
+ [useContext 사용해 지뢰 칸 렌더링](#useContext-사용해-지뢰-칸-렌더링)


## createContexnt와 Provider
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

  const value = useMemo(() => (
    { tableData : state.tableData, dispatch }
  ), [state.tableData]);

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

## useContext 사용해 지뢰 칸 렌더링

#### MineSearch.jsx
```jsx
import React, {useReducer, createContext, useMemo} from 'react';
import Table from './Table';
import Form from './Form';

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
}

export const TableContext = createContext({
  tableData: [], // 원 상태로 복구함!!!!
  dispatch: () => {},
});

// 지뢰를 심는 함수
const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candiate = Array(row*cell).fill().map((arr, i) => { // 0 ~ 99 칸
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

  const value = useMemo(() => (
    { tableData : state.tableData, dispatch }
  ), [state.tableData]);

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

#### Table.jsx
```jsx
import React, {useContext} from 'react';
import Tr from './Tr';
import { TableContext } from './MineSearch';

const Table = () => {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      { Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />) }
    </table>
  )
  
}

export default Table;
```

#### Tr.jsx
```jsx
import React, {useContext} from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

const Tr = ({ rowIndex }) => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      { tableData[0] && Array(tableData[0].length).fill().map((td, i) => 
      <Td rowIndex={rowIndex} cellIndex={i}/>
      ) }
    </tr>
  )
  
}

export default Tr;
```

#### Td.jsx
```jsx
import React, {useContext} from 'react';
import { CODE, TableContext } from './MineSearch';

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

const Td = ({rowIndex, cellIndex}) => {
  const { tableData } = useContext(TableContext); 
  return (
    <td
      style={ getTdStyle(tableData[rowIndex][cellIndex]) }
    > { getTdText(tableData[rowIndex][cellIndex]) } </td> 
  )
  
}

export default Td;
```
