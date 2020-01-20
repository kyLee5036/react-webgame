// 첫 번째로 만들기
import React, {useCallback, useEffect, useRef } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToeHooks';

const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {


  // 리렌더링 파악하는 방법
  // 여기서 보면 true true true false 가 나오면다면 cellData의 쪽이 바뀌고 있는 것이다.
  const ref = useRef([]);
  useEffect(() => {
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3] );
    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData]);
  // 사실 React.memo를 적용하는게 훨 나을수도있다. 위에 것은 참고 하면된다.
  // 자식 컴포넌트 memo적용하면 부모도 memo적용할 수 있다.

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);

    if ( cellData ) {
      return;
    }

    dispatch({ 
      type: CLICK_CELL, row: rowIndex, cell: cellIndex
    });
    
  }, [cellData]);

  return (
    <td onClick={onClickTd}>{cellData}</td>
  );
};

export default Td;