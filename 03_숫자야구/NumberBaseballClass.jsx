import React, {Component} from 'react';
import ReactDOM from 'react-dom';

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

    render() {
        return (
        <>
            <h1>{this.state.result}</h1>
            <form onSubmit={this.onSumbitForm}>
                <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
            </form>
            <div>시도 : {this.state.tries.length}</div>
            <ul>{[
                    { fruit:'사과', taste:'맛있다' },
                    { fruit:'바나나', taste:'맛있다' },
                    { fruit:'포도', taste:'시다' },
                    { fruit:'귤', taste:'시다' },
                    { fruit:'감', taste:'떫다' },
                    { fruit:'배', taste:'달다' },
                    ].map((value, index) => {     
                        return ( 
                            <li key={value.fruit + value.taste}><b>{value.fruit}</b> - {value.taste}</li>
                        );
                })}
                {/* <li><b>사과</b> - 맛있다</li>
                <li><b>바나나</b> - 맛있다</li>
                <li><b>포도</b> - 시다</li>
                <li><b>귤</b> - 시다</li>
                <li><b>감</b> - 떫다</li>
                <li><b>배</b> - 달다</li> */}
            </ul>
        </>
        )
    }
}


export default NumberBaseballClass;


