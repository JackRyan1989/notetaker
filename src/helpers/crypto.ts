const makeUintArray = (elems: Array<any> | number): Uint16Array | Array<number> => {
    let uintArray: Uint16Array
    if (Array.isArray(elems)) {
        uintArray = new Uint16Array(elems.length)
    } else if (Number.isInteger(elems)) {
        uintArray = new Uint16Array(elems)
    } else {
        uintArray = new Uint16Array(0)
    }
    if (window) {
        return self.crypto.getRandomValues(uintArray);
    }
    return [Math.floor(Math.random() * 1000) * 100]
}

export { makeUintArray }
