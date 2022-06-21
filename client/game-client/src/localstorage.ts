/**
 * reads from localStorage
 * @param {string} key
 * @returns {string | null}
 */
 function readFromLocalStorage(key: string): string | null {
    if (!localStorage.getItem(key)) return null;
    else {
        try {
            return JSON.parse(String(localStorage.getItem(key)));
        } catch {
            return localStorage.getItem(key);
        }
    }
}

/**
 * writes to localStorage
 * @param {string} key
 * @param {object} data
 */
function writeToLocalStorage(key:string, data: object) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * deletes from localStorage
 * @param {string} key
 */
function deleteFromLocalStorage(key: string) {
    localStorage.removeItem(key);
}

export {
    readFromLocalStorage as readStorage,
    writeToLocalStorage as writeStorage,
    deleteFromLocalStorage as deleteStorage,
};