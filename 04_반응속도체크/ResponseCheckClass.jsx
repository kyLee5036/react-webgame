import React, { Component } from 'react';

class ResponseCheckClass extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  };



  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 출력하세요',
      });
      setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 출력',
        });
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색이 된 후에 출력하세요.',
        result: [],
      });
    } else if (state === 'now') {
      this.setState({
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
      });
    }
  }

  onReset = () => {
    this.setState({
      result: [],
    });
  };

  renderAverge = () => {
    this.state.result.length === 0
      ? null
      : <>
        <div>average time : {this.state.result.reduce((a, c) => a + c / this.state.result.length)}ms</div>
      </>
  }


  render() {

    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen} >
          {this.state.message}
        </div>
        <div>{this.renderAverge()}</div>
        

      </>
    )
  }
}


export default ResponseCheckClass;