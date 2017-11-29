/**
 * Created by chent on 2017/1/20.
 */
var modal = {
        /**
         *
         * @param title  提醒标题
         * @param text  提醒内容
         * @param callback   暂时无效
         */
        alert : function(title,text,callback){
            var modal = $("#fn-alert");
            modal.find('.fn-modal-hd').html(title);
            modal.find('.fn-modal-bd').html(text);
            modal.modal('open');
         },

        /**
         *
         * @param title  确定框的标题
         * @param text  确定框的内容
         * @param confirm  点击确定的毁掉函数  不能为空
         * @param cancel   点击取消的函数  可以为空
         */
        confirm : function(title,text,confirm,cancel){
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
        },

        action : function(action){
            var modal =$("#fn-actions");
            if(action === "close")
                modal.modal('close')
            else
                modal.modal('open');


        }
};