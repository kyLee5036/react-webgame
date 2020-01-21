import React, {useState, useCallback} from 'react';

const Form = () => {
  const [row, setRow] = useState(10); // 세로 - 줄
  const [cell, setCell] = useState(10); // 가로 -칸
  const [mine, setMine] = useState(10); // 지뢰

  const onChangeRow = useCallback((e) => { // useCallback으로 불필요한 렌더링을 막아준다. 습관을 가지는게 좋다.
    setRow(e.target.value);
  }, []);
  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);
  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  // 이게 중요하다. 여기에다가 context-api를 적용할 것이다.
  const onClickBtn = useCallback( () => {

  }, []);
  
  return (
    <div>
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>시작</button>
    </div>
  );
}

export default Form;