import React, {Component} from 'react';
import Ball from './Ball';

const getWinNumber = () => {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1]; // 마지막 번호
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c); // 앞에서 6개
    return [...winNumbers, bonusNumber];
}

class LottoClass extends Component {

    state = {
        winNumbers: getWinNumbers(), // 당첨 숫자들
        winBalls: [], // 당첨 숫자들은 여기 winBalls에 넣어준다.
        bonus: null, // 보너스 공
        redo: false, // 재 실행하기 위한 것
    }


    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div> {bonus && <Ball number={bonus} />}
                <button onClick={ redo ? this.onClickRedo : () => {}}>한 번 더!</button>
            </>
        );
    }
}


export default LottoClass;