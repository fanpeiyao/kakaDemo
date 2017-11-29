
angular.module("myApp")
    .directive("productsearchtype",function(){
        return {
            restrict:'E',
            replace:true,
            transclude:true,
            template:' <ul class="sort_list fn-avg-sm-3" ng-transclude></ul>',
            link:function(scope,element){
                $(function() {
                    var selector = $(element);
                    selector.children().first().addClass('prosea-active');
                    selector.find('li').on('click',function () {
                        selector.find('li').removeClass('prosea-active');
                        $(this).addClass('prosea-active')
                    })

                });
            }
        }
    })