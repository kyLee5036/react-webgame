react-webgame
=============

package.json, package-lock.json 추가하는 법
-------------

<pre><code>1. npm init 를 작성
2. package name: (현재 폴더명) "폴더명 지정         
   (webpack_pratice)"
3. version: (1.0.0) 
4. description: "설명"
5. entry point: (index.js)
6. test command:
7. git repository:
8. keywords:
9. author: KYLEE "저자 이름"
10. license: (ISC) MIT 또는 ISC
</code></pre>
### package.json, package-lock.json 추가가 된다.
<br /><br /><br />
<hr/>

## (dependencies, devDependencies 의 차이점)

dependencies - 실제 서비스에서 쓰이는 것 

devDependencies - 개발에서만 쓰이는 것 ('-D'의미는 개발자용)
<br /><br /><br />
<hr/>

리액트 npm추가
-------------

<pre><code>npm i react
npm i react-dom
</code></pre>

(npm i react react-dom 해도 상관없음)
+ react@16.10.2
+ react-dom@16.10.2
  
package.json -> dependencies -> react, react-dom 추가되어 있다.
<br /><br /><br />
<hr/>

webpack 초기설정
-------------

<pre><code>npm i -D webpack
npm i -D webpack-cli </code></pre>

(npm i -D webpack webpack-cli 해도 상관없음)
+ webpack-cli@3.3.9
+ webpack@4.41.0
  
package.json -> devDependencies -> webpack, webpack-cli 추가되어 있다.
<br /><br /><br />
<hr/>

## webpack.config.js 를 추가

##### (jsx는 react파일이라는 것을 알려주는 것임, js랑 다르다)

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
const { hot } = require('react-hot-loader/root'); 
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





