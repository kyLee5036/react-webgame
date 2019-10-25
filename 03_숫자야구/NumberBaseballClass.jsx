import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Try from './Try'

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
      const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(chosen);
    }
    return array;
  }
  

class NumberBaseballClass extends Component {
    state = {
       result: '',
       value: '',
       answer: getNumbers(),
       // 배열을 복사하기 위해서 배열선언 함
        tries : [], 
        
   }
     
    onSubmitForm = (event) => {
        event.preventDefault();
        if ( this.state.value === this.state.answer.join('')) {
            this.setState({
                result:'HOMERUN!!!',
                tries: [...this.state.tries, {try: this.state.value, result:'HOMERUN!!!'}],
            });
            alert('HOMERUN');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else {
            const answerArray = this.state.value.split('').map( (v) => parseInt(v) );
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9 ) {
                this.setState({
                    result: `More than 10 : ${this.state.answer.join(',')}`,
                });
                alert('Game restart');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else {
                for ( let i = 0; i< 4; i+=1) {
                    if (answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball+=1;
                    }
                }
                this.setState({
                    tries: [...this.state.tries, {try: this.state.value, result:`strike : ${strike}, ball : ${ball}`}],
                    value : '',
                });
            }
        }
    };

    onChangeInput = (event) => {
        console.log(this.state.answer);
        this.setState({
            value: event.target.value,
        });
    };


    render() {
        return (
        <>
            <h1>{this.state.result}</h1>
            <form onSubmit={this.onSubmitForm}>
                <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
            </form>
            <div>시도 : {this.state.tries.length}</div>
            <ul>{this.state.tries.map((value, index) => {  // 변경
                    return ( 
                        <Try key={`${index + 1} trying`} tryInfo={value} />
                    );
                })}
            </ul>
        </>
        )
    }
}


export default NumberBaseballClass;


