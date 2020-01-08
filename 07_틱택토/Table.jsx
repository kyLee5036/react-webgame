import React from 'react';
import Tr from './Tr'

const Table = ( {onclick, tableData} ) => {
  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => (<Tr key={i} rowData={tableData[i]} />))}
    </table>
  );
};

export default Table;