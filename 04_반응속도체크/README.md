# 반응속도체크


+ [React 조건문](#React-조건문)
+ [setTimeout 넣어 반응속도 체크](#setTimeout-넣어-반응속도-체크)
+ 성능 체크와 Q&amp;A
+ 반응속도체크 Hooks 전환

## React 조건문

render(JSX에서는)안 에서는 for문, if문을 사용할 수 없다. 쓸 수 있는 방법은 있는데, 지저분해진다. <br>

### 조건문 사용방법
<strong>빈 배열</strong> 경우에는 합계, 평균 구할 수 없다. 그래서 div태그를 안 보여주게한다.
```javascript
<div>average time : {this.state.result.reduce((a,c) => a + c / this.state.result.length )}ms</div>
```
false, undefined, null은 jsx에서 태그없음을 의미한다.
리액트에서의 조건문 사용하는 방법 (삼항 연산자를 사용한다.)
```javascript
{this.state.result.length === 0 
    ? null
    : <div>average time : {this.state.result.reduce((a,c) => a + c / this.state.result.length )}ms</div>}  
```

함수를 사용하는 경우도 있다.

```javascript
renderAverge = () => {
    this.state.result.length === 0 
    ? null
    : <div>average time : {this.state.result.reduce((a,c) => a + c / this.state.result.length )}ms</div>
  }

 render() {
    return (
      <>
        {this.renderAverge()}  
      </>
    )
  }
```
### setTimeout 넣어 반응속도 체크
