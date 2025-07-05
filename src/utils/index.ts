let uniqueIdCount: number = 0;

function getUniqueId(prefix: string = 'uid_'): string {
    do {
        prefix += uniqueIdCount++;
    } while (document.getElementById(prefix));

    return prefix;
}

export {
    getUniqueId
};