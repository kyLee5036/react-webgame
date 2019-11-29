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

class RSPClass extends Component {
    
    state = {
        result : '',
        score : 0,
        imgCoord : 0,
    };

    interval;

    componentDidMount() { // 컴포넌트가 첫 렌더링된 후
        // 비동기 함수 바깥에 변수를 참조하면 클로저가 발생한다. 항상 조심해야한다. 자바스크립트쪽에 지식이다.
        this.interval = setInterval(() => {
            // 클로저 문제때문에 interval 밑에 가야한다. (자바스크립트 문제임.)
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
        }, 1000)
    }

    componentWillUnmount() { 
        clearInterval(this.interval);
    }

    

    render() {
        const { result, score, imgCoord} = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" >바위</button>
                    <button id="scissor" className="btn">가위</button>
                    <button id="paper" className="btn">보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}

export default RSPClass;