import React, { Component } from 'react';

class renderTest extends Component {
    state = {
        counter: 0,
    };

    // 리액트에 지원해주는 메소드 (렌더링)
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // 직접 렌더링을 해줘야한다 
        // 과거 데이터랑 미래 바뀌는 데이터가 다르면 렌더링을 해주고 같으면 안 해준다.
        if (this.state.counter !== nextState.counter) {
            return true;
        } 
        return false;
    }
    onClick = () => {
        this.setState({});
    }

    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>click</button>
            </div>
        )
    }
}

export default renderTest;