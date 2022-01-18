export const getStatesFromTable = (table) => {
    let states = [];
    for (let state in table) {
        states.push(state);
    }
    return states;
}

export const getAlphabetFromTable = (table) => {
    let alphabet = [];
    let keys = Object.keys(table);
    
    if (keys.length === 0) {
        return alphabet;
    }

    let randomState = keys[0];
    for (let parseCharacter in table[randomState]) {
        alphabet.push(parseCharacter);
    }
    return alphabet;
}

export const deepObjectCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}