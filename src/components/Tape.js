import React, { useContext } from 'react';
import { GlobalStoreContext } from '../store/index.js'

export default function Tape(props){
    const { store } = useContext(GlobalStoreContext);

    return (<div style={{margin: "10em"}}>asdf</div>);
}