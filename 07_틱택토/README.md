# 틱택토

+ [택택토와 useReducer 소개](#택택토와-useReducer-소개)
+ [reducer, action, dispatch의 관계](#reducer,-action,-dispatch의-관계)
+ [action 만들어 dispatch 하기](#action-만들어-dispatch-하기)
+ [틱택토 구현하기](#틱택토-구현하기)

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

#### 6) TicTacToeHooks.jsx ( useState를 useReducer로 수정 )

먼저, useReducer를 선언해주고, reducer,
initalState에 차근차근 데이터를 넣어준다.

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


## reducer, action, dispatch의 관계

state에 접근하는 방법

#### 1) state에 접근
```jsx 
{state.winner && <div>{state.winner} 님의 승리</div>} 
 ```


#### 2) dispatch 적용하기
 ```jsx
export const SET_WINNER = 'SET_WINNER';

const onclickTable = useCallback( () => {
    // dispatch에 안에 들어가는 것을 action이라고 한다.
    // action 객체를 만들어 줘야한다.
    // dispatch를 하면 action을 실행한다.
    // action을 해석해서 state를 바꿔주는 역할이 필요한데 그게 위에 있는 reducer이다. 다음에는 reducer에 추가를 해준다.
    dispatch({
      type: SET_WINNER, winner:'o'
    })
  }, [] );

return (
    <>
      {/* 테이블 클릭 시 */}
      <Table onClick={onclickTable}/> 
      {state.winner && <div>{state.winner} 님의 승리</div>} 
    </>
  );
 ```


#### 3) reducer도 같이 추가하기
reducer도 추가해준다.
```jsx
const reducer = (state, action) => {
  // action의 type별로 구분을 할 것이다.
  switch(action.type) {
    case SET_WINNER: 
    // state.winner = action.winner; 이렇게 직접바꾸면 안된다.
    // 새로운 객체를 만들어서 바뀐 값만 바꿔줘야한다. spread문법
    // 기존 state를 직접 바꾸는게 아니라 새로운 state만 바꿔주는 것이다.
      return {
        ...state,
        winner: action.winner,    
      }
  }
}
 ```

#### 4) table.jsx - 클릭 동작확인하기
table에 클릭해서 action이 잘 작동하는지 확인하려고 한다.
```jsx
const Table = ( {onclick} ) => {
  return (
    <table onClick={onclick}>
      <Tr>{''}</Tr>
    </table>
  )
}
 ```


#### 5) table.jsx - 행,열 중에서 열 3개가 잘 나오는 지 확인하기
table에 클릭이랑 1열 3개가 세로로 3개가 잘 나오는지 확인하려고 한다.
```jsx
// onclick은 TicTacToeHooks의 Table에서 onlick을 넘겨줬으니까 필요하다.
const Table = ( {onclick, tableData} ) => {
  return (
    <table onClick={onclick}>
      {Array(tableData.length).fill().map((tr) => (<Tr />))}
    </table>
  )
}
 ```

#### 6) Tr.jsx
```jsx
const Tr = () => {
  return (
    <tr>
      <Td>{''}</Td>
    </tr>
  ) 
}
 ```
 
 각각의 tr에서 td도 3개를 만들어줘야한다.

#### 7) Table.jsx - 3x3 테이블 적용하기
```jsx
// tableData가
// tableData: [
//     ['', '', ''], 1열이 rowData
//     ['', '', ''],
//     ['', '', ''],
//   ], // 이렇게 생겼음

const Table = ( {onclick, tableData} ) => {
  return (
    <table onClick={onclick}>
      {Array(tableData.length).fill().map((tr, i) => (<Tr rowData={tableData[i]} />))}
    </table>
  )
}
 ```

#### 8) Tr.jsx - 3x3 테이블 적용하기
```jsx
const Tr = ({rowData}) => {
  return (
    <tr>
      {Array(rowData.length).fill().map((td) => (<Td>{''}</Td>) )}
    </tr>
  ) 
}
 ```

## action 만들어 dispatch 하기

> 1. td 클릭시 몇번 째 줄, 칸 console.log에서 알아내기 - (1,2,3,4)
> 2. 턴 바꾸기 (O, X 번갈아가면서) - (5,6,7,8,9)

#### 1) Td.jsx 

```jsx
const Td = () => {
  const onClickTd = () => {
    
  }
  return (
    <td onClick={onClickTd}>{''}</td>
  );
};
```


#### 2) Table.jsx

```jsx
const Table = ( {onclick, tableData} ) => {
  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => (<Tr key={i} rowIndex={i} rowData={tableData[i]} />))}
    </table>
  );
};
```
테이블에서 몇번 째 <strong>줄</strong>을 나타내기 위해서 <strong>rowIndex</strong>에 'i'를 사용하고 rowIndex로 값을 넘겨준다.<br>
i에 [0,1,2]가 들어있다.<br>
위에 보면 Table의 onclick 이제부터 사용하지 않으니까 삭제해도 된다.

#### 3) Tr.jsx
```jsx
const Tr = ({rowData, rowIndex}) => {
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (<Td key={i} rowIndex={rowIndex} cellIndex={i} >{''}</Td>) )}
    </tr>
  );
};
```
테이블에서 몇번 째 <strong>칸</strong>을 나타내기 위해서 <strong>cellIndex</strong>를 하고, Table컴포넌트에서도 rowIndex도 꼭 받아야한다. (줄, 칸)<br>
그러면 Td컴포넌트에서 rowIndex, cellIndex를 사용할 수가 있다.<br>
rowIndex는 Table컴포넌트에서 데이터를 받아온다. cellIndex은 Tr컴포넌트에서 생성해준다.

#### 4) Td.jsx
```jsx
const Td = ({rowIndex, cellIndex}) => {

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex)
  }, []);

  return (
    <td onClick={onClickTd}>{''}</td>
  );
};
```
Td컴포넌트에 파라미터 안에 rowIndex, cellIndex를 받아오고, console.log로 확인하면 테이블에 몇번 째 칸, 몇번 째 줄을 알 수가 있다.<br>

여기까지 기본적인 테이블 행,렬 위치를 알 수가 있게된다.


#### 5) TicTacToeHooks.jsx

클릭 시 이벤트를 나타내기 위해서 CLICK_CELL을 추가한다.
```jsx
export const CLICK_CELL = 'CLICK_CELL';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 이렇게 하면 안됨.
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL: {// 클릭한 셀에서 tableData의 안에 O,X를 넣어줘야한다.
      // 불변성을 지켜야하기 때문에, 바꾸고 싶은 부분만 바꿔줘야한다.
      const tableData = [...state.tableData]; // 먼저 얕은 복사를 해준다.
      tableData[action.row] = [...tableData[action.row]];// 또 얕은복사를 해준다 
      // action.row는 TD에서 넣어줬던 dispatch의 row 값이다
      // 결국엔, 불변성 지켜야하는데 단점이다. 나중에 immer라는 라이브러리가 있는데 가독성문제를 해결해준다.
      tableData[action.row][action.cell] = state.turn;
      // 코드가 지저분하기 때문에 immer라는 라이브러리가 나중에 정리한다.
      return {
        ...state,
        tableData,
        
      };
    }
  }
}
```
얕은 복사를 2번이나 해야하는 번거러움이 있긴한데, (리액트의 불변성을 위해서) immer라는 라이브러리를 사용하면 이렇게 안해도 된다.

#### 6) TicTacToeHooks.jsx
```jsx
export const CHANGE_TURN = 'CHANGE_TURN'
const reducer = (state, action) => {
  switch (action.type) {
  case CHANGE_TURN: { // 'O'면 'X'로 바꿔주고, 'X'면 'O'로 바꿔준다
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
    }
  }
}
return (
  <>
    <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/> 
  </>
);
```

테이블에서 dispatch={dispatch}를 넘겨줘야한다.<br>
```jsx
  <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/> 
```
Td에도 dispatch를 사용하기 위해서는 Table, Tr에도 dispatch를 사용해줘야한다.<br>
dispatch를 일일히 다 넘겨주는게 귀찮은데, 여기서 해결하기위해서는 context-api를 나중에 사용한다.<br>
onClickTable설명은 전 강의설명에 적혀져있다. 헷갈리지 말 것!!


#### 7) Table.jsx

TicTacToeHooks의 dispatch를 받아와야한다. 
```jsx
const Table = ( {tableData, dispatch} ) => {
  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => (
        <Tr key={i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch} />
      ))}
    </table>
  );
};
```

#### 8) Tr.jsx
Table의 dispatch를 받아와야한다. (귀찮구먼... 뭐.. 좋은게 없을까?? context-api가 있으면 좋긴한데..)
```jsx
const Tr = ({rowData, rowIndex, dispatch}) => {
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (
        <Td key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch}>{''}</Td>
      ))}
    </tr>
  );
};
```


#### 9) Td.jsx
Tr의 dispatch를를 받아와야한다. (귀찮구먼... 뭐.. 좋은게 없을까?? context-api가 있으면 좋긴한데..)
```jsx
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
```

## 틱택토 구현하기

한 번 눌렀던 칸은 못 눌러오기
승자, 패자 판단하기


「한 번 눌렀던 칸은 못 눌러오기」

#### 1) Td.jsx
```jsx
const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);

    // 이미 cellData가 있으면, return 끊어버린다.
    // 즉, cellData에 값이 있으면, return으로 다음 거 실행안하게 해준다.
    if ( cellData ) {
      return;
    }

    // usereducer는 state가 비동기적으로 바뀐다.
    // 그래서 비동기 state를 처리할 때에는 useEffect로 처리해야한다.

    dispatch({ // 액션은 마음대로 만들어도 상관없는데 reducer에서 잘 처리해줘야한다.
      type: CLICK_CELL, row: rowIndex, cell: cellIndex
    });
    dispatch({
      type: CHANGE_TURN
    });
    
    // cellData의 값이 바뀌니까 배열안에 cellData를 넣어준다.
  }, [cellData]);
```

### useReducer의 state비동기 처리방법 -> useEffect사용할 것!! 
> <strong>useReducer</strong>는 state가 비동기적으로 바뀐다.<br>
> 그래서 비동기 state를 처리할 때에는 <strong>useEffect</strong>로 처리해야한다.<br>

#### 2) TicTacToeHooks.jsx
```jsx
const TicTacToeHooks = () => {

  const [state, dispatch] = useReducer(reducer, initalState)
  const { tableData, turn, winner } = state; 

  const onClickTable = useCallback(() => {
    dispatch({
      type: SET_WINNER, winner:'O'
    })
  }, []);


  // usereducer는 state가 비동기적으로 바뀌게 때문에 state를 처리할 때에는 useEffect로 처리해야한다. 
  // 승자를 판단하는 것
  useEffect(() => { // 왜 갑자기? useEffect??? 이유는 위 쪽에 설명이 있다.
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
  }, [tableData])

  return (

    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/> 
      {winner && <div> {winner} 님의 승리</div>} 
    </>
  );
};
```

여기서 내가 눌렀던 셀을 알아야하기 때문에 recentCell를 생성하겠다.<br>
최근에 눌렀던 셀 : recentCell <br>
state에도 추가를 해줘야한다. <br>

#### 3) TicTacToeHooks.jsx
```jsx
const initalState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1] // 초기화를 [-1, -1]를 해주고, recentCell을 추가한다.
};

...생략

const reducer = (state, action) => {
  switch (action.type) {
    ...생략
    case CLICK_CELL: {
      const tableData = [...state.tableData]; 
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell], // 여기에 내가 눌렀던 행, 열의 데이터를 받아온다.
        // 클릭하면 tableData, recentCell을 기억을 할 것이다.
        
      };
    }
    ...생략
  }
}
```

#### 4) TicTacToeHooks.jsx
```jsx
// usereducer는 state가 비동기적으로 바뀌게 때문에 state를 처리할 때에는 useEffect로 처리해야한다.
  // 승자를 판단하는 것
  useEffect(() => {
    const [row, cell] = recentCell;
    // 이거 한 이유는 기본적으로 첫 렌더링할 때도 useEffect 실행하기 때문에, recentCell이 [-1, -1] 바로 실행을 
    // 걸려줄려고 밑에 바로 조건문을 달았다. 즉, 바로 승자를 체크 안하기 위해서이다.
    if (row < 0) {
      return;
    }

    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) { // 가로줄 검사
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) { // 세로줄 검사
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) { // 대각선 검사
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) { // 대각선 검사
      win = true;
    }
    
  }, [recentCell]); // 클릭한 셀이 바뀔 때마다
```

### 비동기 에러문제 해결하기

CLICK_CELL을 실행하면 CLICK_CELL의 action보면 recentCell이 생긴다.
```jsx
case CLICK_CELL: {
  const tableData = [...state.tableData]; 
  tableData[action.row] = [...tableData[action.row]];
  tableData[action.row][action.cell] = state.turn;
  return {
    ...state,
    tableData,
    recentCell: [action.row, action.cell], // CLICK_CELL을 실행하면 CLICK_CELL의 action보면 recentCell이 생긴다.
  };
}
```
recentCell이 생기면서, useEffect의 배열에 recentCell가 있다. 그래서, useEffect 실행하는 직전에  CHANGE_TURN도 같이 움직여서 턴이 넘어가버렸다. <br>
즉, 여기서 <strong>비동기문제</strong>가 있다. <br>
CLICK_CELL 하는 도중에 CHANGE_TURN 도 같이하는 거라서 상대턴이 바로 넘어가서 비동기 문제가 일어난다. <br>
즉, 비동기라서 CLICK_CELL을 하면 CHANGE_TURN도 같이 움직인다.<br>

해결할려면 <br>
### Td.jsx

Td.jsx에서 CHANGE_TURN을 없애준다.

```jsx
// 바꾸기 전

// dispatch({ 
//   type: CLICK_CELL, row: rowIndex, cell: cellIndex
// });
// 바꾸기 후

// dispatch({
//   type: CHANGE_TURN
// });

dispatch({ 
  type: CLICK_CELL, row: rowIndex, cell: cellIndex
});
```

#### TicTacToeHook.jsx
CHANGE_TURN을 비동기 useEffect안에 넣어줘야한다.

```jsx
useEffect(() => {
  const [row, cell] = recentCell;
  if (row < 0) {
    return;
  }

  let win = false;
  if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) { // 가로줄 검사
    win = true;
  }
  if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) { // 세로줄 검사
    win = true;
  }
  if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) { // 대각선 검사
    win = true;
  }
  if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) { // 대각선 검사
    win = true;
  }
  console.log(win, row, cell, tableData, turn);
  if ( win) { // 승리 할 경우
    dispatch({ type: SET_WINNER, winner: turn });
  } else { // 무승부 일 경우
    dispatch({
      type: CHANGE_TURN
    });
  }
}, [recentCell]) // 클릭한 셀이 바뀔 때마다
```

흐름을 중요한다. <br>
제일 중요한 건 dispatch가 state를 바꾸는게 비동기이다.<br>
CLICK_CELL을 하고 CHANGE_TURN를 처리하는데,  CLICK_CELL를 처리하는 도중에 CHANGE_TURN도 같이 바꼈다. (즉, 클릭하는 순간, 턴도 같이 바꿨다!!)<br><br>

무승부 검사<br>
무승부 검사는 테이블의 데이터가 다 찼는지 검사하면 된다.<br>
```jsx
if ( win) { // 승리 할 경우
      dispatch({ type: SET_WINNER, winner: turn });
      // 리셋할 것을 코드 입력!!!!
    } else { 
      let all = true; // 일단 칸들이 다 있는지를 확인해준다. all이 true면 무승부라는 의미
      tableData.array.forEach((row) => { // 무승부 일 경우
        row.forEach((cell) => {
          if(!cell) { // all이 하나라도 안 찼는 칸이 있으면 무승부이다.
            all = false;
          }
        });
      });
      if ( all ) { // 무승부라면 리셋을 해준다.
        // 리셋할 것을 코드 입력!!!!
      } else {
        dispatch({ // 무승부가 아니라면, 턴을 넘겨준다.
          type: CHANGE_TURN
        });
      }
    }
```

무승부이거나, 승리할 경우에 테이블 리셋만들어보기!!!

```jsx
export const RESET_GAME = 'RESET_GAME';
...생략
const reducer = (state, action) => {
  ...생략
  case RESET_GAME : {
    return {
      ...state,
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: 'O',
      recentCell: [-1, -1]
    }
  }
}
...생략
```

```jsx
...생략
if ( win) { // 승리 할 경우
  dispatch({ type: SET_WINNER, winner: turn });
  dispatch({ type: RESET_GAME});

} else { 
  let all = true; // 일단 칸들이 다 있는지를 확인해준다. all이 true면 무승부라는 의미
  tableData.forEach((row) => { // 무승부 일 경우
    row.forEach((cell) => {
      if(!cell) { // all이 하나라도 안 찼는 칸이 있으면 무승부이다.
        all = false;
      }
    });
  });
  if ( all ) { // 무승부라면 리셋을 해준다.
    dispatch({ type: RESET_GAME});
  } else {
    dispatch({ // 무승부가 아니라면, 턴을 넘겨준다.
      type: CHANGE_TURN
    });
  }
}
...생략
```



정리
> 먼저, useReducer는 리덕스에서 따온 걸 리액트에 도입했다.
> 기본적으로 useState를 사용했는데 useState가 100개, 1000개 되면 관리하기 힘들고, 한 번에 정리하기 위해서 useReducer를 사용한다.
> state를 모아두고, action을 통해서 행동을 움직인다. action을 dispatch를 해서 action이 움직이다.
그리고, 항상 state를 바꿀 때 불변성이 중요하다.

```jsx

```




```jsx

```




```jsx

```




```jsx

```




```jsx

```




```jsx

```




```jsx

```




