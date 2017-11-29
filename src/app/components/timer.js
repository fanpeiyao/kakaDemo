/**
 * Created by chent on 2017/3/3.
 */
/**
 *  定时器，用来处理定时触发的事情
 *  @type {{invoke: timer.invoke}}
 */
var timer = {
    /**
     *  定时器  用来执行特定时间后的事情
     * @param func  需要执行的事情
     * @param start   多少毫秒以后开始
     * @param interval     如果需要循环，就要配置循环间隔
     * @param end       如果循环需要结束，那么需要配置结束的时间
     */
    invoke:function(func,start,interval,end){
        if(!start)
            start = 0;
        if(arguments.length<=2)
            setTimeout(func,start);
        else{
            setTimeout(repeated,start);
            function repeated(){
                var h = setInterval(func,interval);
                if(end)
                    setTimeout(function(){ clearInterval(h); },end);
            }
        }
    }
};