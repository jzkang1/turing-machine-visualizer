export const getStatesFromTable = (table) => {
    let states = [];
    for (let state in table) {
        states.push(state);
    }
    return states;
}

export const getAlphabetFromTable = (table) => {
    let randomState = Object.keys(table)[0];
    let alphabet = [];
    for (let parseCharacter in table[randomState]) {
        alphabet.push(parseCharacter);
    }
    return alphabet;
}

export const deepObjectCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}