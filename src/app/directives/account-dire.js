/**
 * Created by chent on 2017/2/10.
 */

//登录directive  一个登录的form
//TODO 验证码暂时还没有加进去
angular.module("myApp").directive('loginForm',['$state','UserService',function($state,UserService){
    return{
        restrict:'E',
        replace:true,
        templateUrl:'templates/login.tpl.html',
        link:function (scope,element,attr) {
             $(element).validator({
                 validateOnSubmit:true,
                 onSuccess:function(){
                     //处理登陆事宜
                     var result = UserService.userLogin(scope.loginName,scope.password);
                     if(result.retCode === "200"){
                         event.preventDefault();
                         $state.go('app');
                     }else{
                         scope.errorMessage = result.retMsg;
                         scope.showError = true;
                     }
                 }
             });
        }
    }
}])
    .directive('getValidate',['$state','UserService',function($state,UserService){
        return{
            restrict:'E',
            replace:true,
            templateUrl:'templates/getValidateCode.tpl.html',
            link:function(scope,element,attr){
                $(element).validator({
                    validateOnsubmit:true,
                    onSuccess:function(){
                        var result = UserService.getValidateCode(scope.mobilePhone);
                        if(result.retCode === "200"){
                            event.preventDefault();
                            $state.go('account.checkCode');
                        }
                    }
                })
            }
        }
    }])
    .directive('checkValidate',['$state','UserService',function($state,UserService){
        return {
            restrict:'E',
            replace:true,
            templateUrl:'templates/checkValidateCode.tpl.html',
            link:function(scope,element,attr){
                $(element).validator({
                    validateOnsubmit:true,
                    onSuccess:function () {
                        var result = UserService.checkValidate(scope.mobilephone);
                    }
                })
            }
        }
    }])

    //修改密码的form
    //实现修改密码的功能
    .directive('passwordForm',['$state','UserService',function($state,UserService){
        return {
            restrict:'E',
            replace:true,
            templateUrl:'templates/password.tpl.html',
            link:function (scope,element,attr) {
                $(element).validator({
                    validateOnSubmit:true,
                    onSuccess:function(){
                        var result = UserService.changePassword(scope.oldPassword,scope.newPassword,scope.repeatPassword);
                        if(result.retCode === "200"){
                            event.preventDefault();
                            $state.go('profile.info');
                        }else{
                            scope.errorMessage = result.retMsg;
                            scope.showError = true;
                        }
                    }
                });
            }
        }
    }])

    //手机登录的代码
    //实现用手机号码登录
    //TODO 后台未支持
    .directive('mobileLogin',['$state','UserService',function($state,UserService){
        return {
            restrict:'E',
            replace:true,
            templateUrl:'templates/mobileLogin.tpl.html',
            link:function(scope,element,attr){
                $(element).find('#mobileForm').validator({
                    validateOnSubmit:true,
                    onSuccess:function(){
                        UserService.getValidateCode(scope.mobilephone);
                        //点击之后 倒计时
                        var getCode = $("#getCode");
                        $("#checkCode").removeClass('fn-disabled');
                        getCode.addClass('fn-disabled');

                        var i = 60;
                        getCode.html("("+i+")s");
                        timer.invoke(tick,0,1000,60000);
                        function tick(){
                            --i;
                            getCode.html("("+i+")s");
                            if(i <= 1){
                                getCode.html("获取验证码");
                                getCode.removeClass('fn-disabled');
                            }
                        }
                    }
                });
                $(element).validator({
                    validateOnSubmit:true,
                    onSuccess:function(){
                        var result = UserService.mobileLogin(scope.mobilephone,scope.validateCode);
                        //点击之后 倒计时
                        if(result.retCode == "200"){
                            event.preventDefault();
                            $state.go('app');
                        }else{
                            scope.errorMessage = result.retMsg;
                            scope.showError = true;
                        }
                    }
                });

            }
        }
    }]);