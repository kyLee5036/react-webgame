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
        
        // 현재 array랑 이전 array true가 나와서 렌더링이 안된다.
        // const array = this.state.array;
        // array.push(1);
        // this.setState({
        //     array: array,
        // });

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