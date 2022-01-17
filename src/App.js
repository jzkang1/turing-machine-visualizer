import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStoreContext } from './store';
import { AboutPage, HomePage, VisualizePage } from './components'
import './App.css';
import {GlobalStoreContextProvider} from "./store";
import {AppBar, Toolbar, Typography} from '@mui/material'

function App() {
    const {store} = useContext(GlobalStoreContext);

    return (
        <BrowserRouter>
            <GlobalStoreContextProvider>
                <div className="App">
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                        TMV
                        </Typography>
                    </Toolbar>
                </AppBar>
                    <Routes>
                        <Route path="/" exact element={<HomePage/>}/>
                        <Route path="/about" exact element={<AboutPage/>}/>
                        <Route path="/visualize" exact element={<VisualizePage/>}/>
                    </Routes>
                </div>
            </GlobalStoreContextProvider>
        </BrowserRouter>

    );
}

export default App;