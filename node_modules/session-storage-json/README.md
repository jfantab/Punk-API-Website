Session Storage JSON
==================

Simple wrapper on sessionStorage to store JSON

## Install

    npm install session-storage-json


## Usage

    var storage = require('session-storage-json');
    storage.get(key);
    storage.set(key, json);
    storage.remove(key);
    storage.clear();
    
    $(window).addEventListener('storageQuotaExceeded', fn, false);