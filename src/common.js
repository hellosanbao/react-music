import $ from 'jquery'
window.wyx = {}
wyx.loadingNum=0
wyx.ajax=function(opt){
    let dopt={
        showLoading:false       
    }
    let options = $.extend(true,dopt,opt)
    if(options.showLoading){
        wyx.loadingNum++
        $("body").append(`<div class="loading-warp flex-hv-center">
                                <div class="loading-content">加载中...</div>
                          </div>`)
    }
    options.success=function(res){
        if(options.showLoading){
          wyx.loadingNum--  
        }
        if(wyx.loadingNum===0){
            $(".loading-warp").remove()
        }
        opt.success(res)
    }
    $.ajax(options)
}


/*
 *格式化时间挫
 *参数说明：format   （string） 你要输出的时间格式 如：yyyy-MM-dd
 ese      （boole） 时间较短是是否启用短时间提醒 例如1小时前的时间，则返回一小时前
 *使用示例
 *var now = new Date(times); //times为时间挫
 *var nowStr = now.format("yyyy-MM-dd hh:mm:ss");
 *或者var nowStr = now.format("yyyy年MM月dd日 hh时mm分ss秒");随意传，保证有y，m，d，h，m，s就行
 *作者：熊志强
 */

Date.prototype.format = function(format, ese) {
    var now = new Date().getTime(),
        times = this.getTime(),
        res = now - times
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
	}
	
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }

    if (ese) {
        if (res < 60 * 1000) {
            format = "刚刚"
        } else if (res < 60 * 60 * 1000) {
            format = Math.round(res / 1000 / 60) + "分钟前"
        } else if (res < 60 * 60 * 24 * 1000) {
            format = Math.round(res / 60 / 60 / 1000) + "小时前"
        } else if (res < 60 * 60 * 24 * 2 * 1000) {
            format = Math.round(res / 60 / 60 / 1000 / 24) + "天前"
        }
    }

    return format;
};