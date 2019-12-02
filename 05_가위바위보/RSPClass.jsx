import React, {Component} from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
  };
  
const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

// 컴퓨터가 어떤것을 내는지 판단
const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
      return v[1] === imgCoord;
    })[0];
  };

class RSPClass extends Component {
    
    state = {
        result: '',
        imgCoord: rspCoords.바위,
        score: 0,
      };
    
      interval;
    
      componentDidMount() { 
        this.interval = setInterval(this.changeHand, 100);
      }
    
      componentWillUnmount() { 
        clearInterval(this.interval);
      }
    
      changeHand = () => {
        const {imgCoord} = this.state;
        if (imgCoord === rspCoords.바위) {
          this.setState({
            imgCoord: rspCoords.가위,
          });
        } else if (imgCoord === rspCoords.가위) {
          this.setState({
            imgCoord: rspCoords.보,
          });
        } else if (imgCoord === rspCoords.보) {
          this.setState({
            imgCoord: rspCoords.바위,
          });
        }
      };
    
      onClickBtn = (choice) => () => {
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        // 차이
        const diff = myScore - cpuScore;
        if (diff === 0) {
          this.setState({
            result: '비겼습니다!',
          });
        } else if ([-1, 2].includes(diff)) {
            // 옛날 것이 들어가면 함수형으로 해준다.
          this.setState((prevState) => {
            return {
              result: '이겼습니다!',
                // 예전 점수에서 +1 을 해준다.
              score: prevState.score + 1,
            };
          });
        } else {
          this.setState((prevState) => {
            return {
              result: '졌습니다!',
              score: prevState.score - 1,
            };
          });
        }
        // 1초 정도 기다렸다가 interval을 실행한다.
        setTimeout(() => {
          this.interval = setInterval(this.changeHand, 100);
        }, 1000);
      };

    
    render() {
        const { result, score, imgCoord } = this.state;
        return (
          <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
              <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
              <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
              <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
          </>
        );
      }
}

export default RSPClass;