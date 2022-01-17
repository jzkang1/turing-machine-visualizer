import { createContext, useState} from 'react';
import { getStatesFromTable, getAlphabetFromTable, deepObjectCopy } from '../utils.js';

const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    UPDATE_TRANSITION_TABLE: "UPDATE_TRANSITION_TABLE",
    RESET_TRANSITION_TABLE: "RESET_TRANSITION_TABLE",
    SET_RESET_TABLE_MODAL: "SET_RESET_TABLE_MODAL",
}

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
    });

    const storeReducer = (action) => {
        const {type, payload} = action;
        
        switch(type) {
            case GlobalStoreActionType.UPDATE_TRANSITION_TABLE:
                return setStore({
                    transitionTable: payload.newTransitionTable,
                    states: payload.newStates,
                    alphabet: payload.newAlphabet,
                    acceptingStates: store.acceptingStates,
                    resetTableModalOpen: store.resetTableModalOpen,
                });

            case GlobalStoreActionType.RESET_TRANSITION_TABLE:
                return setStore({
                    transitionTable: deepObjectCopy(GlobalStoreDefaultTransitionTable),
                    states: ["q1", "q2"],
                    alphabet: ["0", "1"],
                    acceptingStates: [],
                    resetTableModalOpen: false,
                });

            case GlobalStoreActionType.SET_RESET_TABLE_MODAL:
                return setStore({
                    transitionTable: store.transitionTable,
                    states: store.states,
                    alphabet: store.alphabet,
                    acceptingStates: store.acceptingStates,
                    resetTableModalOpen: payload,
                });
            
            default:
                break;
        }
    }

    store.updateTransitionTable = (newTransitionTable, newStates, newAlphabet) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_TRANSITION_TABLE,
            payload: {
                newTransitionTable,
                newStates,
                newAlphabet,
            }
        });
    }

    store.resetTransitionTable = () => {
        storeReducer({
            type: GlobalStoreActionType.RESET_TRANSITION_TABLE,
            payload: null
        });
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

    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export { GlobalStoreContextProvider, GlobalStoreContext };