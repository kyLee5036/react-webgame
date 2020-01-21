import React, {useReducer} from 'react';
import Table from './Table';
import Form from './Form';

const initalState = {
  tableData: [],
  timer: 0,
  result: '',
};

const reducer = (state, action) => {
  switch (action.type) {
  
    default:
      return state;
  }
};

const MineSearch = () => {

  const [state, dispatch] = useReducer(reducer, initalState);

  return (
    <>
      <Form /> // Form에다가 dispatch를 넘겨준다.
      원래였으면 <Form dispatch={dispatch} /> 이였는데, 이번에서 context-api를 사용할 것이다.
      // context-api를 사용하면 그 아래에 있는 어떠한 컴포넌트 값을 바로 받을 수 있다.
      // 부모 컴포넌트를 거치지 않고 바로바로 값을 받을 수 있다는 장점이 있다.
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </>
    
  );
};

export default MineSearch;