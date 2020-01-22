module.exports.get = function(key){
    return JSON.parse(sessionStorage.getItem(key));
};

module.exports.set = function(key, value){
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    catch(e){
        if(e.name === 'QUOTA_EXCEEDED_ERR') {
            $(window).trigger(
                'storageQuotaExceeded',
                e
            );
        }
    }
};

module.exports.remove = function(key){
    sessionStorage.removeItem(key);
};

module.exports.clear = function(){
    sessionStorage.clear();
};