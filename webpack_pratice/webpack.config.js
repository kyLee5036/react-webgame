const path = require('path');
const webpack = require('webpack');

//  Webpack 설정
module.exports = {
    // 이름 설정
    name : 'word-relay-setting',
    // 개발용 : development, 실제 서비스 : production
    mode : 'development',
    // devtool은 eval말고 종류가 많다. 나중에 알아서 조사해볼 것
    devtool : 'eval',
    // 확장자를 적어준다.
    resolve : {
        extensions : ['.js', '.jsx']
    },

    // *** 가장 중요부분 entry, output***
    // entry : 웹팩에서 모든 것은 모듈이다. 자바스크립트, 스타일시트, 이미지 등 모든 것을 자바스크립트 모듈로 로딩해서 사용하도록 한다.
    // output : 엔트리에 설정한 자바스크립트 파일을 시작으로 의존되어 있는 모든 모듈을 하나로 묶을 것이다. 
    // 번들된 결과물을 처리할 위치는 output에 기록한다.
    
    entry : {
        // app에 있는 파일 2개를 합쳐서 app.js로 만들어 준다.
        app: ['./client', 'WordRelay']
    }, // - 간단히 설명 한다면 --> 입력 - 
   
    module : {
        // rules에는 규칙이 있다.
        rules: [{
            // 정규표현식 -> 설명이 많아서 알아서 참고하길
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                    // 브라우저 대응
                    // 옛날 브라우저 지원, 제한, 호환 할 수도 있다.
                        targets: {
                            // 자신이 최신브라우저, 엤날 브라우저 조절할 수 있다.
                            // 사이트 참조 : https://github.com/browserslist/browserslist
                            browsers: ['last 2 chrome versions'],
                        },
                        // 옵션
                        debug : true,
                    }],
                    '@babel/preset-react'
                ],
                // plugins들의 모음이 presets이다.
                plugins: ['@babel/plugin-proposal-class-properties'],
            },
        }],
    },
    // 확장 프로그램이라고 생각하면 된다.
    plugins: [
        new webpack.LoaderOptionsPlugins({ debeg : true})
    ],
    output : {
        // c:\users\...\...\dist
        // 현재 폴더 위치에 dist라는 폴더를 만들어 준다.
        path:path.join(__dirname, 'dist'),
        // 파일 이름
        filename: 'app.js'

    }, // - 간단히 설명 한다면 --> 출력 -

};
