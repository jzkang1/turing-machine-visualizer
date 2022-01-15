import { createContext, useState} from 'react';

const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    NAVIGATE_PAGE: "NAVIGATE_PAGE",
    UPDATE_LIST_OF_STATES: "UPDATE_LIST_OF_STATES",
    UPDATE_ALPHABET: "UPDATE_ALPHABET",
    UPDATE_ACCEPTING_STATES: "UPDATE_ACCEPTING_STATES",
    UPDATE_TRANSITION_TABLE: "UPDATE_TRANSITION_TABLE",
    UPDATE_CURRENTLY_EDITING_CELL: "UPDATE_CURRENTLY_EDITING_CELL"
}

export const GlobalStorePageType = {
    HOME: "HOME",
    ABOUT: "ABOUT",
    VISUALIZE: "VISUALIZE",
}

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        listOfStates: [],
        alphabet: [],
        acceptingStates: [],
        transitionTable: {},
        currentlyEditingCell: null, 
    });

    const storeReducer = (action) => {
        const {type, payload} = action;
        
        switch(type) {
            case GlobalStoreActionType.NAVIGATE_PAGE:
                return setStore({
                    listOfStates: store.listOfStates,
                    alphabet: store.alphabet,
                    acceptingStates: store.acceptingStates,
                    transitionTable: store.transitionTable,
                    currentlyEditingCell: store.currentlyEditingCell,
                });

            case GlobalStoreActionType.UPDATE_LIST_OF_STATES:
                return setStore({
                    listOfStates: payload,
                    alphabet: store.alphabet,
                    acceptingStates: store.acceptingStates,
                    transitionTable: store.transitionTable,
                    currentlyEditingCell: store.currentlyEditingCell,
                   
                });
            
            case GlobalStoreActionType.UPDATE_ALPHABET:
                return setStore({        
                    listOfStates: store.listOfStates,
                    alphabet: payload,
                    acceptingStates: store.acceptingStates,
                    transitionTable: store.transitionTable,
                    currentlyEditingCell: store.currentlyEditingCell,

                });
            
            case GlobalStoreActionType.UPDATE_ACCEPTING_STATES:
                return setStore({
                    listOfStates: store.listOfStates,
                    alphabet: store.alphabet,
                    acceptingStates: payload,
                    transitionTable: store.transitionTable,
                    currentlyEditingCell: store.currentlyEditingCell,

                });
            
            case GlobalStoreActionType.UPDATE_TRANSITION_TABLE:
                return setStore({
                    listOfStates: store.listOfStates,
                    alphabet: store.alphabet,
                    acceptingStates: store.acceptingStates,
                    transitionTable: payload,
                    currentlyEditingCell: store.currentlyEditingCell,
                   
                });
            //Edit for cell clicking functionality.
            case GlobalStoreActionType.UPDATE_CURRENTLY_EDITING_CELL:
                return setStore({
                    currentPage:store.currentPage,
                    listOfStates: store.listOfStates,
                    alphabet: store.alphabet,
                    acceptingStates: store.acceptingStates,
                    transitionTable: store.transitionTable,
                    currentlyEditingCell : payload,
                });
            
            default:
                break;
        }
    }

    store.navigatePage = function(pageType) {
        storeReducer({
            type: GlobalStoreActionType.NAVIGATE_PAGE,
            payload: pageType
        });
    }

    store.updateListOfStates = function(newStates) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_LIST_OF_STATES,
            payload: newStates
        });
    }

    store.updateAlphabet = (newAlphabet) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_ALPHABET,
            payload: newAlphabet
        });
    }

    store.updateAcceptingStates = (newAcceptingStates) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_ACCEPTING_STATES,
            payload: newAcceptingStates
        });
    }

    store.updateTransitionTable = (transitionTable) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_TRANSITION_TABLE,
            payload: transitionTable
        });
    }

    store.updateCurrentlyEditingCell = (cell) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_CURRENTLY_EDITING_CELL,
            payload: cell
        });
    }

    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
    
}

export { GlobalStoreContextProvider, GlobalStoreContext };