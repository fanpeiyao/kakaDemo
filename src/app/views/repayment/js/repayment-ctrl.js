/**
 * 还款
 */
angular.module("myApp").controller("RepaymentCtrl",["$scope","RepaymentService",function ($scope,RepaymentService) {
    $scope.repayment=function(){
        $.toast.content("还款成功").show('info',2000).clear();
    }

}]);
