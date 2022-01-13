import TextField from '@mui/material/TextField';
import React, {useState, useContext} from 'react';
import { GlobalStoreContext } from '../store';
import TransitionTable from "./TransitionTable.js"


export default function Input() {
    const {store} = useContext(GlobalStoreContext);

    const[listOfStates, setListOfStates] = useState(store.listOfStates);
    const[alphabet, setAlphabet] = useState(store.alphabet);
    const[acceptingStates, setAcceptingStates] = useState(store.acceptingStates);

    const getListFromString = (string) => {
        if (string === "") {
            return []
        }
        return string.split(",").map(item => item.trim())
    }

    const equalArray = (a1, a2) => {
        if (a1.length !== a2.length) {
            return false;
        }
        for (let i = 0; i < a1.length; i++) {
            if (a1[i] !== a2[i]) {
                return false;
            }
        }
        return true;
    }
    
    const handleOnChangeStates = (event) => {
        setListOfStates(getListFromString(event.target.value));
    }
    const handleOnChangeAlphabet = (event) => {
        setAlphabet(getListFromString(event.target.value));
    }

    const handleOnChangeAccStates = (event) => {
        setAcceptingStates(getListFromString(event.target.value));
    }

    const updateInputs = () => {
        let changed = false;
        if (!equalArray(store.listOfStates, listOfStates)) {
            store.updateListOfStates(listOfStates);
            changed = true;
        }

        if (!equalArray(store.listOfStates, alphabet)) {
            store.updateAlphabet(listOfStates);
            changed = true;
        }

        if (!equalArray(store.acceptingStates, acceptingStates)) {
            store.updateAcceptingStates(acceptingStates);
            changed = true;
        }

        return {
            changed,
            listOfStates,
            alphabet,
            acceptingStates
        };
    }
    
    return (
    <React.Fragment>
        <h1>Turing Machine Visualizer</h1>
        <h2>Input states separated by commas:</h2> 

        <TextField className = 'input states' onChange={handleOnChangeStates}>States</TextField>

        <h2>Input alphabet separated by commas:</h2>
        
        <TextField className = 'input alphabet 'onChange={handleOnChangeAlphabet}>Alphabet</TextField>
        
        <h2>Input accepting states separated by commas:</h2>

        <TextField className = 'input acc-states' onChange={handleOnChangeAccStates}>Accepting States</TextField>

        <TransitionTable updateInputs={updateInputs}/>
    </React.Fragment>
    );
}

