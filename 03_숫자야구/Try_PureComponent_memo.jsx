import React, { PureComponent } from 'react';
import React, { memo } from 'react';

// class인 경우 -> PureComponent
class Try extends PureComponent {
    render() {
        const { tryInfo } = this.props;
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        );
    }
}

// Hooks인 경우 -> Memo인 경우
const Try = memo (( {tryInfo}) => {
   
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );   
});


export default Try;