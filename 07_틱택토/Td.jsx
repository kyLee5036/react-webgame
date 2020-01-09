// 첫 번째로 만들기
import React, {useCallback } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToeHooks';

const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    dispatch({ // 액션은 마음대로 만들어도 상관없는데 reducer에서 잘 처리해줘야한다.
      type: CLICK_CELL, row: rowIndex, cell: cellIndex
    });
    dispatch({
      type: CHANGE_TURN
    });
    
  }, []);

  return (
    <td onClick={onClickTd}>{cellData}</td>
  );
};

export default Td;