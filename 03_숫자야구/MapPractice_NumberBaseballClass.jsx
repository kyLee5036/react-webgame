import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Try from './Try'

function getNumbers () {
    
}

class NumberBaseballClass extends Component {
   state = {
       result: '',
       value: '',
       answer: getNumbers(),
       tries : [],
   }

   onSumbitForm = () => {

   };

   onChangeInput = () => {

   };

   
   fruits = [
        { fruit:'사과', taste:'맛있다' },
        { fruit:'바나나', taste:'맛있다' },
        { fruit:'포도', taste:'시다' },
        { fruit:'귤', taste:'시다' },
        { fruit:'감', taste:'떫다' },
        { fruit:'배', taste:'달다' },
    ]

    render() {
        return (
        <>
            <h1>{this.state.result}</h1>
            <form onSubmit={this.onSumbitForm}>
                <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
            </form>
            <div>시도 : {this.state.tries.length}</div>
            <ul>
                {this.fruits.map((value, index) => {     
                    return ( 
                        <Try key={value.fruit + value.taste} getValue={value} getIndex={index} />
                    );
                })}
            </ul>
        </>
        )
    }
}


export default NumberBaseballClass;


