/**
 * Created by chent on 2017/1/18.
 */
var myApp = angular.module("myApp",['ui.router','oc.lazyLoad','ngAnimate','icbc.espresso'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/account/login');
        $stateProvider

        //公共部分
            .state('app',{
                url:'/app',
                title:'首页',
                templateUrl:'views/public/app.html',
                resolve:{
                    load:['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/services/public-serv.js'
                        ]);
                    }]
                },
                controller:'HomeCtrl'
            })
            .state('about', {
                url:'/about',
                templateUrl:'views/public/about.html'
            })
            .state('error',{
                url:'/error',
                templateUrl:'404.html'
            })



            //还款模块
            .state('repayment',{
                url:'/repayment',
                templateUrl: 'views/public/main.html',
                abstract:true,
                backState:'app',
                resolve:{
                    load:['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'views/repayment/js/repayment-ctrl.js',
                            'scripts/services/repayment-serv.js',
                            'views/repayment/css/repayment.css'
                        ]);
                    }]
                }
            })
            .state('repayment.repaymentDetail',{
                url:'/repaymentDetail',
                title:'我要还款',
                backState:'app',
                templateUrl:'views/repayment/repaymentDetail.html',
                controller:'RepaymentCtrl'
            })
            //购物车和订单部分
            .state('order',{
                url:'/order',
                templateUrl: 'views/public/main.html',
                abstract:true,
                resolve:{
                    load:['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'views/order/css/order.css',
                            'views/order/js/order-ctrl.js',
                            'scripts/services/cart-serv.js'
                        ]);
                    }]
                }
            })

            //购物车
            .state('order.cart',{
                url:'/cart',
                title:'购物车',
                backState:'app',
                templateUrl:'views/order/cart.html',
                controller:'cartCtrl'
            })

            //提交订单
            .state('order.addOrder',{
                url:'/addOrder',
                templateUrl: 'views/order/addOrder.html',
                title:"提交订单",
                backState:"order.cart",
                controller:'addOrderCtrl'
            })

            //确认订单
            .state('order.confirm',{
                url:'/confirm',
                templateUrl: 'views/order/orderConfirm.html',
                title:'确认订单',
                backState:'order.addOrder',
                controller:'orderConfirmCtrl'
            })
            //订单成功
            .state('order.sucess',{
                url:'/sucess',
                templateUrl: 'views/order/orderSucess.html',
                title:'订单成功',
                backState:'product.productList'
            })


            /**
             *  合同
             */
            .state('contract',{
                url:'/contract',
                templateUrl:'views/public/main.html',
                abstract:true,
                resolve:{
                    load:['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'views/contract/js/contract-ctrl.js',
                            'scripts/services/contract-serv.js',
                            'views/contract/css/contract.css'
                        ]);
                    }]
                }
            })
            .state('contract.contractList',{
                url:'/contractList',
                title:'合同',
                backState:'app',
                templateUrl:'views/contract/contractList.html',
                controller:'ContractListCtrl'
            })
            .state('contract.contractDetail',{
                url:'/contractDetail',
                title:'合同详情',
                backState:'contract.contractList',
                templateUrl:'views/contract/contractDetail.html',
                controller:'ContractDetailCtrl'
            })
            .state('contract.replayDetail',{
                url:'/replayDetail',
                // url:'/orderDetail/:orderId',
                backState:'contract.contractDetail',
                title:'还款计划',
                templateUrl:'views/contract/replayDetail.html',
                // controller:'ReplayDetailCtrl'
            })

            /**
             *  我的订单
             */
                .state('myorder',{
                    url:'/myorder',
                    templateUrl:'views/public/main.html',
                    abstract:true,
                    resolve:{
                        load:['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'views/myorder/js/myorder-ctrl.js',
                                    'scripts/services/order-serv.js',
                                    'views/myorder/css/myorder.css'
                                ]);
                        }]
                    }
                })
                .state('myorder.orderList',{
                    url:'/orderList',
                    title:'订单',
                    templateUrl:'views/myorder/orderList.html',
                    controller:'OrderListCtrl'
                })
                .state('myorder.orderDetail',{
                    url:'/orderDetail/:orderId',
                    backState:'myorder.orderList',
                    title:'订单详情',
                    templateUrl:'views/myorder/orderDetail.html',
                    controller:'OrderDetailCtrl'
                })
                .state('myorder.myorderSearch',{
                    url:'/myorderSearch',
                    title:'查找订单',
                    backState:'myorder.orderList',
                    templateUrl:'views/myorder/myorderSearch.html',
                    //controller:'OrderSearchCtrl'
                })


            /**
             * 发货信息
             */
                .state('delivery',{
                    url:'/delivery',
                    templateUrl:'views/public/main.html',
                    abstract:true,
                    resolve:{
                        load:['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'views/delivery/js/delivery-ctrl.js',
                                'scripts/services/delivery-serv.js',
                                'views/delivery/css/delivery.css'
                            ]);
                        }]
                    }
                })
                .state('delivery.deliveryList',{
                    url:'/deliveryList',
                    title:'还款计划',
                    backState:'app',
                    templateUrl:'views/delivery/deliveryList.html',
                    controller:'DeliveryListCtrl'
                })
                .state('delivery.deliveryDetail',{
                url:'/deliveryDetail',
                    title:'发货详情',
                    backState:'delivery.deliveryList',
                    templateUrl:'views/delivery/deliveryDetail.html',
                    controller:'DeliveryDetailCtrl'
                })
                .state('delivery.deliverySearch',{
                    url:'/deliverySearch',
                    backState:'delivery.deliveryList',
                    templateUrl:'views/delivery/deliverySearch.html'
                    //controller:'deliverySearchCtrl'
                })
                /**
                 * 还款明细
                 */
            .state('replay',{
                url:'/replay',
                templateUrl:'views/public/main.html',
                abstract:true,
                resolve:{
                    load:['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'views/replay/js/replay-ctrl.js',
                            'scripts/services/replay-serv.js',
                            'views/replay/css/replay.css'
                        ]);
                    }]
                }
            })
            .state('replay.replayList',{
                url:'/replayList',
                title:'还款计划',
                backState:'app',
                templateUrl:'views/replay/replayList.html',
                controller:'ReplayListCtrl'
            })

            /**
             * 个人信息
             */
            .state('profile',{
                url:'/profile',
                templateUrl:'views/public/main.html',
                abstract:true,
                resolve:{
                    load:['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'views/profile/js/areaData_v2.js',
                            'views/profile/js/iosSelect.js',
                            'views/profile/js/profile-ctrl.js',
                            'scripts/services/userinfo-serv.js',
                            'scripts/services/account-serv.js',
                            'views/profile/css/personal_center.css',
                            'views/profile/css/iosSelect.css'
                        ]);
                    }]
                }
            })
            .state('profile.info',{
                url:'/info',
                title:'个人信息',
                templateUrl:'views/profile/info.html',
                controller:'InfoCtrl'
            })
            .state('profile.myAccount',{
                url:'/myAccount',
                title:'账户信息',
                backState:'profile.info',
                templateUrl:'views/profile/myAccount.html',
                controller:'myAccountCtrl'
            })
            .state('profile.changePhone',{
                url:'/myAccount',
                title:'修改手机号',
                backState:'profile.myAccount',
                templateUrl:'views/profile/changePhone.html',
                controller:'changePhoneCtrl'
            })
            .state('profile.myAddress',{
                url:'/myAddress',
                title:'地址管理',
                backState:'profile.info',
                templateUrl:'views/profile/myAddress.html',
                controller:'myAddressCtrl'
            })
            .state('profile.changePw',{
                url:'/changePw',
                title:'修改密码',
                backState:'profile.info',
                templateUrl:'views/profile/changePw.html',
             //   controller:'InfoCtrl'
            })
            .state('profile.addAddress',{
                url:'/addAddress',
                title:'新增地址',
                backState:'profile.myAddress',
                templateUrl:'views/profile/addAddress.html',
                controller:'addAddressCtrl'
            })
            .state('profile.editAddress',{
                url:'/editAddress',
                title:'编辑收货地址',
                backState:'profile.myAddress',
                templateUrl:'views/profile/editAddress.html',
                controller:'editAddressCtrl'
            })

            /**
             * 认证
             */
            .state('account',{
                url:'/account',
                templateUrl:'views/public/main.html',
                abstract:true,
                resolve:{
                    load:['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'views/account/assets/rsaoath.min.js',
                            'views/account/css/account.css',
                            'views/account/js/account-ctrl.js',
                            'scripts/services/account-serv.js'
                        ]);
                    }]
                }
            })
            .state('account.login',{
                url:'/login',
                templateUrl:'views/account/login.html',
                controller:'LoginCtrl'
            })
            .state('account.getCode',{
                url:'/getCode',
                title:'获取验证码',
                templateUrl:'views/account/getCode.html'
            })
            .state('account.checkCode',{
                url:'/checkCode',
                title:'输入验证码',
                templateUrl:'views/account/checkCode.html'
            })
            .state('account.checkSuccess',{
                url:'/checkSuccess',
                title:'输入验证码',
                templateUrl:'views/account/checkSuccess.html'
            });

    }])
    .run(['$rootScope', '$state', '$stateParams','$es', function($rootScope, $state, $stateParams,$es) {
        for(var key in config){
            $es.setConfig(key,config[key]);
        }

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
            // to be used for back button //won't work when page is reloaded.
            $rootScope.previousState_name = fromState.name;
            $rootScope.previousState_params = fromParams;

            $rootScope.title = toState.title;
            $rootScope.showBack = toState.backState !== null;
            $rootScope.backState = toState.backState;

            angular.element(document).ready(function(){
                $.each(FNUI.DOMWatchers, function(i, watcher) {
                    watcher(document);
                });
            });
        });

        var loginState = "account.login";
        var rootState = "app";

        $rootScope.iswx = function () {

            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }else{
                return false;
            }
        }();
        //userinfo checking part
        $rootScope.$on("$stateChangeStart", function(event,toState,toParams,fromState,fromParams){
            var valid =  false;
            if(toState.name === loginState)
                valid = true;

            else if(!valid){

                //#
                return;
                //##

                //check userinfo
                 $es.userinfo = $es.java("userInfoBean.getUserData");
                 if($es.userinfo.status === "000" || $es.userinfo.retCode === "200"){
                 $es.userinfo = $es.userinfo.data.user;

                     $rootScope.username = $es.userinfo.userName;
                     $rootScope.customerId = $es.userinfo.customerId;

                 //角色
                 var roleId = $es.userinfo.roles[0].id;
                     //根据角色判断首页的不同显示
                     //应该是来自后台的状态才比较合理
                     //新增一个状态表，来保存状态
                 }else {
                        event.preventDefault();
                        $state.go(loginState);
                 }
            }
        });
    }])
    .controller("RootCtrl",function ($scope) {

    });