# 끝말잇기



## ref 알아보기 (Class, Hooks 사용법이 다르다)

ref는 react에서 DOM에 직접적인 접근할 때에 사용한다. 어디에 사용할까?

- input / textarea 등에 포커스를 해야 할때
- 특정 DOM 의 크기를 가져와야 할 때
- 특정 DOM 에서 스크롤 위치를 가져오거나 설정을 해야 할 때
- 외부 라이브러리 (플레이어, 차트, 캐로절 등) 을 사용 할 때
  
선언적으로 해결될 수 있는 문제에서는 ref 사용을 지양하세요.
<hr>

## Class인 경우

#### wordRelayClass.jsx (전체 소스)
```javascript
const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: '제로',
    value: '',
    result: '',
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: 'OK',
        word: this.state.value,
        value: '',
      });
      this.input.focus();
    } else {
      this.setState({
        result: 'NO',
        value: '',
      });
      this.input.focus();
    }
  };

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  input;

  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
          <button>click!!!</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}
module.exports = WordRelay;
```
여기에서 보면 react에서 Dom을 접근하기해서 onRefInput을 선언해주었다. 

```javascript
onRefInput = (c) => {
    this.input = c;
};

<input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
```
여기에서 input에 입력하고 submit을 하면 input에 커서가 계속 된다..(대략..)<br>
focus()는 엔터 키를 누를 때 클랙 효과를 나타낸다.
```javascript
onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: 'OK',
        word: this.state.value,
        value: '',
      });
      this.input.focus();
    } else {
      this.setState({
        result: 'NO',
        value: '',
      });
      this.input.focus();
    }
  };
```
#### value, onChange vs ....다른거 하나있는데 기억하면 추가 함 <br>(class, hooks 둘다 적용)
value, onChange는 세트로 같이 써줘야한다.<br>둘 중 하나라도 없으면 에러가 나온다
```javascript
<input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
```
* * *
* * *

## Hooks인 경우
#### wordRelayClass.jsx (전체 소스)
<strong>useRef</strong> : Hook 은 함수형 컴포넌트에서 ref 를 쉽게 사용 할 수 있게 해준다. 

```javascript
import React, { useState, useRef } from './react';

const WordRelay = () => {
    const [word, setWord] = useState('초밥');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = React.useRef(null);
  
    const onSubmitForm = (e) => {
      e.preventDefault();
      if (word[word.length - 1] === value[0]) {
        setResult('딩동댕');
        setWord(value);
        setValue('');
        inputRef.current.focus();
      } else {
        setResult('땡');
        setValue('');
        inputRef.current.focus();
      }
    };

    const onChangeInput = (e) => setValue(e.currentTarget.value);
  
    return (
      <>
        <div>{word}</div>
        <form onSubmit={onSubmitForm}>
          <input
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
          />
          <button>input!</button>
        </form>
        <div>{result}</div>
      </>
    );
  };

module.exports = WordRelay;
```
문법의 형식이 차이가 있지만, 형태는 비슷하다.<br>
import로 선언해준다. inputRef 변수 useRef를 불러온다.

```javascript
import {useState, useRef } from './React';

const inputRef = React.useRef(null);
```
input에서도 inputRef를 선언해준다.<br>
useRef 를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가르키게 된다.
```javascript
 if (word[word.length - 1] === value[0]) {
    setResult('딩동댕');
    setWord(value);
    setValue('');
    inputRef.current.focus();
  } else {
    setResult('땡');
    setValue('');
    inputRef.current.focus();
  }
};

<input
    ref={inputRef}
    value={value}
    onChange={onChangeInput}
/>

```
