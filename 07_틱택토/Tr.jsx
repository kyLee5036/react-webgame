import React from 'react';
import Td from './Td'

const Tr = ({rowData}) => {
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (<Td key={i}>{''}</Td>) )}
    </tr>
    
  );
};

export default Tr;