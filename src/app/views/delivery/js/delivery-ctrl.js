angular.module("myApp").controller("DeliveryListCtrl",["$scope","DeliveryService",function ($scope,DeliveryService) {
    var page,time,status;

    $scope.changeStatus = function(newStatus){
        page = 0;
        time = 0;
        status = newStatus;
        $scope.deliverys = loadDeliverys(status,page,time);
    };
    $scope.changeTime = function(newTime){
        page = 0;
        time = newTime;
        $scope.deliverys= loadDeliverys(status,page,newTime);
    };

    $scope.refreshPage = function () {
        $scope.deliverys = loadDeliverys(status,page,time);
    };

    $scope.loadMore = function () {
        page = page+1;
        var deliverys = loadDeliverys(status,page,time);
        if(deliverys.length>0)
            for(var i=0,len=deliverys.length; i<len; i++){
                $scope.deliverys.push(deliverys[i]);
            }
    };

    //function loadDeliverys(status,page,time) {
    //    return DeliveryService.getDeliveryList(status,page,time);
    //}
    function loadDeliverys(status,page,time) {
        var toast = $.toast.show('loading');
        var result = DeliveryService.getDeliveryList(status,page,time);
        if(toast)
            setTimeout(function(){
                toast.close();
            },0);
        if(result.retCode == "200"){
            return result.deliveryList;
        }else
            return [];
    }
    function initPage(){
        page =0;time=0;
        var deliveryStatusArray = DeliveryService.getDeliveryStatusArray();
        $scope.deliveryStatusArray = deliveryStatusArray;
        status = deliveryStatusArray[0];
        $scope.deliverys = loadDeliverys(status,page,time);
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

myApp.controller("DeliveryDetailCtrl",["$scope","$rootScope",'$stateParams','DeliveryService',function ($scope,$rootScope,$stateParams,DeliveryService) {
    //取得传过来的参数
    var deliveryId = $stateParams.deliveryId;
    $scope.delivery = DeliveryService.getDeliveryDetail(deliveryId);
    //var deliveryNum = $stateParams.deliveryNum;
    //$scope.delivery = DeliveryDetailService.getDeliveryDetail(deliveryId,deliveryNum);

    // 我的订单详情
    // function loadOrderDetail(status,page,time) {
    //     return OrderDetailService.getOrderDetail(status,page,time);
    // }

}]);
