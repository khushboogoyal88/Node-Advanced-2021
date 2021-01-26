'use strict';

const path = require('path');
const { writeStorage } = require('../jsonStorage/jsonReaderWriter');

function initLayerFunctions(baseDir, config) {
    const storageFolder = path.join(baseDir, config.folder);
    const storageConfig = require(path.join(storageFolder, config.storageConfig));
    const storageFile = path.join(storageFolder, storageConfig.storageFile);
    const {readStorage} = require(path.join(storageFolder, storageConfig.readerWriter));

    async function getAllFromStorage() {
        return readStorage(storageFile);
    }

    async function getFromStorage(key, value) {
        return (await readStorage(storageFile))
            .find(resultObject => resultObject[key]==value) || null;
    }

    async function deleteFromStorage(key, value) {
        let storage=await readStorage(storageFile);
        const i=storage.findIndex(resource => resource[key]==value);
        if(i<0) return false;
        storage.splice(i,1);
        return await writeStorage(storageFile, storage);
    }

    return {getAllFromStorage, getFromStorage, deleteFromStorage};

}; //end of initLayerFunctions

module.exports = {initLayerFunctions};