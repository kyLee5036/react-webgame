## 리액트 반복문 <br>( 다른 반복문과 달리 <strong>Map</strong>을 사용한다)
<hr><hr>

### - 리액트 반복문 - ( Map-기본형 ) <br> ( Key가 없어 에러가 나온다. )
```javascript
<ul>
{['apple', 'grape', 'orange', 'banana'].map((v, i) => {
    return <li>{v}</li>
})}
</ul>
```

<hr>


### - 리액트 반복문 - ( Key-응용형 ) <br> ( Key가 있어 에러가 나오지 않는다. ) <br> 리액트에 있어서 Map을 사용할 경우에는 반드시 Key값을 넣어줘야한다. 

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

### - 컴포넌트 분리와 props (분리함으로써 코드관리를 효율적으로 할 수 있다.)
초보상태에서의 프로그램 작성 방법은 <Strong>TOP&BOTTOM</Strong> 방식으로 한다.<br>
숙련이 된 상태에서의 프로그램 작성 방법은 <Strong>BOTTOM&TOP</Strong> 방식으로 한다.


Try.jsx를 추가한다.

Try.jsx
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

NumberBaseballClass.jsx
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

NumberBaseballClass.jsx <br>(value,index는 자기 맘대로 해도된다 (예시 확인하면 된다.))
<br>key는 index는 안하는 편이 좋다 (성능 최적화를 위해서!)
```javascript
return ( 
    // 예시 1
    <Try key={value.fruit + value.taste} getValue={value} getIndex={index} />

    // 예시 2
    // <Try va={value} ind={index} />
);


```

Try.jsx <br>(value,index는 자기 맘대로 해도된다 (예시 확인하면 된다.))

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

```javascript



```

```javascript



```

```javascript



```

```javascript



```

```javascript



```

```javascript



```




