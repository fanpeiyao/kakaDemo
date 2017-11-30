/**
 * Created by chent on 2017/2/3.
 */

var appPath = 'src/app/';

module.exports = {
    modules:[
        {name:'account',path: appPath + 'views/account'},
        // {name:'product',  path: appPath + 'views/product'},
        // {name:'myorder',path: appPath + 'views/myorder'},
        // {name:'payment',path: appPath + 'views/payment'},
        // {name:'order',path: appPath + 'views/order'},
        {name:'profile',path: appPath + 'views/profile'},
        {name:'replay',path: appPath + 'views/replay'},
        {name:'public',path: appPath + 'views/public'},
        {name:'repayment',path: appPath + 'views/repayment'},
        {name:'contract',path: appPath + 'views/contract'}
    ]
};