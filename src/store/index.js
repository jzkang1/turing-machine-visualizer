import { createContext, useState} from 'react';
import { deepObjectCopy, getAlphabetFromTable, getStatesFromTable } from '../utils.js';

const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    UPDATE_TRANSITION_TABLE: "UPDATE_TRANSITION_TABLE",
    RESET_TRANSITION_TABLE: "RESET_TRANSITION_TABLE",
    SET_RESET_TABLE_MODAL: "SET_RESET_TABLE_MODAL",
    SET_DELETE_STATE_MODAL: "SET_DELETE_STATE_MODAL",
    SET_DELETE_PARSE_CHARACTER_MODAL: "SET_DELETE_PARSE_CHARACTER_MODAL",
    SET_ACCEPTING_STATES: "SET_ACCEPTING_STATES",
    UPDATE_IS_TAPE_RUNNING: "UPDATE_IS_TAPE_RUNNING",
    SET_TAPE_RUNTIME_OBJ: "SET_TAPE_RUNTIME_OBJ",
}

// ALWAYS MAKE A DEEP COPY, NEVER DIRECTLY REFERENCE
export const GlobalStoreDefaultTransitionTable = {
    q1: {"0":{action: null, newState: null}, "1":{action: null, newState: null}},
    q2: {"0":{action: null, newState: null}, "1":{action: null, newState: null}},
}

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        transitionTable: deepObjectCopy(GlobalStoreDefaultTransitionTable),
        states: ["q1", "q2"],
        alphabet: ["0", "1"],
        acceptingStates: [],
        resetTableModalOpen: false,
        tapeRuntimeObj: null,
    });

    const storeReducer = (action) => {
        const {type, payload} = action;
        
        switch(type) {
            case GlobalStoreActionType.UPDATE_TRANSITION_TABLE:
                console.log("updated transition table");
                return setStore({
                    transitionTable: payload.newTransitionTable,
                    states: payload.newStates,
                    alphabet: payload.newAlphabet,
                    acceptingStates: store.acceptingStates,
                    resetTableModalOpen: store.resetTableModalOpen,
                    tapeRuntimeObj: null,
                });

            case GlobalStoreActionType.RESET_TRANSITION_TABLE:
                return setStore({
                    transitionTable: deepObjectCopy(GlobalStoreDefaultTransitionTable),
                    states: ["q1", "q2"],
                    alphabet: ["0", "1"],
                    acceptingStates: [],
                    resetTableModalOpen: false,
                    tapeRuntimeObj: null,
                });

            case GlobalStoreActionType.SET_RESET_TABLE_MODAL:
                return setStore({
                    transitionTable: store.transitionTable,
                    states: store.states,
                    alphabet: store.alphabet,
                    acceptingStates: store.acceptingStates,
                    resetTableModalOpen: payload,
                    tapeRuntimeObj: null,
                });

            case GlobalStoreActionType.SET_ACCEPTING_STATES:
                return setStore({
                    transitionTable: store.transitionTable,
                    states: store.states,
                    alphabet: store.alphabet,
                    acceptingStates: payload,
                    resetTableModalOpen: store.resetTableModalOpen,
                    tapeRuntimeObj: store.tapeRuntimeObj,
                });
            
            case GlobalStoreActionType.SET_TAPE_RUNTIME_OBJ:
                return setStore({
                    transitionTable: store.transitionTable,
                    states: store.states,
                    alphabet: store.alphabet,
                    acceptingStates: store.acceptingStates,
                    resetTableModalOpen: store.resetTableModalOpen,
                    tapeRuntimeObj: payload,
                });

            default:
                break;
        }
    }

    store.updateTransitionTable = (newTransitionTable) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_TRANSITION_TABLE,
            payload: {
                newTransitionTable,
                newStates: getStatesFromTable(newTransitionTable),
                newAlphabet: getAlphabetFromTable(newTransitionTable),
            }
        });
    }

    store.resetTransitionTable = () => {
        storeReducer({
            type: GlobalStoreActionType.RESET_TRANSITION_TABLE,
            payload: null
        });
    }

    store.addRow = () => {
        let latestStateNum = store.states[store.states.length-1].slice(1);
        let newState = "q" + (parseInt(latestStateNum) + 1).toString();
        let newTransitionTable = store.transitionTable;
        newTransitionTable[newState] = {};
        for (let character of store.alphabet){
            newTransitionTable[newState][character] = {action: null, newState: null}
        }
        store.updateTransitionTable(newTransitionTable);
    }

    store.addColumn = () => {
        let latestCharacter = parseInt(store.alphabet[store.alphabet.length-1]);
        let newCharacter = (latestCharacter + 1).toString();
        let newTransitionTable = store.transitionTable;
        for(let state of store.states) {
            newTransitionTable[state][newCharacter] = {action: null, newState: null}
        }
        store.updateTransitionTable(newTransitionTable);
    }

    store.setCellAction = (state, parseCharacter, newAction) => {
        let newTransitionTable = store.transitionTable;
        newTransitionTable[state][parseCharacter].action = newAction;
        store.updateTransitionTable(newTransitionTable);
    }

    store.setCellNewState = (state, parseCharacter, newAction) => {
        let newTransitionTable = store.transitionTable;
        newTransitionTable[state][parseCharacter].newState = newAction;
        store.updateTransitionTable(newTransitionTable);
    }

    store.openResetTableModal = () => {
        storeReducer({
            type: GlobalStoreActionType.SET_RESET_TABLE_MODAL,
            payload: true
        });
    }

    store.closeResetTableModal = () => {
        storeReducer({
            type: GlobalStoreActionType.SET_RESET_TABLE_MODAL,
            payload: false
        });
    }

    store.openDeleteStateModal = () => {
        storeReducer({
            type: GlobalStoreActionType.SET_DELETE_STATE_MODAL,
            payload: true
        });
    }

    store.closeDeleteStateModal = () => {
        storeReducer({
            type: GlobalStoreActionType.SET_DELETE_STATE_MODAL,
            payload: false
        });
    }

    store.addAcceptingState = (state) => {
        let newAcceptingStates = store.acceptingStates;
        newAcceptingStates.push(state);
        storeReducer({
            type: GlobalStoreActionType.SET_ACCEPTING_STATES,
            payload: newAcceptingStates
        });
    }

    store.removeAcceptingState = (state) => {
        let newAcceptingStates = store.acceptingStates;
        newAcceptingStates.splice(store.acceptingStates.indexOf(state),1);
        storeReducer({
            type: GlobalStoreActionType.SET_ACCEPTING_STATES,
            payload: newAcceptingStates
        });
    }

    store.startMachine = () => {
        storeReducer({
            type: GlobalStoreActionType.SET_TAPE_RUNTIME_OBJ,
            payload: {paused: false}
        });
    }

    store.pauseMachine = () => {
        storeReducer({
            type: GlobalStoreActionType.SET_TAPE_RUNTIME_OBJ,
            payload: {paused: true}
        });
    }

    store.unpauseMachine = () => {
        let newTapeRuntimeObj = store.tapeRuntimeObj;
        newTapeRuntimeObj.paused = false;
        storeReducer({
            type: GlobalStoreActionType.SET_TAPE_RUNTIME_OBJ,
            payload: newTapeRuntimeObj
        });
    }

    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export { GlobalStoreContextProvider, GlobalStoreContext };