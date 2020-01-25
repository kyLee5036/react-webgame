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