import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

// let persons = [];

class Main extends React.Component {
    constructor() {
        super();
        this.state = { persons: [] };
        this.persons = [];
    }
    componentDidMount() {
        axios.get(`https://yalantis-react-school-api.yalantis.com/api/task0/users`)
            .then(res => {
                Object.values(res.data).forEach((i) => {
                    i.status = false;
                    this.persons.push(i);
                });
                this.persons.sort((a, b) => a.lastName > b.lastName ? 1 : a.lastName < b.lastName ? -1 : 0)
                this.setState({ persons: this.persons });
            })
    }
    render() {
        return (
            <div className="main">
                <Left persons={this.state.persons} />
                <Right />
            </div>
        )
    }
}

const Radio = (props) => {
    // const [status, setStatus] = useState(props.status);
    return (
        <div>
            <label><input type="radio" checked={props.status ? 'checked' : ''} onChange={()=>props.setStatus(true)}/> active </label>

            <label><input type="radio" checked={!props.status ? 'checked' : ''} onChange={()=>props.setStatus(false)}/> not active </label>
        </div>
    )
}

const Name = (props) => {
    const [status, setStatus] = useState(props.status);
    let color = status ? {color: 'blue'} : {color: 'black'};
    return (
        <li className="name" style={color}>
            {props.lastName} {props.firstName}
            <Radio status={status} setStatus={setStatus}/>
        </li>
    )
}

const Letter = (props) => {
    let names = [];
    props.persons.forEach((i, n) => {
        names.push(
            <Name firstName={i.firstName} lastName={i.lastName} key={n.toString()}/>
        )
    })
    if (names.length === 0) names.push(<li className="name center" key='0'>-------</li>)
    return (
        <div className="letter">
            <div className="title">
                {props.letter}
            </div>
            <ul>
                {names}
            </ul>
        </div>
    )
}

const Left = (props) => {
    let letters = [];
    for (let n = 65; n <= 90; n++) {
        let filteredPersons = props.persons.filter((i) => {
            return (i.lastName.charAt(0).toUpperCase() === String.fromCharCode(n));
        });

        letters.push(<Letter letter={String.fromCharCode(n)} persons={filteredPersons} key={n.toString()} />)
    }
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