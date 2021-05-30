import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const monthList = ['', 'January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Main extends React.Component { // main component
    constructor() {
        super();
        this.persons = [];
    }
    componentDidMount() {
        axios.get(`https://yalantis-react-school-api.yalantis.com/api/task0/users`)
            .then(res => {
                Object.values(res.data).forEach((i) => {
                    i.status = localStorage.getItem(i.id) ? true : false;
                    this.persons.push(i);
                });
                this.persons.sort((a, b) => a.lastName > b.lastName ? 1 : a.lastName < b.lastName ? -1 : 0)
                this.forceUpdate(); // page onload rendering components
            })
    }
    render() {
        return (
            <Blocks persons={this.persons} />
        )
    }
}

const changeStatus = (setStatus, value, id, list, setList) => { // radiobutton click handler
    setStatus(value); // apply & render changes in person active status
    if (value) { localStorage.setItem(id, true) } else localStorage.removeItem(id);
    let newList = list.map((i) => {
        if (i.id === id) {
            i.status = value;
        }
        return i;
    });
    setList(newList); // apply & render changes in birthday list
}

const Radio = (props) => { // radiobuttons component
    return (
        <div>
            <label>
                <input
                    type="radio"
                    checked={props.status ? 'checked' : ''}
                    onChange={() => changeStatus(props.setStatus, true, props.id, props.list, props.setList)}
                />
                active
            </label>

            <label>
                <input
                    type="radio"
                    checked={!props.status ? 'checked' : ''}
                    onChange={() => changeStatus(props.setStatus, false, props.id, props.list, props.setList)}
                />
                not active
            </label>
        </div>
    )
}

const Name = (props) => { // persons item radiobuttons component
    const [status, setStatus] = useState(props.status);
    let color = status ? { color: 'blue' } : { color: 'black' };
    return (
        <li className="name" style={color}>
            {props.lastName} {props.firstName}
            <Radio
                status={status}
                setStatus={setStatus}
                id={props.id}
                setList={props.setList}
                list={props.list}
            />
        </li>
    )
}

const Letter = (props) => { // letter relationed persons list component
    let names = [];
    props.persons.forEach((i, n) => {
        names.push(
            <Name
                firstName={i.firstName}
                lastName={i.lastName}
                status={i.status}
                id={i.id}
                setList={props.setList}
                list={props.list}
                key={'name'+n}
            />
        )
    })
    if (names.length === 0) names.push(<li className="name center">-------</li>); // if not persons, whoes last name beginning from current letter
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

const Left = (props) => { // left panel parent component
    let letters = [];
    for (let n = 65; n <= 90; n++) { // letters array loop
        let filteredPersons = props.list.filter((i) => {
            return (i.lastName.charAt(0).toUpperCase() === String.fromCharCode(n));
        });

        letters.push(
            <Letter
                letter={String.fromCharCode(n)}
                persons={filteredPersons}
                setList={props.setList}
                list={props.list}
                key={n.toString()}
            />)
    }
    return (
        <div className="left">
            <div className="scroll">
                {letters}
            </div>
        </div>
    )
}

const getMonth = (date)=>{ // parse month value from JSON date string
    return +date.substring(5, 7);
}

const monthOrder = (date) => { // returns month order relatively current month
    let curDate = new Date();
    let order = +date.substring(5, 7) - curDate.getMonth() - 1;
    if (order < 0) order = order + 12;
    return order;
}

const dateParse = (date) => { // returns the birthday string from JSON date string
    const day = date.substring(8, 10);
    const month = +date.substring(5, 7);
    const year = date.substring(0, 5);
    return `${day} ${monthList[month]}, ${year} year`;
}

const RightElem = (props) => { // username & birthday component
    return (
        <div className="item">{props.lastName} {props.firstName} - {dateParse(props.dob)}</div>
    );
}

const RightMonth = (props) => { // rightpanel month title component
    return (
        <div className="month">{monthList[props.date]}</div>
    );
}

const Right = (props) => { // right panel parent component
    const filteredList = props.list.filter ((i)=>{
        return i.status;
    })
    let items = [];
    let titleText = 'Employees birthday';
    filteredList.sort((a, b)=> monthOrder(a.dob) > monthOrder(b.dob) ? 1 : monthOrder(a.dob) < monthOrder(b.dob) ? -1 : 0);
    let counter;
    filteredList.forEach((i, n) => {
        if (counter !== getMonth(i.dob)) {
            items.push(<RightMonth date={getMonth(i.dob)} key={'month'+counter}/>);
            counter = getMonth(i.dob);
        }
        items.push(
            <RightElem
                lastName={i.lastName}
                firstName={i.firstName}
                dob={i.dob}
                key={n}
            />
        );
    });
    if (items.length === 0) titleText = 'Employees List is empty';
    return (
        <div className="right">
            <div className="title">{titleText}</div>
            {items}
        </div>
    )
}

function Blocks(props) { // global parent component
    const [list, setList] = useState(props.persons);
    return (
        <div className="main">
            <Left list={list} setList={setList} />
            <Right list={list} setList={setList} />
        </div>
    )
}

function App() {
    return (
        <Main />
    )
}

export default App;