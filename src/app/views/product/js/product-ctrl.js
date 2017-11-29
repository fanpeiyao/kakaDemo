/**
 * Created by chent on 2017/1/18.
 */
// 产品列表
angular.module("myApp").controller("ProductCtrl",["$scope","ProductService","UserInfoService",function ($scope,ProductService,UserInfoService) {

    var page = 1,key = null;

    $scope.refreshPage = function () {
        var page = 1;
        $scope.products = loadProducts($scope.currentCompany.companyId,page,key);
    };
    $scope.loadMore = function () {
        page = page+1;
        var products = loadProducts($scope.currentCompany.companyId,page,key);
        if(products.length>0)
            for(var i=0,len=products.length; i<len; i++){
                $scope.products.push(products[i]);
            }
    };
    $scope.getAll = function(){
        page = 1;
        key=null;
        $scope.products = loadProducts($scope.currentCompany.companyId,page,key);
    };

    $scope.showCompanyList = function(){
        modal.action('open');
    };

    $scope.changeCompany = function(company){
        page = 1;
        key = null;
        $scope.currentCompany = company;
        $scope.products = loadProducts(company.companyId,page,key);
        modal.action('close');
        var myScroll = $scope.myScroll;
        myScroll.scrollTo(0,0);
        myScroll.refresh();
        myScroll.maxScrollY = 0;
    };


    //初始化
    initPage();

    function loadProducts(companyId,page,key) {
        return ProductService.getProductList(companyId,page,key);
    }

    function initPage(){
        var companyList = UserInfoService.getCompanyList();
        $scope.companyList = companyList;
        var company = companyList[0];
        $scope.currentCompany = company;
        $scope.products = loadProducts(company.companyId,page);
    }

}]);
//产品详情
myApp.controller("ProductDetailCtrl",["$scope",'$stateParams','ProductService',function ($scope,$stateParams,ProductService) {
    //取得传过来的参数
    var productId = $stateParams.productId;
    $scope.product = ProductService.getProductDetail(productId);


    // 收藏按钮
    var flag = true;
    // $scope.collection = function (productID,flag) {
    $scope.collection = function (productID) {
        console.log(productID)
        if (flag){
            $.toast.show('收藏成功',1000)
            $(".proDe-top_icon").find("i").attr("class","iconfont icon-shoucang icon-shoucangfill");
            flag = false;
        }else{
            $.toast.show('取消收藏',1000)
            $(".proDe-top_icon").find("i").attr("class","iconfont icon-shoucang");
            flag = true;
        }
    }

    //加入购物车
    $scope.addProductToCart = function (productID) {
        // if(flag){
        //
        // }else{
        //
        // }

    }



}]);

// 产品搜索
myApp.controller("ProductSearchCtrl",["$scope",'$stateParams','ProductService',function ($scope,$stateParams,ProductService) {

    // function loadCategoryInfo() {
    //
    // }


    function formController($scope) {
        $scope.formData = {};

    }
    //表单搜索
    $scope.processForm = function() {
        // $log.info('',$scope.formData);
        console.log('这是你要搜索的内容：'+$.param($scope.formData));
        // $('#proInput').value =='';
        $scope.clearForm();
    };
    //回车搜索
    $scope.proKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.processForm();
        }
    };
    //清空表单
    $scope.clearForm = function() {
        console.log('ddd')
    }

}]);