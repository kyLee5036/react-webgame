import React, {Component} from 'react';
import Ball from './Ball';

const getWinNumbers = () => {
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

    timeouts = [];

    runTimeouts = () => {
        console.log('runTimeouts');
        const { winNumbers } = this.state;
        for (let i = 0; i < winNumbers.length - 1; i++) {
          this.timeouts[i] = setTimeout(() => {
            this.setState((prevState) => {
              return {
                  // winball의 숫자들을 넣어준다. react에서 배열에 값을 넣을 떄에는 push가 아니라 예전 prevState를 사용해서 값을 넣어준다. 
                winBalls: [...prevState.winBalls, winNumbers[i]],
              };
            });
          }, (i + 1) * 1000);
        }
        // 보너스공
        this.timeouts[6] = setTimeout(() => {
          this.setState({
            bonus: winNumbers[6],
            redo: true,
          });
        }, 7000);
    };

    componentDidMount() {
        console.log('didMount');
        this.runTimeouts();
        console.log('로또 숫자를 생성합니다.');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('didUpdate');
        if (this.state.winBalls.length === 0) { 
          this.runTimeouts();
        }
        if (prevState.winNumbers !== this.state.winNumbers) {
          console.log('로또 숫자를 생성합니다.');
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }


    onClickRedo = () => { // 초기화하는 곳
        console.log('onClickRedo');
        this.setState({
          winNumbers: getWinNumbers(), // 당첨 숫자들
          winBalls: [],
          bonus: null, // 보너스 공
          redo: false,
        });
        this.timeouts = [];
      };


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