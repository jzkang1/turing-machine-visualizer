import { useContext } from 'react';
import { GlobalStoreContext } from './store';
import './App.css';
import CurrentPage from "./components/CurrentPage.js";
import {GlobalStoreContextProvider} from "./store";

function App() {
    const {store} = useContext(GlobalStoreContext);

    const getCurrentPage = () => {
        if (store.currentPage) {

        }
    }

    return (
        <GlobalStoreContextProvider>
            <div className="App">
                <CurrentPage/>
            </div>
        </GlobalStoreContextProvider>
    );
}

export default App;