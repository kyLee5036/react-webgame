const React = require('react');
const {useState, useRef} = React;

const GuguDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if ( parseInt(value) === first * second) {
            setResult('OK: '+ value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            inputRef.current.focus();
        } else {
            setResult('NO');
            setValue('');
            inputRef.current.focus();
        }
    }


    return (
        <> 
            <div> {first} X {second} = ? </div>
            <form onSubmit={onSubmitForm} >
                <input value={value} ref={inputRef} onChange={onChangeInput} />
                <button>button</button>
            </form>
            <div id="result">{result}</div>
        </>
    );
    
}

module.exports = GuguDan;