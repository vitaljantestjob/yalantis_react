import './App.css';
import React from 'react';
import axios from 'axios';

let persons = [];
// let alphabetString = '';
// for (let n = 65; n<= 90; n++) alphabetString += String.fromCharCode(n);
// let alphabet = alphabetString.split('');

class Main extends React.Component {
    componentDidMount() {
        axios.get(`https://yalantis-react-school-api.yalantis.com/api/task0/users`)
            .then(res => {
                Object.values(res.data).forEach((i)=>{
                    persons.push(i);
                })
                console.log(persons)
            })
    }

    render() {
        return (
            <div className="main">
                <Left />
                <Right/>
            </div>
        )
    }
}
const Letter = (props)=>{
    return (
        <div className="letter">
            <div className="title">
                {props.letter}
            </div>
        </div>
    )
}

const Left = (props) => {
    let letters = [];
    for (let n = 65; n <= 90; n++) letters.push(<Letter letter={String.fromCharCode(n)} key={n}/>)
    return (
        <div className="left">
            <div className="scroll">

            {letters}
            </div>
        </div>
    )
}

const Right = () => {
    return (
        <div className="right">
        </div>
    )
}


function App() {
    return (
        <Main />
    )
}

export default App;