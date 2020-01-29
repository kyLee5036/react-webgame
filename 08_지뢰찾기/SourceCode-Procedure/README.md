+ [createContexnt와 Provider](#createContexnt와-Provider) : 정상
+ [useContext 사용해 지뢰 칸 렌더링](#useContext-사용해-지뢰-칸-렌더링) : 정상
+ [왼쪽 오른쪽 클릭 로직 작성하기](#왼쪽-오른쪽-클릭-로직-작성하기) : 정상
+ [지뢰 개수 표시하기](#지뢰-개수-표시하기) : 정상
+ [빈 칸들 한 번에 열기](#빈-칸들-한-번에-열기) : 뭔가 코드가 이상할 수 있으니까 제로초님 소스 참고
+ [승리 조건 체크와 타이머](#승리-조건-체크와-타이머) : 뭔가 코드가 이상할 수 있으니까 제로초님 소스 참고
+ [Context api 최적화](#Context-api-최적화)

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
  FLAG : -3,            // 깃발
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
  FLAG : -3,            // 깃발
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

## 왼쪽 오른쪽 클릭 로직 작성하기

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
  FLAG : -3,            // 깃발
  QUESTION_MINE : -4,   // 물음표 지뢰
  FLAG_MINE : -5,       // 깃발 지뢰
  CLICKED_MINE : -6,    // 클릭 지뢰
  OPENED : 0,           // 칸을 연칸 : 0 이상이면 전부 OPEND 열리도록 한다. 
}

export const TableContext = createContext({
  tableData: [],
  halted: true,
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
  halted: true, // halted가 '중단된' 의미..
};

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
    case OPEN_CELL : {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED; 
      return {
        ...state,
        tableData,
      }
    }
    case CLICK_MINE: { // 지뢰를 클릭할 경우 게임오버하기위해서 halted를 한다.
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
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
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

const MineSearch = () => {

  const [state, dispatch] = useReducer(reducer, initalState);
  const { tableData, halted, timer, result } = state;

  const value = useMemo(() => (
    { tableData, halted, dispatch }
  ), [tableData, halted]);


  return (
    <>
      <TableContext.Provider value={value}>
        <Form /> 
        <div>{timer}</div>
        <Table />
        <div>{result}</div>
      </TableContext.Provider>
    </>
    
  );
};

export default MineSearch;
```


#### Td.jsx
```jsx
import React, {useContext, useCallback} from 'react';
import { CODE, TableContext, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch';


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

const Td = ({rowIndex, cellIndex}) => {
  const { tableData, dispatch, halted } = useContext(TableContext);
  const onClickTd = useCallback(() => {
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) { 
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
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted] ); 

  const onRightClickTd = useCallback((e) => {
    e.preventDefault(); // 해주는 이유가 오른쪽 클릭하면 창을 안 나오기 위해서이다.
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE: // 지뢰, 보통칸 클릭햇을 때에는 깃발로
        dispatch({ type : FLAG_CELL, row: rowIndex, cell: cellIndex});
        return; // return이든 break이든 끊어줘야 함
      case CODE.FLAG_MINE:
      case CODE.FLAG: // 깃발( 보통, 지뢰)을 클릭했을 때에는 물음표로
        dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
        return; // return이든 break이든 끊어줘야 함
      case CODE.QUESTION:
      case CODE.QUESTION_MINE: // 물음표( 보통, 지뢰)을 클릭했을 때에는 물음표로
        dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
        return; // return이든 break이든 끊어줘야 함
      default:
        return; // return이든 break이든 끊어줘야 함
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  return (
    <td
      style={ getTdStyle(tableData[rowIndex][cellIndex]) }
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    > { getTdText(tableData[rowIndex][cellIndex]) } </td> 
  )
  
}

export default Td;
```

## 지뢰 개수 표시하기

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
  FLAG : -3,            // 깃발
  QUESTION_MINE : -4,   // 물음표 지뢰
  FLAG_MINE : -5,       // 깃발 지뢰
  CLICKED_MINE : -6,    // 클릭 지뢰
  OPENED : 0,           // 칸을 연칸 : 0 이상이면 전부 OPEND 열리도록 한다. 
}

export const TableContext = createContext({
  tableData: [],
  halted: true,
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
  halted: true, // halted가 '중단된' 의미..
};

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

      const count = around.filter( (v) => 
        [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE]
        .includes(v)).length;
      console.log(around, count);
      tableData[action.row][action.cell] = count; 

      return {
        ...state,
        tableData,
      }
    }
    case CLICK_MINE: { // 지뢰를 클릭할 경우 게임오버하기위해서 halted를 한다.
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
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
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

const MineSearch = () => {

  const [state, dispatch] = useReducer(reducer, initalState);
  const { tableData, halted, timer, result } = state;

  const value = useMemo(() => (
    { tableData, halted, dispatch }
  ), [tableData, halted]);


  return (
    <>
      <TableContext.Provider value={value}>
        <Form /> 
        <div>{timer}</div>
        <Table />
        <div>{result}</div>
      </TableContext.Provider>
    </>
    
  );
};

export default MineSearch;
```


#### Td.jsx
```jsx
import React, {useContext, useCallback} from 'react';
import { CODE, TableContext, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch';


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
  }
};

const Td = ({rowIndex, cellIndex}) => {
  const { tableData, dispatch, halted } = useContext(TableContext);
  const onClickTd = useCallback(() => {
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) { 
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
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted] ); 

  const onRightClickTd = useCallback((e) => {
    e.preventDefault(); // 해주는 이유가 오른쪽 클릭하면 창을 안 나오기 위해서이다.
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE: // 지뢰, 보통칸 클릭햇을 때에는 깃발로
        dispatch({ type : FLAG_CELL, row: rowIndex, cell: cellIndex});
        return; // return이든 break이든 끊어줘야 함
      case CODE.FLAG_MINE:
      case CODE.FLAG: // 깃발( 보통, 지뢰)을 클릭했을 때에는 물음표로
        dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
        return; // return이든 break이든 끊어줘야 함
      case CODE.QUESTION:
      case CODE.QUESTION_MINE: // 물음표( 보통, 지뢰)을 클릭했을 때에는 물음표로
        dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
        return; // return이든 break이든 끊어줘야 함
      default:
        return; // return이든 break이든 끊어줘야 함
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  return (
    <td
      style={ getTdStyle(tableData[rowIndex][cellIndex]) }
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    > { getTdText(tableData[rowIndex][cellIndex]) } </td> 
  )
  
}

export default Td;
```


## 빈 칸들 한 번에 열기

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
  FLAG : -3,            // 깃발
  QUESTION_MINE : -4,   // 물음표 지뢰
  FLAG_MINE : -5,       // 깃발 지뢰
  CLICKED_MINE : -6,    // 클릭 지뢰
  OPENED : 0,           // 칸을 연칸 : 0 이상이면 전부 OPEND 열리도록 한다. 
}

export const TableContext = createContext({
  tableData: [],
  halted: true,
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
  halted: true, // halted가 '중단된' 의미..
};

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
      halted: false, 
    };


    case 'OPEN_CELL': {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = [];
      const checkAround = (row, cell) => {
        if (row < 0 || row > tableData.length || cell < 0 || cell > tableData[0].length) {
          return;
        } 
        // 상하좌우 없는 칸은 안 열기
        if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
          return;
        } 
        // 닫힌 칸만 열기
        if (checked.includes(row + '/' + cell)) {
          return;
        } 
        // 한번 연 칸은 무시하기
        else { 
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


    case CLICK_MINE: { 
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
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
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

const MineSearch = () => {

  const [state, dispatch] = useReducer(reducer, initalState);
  const { tableData, halted, timer, result } = state;

  const value = useMemo(() => (
    { tableData, halted, dispatch }
  ), [tableData, halted]);


  return (
    <>
      <TableContext.Provider value={value}>
        <Form /> 
        <div>{timer}</div>
        <Table />
        <div>{result}</div>
      </TableContext.Provider>
    </>
    
  );
};

export default MineSearch;
```

## 승리 조건 체크와 타이머

#### MineSearch.jsx

```jsx
import React, {useReducer, createContext, useMemo, useEffect} from 'react';
import Table from './Table';
import Form from './Form';

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
}

export const TableContext = createContext({
  tableData: [],
  halted: true,
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
  data : {
    row : 0,
    cell : 0,
    mine : 0,
  },
  timer: 0,
  result: '',
  halted: true, // halted가 '중단된' 의미..
  openedCount : 0, // 칸을 몇개를 열었는지 체크하는 거
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: 
    return { 
      ...state,
      data : {
        row : action.row,
        cell : action.cell,
        mine : action.mine,
      }, 
      tableData : plantMine(action.row, action.cell, action.mine),
      halted: false, 
      openedCount : 0,
      timer : 0, 
    };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = [];
      let openedCount = 0;
      const checkAround = (row, cell) => {
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
        if ( tableData[row][cell] === CODE.NORMAL) { 
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };
      checkAround(action.row, action.cell);
      let halted = false;
      let result = '';
      console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount + openedCount)
      if ( state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
        halted = true;
        result = `${state.timer} 승리하셨습니다`;
      }
      return {
        ...state,
        tableData,
        openedCount : state.openedCount + openedCount, 
        halted,
        result,
      };
    }

    case CLICK_MINE: { 
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
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
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

    case INCREMENT_TIMER : {
      return {
        ...state,
        timer : state.timer + 1,
      }
    }

    default:
      return state;
  }
};

const MineSearch = () => {

  const [state, dispatch] = useReducer(reducer, initalState);
  const { tableData, halted, timer, result } = state;

  const value = useMemo(() => (
    { tableData, halted, dispatch }
  ), [tableData, halted]);

  useEffect(() => {
    let timer;
    if ( halted === false ) { // 중단이 풀렸을 때 게임이 시작한다.
      timer = setInterval(() => {
        dispatch( { type : INCREMENT_TIMER })
      }, 1000)
    }
    return () => {
      clearInterval(timer);
    }
  }, [halted]);


  return (
    <>
      <TableContext.Provider value={value}>
        <Form /> 
        <div>{timer}</div>
        <Table />
        <div>{result}</div>
      </TableContext.Provider>
    </>
    
  );
};

export default MineSearch;
```


## Context api 최적화

#### Form.jsx
```jsx
import React, {useState, useCallback, useContext, memo} from 'react';
import {TableContext, START_GAME} from './MineSearch'

// dispatch를 context-api를 통해서 가져오기
const Form = memo(() => {
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
});

export default Form;
```


#### Table.jsx
```jsx
import React, {useContext, memo} from 'react';
import Tr from './Tr';
import { TableContext } from './MineSearch';

const Table = memo(() => {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      { Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />) }
    </table>
  )
});

export default Table;
```


#### Tr.jsx
```jsx
import React, {useContext, memo} from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      { tableData[0] && Array(tableData[0].length).fill().map((td, i) => 
      <Td rowIndex={rowIndex} cellIndex={i}/>
      ) }
    </tr>
  )
  
});

export default Tr;


```


#### Td.jsx
```jsx
import React, {useContext, useCallback, memo, useMemo} from 'react';
import { CODE, TableContext, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch';


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
        };
    default: 
      return {
        background: 'white',
      };
  }
};

const getTdText = (code) => {
  console.log('getTdText');
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
  }
};

const Td = ({rowIndex, cellIndex}) => {
  const { tableData, dispatch, halted } = useContext(TableContext);
  const onClickTd = useCallback(() => {
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) { 
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
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted] ); 

  const onRightClickTd = useCallback((e) => {
    e.preventDefault(); // 해주는 이유가 오른쪽 클릭하면 창을 안 나오기 위해서이다.
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE: // 지뢰, 보통칸 클릭햇을 때에는 깃발로
        dispatch({ type : FLAG_CELL, row: rowIndex, cell: cellIndex});
        return; // return이든 break이든 끊어줘야 함
      case CODE.FLAG_MINE:
      case CODE.FLAG: // 깃발( 보통, 지뢰)을 클릭했을 때에는 물음표로
        dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
        return; // return이든 break이든 끊어줘야 함
      case CODE.QUESTION:
      case CODE.QUESTION_MINE: // 물음표( 보통, 지뢰)을 클릭했을 때에는 물음표로
        dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
        return; // return이든 break이든 끊어줘야 함
      default:
        return; // return이든 break이든 끊어줘야 함
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  console.log('td rendered');

  return useMemo(() => (
    <RealTd onContextMenu={onRightClickTd} onClickTd={onClickTd} cell={tableData[rowIndex][cellIndex]} />
  ), [tableData[rowIndex][cellIndex]]);
  
};

const RealTd = memo(({ cell, onRightClickTd, onClickTd }) => {
  console.log('rendered');
  return (
    <td
      onClick={onClickTd}
      style={getTdStyle(cell)}
      onContextMenu={onRightClickTd}
    >{getTdText(cell)}</td>
  )
});

export default Td;
```