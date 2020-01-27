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