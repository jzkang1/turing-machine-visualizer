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
        transitionTable: {}
    });

    // const history = useHistory();

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
        storeReducer({
            type: GlobalStoreActionType.UPDATE_STATES,
            payload: statesString.split(",").map(item => item.trim())
        });
    }

    store.updateAlphabet = (alphabetString) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_ALPHABET,
            payload: alphabetString.split(",").map(item => item.trim())
        });
    }

    store.updateAcceptingStates = (acceptingStatesString) => {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_ACCEPTING_STATES,
            payload: acceptingStatesString.split(",").map(item => item.trim())
        });
    }

    store.update_transition_table = (transitionTable) => {
        storeReducer({
            type: "UPDATE_TRANSITION_TABLE",
            payload: transitionTable
        });
    }

    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
    
}

export { GlobalStoreContextProvider, GlobalStoreContext };