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

+ **react@16.10.2** (가장 기본적인 리액트 설치)
+ **react-dom@16.10.2** (웹에서 리액트를 사용하기 위해서 react-dom을 설치해준다)
  

#### webpack, webpack-cli 설치
<pre><code>npm i -D webpack
npm i -D webpack-cli </code></pre>

+ **webpack-cli@3.3.9** (리액트에 할 떄 사용할 웹팩)
+ **webpack@4.41.0** (리액트에 할 떄 사용할 웹팩)
  

#### webpack.config.js 파일 추가
```js
module.exports = {}
```

#### client.jsx 파일 추가
```js
const React = require('react');
const ReactDom = require('react-dom');
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
</body>
</html>
```

> js, jsx의 차이점?
>> js는 자바스크립트 파일이지만, jsx는 리액트 파일이라서 리액트라는 것을 확실하게 인식해준다. <br>


webpack.config.js -> 웹팩 설정하는 곳

package.json에 보면...

+ "@babel/core": 바벨 최신 문법으로 바꿔준다.
+ "@babel/preset-env": 환경에 맞게 알아서 바꿔준다.
+ "@babel/preset-react": jsx로 바꿔준다.
+ "babel-loader": 바벨이랑 웹 팩을 연결해준다.
  
npm i -dev @babel/preset-react -> 최신 문법을 옛날 문법으로 지원(많이 사용함)

npm i -dev babel-loader -> 바벨이랑 웹팩을 연결함(많이 사용함)<br /><br /><br />
<hr/>

### 웹팩 실행 방법
<pre><code>npm run dev</code></pre>
대신에 dev를 webpack설정( package.json에서 설정 )
<pre><code>"scripts": {
    "dev": "webpack"
},</code></pre>
<br />
이하처럼 설정한 후 바벨을 실행하면( webpack.config.js에서 설정 ) 
<pre><code>output : {
    path:path.join(__dirname, 'dist'),
    filename: 'app.js',
},</code></pre>

dist파일이 생기고, dist파일 안에 app.js가 있다. 
(app.js의 내용물이 에러가 생겨도 app.js의 파일이 생긴다. )
<br /><br /><br />


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

