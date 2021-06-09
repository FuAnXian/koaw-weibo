/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-08 09:37:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-09 17:04:04
 */
(function (axios) {
    var config = {
        method: 'POST',
        headers: { 'content-type': 'application/json;charset=utf-8' },
        data: {},
        url: "/",
        loading:true
    };
    axios.interceptors.response.use(response => {
        //关闭loading
        $("#loading").fadeOut();
        return response.data
    },
    error => {
        return Promise.reject(error.response.status) // 返回接口返回的错误信息
    });

    axios.interceptors.request.use(request =>{
        //显示loading
        if(request.loading){
            $("#loading").fadeIn();
        }
        return request;
    })
    window.$axios = function (params) {
        Object.assign(config, params);
        return axios(config)
    };

})(window.axios || {})