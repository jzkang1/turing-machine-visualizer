import React, {useEffect, useState} from 'react';
import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function TransitionTable(props) {
    const {store} = useContext(GlobalStoreContext);
    
    const [table, setTable] = useState(null);

    useEffect(() => {
        handleGenerateTable();
    }, [store.currentlyEditingCell]);
      
    function getMaxWidth(alphabet) {
        if (alphabet.length < 10) {
            return 400 + alphabet.length*50;
        } else {
            return 1000;
        }
    }

    function getAlphabetRow(alphabet) {
        let row = [];
        for (let i = 0; i < alphabet.length; i++) {
            row.push(<TableCell align="center" sx={{minWidth: 50}}>{alphabet[i]}</TableCell>);
        }
        return row;
    }

    function getStateRows(listOfStates, alphabet) {
        let rows = [];
        for (let i = 0; i < listOfStates.length; i++) {
            let row = [<TableCell component="th">{listOfStates[i]}</TableCell>];
            for (let j = 0; j < alphabet.length; j++) {
                if (store.currentlyEditingCell !== null 
                    && store.currentlyEditingCell.state  === listOfStates[i] 
                    && store.currentlyEditingCell.character === alphabet[j]){
                    row.push(
                        <TextField onKeyPress={(event) => {handleOnEnter(event)}}
                        placeholder={store.currentlyEditingCell.state !== null ? store.currentlyEditingCell.state : "Input something"} sx={{maxWidth: 100}}></TextField>
                    );
                }
                
                else {  
                    row.push(
      
                    <TableCell  onDoubleClick={(event) => {handleTableCellDoubleClick(event, listOfStates[i], alphabet[j])}} 
                    align="center"
                    key={listOfStates[i] + " " + alphabet[j]}>
                        {"(C,A)"}
                    </TableCell>
                    );
                }
            }
            rows.push(
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {row}
                </TableRow>
            );
        }
        return rows;
    }

    function handleTableCellDoubleClick(event, state, character) {
        console.log("SHALOM")
        event.stopPropagation();
        store.updateCurrentlyEditingCell({state, character, action: {}});
    }

    function handleOnEnter(event) {
        event.stopPropagation();
        if(event.key === "Enter") {
            // get new cell action
            // let cell = event.target.value;

            // let newTransitionTable = store.transitionTable;
            // newTransitionTable[store.currentlyEditingCell.state][store.currentlyEditingCell.char] = cell.action;
            // store.updateTransitionTable(newTransitionTable);
            store.updateCurrentlyEditingCell(null);
            console.log('them')
        }
        // (write_character, action)

    }
    
    function handleGenerateTable() {
        const { changed, listOfStates, alphabet, acceptingStates } = props.updateInputs();
        
        if (!changed) {
            return;
        }
        
        setTable(
        <div style={{display:"flex", "justifyContent": "center"}}>
        <TableContainer component={Paper} sx={{minWidth: 200, maxWidth: getMaxWidth(alphabet), mt: "10vh"}}>
            <Table sx={{maxWidth: getMaxWidth(alphabet) }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>States</TableCell>
                        {getAlphabetRow(alphabet)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getStateRows(listOfStates, alphabet)}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
        );

        let newTransitionTable = {};
        for (let state of listOfStates) {
            let stateObj = {};
            for (let character of store.alphabet) {
                stateObj[character] = {write: null, action: null}
            }
            newTransitionTable[state] = stateObj;
        }

        store.updateTransitionTable(newTransitionTable);
    }

    return (
        <div style={{display:"block", "justifyContent":"center"}}>
        <Button variant="contained" color="success" sx={{mt: "8vh"}} onClick={handleGenerateTable}>
        Generate Table
        </Button>
        {table}
        </div>
    );
}