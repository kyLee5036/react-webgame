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