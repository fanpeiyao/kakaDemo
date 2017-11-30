/**
 * Created by chent on 2017/1/18.
 */

angular.module("myApp").controller("ContractListCtrl",["$scope","$rootScope","ContractService",function ($scope,$rootScope,ContractService) {
    var page,time,status;
    $scope.changeStatus = function(newStatus){
        page = 0;
        time = 0;
        status = newStatus;
        $scope.orders = loadOrders(status,page,time);

        var myScroll = $scope.myScroll;
        myScroll.scrollTo(0,0);
        myScroll.refresh();
        myScroll.maxScrollY = 0;
    };

    $scope.changeTime = function(newTime){
        page = 0;
        time = newTime;
        $scope.orders = loadOrders(status,page,newTime);
    };

    $scope.refreshPage = function () {
        $scope.orders = loadOrders(status,page,time);
    };

    $scope.loadMore = function () {
        page = page+1;
        var orders = loadOrders(status,page,time);
        if(orders.length>0)
            for(var i=0,len=orders.length; i<len; i++){
                $scope.orders.push(orders[i]);
            }
    };

    function loadOrders(status,page,time) {
        var toast = $.toast.show('loading');
        var result = ContractService.getOrderList(status,page,time);
        if(toast)
            setTimeout(function(){
                toast.close();
            },0);
        if(result.retCode == "200"){
            return result.orderList;
        }else
            return [];
    }

    function initPage(){
        page =0;time=0;
        var orderStatusArray = ContractService.getOrderStatusArray();
        $scope.orderStatusArray = orderStatusArray;
        status = orderStatusArray[0];
        $scope.orders = loadOrders(status,page,time);
    }
    //分公司
    var all = {'companyId':undefined,'companyName':'全部分公司'};
    $scope.currentCompany = all;
    $scope.companyList = [all].concat(ContractService.getCompanyList());
    $('#companyBox').on('click',function () {
        $('#company-action').modal('open')
    });
    $scope.changeCompany = function (company) {
        $scope.page = 0;
        $scope.currentCompany = company;
        // loadOrders();
        $('#company-action').modal('close')
    }
    //搜索
    $scope.showSearch = function () {
        $scope.showSearchBody = true;
    }
    $scope.closeSearch = function () {
        $scope.showSearchBody = false;
    }
    $scope.keySearch = function (keyValue) {
        $scope.searchVal = keyValue;
        $scope.page = 0;
        loadOrders();
        $scope.showSearchBody = false;
        saveSearchHistory(keyValue);
    }
    $scope.clickClean = function ($event) {
        $event.stopPropagation();
        $scope.searchVal = '';
        $scope.page = 0;
        if(!$scope.showSearchBody)
            loadOrders()
    }
    function saveSearchHistory(keyValue) {
        if (keyValue === null || keyValue ==="")
            return
        var hisstring = istore.getLocal('contractHistory') || [];
        var dup = false;
        hisstring.forEach(function (item) {
            if (item == keyValue)
                dup = true;
        })
        if (!dup){
            if (hisstring.length<10){
                hisstring.unshift(keyValue)
            }else {
                hisstring.pop();
                hisstring.unshift(keyValue)
            }
            istore.setLocal('contractHistory',hisstring)
        }
    }
    //初始化
    initPage();
}]);
myApp.controller("ContractDetailCtrl",["$scope","$rootScope",'$stateParams','ContractService',function ($scope,$rootScope,$stateParams,ContractService) {
    //取得传过来的参数
    var orderId = $stateParams.orderId;
    $scope.order = ContractService.getOrderDetail(orderId);
}]);


