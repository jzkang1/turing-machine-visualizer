import { createContext, useState} from 'react';

const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    UPDATE_TRANSITION_TABLE: "UPDATE_TRANSITION_TABLE",
    RESET_TRANSITION_TABLE: "RESET_TRANSITION_TABLE",
    UPDATE_CURRENTLY_EDITING_CELL: "UPDATE_CURRENTLY_EDITING_CELL",
    SET_RESET_TABLE_MODAL: "SET_RESET_TABLE_MODAL",
}

export const GlobalStoreDefaultTransitionTable = {
    q1: {"a":{write: null, action: null}, "b":{write: null, action: null}},
    q2: {"a":{write: null, action: null}, "b":{write: null, action: null}},
}

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        transitionTable: GlobalStoreDefaultTransitionTable,
        currentlyEditingCell: null,
        resetTableModalOpen: false,
    });

    const storeReducer = (action) => {
        const {type, payload} = action;
        
        switch(type) {
            case GlobalStoreActionType.UPDATE_TRANSITION_TABLE:
                return setStore({
                    transitionTable: payload,
                    currentlyEditingCell: store.currentlyEditingCell,
                    resetTableModalOpen: store.resetTableModalOpen,
                });

            case GlobalStoreActionType.RESET_TRANSITION_TABLE:
                return setStore({
                    transitionTable: GlobalStoreDefaultTransitionTable,
                    currentlyEditingCell: null,
                    resetTableModalOpen: false,
                });

            case GlobalStoreActionType.UPDATE_CURRENTLY_EDITING_CELL:
                return setStore({
                    transitionTable: store.transitionTable,
                    currentlyEditingCell : payload,
                    resetTableModalOpen: store.resetTableModalOpen,
                });
            
            case GlobalStoreActionType.SET_RESET_TABLE_MODAL:
                return setStore({
                    transitionTable: store.transitionTable,
                    currentlyEditingCell : store.currentlyEditingCell,
                    resetTableModalOpen: payload,
                });
            
            default:
                break;
        }
    }

    store.updateTransitionTable = (transitionTable) => {
        console.log("updated transition table");
        console.log(transitionTable);
        storeReducer({
            type: GlobalStoreActionType.UPDATE_TRANSITION_TABLE,
            payload: transitionTable
        });
    }

    store.resetTransitionTable = () => {
        console.log("reset transition table");
        storeReducer({
            type: GlobalStoreActionType.RESET_TRANSITION_TABLE,
            payload: null
        });
    }

    store.updateCurrentlyEditingCell = (cell) => {
        console.log("updated currently editing cell");
        console.log(cell);
        storeReducer({
            type: GlobalStoreActionType.UPDATE_CURRENTLY_EDITING_CELL,
            payload: cell
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