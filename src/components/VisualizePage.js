import React from 'react';
import TransitionTable from './TransitionTable.js';
import Visual from './Visual.js'
export default function VisualizePage(props) {
    return (
        <React.Fragment>
            <h1>Turing Machine Visualizer</h1>
            <TransitionTable/>
            <Visual/>
        </React.Fragment>
    );
}