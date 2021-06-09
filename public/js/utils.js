/*
 * @Descripttion: js通用方法
 * @version: 1
 * @Author: fax
 * @Date: 2021-06-09 11:01:41
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-09 17:20:29
 */

!(function(owner){
    //防抖 （一定时间内只执行一次）
    owner.debounce = function(fn,delay){
        let time;
        return function(){
            if(time){
                clearTimeout(time)
            };
           time = setTimeout(fn.bind(this,...arguments),delay)
        }
    }

    //节流(每隔一定时间内执行一次)
    owner.throttle = function(fn,delay){
        let state = true;
        return function(){
            if(!state) return;
            state = false;
            setTimeout(function(){
                state = true;
                fn.bind(this,...arguments)
            },delay);
        }
    }

})(window.utils = {})

