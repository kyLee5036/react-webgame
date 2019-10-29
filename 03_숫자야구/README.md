# 리액트 반복문 / 렌더링 <br>( 다른 반복문과 달리 <strong>Map</strong>을 사용한다)

<hr><hr>

## - 리액트 반복문 - ( Map-기본형 ) <br> ( Key가 없어 에러가 나온다. )
```javascript
<ul>
{['apple', 'grape', 'orange', 'banana'].map((v, i) => {
    return <li>{v}</li>
})}
</ul>
```

<hr>


## - 리액트 반복문 - ( Key-응용형 ) <br> ( Key가 있어 에러가 나오지 않는다. ) <br> 리액트에 있어서 Map을 사용할 경우에는 반드시 Key값을 넣어줘야한다. 

기본적인 배열선언 방법이다.
```javascript
<ul>{['사과', '바나나', '포도', '귤', '감', '배'].map((v, i) => {
        return (
        <li key={i} >{v}</li>
        );
    })}
    <li>사과</li>
    <li>바나나</li>
    <li>포도</li>
    <li>귤</li>
    <li>감</li>
    <li>배</li>
</ul>
```

사과, 바나나, 포도 등 옆에 맛을 넣고싶다. 이런경우에는

1. 첫번째 방법 (배열 방법)<br>
v[0], v[1]으로 한다.
```javascript
<ul>{[
        ['사과', '맛있다'], 
        ['바나나', '맛있다'], 
        ['포도', '시다'], 
        ['귤', '시다'], 
        ['감', '떫다'], 
        ['배', '달다']
        ].map((v, i) => {     
            return ( 
                <li><b>{v[0]}</b> - {v[1]}</li>
            );
    })}
    {
    /* <li><b>사과</b> - 맛있다</li>
    <li><b>바나나</b> - 맛있다</li>
    <li><b>포도</b> - 시다</li>
    <li><b>귤</b> - 시다</li>
    <li><b>감</b> - 떫다</li>
    <li><b>배</b> - 달다</li> */}
</ul>
```

2. 두번쨰 방법 (Object 방법)<br>
{v.fruit}, {v.taste}으로 한다.

```javascript
<ul>{[
        { fruit:'사과', taste:'맛있다' },
        { fruit:'바나나', taste:'맛있다' },
        { fruit:'포도', taste:'시다' },
        { fruit:'귤', taste:'시다' },
        { fruit:'감', taste:'떫다' },
        { fruit:'배', taste:'달다' },
        ].map((v, i) => {     
            return ( 
                <li><b>{v.fruit}</b> - {v.taste}</li>
                );
    })}
    {/* <li><b>사과</b> - 맛있다</li>
    <li><b>바나나</b> - 맛있다</li>
    <li><b>포도</b> - 시다</li>
    <li><b>귤</b> - 시다</li>
    <li><b>감</b> - 떫다</li>
    <li><b>배</b> - 달다</li> */}
</ul>
```

에러 안나오게 하는 방법 (키를 추가해준다)

```javascript
<ul>{[
        { fruit:'사과', taste:'맛있다' },
        { fruit:'바나나', taste:'맛있다' },
        { fruit:'포도', taste:'시다' },
        { fruit:'귤', taste:'시다' },
        { fruit:'감', taste:'떫다' },
        { fruit:'배', taste:'달다' },
        ].map((value, index) => {     
            return ( 
                <li key={ value.fruit + value.taste}><b>{value.fruit}</b> - {value.taste}</li>
            );
    })}
</ul>
```

<Strong>TIP )</Strong><br>
키(index)값이 고유하고 겹칠 일이 없어서 키를 넣어주면 좋다고 생각하는데 절대로 그렇지 않다. 왜냐하면, 이 키(index)값의 역할이 성능 최적화인데, 성능 최적화할 때 문제가 생긴다. 그러므로 키(index)값을 넣어면 안된다.

