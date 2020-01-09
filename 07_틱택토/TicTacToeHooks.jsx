import React, {useState, useReducer, useCallback} from 'react';
import Table from './Table';

const initalState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
};
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 이렇게 하면 안됨.
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL: {// 클릭한 셀에서 tableData의 안에 O,X를 넣어줘야한다.
      const tableData = [...state.tableData]; // 먼저 얕은 복사를 해준다.
      tableData[action.row] = [...tableData[action.row]];// 또 얕은복사를 해준다 
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        
      };
    }
    case CHANGE_TURN: { // 'O'면 'X'로 바꿔주고, 'X'면 'O'로 바꿔준다
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
    }
  }
}

const TicTacToeHooks = () => {
  // const [winner, setWinner] = useState(''); // 승자를 만들어주고
  // const [turn, setTurn] = useState(''); // 처음에는 O 턴 다음에는 X 턴
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]); // 이차원 배열로 3X3 만들어 준다.

  const [state, dispatch] = useReducer(reducer, initalState)

  const onClickTable = useCallback(() => {
    dispatch({
      type: SET_WINNER, winner:'O'
    })
  }, []);


  return (

    <>
      <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/> 
      {state.winner && <div> {state.winner} 님의 승리</div>} 
    </>
  );
};


export default TicTacToeHooks;