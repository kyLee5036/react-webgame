import React, {Component, createRef} from 'react';
import ReactDOM from 'react-dom';
import Try from './Try'

const getNumbers = () => { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
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
        const {result, value, tries, answer} = this.state;
        event.preventDefault();
        if ( value === answer.join('')) {
            this.setState({
                result:'HOMERUN!!!',
                tries: [...tries, {try: value, result:'HOMERUN!!!'}],
            });
            alert('HOMERUN');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else {
            const answerArray = value.split('').map( (v) => parseInt(v) );
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9 ) {
                this.setState({
                    result: `More than 10 : ${answer.join(',')}`,
                });
                alert('Game restart');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
                // this.inputRef.focus();
                this.inputRef.current.focus();
            } else {
                for ( let i = 0; i< 4; i+=1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball+=1;
                    }
                }
                this.setState({
                    tries: [...tries, {try: value, result:`strike : ${strike}, ball : ${ball}`}],
                    value : '',
                });
                // this.inputRef.focus();
                this.inputRef.current.focus();
            }
        }
    };

    onChangeInput = (event) => {
        console.log(this.state.answer);
        this.setState({
            value: event.target.value,
        });
    };

    // inputRef;
    // onInputRef = (c) => {this.inputRef = c;}

    inputRef = createRef(); // this.inputRef

    render() {
        const {result, value, tries} = this.state;
        return (
        <>
            <h1>{result}</h1>
            <form onSubmit={this.onSubmitForm}>
                {/* <input 
                ref = {this.onInputRef}
                maxLength={4} 
                value={value} 
                onChange={this.onChangeInput}/> */}
                <input 
                ref = {this.inputRef}
                maxLength={4} 
                value={value} 
                onChange={this.onChangeInput}/>
            </form>
            <div>시도 : {tries.length}</div>
            <ul>{tries.map((value, index) => {  // 변경
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





