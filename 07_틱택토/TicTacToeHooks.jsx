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

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 이렇게 하면 안됨.
      return {
        ...state,
        winner: action.winner,
      };
  }
}

const TicTacToeHooks = () => {
  // const [winner, setWinner] = useState(''); // 승자를 만들어주고
  // const [turn, setTurn] = useState(''); // 처음에는 O 턴 다음에는 X 턴
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]); // 이차원 배열로 3X3 만들어 준다.

  const [state, dispatch] = useReducer(reducer, initalState)

  const onClickTable = useCallback(() => {
    dispatch({
      type: SET_WINNER, winner:'o'
    })
  }, []);


  return (

    <>
      <Table onClick={onClickTable} tableData={state.tableData} /> 
      {state.winner && <div> {state.winner} 님의 승리</div>} 
    </>
  );
};


export default TicTacToeHooks;