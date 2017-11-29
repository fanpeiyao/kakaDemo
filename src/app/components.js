angular.module('s3.components',[])
.factory('istore',function () {
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
})
.factory('$modal',function () {
    /**
     *
     * @param title  提醒标题
     * @param text  提醒内容
     * @param callback   暂时无效
     */
    var alert =  function(title,text,callback){
        var modal = $("#fn-alert");
        modal.find('.fn-modal-hd').html(title);
        modal.find('.fn-modal-bd').html(text);
        modal.modal('open');
    };

    /**
     *
     * @param title  确定框的标题
     * @param text  确定框的内容
     * @param confirm  点击确定的毁掉函数  不能为空
     * @param cancel   点击取消的函数  可以为空
     */
    var confirm = function(title,text,confirm,cancel){
        var modal =$("#fn-confirm");
        modal.find('.fn-modal-hd').html(title);
        modal.find('.fn-modal-bd').html(text);
        modal.modal({
            onConfirm:function(){
                confirm && confirm()
            },
            onCancel:function () {
                cancel && cancel();
            }
        });
    };

    var action = function(action){
        var modal =$("#fn-actions");
        if(action === "close")
            modal.modal('close')
        else
            modal.modal('open');


    }
    return {
        alter:alter,
        confirm:confirm,
        action:action
    }
})