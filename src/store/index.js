import { createContext, useState} from 'react';

const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    
}

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        listOfStates: [],
        alphabet: [],
        transitionTable: {},
        acceptingStates: []
    });

    // const history = useHistory();

    const storeReducer = (action) => {
        const {type, payload} = action;
        
        switch(type) {
            case "UPDATE_STATES":
                return setStore({
                    listOfStates: payload,
                    alphabet: store.alphabet,
                    transitionTable: store.transitionTable,
                    acceptingStates: store.acceptingStates
                });
                break;
            
            case "UPDATE_ALPHABET":
                return setStore({        
                    listOfStates: store.listOfStates,
                    alphabet: payload,
                    transitionTable: store.transitionTable,
                    acceptingStates: store.acceptingStates
                });
                break;
            
            case "UPDATE_ACCEPTING_STATES":
                return setStore({
                    listOfStates: store.listOfStates,
                    alphabet: store.alphabet,
                    transitionTable: store.transitionTable,
                    acceptingStates: payload,
                })
                break;
            
            case "UPDATE_TRANSITION_TABLE":
                return setStore({
                    listOfStates: store.listOfStates,
                    alphabet: store.alphabet,
                    transitionTable: payload,
                    acceptingStates: store.acceptingStates
                })
        }
    }

    store.update_states = function(statesString) {
        storeReducer({
            type: "UPDATE_STATES",
            payload: statesString.split(",").map(item => item.trim())
        });
    }

    store.update_alphabet = (alphabetString) => {
        storeReducer({
            type: "UPDATE_ALPHABET",
            payload: alphabetString.split(",").map(item => item.trim())
        });
    }

    store.update_accepting_states = (acceptingStatesString) => {
        storeReducer({
            type: "UPDATE_ACCEPTING_STATES",
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