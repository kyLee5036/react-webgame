# react-webgame
=============


package.json, package-lock.json 추가하는 법
-------------
1. npm init 를 작성
2. package name: (현재 폴더명) "폴더명 지정(webpack_pratice)"
3. version: (1.0.0) 
4. description: "설명"
5. entry point: (index.js)
6. test command:
7. git repository:
8. keywords:
9. author: KYLEE "저자 이름"
10. license: (ISC) MIT 또는 ISC
### package.json, package-lock.json 추가가 된다.

<hr/>
(dependencies, devDependencies 의 차이점)
dependencies - 실제 서비스에서 쓰이는 것
devDependencies - 개발에서만 쓰이는 것 ('-D'의미는 개발자용)
<hr/>

리액트 mpm추가
-------------
npm i react 
npm i react-dom
(npm i react react-dom 해도 상관없음)
+ react@16.10.2
+ react-dom@16.10.2
package.json -> dependencies -> react, react-dom 추가되어 있다.

<hr/>
webpack 초기설정
-------------
npm i -D webpack
npm i -D webpack-cli 
(npm i -D webpack webpack-cli 해도 상관없음)
+ webpack-cli@3.3.9
+ webpack@4.41.0
package.json -> devDependencies -> webpack, webpack-cli 추가되어 있다.

webpack.config.js, clint.jsx를 추가
(jsx는 react파일이라는 것을 알려주는 것임, js랑 다르다)
webpack.config.js -> 웹팩 설정하는 곳

package.json에 보면...
"@babel/core": 바벨 최신 문법으로 바꿔준다.
"@babel/preset-env": 환경에 맞게 알아서 바꿔준다.
"@babel/preset-react": jsx로 바꿔준다.
"babel-loader": 바벨이랑 웹 팩을 연결해준다.
npm i -dev @babel/preset-react -> 최신 문법을 옛날 문법으로 지원(많이 사용함)
npm i -dev babel-loader -> 바벨이랑 웹팩을 연결함(많이 사용함)









