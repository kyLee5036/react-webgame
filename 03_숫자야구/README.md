## 리액트 반복문 <br>( 다른 반복문과 달리 <strong>Map</strong>을 사용한다)

### - 리액트 반복문 - ( Map-기본형 ) <br> ( Key가 없어 에러가 나온다. )
```javascript
<ul>
{['apple', 'grape', 'orange', 'banana'].map((v, i) => {
    return <li>{v}</li>
})}
</ul>
```

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


```javascript



```


```javascript



```


```javascript



```


```javascript



```




