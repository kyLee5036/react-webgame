import React from 'react';
import Tr from './Tr'

const Table = ( {onclick, tableData} ) => {
  return (
    <table onClick={onclick}>
      {Array(tableData.length).fill().map((tr, i) => (<Tr rowDate={tableData[i]} />))}
    </table>
  )
}

export default Table;