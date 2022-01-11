import TextField from '@mui/material/TextField';
import React from 'react';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function Input() {
    const {store} = useContext(GlobalStoreContext);
    
    const handleOnChangeStates = (event) => {
        store.update_states(event.target.value);
    }
    const handleOnChangeAlphabet = (event) => {
        store.update_alphabet(event.target.value)
    }

    const handleOnChangeAccStates = (event) => { 
        store.update_accepting_states(event.target.value);
    }
    
    return (
    <React.Fragment>
        <h1>Turing Machine Visualizer</h1>
        <h2>Input states separated by commas:</h2> 

        <TextField className = 'input states' onChange={handleOnChangeStates}>States</TextField>

        <table className = 'input table'>
            <h1>

            </h1>
        </table> 
        <h2>Input alphabet separated by commas:</h2>
        
        <TextField className = 'input alphabet 'onChange={handleOnChangeAlphabet}>Alphabet</TextField>
        
        <h2>Input accepting states separated by commas:</h2>

        <TextField className = 'input acc-states' onChange={handleOnChangeAccStates}>Accepting States</TextField>
        
        <div>{store.listOfStates.map(item => item + " ")}</div>
    </React.Fragment>
    );
}

export default Input;