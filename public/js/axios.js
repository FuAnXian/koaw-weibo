(function (axios) {
    var config = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
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