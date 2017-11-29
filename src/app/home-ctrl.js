
myApp.controller("HomeCtrl",['$scope','$state','$es','PublicService',function ($scope,$state,$es,PublicService) {

    $scope.myOrdermoney = PublicService.getOrdermoney();
    $scope.myOrderDay = PublicService.getOrderDay();
    $scope.myOrderMonth = PublicService.getOrderMonth();
    //如果角色不同，首页内容照例也不同
    var main = {
        1:[
            {name:'',state:''}
        ],
        2:[],
        3:[]
    };

    var footer = {
        1:[
            {name:'首页',state:''}
        ],
        2:[],
        3:[]
    };

    $scope.otherModules = [
        {
            name:"特色模块1",
            url:'http://m.baidu.com'
        },
        {
            name:"特色模块2",
            url:'http://m.baidu.com'
        }
    ]
}]);