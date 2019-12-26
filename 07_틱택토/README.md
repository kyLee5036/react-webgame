# 틱택토

+ [택택토와 useReducer 소개](#택택토와-useReducer-소개)

여기서부터는 class를 안 만들고 Hooks로!!!

## 택택토와 useReducer 소개

<strong>useReducer</strong>를 배우면 <strong>리액트에서 비슷한 리덕스 효과</strong>를 낼 수 있다.<br>
그래서, 리액트에서 리덕스의 핵심부분을 가져와서 useReducer를 사용하고있다.<br>
좋은 점 : useReducer를 사용하면 context-api로 대체할 수 있다.<br>
소규모앱에서는 리덕스를 사용하지 않고 useReducer랑 context-api 대체할 수 있다. <br>
> 하지만, 규모가 큰 앱이면 비동기 부분 처리를 위해 결국 리덕스를 사용해야 한다. <br>

결국에는 useReducer로 어느정도 리덕스를 흉내낼 것이다.<br><br>

순서를 정해야 하는데 먼저, 틀부터 잡을 것이고, <br>
이번부터는 테이블 안에 tr(row), td(cell) 구조라서 컴포넌트를 잘게 나눌 것이다.<br>
table.jsx, td.jsx, td.jsx를 만들어 준다.<br>
제일 작은 것부터 td부터 만드는 것이 편하다.<br>
쪼갤 수 있는대로 쪼개야만 <strong>성능최적화</strong>하기가 쉬워진다.<br><br>

#### 1) TicTacToeHooks.jsx (변수 설정) 
```jsx 
import React, {useState} from 'react';
import Table from './table';
const TicTacToeHooks = () => {
  const [winner, setWinner] = useState(''); // 승자를 만들어주고
  const [turn, setTurn] = useState(''); // 처음에는 O 턴 다음에는 X 턴
  const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]); // 이차원 배열로 3X3 만들어 준다.


...생략 
  return (
    // tr, td, table를 각각의 컴포넌트를 사용 할 것이다
    <>
      {/* 마지막으로 테이블을 불러온다 */}
      <div>여기에 테이블을 불러올 것이다.!!!</div>
      {/* 결과창 */}
      {winner && <div>{winner} 님의 승리</div>} 
    </>
  );
}
```

#### 2) td.jsx
```jsx
import React from 'react';

const Td = () => {
  return (
    <td>{''}</td>
  )
};

export default Td;
```

#### 3) tr.jsx (두 번째로 만들기)
```jsx
import React from 'react';
import Td from './td' // 해주는 것 빼먹지 말고!!

const Tr = () => {
  return (
    <Td>{''}</Td>
  )
}

export default Tr;
```

#### 4) table.jsx (세 번째로 만들기)
```jsx
import React from 'react';
import Tr from './tr' // 해주는 것 빼먹지 말고!!

const Table = () => {
  return (
    <Tr>{''}</Tr>
  )
}

export default Table;
```

#### 5) TicTacToeHooks.jsx ( 1) 수정 )
```jsx 
import React, {useState, useReducer} from 'react';
import Table from './table';
const TicTacToeHooks = () => {
  const [winner, setWinner] = useState(''); // 승자를 만들어주고
  const [turn, setTurn] = useState(''); // 처음에는 O 턴 다음에는 X 턴
  const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]); // 이차원 배열로 3X3 만들어 준다.


...생략 
  return (
    // tr, td, table를 각각의 컴포넌트를 사용 할 것이다
    <>
      {/* 마지막으로 테이블을 불러온다 */}
      <Table />
      {/* 결과창 */}
      {winner && <div>{winner} 님의 승리</div>} 
    </>
  );
}
```

#### 6) TicTacToeHooks.jsx ( 1) 수정 )
```jsx
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
  // useReducer 적용 전
  // const [winner, setWinner] = useState(''); 
  // const [turn, setTurn] = useState(''); 
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]); 

  // useReducer 적용 후
  const [state, dispatch] = useReducer(reducer, initalState)
  // 세 번째 인자도 있다. 하지만, 지연초기화라서 거의 사용하지 않는다 (복잡할 때 사용한다.)
  // initalState에는 state를 넣어준다.
  // reducer는 함수이다. 

  return (
    <>
      <Table />
      {winner && <div>{winner} 님의 승리</div>} 
    </>
  );
};

export default TicTacToeHooks;
```

여기에서는 state를 줄이는 것이다. <strong>state가 점점 늘어나면 관리하기 힘들어지기 때문에 useReducer</strong>라는 것을 사용할 것이다. <br>
useReducer를 선언 시에는 <strong>initalState(변수설정), reducer(함수)</strong>를 넣어줄 것이다. ( 이름(initalState, reducer)은 멋대로 해도 상관없음 )<br>
initalState에는 state를 넣어준다.<br>
reducer는 함수이다.<br><br>
 
잠깐!!<br>
지금까지 useState를 나눠서 만들었다. 하지만 여기에서는 구조가 4단 TicTacToeHooks-> table -> tr -> td로 되어있다.<br>
여기서 실제로 클릭하는 것은 td이다. td를 TicTacToeHooks에 전달할려면 2단을 거쳐가야한다.<br>
이런 해결하기 위해서는 context-api를 사용하는데 다음시간(지뢰찾기에서 공부한다.)<br>