나쁜 예시
```javascript
return ( 
    <li key={index}><b>{value.fruit}</b> - {value.taste}</li>
);
```
나쁜 예시  - index추가 되어져 있다. (대신에!!! 요소가 추가만 되는 배열인 경우에는 키(index)값를 써도된다.)
```javascript
return ( 
    <li key={value.fruit + index}><b>{value.fruit}</b> - {value.taste}</li>
);
```

좋은 예시

```javascript
return ( 
    <li key={value.fruit + value.taste}><b>{value.fruit}</b> - {value.taste}</li>
);


```

<hr>

## - 컴포넌트 분리와 props <br>(분리함으로써 코드관리를 효율적으로 할 수 있다.)
초보상태에서의 프로그램 작성 방법은 <Strong>TOP&BOTTOM</Strong> 방식으로 한다.<br>
숙련이 된 상태에서의 프로그램 작성 방법은 <Strong>BOTTOM&TOP</Strong> 방식으로 한다.


Try.jsx를 추가한다.

#### - Try.jsx
```javascript
import React, { Component } from 'react';

class Try extends Component {
    render() {
        return (
            <li key={value.fruit + value.taste}>
                <b>{value.fruit}</b> - {value.taste}
            </li>
        )
    }
}

export default Try;

```

#### - NumberBaseballClass.jsx
```javascript

//...이하생략
import Try from './Try' // 추가

class NumberBaseballClass extends Component {
   state = {
       //...이하생략
   }
   fruits = [ // 변경
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
            //...이하생략
            <ul>{this.fruits.map((value, index) => {  // 변경
                    return ( 
                        <Try />
                    );
                })}
            </ul>
        </>
        )
    }
}

export default NumberBaseballClass;
```

#### - NumberBaseballClass.jsx <br>(value,index는 자기 맘대로 해도된다 (예시 확인하면 된다.))
<br>key는 index는 안하는 편이 좋다 (성능 최적화를 위해서!)
```javascript
return ( 
    // 예시 1
    <Try key={value.fruit + value.taste} getValue={value} getIndex={index} />

    // 예시 2
    // <Try va={value} ind={index} />
);
```


#### - Try.jsx <br>(value,index는 자기 맘대로 해도된다 (예시 확인하면 된다.))


```javascript
 <li>

    // 예시 1
    <b>{this.props.getValue.fruit}</b> -
    {this.props.getValue.taste} - 
    {this.props.getIndex}

    // 예시 2
    // <b>{this.props.va.fruit}</b> -
    // {this.props.va.taste} - 
    // {this.props.ind}
</li>

```

리액트에는 컴포넌트 분리하기 위해서는 <strong>props</strong>를 자식에게 상속해줘야한다.
<strong>props</strong>가 생기면서 부모-자식관계가 생긴다. NumberBaseballClass가 부모가 되고, Try가 자식이 된다. 

<hr>

## 리액트에서 push를 사용하지 않는다.
#### 새로운 배열을 만들어주고 기존의 배열을 복사해 놓고 넣어 준다.

예전꺼랑 바뀐게 없어서 렌더를 하지 않는다.
```javascript
const Array = [];
Array.push(1);
Array === Array // true
```

이전 배열을 복사해서 넣고 싶은 곳에 넣어둔다. 리액트가 바뀐것을 알아차릴 수 있도록하면 렌더를 한다.
```javascript
const Array = [];
const Copy_Array = [...Array, 2];
Array === Copy_Array // false

```

이전 것을 복사하고 새로운 것을 넣어준다.
```javascript
this.setState({
    result:'HOMERUN!!!',
    tries: [...this.state.tries, {try: this.state.value, result:'HOMERUN!!!'}],
    // tries: this.state.tries.push(); !!불가능!!
});
```
<hr><hr>

## 렌더링 문제해결
렌더링의 문제 -> 나중에 성능으로서의 문제된다.
성능최적화를 위해서 사용해준다.

### 1. shouldComponentUpdate

#### - shouldComponentUpdate_renderTest.jsx
```javascript
import React, { Component } from 'react';
class renderTest extends Component {
    state = {
        counter: 0,
    };
    // 리액트에 지원해주는 메소드 (렌더링)
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // 직접 렌더링을 해줘야한다 
        // 해석 : 이전 데이터랑 현재 바뀌는 데이터가 다르면 렌더링을 해주고 같으면 안 해준다.
        if (this.state.counter !== nextState.counter) {
            return true;
        } 
        return false;
    }
    onClick = () => {
        this.setState({
            // 코드
        });
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
```
<hr>

