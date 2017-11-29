/**
 * Created by chent on 2017/3/3.
 */
var istore = function(){


    /**
     *  sessionStorage
     * */
    var getItem = function(key){
        return JSON.parse(sessionStorage.getItem(key));
    };
    var setItem = function(key,value){
        sessionStorage.setItem(key,JSON.stringify(value));
    };

    var removeItem = function(key){
        sessionStorage.removeItem(key);
    };

    /**
     * localStorage
     */
    var getItemLocal = function(key){
        return JSON.parse(localStorage.getItem(key));
    };
    var setItemLocal = function(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    };
    var removeItemLocal = function(key){
        localStorage.removeItem(key);
    };
    return {
        get:getItem,
        set:setItem,
        remove:removeItem,
        getLocal:getItemLocal,
        setLocal:setItemLocal,
        removeLocal:removeItemLocal
    }
}();