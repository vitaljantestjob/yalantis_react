import './App.css';
import React from 'react';
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
                    this.persons.push(i);
                });
                this.persons.sort((a, b) => a.lastName > b.lastName ? 1 : a.lastName < b.lastName ? -1 : 0)
                this.persons.forEach((i) => {
                })
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
    let text = props.type === 'active' ? 'active' : 'not active';
    let checked = '';
    if ( (props.type === 'active' && props.status === 'active') || (props.type != 'active' && props.status != 'active') ) checked = 'checked';
    return (
        <label><input type="radio" checked={checked}/> {text} </label>    )
}

const Letter = (props) => {
    let names = [];
    props.persons.forEach((i, n) => {
        names.push(
            <li className="name" key={n.toString()}>
                {i.lastName} {i.firstName}
                <Radio type='active' status=''/>
                <Radio type='' status=''/>
            </li>)
    });
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