### 2. PureComponent와 React.memo

<strong>Class 경우 : PureComponent<br>Hooks 경우 : React.memo</strong><br>
훅스에는 PureComponet가 없다. 그래서 Memo가 있다.

#### class인 경우 -> PureComponent선언 -> 클라스 옆 extends에 PureComponent 적어준다.

#### - Try_PureComponent_memo.jsx
```javascript
import React, { PureComponent } from 'react';
class Try extends PureComponent {
    render() {
        const { tryInfo } = this.props;
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        );
    }
}


```

shouldComponentUpdate방법이 복잡하면 PureComponent하면된다.<br>
단점 : 객체나 배열, 복잡한 구조가 나오면 참조관계구조 PureComponent하기가 어렵다.<br>
<strong>PureComponent할 때 옛날 객체를 가져오지말고, 새로운 객체나 배열을 만들어라!!</strong><br>
Component가 많아지면 PureComponent가 안되는 경우가 있다. 그리고 Component사용하는 경우가 있다. 자신이 원하는 렌더링만 PureComponent해주면 된다.
<br>

#### 배열사용할 때 렌더링하는 법

#### - PureComponent_renderTest.jsx
```javascript
import React, { PureComponent } from 'react';

class renderTest extends PureComponent {
   state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: [],
        array: [],
    };

    onClick = () => {
        
        // 현재 array랑 이전 array true가 나와서 렌더링이 !!!안된다.!!!
        const array = this.state.array;
        array.push(1);
        this.setState({
            array: array,
        });

        // 현재 array랑 이전 array false 나와서 렌더링이 된다.
        // 즉, 새로운 배열을 만들어줘야한다. 
        this.setState({
            array: [...this.state.array, 1],
        });

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
```



#### hooks인 경우 -> memo선언 -> memo가 함수를 감싸준다. 

#### - Try_PureComponent_memo.jsx

```javascript
import React, { memo } from 'react';
const Try = memo (( {tryInfo}) => {
   
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );   
});


```

<hr>

### 3. React.createRef

React.createRef는 class에서 쓴다. <br>
근데 Hooks이랑 class랑 비슷해서 헷갈리는 경우가 있는데 createRef를 하면 행태가 조금이라도 비슷해진다.<br>
class에서 createRef를 사용하지 않는다면 함수를 만들어서 좀 더 세밀하게 지정할 수 있다.<br>
사용한다면 세밀하지가 않지만 간단하게 사용할 수 있게된다. <br>
결국에는 실우에 따라 사용할건지 결정이 된다.


#### NumberBaseballClass.jsx (전체 소스)
```javascript
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

```

#### NumberBaseballClass.jsx (before)
선언을 이런식으로 해주었다.
```javascript

this.inputRef.focus();

inputRef;
onInputRef = (c) => {this.inputRef = c;}

this.inputRef.current.focus();

<input 
    ref = {this.onInputRef}
    maxLength={4} 
    value={value} 
    onChange={this.onChangeInput}/>
```
<hr>

#### NumberBaseballClass.jsx (after)<br>Hooks랑 형태가 비슷하다.
```javascript
import React, {Component, createRef} from 'react';

inputRef = createRef(); // this.inputRef

<input 
    ref = {this.inputRef}
    maxLength={4} 
    value={value} 
    onChange={this.onChangeInput}/>

```
#### NumberBaseballHooks.jsx <br>after이랑 형태가 비슷하다.

```javascript
import React, { useRef, useState } from 'react';

const inputEl = useRef(null);

inputEl.current.focus();

<input
    ref={inputEl}
    maxLength={4}
    value={value}
    onChange={(e) => setValue(e.target.value)}/>

```

### 4. props와 state 연결

```javascript



```
<hr>


```javascript



```

<hr>


```javascript



```

```javascript



```

```javascript



```

```javascript



```




