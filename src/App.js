import './App.css';
import Input from "./components/Input.js"
import {GlobalStoreContextProvider} from "./store"

function App() {
    return (
        <GlobalStoreContextProvider>
            <div className="App">
                <Input/>
            </div>
        </GlobalStoreContextProvider>
    );
}

export default App;