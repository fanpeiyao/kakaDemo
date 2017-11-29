angular.module('icbc.espresso',[])
 .factory('$es',function($q,$state)
    {

        var userinfo={};

        //default config
        var setting = {
            custid:"ultimate",
            userservice:"userservice"
        };

        function setConfig(key,value){
            setting[key] = value;
            if(key === 'appid')
                setting.custid = value;
            if(key === 'userservice')
                setting.userservice = value;
        }
        function getConfig(key){
            return setting[key];
        }



        var CoreSupport = {};
        CoreSupport.DataSetIdList = "__ids";
        CoreSupport.DataSetParams = "__params";
        CoreSupport.treatParams = function(params, paramMap){
            if(paramMap == null)
                paramMap = {};

            if(params == null)
                return paramMap;

            if(typeof(params) == "string"){
                var pary = params.split('&');
                for(var i = 0; i < pary.length; i++){
                    if(pary[i] == null || pary[i] == '')
                        continue;
                    var tary = pary[i].split('=');
                    var key = tary[0].trim();
                    var val = tary[1];

                    if(key.length == 0)
                        continue;
                    paramMap[key] = val;
                }
            }
            else if(typeof(params) == "object"){
                for(var key in params){
                    paramMap[key] = params[key];
                }
            }
            return paramMap;
        };


        /**
         * ajax执行一个服务器端Action，该方法是同步函数版本
         * 一个Action可描述为　类名+方法名+别名(可选) 或 portalConfig中配置的数据集ID + 别名(可选)
         * id: 如 com.longkey.UserBean.test as test1 或 id1 as a 或 userBean.test as b
         * params(optional): 参数，可以是一个js对象，也可以是 var1=aa&var2=bb&... 这样的字符串
         * appid(optional): 参数，要调用的后台，不送的话就使用自己的后台
         * timeout(optional)：参数，可不送
         */
        function java(id, params, appId,timeout){
            if(!id) return;
            timeout=timeout||15000;
            params = params || {};
            appId = appId || setting.custid;
            var paramObj = CoreSupport.treatParams(params);
            var code = params ? params.code : "";
            var paramStr = CoreSupport.DataSetIdList + '=' + encodeURIComponent(id) +
                '&' + CoreSupport.DataSetParams + '=' + encodeURIComponent(JSON.stringify(paramObj)) +
                '&__appId=' + encodeURIComponent(appId) + '&__code=' + encodeURIComponent(code);
            var retData={};
            $.ajax({
                type: "POST",
                url: "/"+setting.custid+'/~main/ajax.php',
                async: false,
                contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                data:paramStr,
                dataType: "html",
                cache:false,
                timeout:timeout,
                success: function (ajaxData) {
                    retData=JSON.parse(ajaxData);
                },
                error:function (XMLHttpRequest, textStatus, errorThrown) {
                    retData.retCode="999";
                    retData.retMsg="与后台交互数据失败了";
                    log("返回值："+XMLHttpRequest.responseText);
                    log(textStatus);
                    log(errorThrown);
                    return retData;
                }
            });
            return retData;
        }

        
        /**
          * 与java不同的地方时这个是异步版本
          * 一个Action可描述为　类名+方法名+别名(可选) 或 portalConfig中配置的数据集ID + 别名(可选)
          * id: 如 com.longkey.UserBean.test as test1 或 id1 as a 或 userBean.test as b
          * params(optional): 参数，可以是一个js对象，也可以是 var1=aa&var2=bb&... 这样的字符串
          * appid(optional): 参数，要调用的后台，不送的话就使用自己的后台
          * timeout,超时时间
         */
        function ajax(id, params,appId,timeout){
            timeout=timeout||15000;
            if(!params)
            {
                params={};
            }
            var deferred=$q.defer();
            if(!id)
                return;
            if(!appId)
            {
                appId=setting.custid;
            }
            var paramObj = CoreSupport.treatParams(params);
            var code = params ? params.code : "";
            var paramstr = CoreSupport.DataSetIdList + '=' + encodeURIComponent(id) + '&' + CoreSupport.DataSetParams + '=' + encodeURIComponent(CoreSupport.toJSONString(paramObj)) + '&__appId=' + encodeURIComponent(appId) + '&__code=' + encodeURIComponent(code);
            var uri = "/"+setting.custid+'/~main/ajax.php';
            $.ajax({
                type: "POST",
                url: uri,
                async: true,
                contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                data:paramstr,
                dataType: "html",
                cache:false,
                timeout:timeout,
                success: function (ajaxData) {
                    var retdata = JSON.parse(ajaxData);
                    deferred.resolve(retdata);
                },
                error:function (XMLHttpRequest, textStatus, errorThrown) {
                    var retdata={};
                    retdata.retCode="999";
                    retdata.retMsg="与后台交互数据失败了";
                    log("返回值："+XMLHttpRequest.responseText);
                    log(textStatus);
                    log(errorThrown);
                    deferred.reject(retdata);
                }
            });
            return deferred.promise;
        };
           
        
           function log(text)
           {
        	   if(setting.debug)
        		   {
        		     console.log(text);
        		   }
           }

        return{
            userinfo:userinfo,
            java:java,
            ajax:ajax,
            setConfig:setConfig,
            getConfig:getConfig
        }
    });