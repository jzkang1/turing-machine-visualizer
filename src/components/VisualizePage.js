import React from "react";
import TransitionTable from "./TransitionTable.js";

export default function VisualizePage(props) {
    return (
        <React.Fragment>
            <h1>Turing Machine Visualizer</h1>
            <TransitionTable/>
        </React.Fragment>
    );
}