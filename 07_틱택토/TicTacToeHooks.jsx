import React, {useState, useReducer} from 'react';
import Table from './table';

const initalState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
};

// reducer는 두 개의 매개변수 인자를 받는다.
const reducer = (state, action) => {
  // state를 어떻게 바꿀지 적어준다.
}

const TicTacToeHooks = () => {
  const [winner, setWinner] = useState(''); // 승자를 만들어주고
  const [turn, setTurn] = useState(''); // 처음에는 O 턴 다음에는 X 턴
  const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]); // 이차원 배열로 3X3 만들어 준다.

  // 지금까지 useState를 나눠서 만들었다. 하지만 여기에서는 구조가 4단 TicTacToeHooks-> table -> tr -> td로 되어있다.
  // 하지만 실제로 클릭하는 것은 td이다. td를 TicTacToeHooks에 전달할려면 2단을 거쳐가야한다.
  // 이런 해결하기 위해서는 context-api를 사용하는데 다음시간(지뢰찾기에서 공부한다.)
  // 여기에서는 state를 줄이는 것을 할것이다. state가 점점 늘어나면 관리하기 힘들어질 것이다. 
  // 그래서 여기서 useReducer라는 것을 사용할 것이다. 

  // useReducer 작용 후
  const [state, dispatch] = useReducer(reducer, initalState)
  // 세 번째 인자는 지연초기화인데 거의 사용하지 않는다 (복잡할 때 사용한다.)
  // initalState는 state를 넣어준다.
  // reducer는 함수이다. 

  return (
    // tr, td, table를 각각의 컴포넌트를 사용 할 것이다

    <>
      {/* 마지막으로 테이블을 불러온다 */}
      <Table />
      {/* 결과창 */}
      {winner && <div>{winner} 님의 승리</div>} 
    </>
  );
};


export default TicTacToeHooks;