/*
 * @Descripttion: 分页
 * @version: 1
 * @Author: fax
 * @Date: 2021-06-15 15:31:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-15 17:50:32
 */

const { max } = require("../db/model/users");

/**
 * 初始化分页数据
 * @param {number} count 总数
 * @param {number} current 当前页数
 * @param {number} limit 显示条数
 */
const formattingPage = ({ count, current, limit, pageNum }) => {
    
    //最大页码数
    let Max = Math.ceil(count / limit);
    
    //如果显示页码大于最大页码，就在最大页码来
    pageNum = pageNum > Max ? Max : pageNum;
    let haif = Math.floor(pageNum / 2);
   
    let i = 0, num = [];
    while (i < pageNum) {

        //保持激活在中位数显示
        let cur;
        if (current + haif >= Max) {
            cur = (Max-pageNum)+i+1;
        } else if (current <= haif) {
            cur = (i+1)
        } else {
            cur = parseInt(current + i - haif);
        }
        num[i] = cur;
        i++;
    };

    return {
        num,
        sum:Max,
        active: current,
        last: current * limit >= count,
        first: current <= 1
    }
};

module.exports = {
    formattingPage
}