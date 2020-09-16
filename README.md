react-webgame
=============

# React에서 create react app 없이 만들어보기
[위로 올라가기](#React에서-create-react-app-없이-만들어보기)

## 웹팩 설치하기
[위로 올라가기](#React에서-create-react-app-없이-만들어보기)

> 웹팩 설치하기전에는 노드를 알아야한다. 근데, 노드는 서버가 아니라 노드의 의미는 자바스크립트 실행기이다. <br>
> 리액트를 하기 위해서는 자바스크립트의 실행기를 알아야한다. <br>

### npm init 실행하기
<pre><code>1. npm init 를 작성
1. package name: (현재 폴더명) "폴더명 지정
   (webpack_pratice)"
2. version: (1.0.0) 
3. description: "설명"
4. entry point: (index.js)
5. test command:
6. git repository:
7. keywords:
8. author: KYLEE "저자 이름"
9. license: (ISC) MIT 또는 ISC</code></pre>

> package.json, package-lock.json 추가가 된다.

### package.json에서의 dependencies, devDependencies의 차이점

> **dependencies** - 실제 서비스에서 쓰이는 것 <br>
> **devDependencies** - 개발에서만 쓰이는 것 ('-D'의미는 개발자용) <br>


#### react, react-dom 설치
<pre><code>npm i react
npm i react-dom</code></pre>

+ **react@16.10.2** (가장 기본적인 리액트 설치) <br>
+ **react-dom@16.10.2** (웹에서 리액트를 사용하기 위해서 react-dom을 설치해준다) <br>
  

#### webpack, webpack-cli 설치
<pre><code>npm i -D webpack
npm i -D webpack-cli </code></pre>

+ **webpack-cli@3.3.9** (리액트에 할 떄 사용할 웹팩) <br>
+ **webpack@4.41.0** (리액트에 할 떄 사용할 웹팩) <br>
  

#### webpack.config.js 파일 추가
```js
module.exports = {}
```

#### client.jsx 파일 추가
```js
const React = require('react');
const ReactDom = require('react-dom');

ReactDom.render(<App />, document.querySelector('#root'));
```

#### index.html 파일 추가
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- root를 추가해주기 (경로설정) -->
  <div id="root"></div>
  <!-- 웹팩 할 곳 설정해주기 -->
  <script src="./dist/app.js"></script>
  <!-- 파일을 하나로 합쳐주기 위해서 웹팩을 설정해야한다. -->
</body>
</html>
```

> js, jsx의 차이점? <br>
>> js는 자바스크립트 파일이지만, jsx는 리액트 파일이라서 리액트라는 것을 확실하게 인식해준다. <br>

## 모듈 시스템과 웹팩 설정
[위로 올라가기](#React에서-create-react-app-없이-만들어보기)

#### client.jsx
```js
import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

ReactDom.render(<App />, document.querySelector('#root'));
```

#### webpack.config.js 기본 설정
```js
module.exports = {
  name: '', // 웹팩 설정 이름 (마음대로 지어도 상관없음)
  mode: 'development', // 실제 서버시는: production, 개발용 : development
  devtool: 'eval', // 빠르기 설정 (자세한 건 공식문서에 있음)

  // entry과 output이 제일 중요하다.
  entry: { // 입력하는 곳
    
  },

  output: { // 출력하는 곳

  },
}
```
> 지금 우리의 목표가 app.js파일 하나를 만들어서 html이 실행할 수 있도록 해야한다. <br>
> 그리고, client.jsx과 App.jsx 하나로 합쳐서 app.js로 만들어야한다. <br>
>> 그러면 **입력(entry)** 은 `client.jsx`와 `App.jsx`이고, **출력(output)** 은 `./dist/app.js`이다. <br>

#### webpack.config.js
```js
const path = require('path');

module.exports = {
  name: '',
  mode: 'development',
  devtool: 'eval',

  // 확장자들을 입력안하고 여기에다가 확장자를 설정해줄 수가 있다.
  resolve: { 
      extensions: ['.js', '.jsx'],
  },
  entry: {
      app: [ // 여기에다가 배열로 설정해준다. 전에 있던, './client.jsx',에 jsx를 삭제해준다.
      './client',
    ]
  },
  output: {
    path: path.join(__dirname, 'dist') 
    // path.join는 경로를 알아준다. 
    //__dirname는 현재 폴더 경로, -> 즉, 핸재 폴더에서 dist폴더를 가르킨다. (dist폴더도 생성해준다.)
    filename: 'app.js', // 파일이름 설정
  },
}
```

## 웹팩으로 빌드하기
[위로 올라가기](#React에서-create-react-app-없이-만들어보기)

> 설정을 하고 난 후에는 Command-line에 `webpack`을 쳐준다. <br>
> 하지만 에러가 날 것이다. <br>
#### package.json
```js
// ...생략
// ...생략
  "main": "index.js",
  "scripts": {
    "dev": "webpack" // webpack을 적어줘야한다. 
  },
// ...생략
// ...생략
```
> `npm run dev`로 실행해준다. 실행 결과는 실패일 것이다.
>> ***바벨추가 해야한다. (바벨은 개발용에서만 사용한다)***

<pre><code>npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader</code></pre>

+ **"@babel/core"**: 바벨 최신 문법으로 바꿔준다. <br>
+ **"@babel/preset-env"**: 브라우저에서 옛날 문법환경에 대해 알맞게 지원해준다. <br>
+ **"@babel/preset-react"**: jsx로 바꿔준다. <br>
+ **"babel-loader"**: 바벨이랑 웹 팩을 연결해준다. <br>

#### webpack.config.js에서 module 설정
```js
const path = require('path');

module.exports = {
  name: '',
  mode: 'development',
  devtool: 'eval',
  resolve: {
      extensions: ['.js', '.jsx'],
  },
  entry: {
    app: ['./client']
  },

  // 모듈은 여기 중간에 설정한다.
  module: {
    rules: [{ // 여러가지 규칙을 하기위해서 배열로 해준다.
      test: /\.jsx?/, // js파일, jsx파일을 룰을 정의한다. (정규표현식이라 따로 공부할 것)
      loader: 'babel-loader', // js파일, jsx파일을 babel-loader로 연결해서 최신문법, 옛날문법을 적용할 것이다 (option에 설정한다.).
      
      // 베벨의 옵션을 여기에다가 넣어준다.
      options: {
        presets: [ // presets에다가 방금 전 install했는 preset-env랑 preset-react를 넣어준다.
          '@babel/preset-env', '@babel/preset-react'
        ]
      },
    }],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
}
```
> `npm run dev`를 실행하면 웹팩실행이 정상적으로 돌아가는 것을 확인할 수 있다. <br>

<hr/>

## 서버 설정 (react-hot-loader, webpack-dev-server)

<pre><code>npm i -D react-hot-loader
npm i -D webpack-dev-server</code></pre>

+ react-hot-loader@4.12.15
+ webpack-dev-server@3.8.2

package.json -> devDependencies -> react-hot-loader, webpack-dev-server 추가되어 있다.

#### package.json 에서 설정
```bash
"scripts": {
    "dev": "webpack-dev-server --hot"
}, 
```
#### client.jsx에서 설정
```javascript
const { hot } = require('react-hot-loader'); 
const WordRelay = require('./WordRelay');
const Hot = hot(WordRelay);
Reactdom.render(<Hot />, document.querySelector('#root'));
```
#### webpack.config.js에서 설정
```bash
"plugins": [
    'react-hot-loader/babel' 
],
```
#### index.html에서 설정 (dist폴더를 삭제해준다.)
```html
<script src="./app.js"></script>
```


## 이하 내용수정중..

### error 처리
+ 커맨드가 안 될경우에는 : npm i -g webpack-dev-server
+ Error: Cannot find module 'webpack' : npm link webpack

