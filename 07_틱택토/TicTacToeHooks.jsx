import React, {useEffect, useReducer, useCallback} from 'react';
import Table from './Table';

const initalState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1]
};
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN'
export const RESET_GAME = 'RESET_GAME';

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
        recentCell: [action.row, action.cell],
        
      };
    }
    case CHANGE_TURN: { // 'O'면 'X'로 바꿔주고, 'X'면 'O'로 바꿔준다
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
    }
    case RESET_GAME : {
      return {
        ...state,
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        turn: 'O',
        recentCell: [-1, -1]
      }
    }
    
  }
}

const TicTacToeHooks = () => {

  const [state, dispatch] = useReducer(reducer, initalState)
  const { tableData, turn, winner, recentCell } = state; 

  const onClickTable = useCallback(() => {
    dispatch({
      type: SET_WINNER, winner:'O'
    })
  }, []);


  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }

    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) { // 가로줄 검사
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) { // 세로줄 검사
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) { // 대각선 검사
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) { // 대각선 검사
      win = true;
    }
    console.log(win, row, cell, tableData, turn);
    if ( win) { // 승리 할 경우
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME});

    } else { 
      let all = true; // 일단 칸들이 다 있는지를 확인해준다. all이 true면 무승부라는 의미
      tableData.forEach((row) => { // 무승부 일 경우
        row.forEach((cell) => {
          if(!cell) { // all이 하나라도 안 찼는 칸이 있으면 무승부이다.
            all = false;
          }
        });
      });
      if ( all ) { // 무승부라면 리셋을 해준다.
        dispatch({ type: RESET_GAME});
      } else {
        dispatch({ // 무승부가 아니라면, 턴을 넘겨준다.
          type: CHANGE_TURN
        });
      }
    }

  }, [recentCell]) // 클릭한 셀이 바뀔 때마다

  return (

    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/> 
      {winner && <div> {winner} 님의 승리</div>} 
    </>
  );
};


export default TicTacToeHooks;