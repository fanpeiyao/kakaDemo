/**
 * Created by chent on 2017/1/18.
 *
 *  OrderService
 *  订单服务，处理订单相关的数据接口
 *  getOrderStatusArray : 获取订单状态
 *  getOrderList : 获取订单列表(分页)
 *  getOrderDetail :  获取订单详情(送货地址也许要另取 看后台接口)
 *
 *
 */
angular.module("myApp").service("ContractService",['$es',function($es){
    
        this.getOrderStatusArray = function(){
            return [
                {id:null,name:'全  部'},
                {id:0, name:'已起租'},
                {id:1,name:'已结束'},
            ];
        };
    
        this.getOrderList = function(status,page,time){
            var orderList = [];
            var i,order;
            switch(status.id){
                case 0:
                    for(i = 0;i<10;i++){
                        order = {};
                        order.id = 'XGRZ-01-201710-001'+i;
                        order.time = "2017年12月1日";
                        order.name = "订单名称";
                        order.money = "1106"+time+page+i;
                        order.status = 0;
                        order.statusText =  ['未审核','已审核','已作废'];
                        orderList.push(order);
                    }
                    break;
                case 1:
                    for(i = 0;i<10;i++){
                        order = {};
                        order.id = 'XGRZ-01-201710-002'+i;
                        order.time = "2017年12月1日";
                        order.name = "订单名称";
                        order.money = "1106"+time+page+i;
                        order.status = 1;
                        order.statusText = ['未审核','已审核','已作废'];
                        orderList.push(order);
                    }
                    break;
                case 2:
                    for(i = 0;i<10;i++){
                        order = {};
                        order.id = 'XGRZ-01-201710-003'+i;
                        order.time = "2017年12月1日";
                        order.name = "订单名称";
                        order.money = "1106"+time+page+i;
                        order.status = 2;
                        order.statusText =['未审核','已审核','已作废'];
                        orderList.push(order);
                    }
                    break;
                default:
                    for(i = 0;i<10;i++){
                        order = {};
                        order.id = 'XGRZ-01-201710-001'+i;
                        order.time = "2017年12月1日";
                        order.name = "订单名称";
                        order.money = "1106"+time+page+i;
                        order.status = Number(Math.random()*2).toFixed();
                        order.statusText = ['未审核','已审核','已作废'];
                        orderList.push(order);
                    }
                    break;
            }
            return {
                retCode:'200',
                retMsg:'msg',
                orderList:orderList
            }
        };

        this.getOrderDetail = function(orderId){
            //get orderDetail
            var orderDetail = {
                orderId:orderId,
                orderTo:"王大二",
                orderTel:'1590000001256',
                orderAddDefault:"杭州市下城区新市街153号",
                orderAdd:"浙江宁波",
                price: Number(Math.random()*10).toFixed(2),
                orderType:"自购零食",
                orderPayType:"265dtex/48f",
                length:"100m"
            };

            return orderDetail;
        }


        this.getCompanyList = function(){
            //get orderDetail
            var company = {
                branchCompany:[
                    {
                        companyId:'001',
                        companyName:'徐工租赁'
                    }
                ]
            };

            return company.branchCompany;
        }

    }]);