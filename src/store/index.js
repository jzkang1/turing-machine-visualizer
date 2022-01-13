import { createContext, useState} from 'react';

const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    NAVIGATE_PAGE: "NAVIGATE_PAGE",
    UPDATE_STATES: "UPDATE_STATES",
    UPDATE_ALPHABET: "UPDATE_ALPHABET",
    UPDATE_ACCEPTING_STATES: "UPDATE_ACCEPTING_STATES",
    UPDATE_TRANSITION_TABLE: "UPDATE_TRANSITION_TABLE",
}

export const GlobalStorePageType = {
    HOME: "HOME",
    ABOUT: "ABOUT",
    VISUALIZE: "VISUALIZE",
}

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        currentPage: GlobalStorePageType.HOME,
        listOfStates: [],
        alphabet: [],
        acceptingStates: [],
        transitionTable: {currentlyEditingCell: null, table: {}},
        generateTable: false,
    });

    const storeReducer = (action) => {
        const {type, payload} = action;
        
        switch(type) {
            case GlobalStoreActionType.NAVIGATE_PAGE:
                return setStore({
                    currentPage: payload,
                    listOfStates: store.listOfStates,
                    alphabet: store.alphabet,
                    acceptingStates: store.acceptingStates,
                    transitionTable: store.transitionTable
                });

            case GlobalStoreActionType.UPDATE_STATES:
                return setStore({
                    currentPage: store.currentPage,
                    listOfStates: payload,
                    alphabet: store.alphabet,
                    acceptingStates: store.acceptingStates,
                    transitionTable: store.transitionTable
                });
            
            case GlobalStoreActionType.UPDATE_ALPHABET:
                return setStore({        
                    currentPage: store.currentPage,
                    listOfStates: store.listOfStates,
                    alphabet: payload,
                    acceptingStates: store.acceptingStates,
                    transitionTable: store.transitionTable
                });
            
            case GlobalStoreActionType.UPDATE_ACCEPTING_STATES:
                return setStore({
                    currentPage: store.currentPage,
                    listOfStates: store.listOfStates,
                    alphabet: store.alphabet,
                    acceptingStates: payload,
                    transitionTable: store.transitionTable
                });
            
            case GlobalStoreActionType.UPDATE_TRANSITION_TABLE:
                return setStore({
                    currentPage: store.currentPage,
                    listOfStates: store.listOfStates,
                    alphabet: store.alphabet,
                    acceptingStates: store.acceptingStates,
                    transitionTable: payload
                });
            //Edit for cell clicking functionality.
            case GlobalStoreActionType.UPDATE_CURRENTLY_EDITING:
                return setStore({
                    currentPage:store.currentPage,
                    listOfStates: store.listOfStates,
                    alphabet: store.alphabet,
                    acceptingStates: store.acceptingStates,
                    transitionTable: payload

                })
            
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

    store.updateStates = function(statesString) {
        let statesPayload = [];
        if (statesString !== "") {
            statesPayload = statesString.split(",").map(item => item.trim());
        }
        storeReducer({
            type: GlobalStoreActionType.UPDATE_STATES,
            payload: statesPayload
        });
    }

    store.updateAlphabet = (alphabetString) => {
        let alphabetPayload = [];
        if (alphabetString !== "") {
            alphabetPayload = alphabetString.split(",").map(item => item.trim())
        }

        storeReducer({
            type: GlobalStoreActionType.UPDATE_ALPHABET,
            payload: alphabetPayload
        });
    }

    store.updateAcceptingStates = (acceptingStatesString) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_ACCEPTING_STATES,
            payload: acceptingStatesString.split(",").map(item => item.trim())
        });
    }

    store.updateTransitionTable = (transitionTable) => {
        storeReducer({
            type: "UPDATE_TRANSITION_TABLE",
            payload: transitionTable
        });
    }

    store.updateCurrentlyEditingCell = () => {
        storeReducer({
            type: "UPDATE_CURRENTLY_EDITING_CELL",

        });
    }

    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
    
}

export { GlobalStoreContextProvider, GlobalStoreContext };