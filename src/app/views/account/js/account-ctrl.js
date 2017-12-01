/**
 * Created by chent on 2017/2/8.
*/
angular.module('myApp').controller('LoginCtrl',['$scope','$rootScope','$state','UserService',function ($scope,$rootScope,$state,UserService) {


    $scope.login = function (name,pass) {
        $state.go('app')
    }

}])
    .controller('MobieCtrl',function(){

    })