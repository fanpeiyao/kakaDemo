angular.module("myApp").controller("ReplayListCtrl",["$scope","ReplayService",function ($scope,ReplayService) {
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

    function getTime(number) {
        var now=new Date();
        var date;
        if(number>180){
            date=new Date(number);
        }else{
            date=new Date(now.getTime()-number*24*3600*1000);
        }
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        if(month > 12) month = 1;
        var day=date.getDate();
        if(month<10)
            month="0"+month;
        if(day < 10)
            day="0"+day;
        return year+'-'+month+'-'+day;
    }
    //自定义日期
    $scope.changeTimeauto=function (start,end) {
        $modal.acton({id:'changetime-action',act:'open'});
    }
    $scope.searchTimeout=function (start,end) {
        var startDate=new Date(start);
        var endDate=new Date(end);
        if(startDate.valueOf()>endDate.valueOf()){
            $modal.alert('起始日期不能大于结束日期');
        }else{
            startDate=getTime(startDate.valueOf()==='NaN-NaN-NaN')?undefined:getTime(startDate.valueOf());
            $scope.filter.start_date=startDate;
            $scope.filter.end_date=getTime(endDate.valueOf());
            // $scope.changeFilter()
        }
        $modal.action({id:'changetime-action',act:'close'});
    }




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
        var result = ReplayService.getDeliveryList(status,page,time);
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
        var deliveryStatusArray = ReplayService.getDeliveryStatusArray();
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


