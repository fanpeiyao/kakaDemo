angular.module("myApp").controller('InfoCtrl',['$scope','UserInfoService',
        function($scope,UserInfoService){
            var getInfoText=UserInfoService.getUserInfo();
            $scope.companyName=getInfoText.companyName;
            $scope.role=getInfoText.role;
        }])

    .controller('myAccountCtrl',['$scope','UserInfoService',
        function($scope,UserInfoService){
            var getMyAccountText=UserInfoService.getUserInfo();
            $scope.accountNum=getMyAccountText.accountNum;
            $scope.accountName=getMyAccountText.accountName;
            $scope.name=getMyAccountText.name;
            $scope.phone=getMyAccountText.phone;

            var getInfoText=UserInfoService.getUserInfo();
            $scope.companyName=getInfoText.companyName;
            $scope.role=getInfoText.role;
        }])

    .controller('changePwCtrl',['$scope',
        function($scope){
            $scope.pwDate={};

            $scope.submitForm=function(){
                console.log($scope.signUpForm);
                if($scope.pwDate.newPw1!==$scope.pwDate.newPw2){
                    alert('两次密码不一致');
                } else{
                    alert('修改成功');
                }
            }
        }])

    .controller('myAddressCtrl',['$scope','UserInfoService',
        function($scope,UserInfoService){
            var getMyAddressText=UserInfoService.getUserAddress();
            $scope.addressList=getMyAddressText.myAddressList;

            $scope.clic=function($index){
                $scope.index=$index;
            };

            $scope.delete=function($index){
                var alist=$scope.addressList;
                alist.splice($index,1);
            };

            $(function(){
                //默认地址管理
                $scope.ind="";
                var mb=$('.myAddress_list>li>.edit>.edit_left');
                $(mb).children().eq(0).attr({'class':'iconfont icon-queren','state':1});

               $(mb).click(function(){
                   $(mb).children().attr({'class':'iconfont icon-yuanquan','state':0});

                   if($(this).children().attr('state')==0){
                       $(this).children().attr('class','iconfont icon-queren');
                       $(this).children().attr('state',1);
                   }else{
                       $(this).children().attr('class','iconfont icon-yuanquan');
                       $(this).children().attr('state',0);
                   }
                   $scope.ind=$(mb).index(this);
                   console.log($scope.ind);
               });
            })
        }])

    .controller('editAddressCtrl',['$scope','UserInfoService',
        function($scope,UserInfoService){
            var index=$scope.index;
            var getMyAddressText=UserInfoService.getUserAddress();
            $scope.addressList=getMyAddressText.myAddressList[index];

            //地址插件start
            var selectContactDom = $('#select_contact');
            var showContactDom = $('#show_contact');
            var contactProvinceCodeDom = $('#contact_province_code');
            var contactCityCodeDom = $('#contact_city_code');
            selectContactDom.bind('click', function () {
                var sccode = showContactDom.attr('data-city-code');
                var scname = showContactDom.attr('data-city-name');

                var oneLevelId = showContactDom.attr('data-province-code');
                var twoLevelId = showContactDom.attr('data-city-code');
                var threeLevelId = showContactDom.attr('data-district-code');
                var iosSelect = new IosSelect(3,
                    [iosProvinces, iosCitys, iosCountys],
                    {
                        title: '地址选择',
                        itemHeight: 35,//每一项的高度，可选，默认 35px
                        relation: [1, 1, 0, 0],
                        oneLevelId: oneLevelId,//第一级选中id 可选
                        twoLevelId: twoLevelId,//第二级选中id 可选
                        threeLevelId: threeLevelId,//第三级选中id 可选
                        callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                            contactProvinceCodeDom.val(selectOneObj.id);
                            contactProvinceCodeDom.attr('data-province-name', selectOneObj.value);
                            contactCityCodeDom.val(selectTwoObj.id);
                            contactCityCodeDom.attr('data-city-name', selectTwoObj.value);

                            showContactDom.attr('data-province-code', selectOneObj.id);
                            showContactDom.attr('data-city-code', selectTwoObj.id);
                            showContactDom.attr('data-district-code', selectThreeObj.id);
                            showContactDom.val(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
                        }
                    });
            });
            //地址插件end

        }])

    .controller('addAddressCtrl',['$scope',
        function($scope){

            $scope.userDate={};

            $scope.submitForm=function(){
                console.log("表单提交");
                console.log($scope.userDate);
            }

            //地址插件start
            var selectContactDom = $('#select_contact');
            var showContactDom = $('#show_contact');
            var contactProvinceCodeDom = $('#contact_province_code');
            var contactCityCodeDom = $('#contact_city_code');
            selectContactDom.bind('click', function () {
                var sccode = showContactDom.attr('data-city-code');
                var scname = showContactDom.attr('data-city-name');

                var oneLevelId = showContactDom.attr('data-province-code');
                var twoLevelId = showContactDom.attr('data-city-code');
                var threeLevelId = showContactDom.attr('data-district-code');
                var iosSelect = new IosSelect(3,
                    [iosProvinces, iosCitys, iosCountys],
                    {
                        title: '地址选择',
                        itemHeight: 35,//每一项的高度，可选，默认 35px
                        relation: [1, 1, 0, 0],
                        oneLevelId: oneLevelId,//第一级选中id 可选
                        twoLevelId: twoLevelId,//第二级选中id 可选
                        threeLevelId: threeLevelId,//第三级选中id 可选
                        callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                            contactProvinceCodeDom.val(selectOneObj.id);
                            contactProvinceCodeDom.attr('data-province-name', selectOneObj.value);
                            contactCityCodeDom.val(selectTwoObj.id);
                            contactCityCodeDom.attr('data-city-name', selectTwoObj.value);

                            showContactDom.attr('data-province-code', selectOneObj.id);
                            showContactDom.attr('data-city-code', selectTwoObj.id);
                            showContactDom.attr('data-district-code', selectThreeObj.id);
                            showContactDom.val(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
                        }
                    });
            });
            //地址插件end

        }])