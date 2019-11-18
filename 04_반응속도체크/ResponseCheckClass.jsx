import React, {Component} from 'react';

class ResponseCheckClass extends Component {
    state = {
        state:'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };

    render() {

        return (
          <>
           <div 
              id="screen"
              className="">

           </div>
          </>
        )
      }
}


export default ResponseCheckClass;