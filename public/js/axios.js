
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-08 09:37:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-11 14:50:34
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
    
        //出错
        if(response.data.code == -1){
            utils.showInfo({
                status:"warning",
                msg:response.data.msg
            })
            return Promise.reject(response.data)
        }
        //未登录
        if(response.data.code == 0){
            utils.showInfo({
                status:"danger",
                msg:response.data.msg
            })
            $("#loginModal").modal("show");
            return Promise.reject(response.data)
        }
        return response.data
    },
    error => {
        $("#loading").fadeOut();
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
        let request = Object.assign({},config, params);
        return axios(request)
    };

})(window.axios || {})