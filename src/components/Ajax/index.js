import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import Cookies from 'js-cookie'
import { message } from 'antd'
// import { Spin } from 'antd'
// import './index.less'
import $ from 'jquery'


// @withRouter
// @inject('Store')
// @observer
// let version = "http://172.38.5.22:8001";
// let version = "https://www.coinex.com"
// let version = "";
// let version = "http://172.38.5.190:9080";
let version = "http://172.38.2.178:8000"
let token = Cookies.get('token') ? "?token=" + Cookies.get('token') : "?";


// 潘
let BeforeSendGet = function (url, obj, fun) {
    var objstr = "";
    if (obj) {
        for (var k in obj) {
            objstr += "&" + k + "=" + encodeURIComponent($.trim(obj[k]));
        }
    }
    url = version + url + "?_=" + new Date().getTime() + objstr;
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        beforeSend: function (xhr) {
            token = Cookies.get("token")
            xhr.setRequestHeader("Authorization", token);
        },
        success: function (d) {
            d = initBackDatas(d);
            fun(d)
        }
    });
}
// 潘
let BeforeSendPost = function (url, obj, fun) {
    var sobj = {};
    for (var k in obj) {
        if (typeof obj[k] === "object") {
            sobj[k] = (k == "password") ? JSON.stringify(obj[k]) : JSON.stringify($.trim(obj[k]));
        } else {
            sobj[k] = (k == "password") ? obj[k] : $.trim(obj[k]);
        }
    }
    url = version + url;
    // token = Cookies.get("token")
    $.ajax({
        type: "POST",
        url: url,
        // headers: {
        //     "Authorization": token
        // },
        data: sobj,
        dataType: 'json',
        beforeSend: function (xhr) {
            token = Cookies.get("token")
            xhr.setRequestHeader("Authorization", token);
        },
        success: function (d) {
            d = initBackDatas(d);
            fun(d)
        }
    });
}

// 潘
let BeforeSendPut = function(url, obj, fun){
    var sobj = {};
    for (var k in obj) {
        if (typeof obj[k] === "object") {
            sobj[k] = (k == "password") ? JSON.stringify(obj[k]) : JSON.stringify($.trim(obj[k]));
        } else {
            sobj[k] = (k == "password") ? obj[k] : $.trim(obj[k]);
        }
    }
    url = version + url;
    $.ajax({
        url:url,
        type: "PUT",
        dataType: "json",
        data: sobj,
        beforeSend: function (xhr) {
            token = Cookies.get("token")
            xhr.setRequestHeader("Authorization", token);
        },
        success:function(d){
            d = initBackDatas(d);
            fun(d);
        }
    });
}

let Cgicallget = function (url, obj, fun) {
    var objstr = "";
    if (obj) {
        for (var k in obj) {
            objstr += "&" + k + "=" + encodeURIComponent($.trim(obj[k]));
        }
    }
    url = version + url + "?_=" + new Date().getTime() + objstr;

    $.get(url, function (d, x, s) {
        d = initBackDatas(d);
        // if (typeof d != "undefined" && typeof d.status != "undefined" && typeof d.data != "undefined" && d.status == 1 && (d.data.indexOf("quitlogin") > -1 || d.data.indexOf("otherlogin") > -1)) {
        // 	this.props.history.replace('/login')
        // }
        fun(d, x, s);
    }, "json");
}

// bind-info
let Cgicallgets = function (url, obj, fun) {
    var objstr = "";
    if (obj) {
        for (var k in obj) {
            objstr += "&" + k + "=" + encodeURIComponent($.trim(obj[k]));
        }
    }
    url = version + url + "?" + objstr;
    $.get(url, function (d, x, s) {
        d = initBackDatas(d);
        // if (typeof d != "undefined" && typeof d.status != "undefined" && typeof d.data != "undefined" && d.status == 1 && (d.data.indexOf("quitlogin") > -1 || d.data.indexOf("otherlogin") > -1)) {
        // 	this.props.history.replace('/login')
        // }
        fun(d, x, s);
    }, "json");
}

let CgicallPost = function (url, obj, fun) {
    var sobj = {};
    for (var k in obj) {
        if (typeof obj[k] === "object") {
            sobj[k] = (k == "password") ? JSON.stringify(obj[k]) : JSON.stringify($.trim(obj[k]));
        } else {
            sobj[k] = (k == "password") ? obj[k] : $.trim(obj[k]);
        }
    }
    url = version + url;
    $.post(url, sobj, function (d, x, s) {
        d = initBackDatas(d);
        // if (typeof d != "undefined" && typeof d.status != "undefined" && typeof d.data != "undefined" && d.status == 1 && (d.data.indexOf("quitlogin") > -1 || d.data.indexOf("otherlogin") > -1)) {
        //     this.props.history.replace('/login')
        // }
        fun(d, x, s);
    }, "json");
}

let CgicallPut = function (url, obj, fun) {
    var sobj = {};
    for (var k in obj) {
        if (typeof obj[k] === "object") {
            sobj[k] = JSON.stringify(obj[k]);
        } else {
            sobj[k] = $.trim(obj[k]);
        }
    }
    url = version + url;
    $.ajax({
        type: "put",
        url: url,
        data: sobj,
        async: true,
        dataType: "json",
        success: function (d, x, s) {
            d = initBackDatas(d);
            if (typeof d != "undefined" && typeof d.status != "undefined" && typeof d.data != "undefined" && d.status == 1 && (d.data.indexOf("quitlogin") > -1 || d.data.indexOf("otherlogin") > -1)) {
                this.props.history.replace('/login')
            }
            fun(d, x, s);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var ajType = jqXHR.readyState;
            if (ajType == 0 || ajType == 1 || ajType == 2 || ajType == 3 || ajType == 4) {
                if (textStatus == "timeout") {
                    message.error('请求超时，请稍后再试！')
                } else {
                    message.error('网络不稳定或网络已断，请稍后再试！')
                }
                $(".btn").removeAttr("disabled");
                return false
            }
        }
    });
}

let initBackDatas = function (obj) {
    var sobj = {};
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        for (var k in obj) {
            var o;
            try {
                if (typeof obj[k] === "object") {
                    throw new Error("");
                } else if (!isNaN(obj[k])) {
                    throw new Error("");
                } else {
                    o = JSON.parse(obj[k]);
                }
            } catch (e) {
                o = obj[k];
                if (typeof o === "object") o = initBackDatas(o);
            }
            sobj[k] = o;
        }
    } else if (Object.prototype.toString.call(obj) === '[object Array]') {
        sobj = [];
        for (var i = 0, ien = obj.length; i < ien; i++) {
            var o;
            try {
                if (typeof obj[i] === "object") {
                    throw new Error("");
                } else if (!isNaN(obj[k])) {
                    throw new Error("");
                } else {
                    var reg = /^[0-9]*$/;
                    if (reg.test(obj[i])) {
                        o = obj[i];
                    } else {
                        o = JSON.parse(obj[i]);
                    }

                }
            } catch (e) {
                o = obj[i];
                if (typeof o === "object") o = initBackDatas(o);
            }
            sobj.push(o)
        }
    } else {
        return obj;
    }
    return sobj;
}

let ObjClone = function (obj) {
    var o;
    if (typeof obj == "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(ObjClone(obj[i]));
                }
            } else {
                o = {};
                for (var j in obj) {
                    o[j] = ObjClone(obj[j]);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
}

let GetErrorMsg = function (data, type) {
    // const code = data.error.code?data.error.code : "";
    // let msg = "";
    // switch(code) {
    //     case 2000: msg = "邮箱验证码发送失败"; break;
    //     case 2001: msg = "手机验证码发送失败"; break;
    //     case 5000: msg = "账号已存在"; break;
    //     case 5001: msg = "账号未注册"; break;
    //     case 5002: msg = "用户名或密码错误！还有"+ data.error.data +"次机会"; break;
    //     case 5003: msg = "未登录"; 
    //          location.href="/#/login";
    //         break;
    //     case 5004: msg = "账号已锁定（1小时）"; break;
    //     case 5005: msg = "验证码获取过于频繁"; break;
    //     case 5006: msg = "验证码已过期"; break;
    //     case 5007: msg = "验证码错误"; break;
    //     case 5008: msg = "验证码错误"; break;
    //     case 5009: msg = "邮箱格式错误"; break;
    //     case 5010: msg = "密码格式错误"; break;
    //     case 5011: msg = "验证码错误"; break;
    //     case 5012: msg = "账号格式错误"; break;
    //     case 7000: msg = "JSON解析错误"; break;
    //     case 7001: msg = "数据库操作失败"; break;
    //     case 7002: msg = "会话保存失败"; break;
    //     case 7003: msg = "参数错误"; break;
    //     case 7004: msg = "验证码错误"; break;
    //     case 7005: msg = "验证码错误"; break;
    //     case 7006: 
    //         // msg = paramError(type);
    //         if(type == "loginCheck") msg = "用户名或密码错误！";else msg = "参数错误";
    //          break;
    //     case 7007: msg = "验证参数无效"; break;
    //     case 7008: msg = "验证错误"; break;
    //     default: msg = "操作失败"; break;
    // }

    const code = data.error.code ? data.error.code : "";
    let msg = "";
    let obj = {
        2000: "邮箱验证码发送失败",
        2001: "手机验证码发送失败",
        5000: "账号已存在",
        5001: "账号未注册",
        5002: (type == "updatePwd") ? '原密码错误' : "用户名或密码错误！还有" + data.error.data + "次机会",
        5003: "未登录",
        5004: "账号已锁定（1小时）",
        5005: "验证码获取过于频繁",
        5006: "验证码已过期",
        5007: "验证码错误",
        5008: "验证码错误",
        5009: "邮箱格式错误",
        5010: "密码格式错误",
        5011: "验证码错误",
        5012: "账号格式错误",
        7000: "JSON解析错误",
        7001: "数据库操作失败",
        7002: "会话保存失败",
        7003: "参数错误",
        7004: "验证码错误",
        7005: "验证码错误",
        7006: (type == "loginCheck") ? "用户名或密码错误！还有" + data.error.data + "次机会" : "参数错误",
        7007: "验证参数无效",
        7008: "验证错误",
        8000: "非法参数",
        8001: "用户不存在",
        8002: "不能重复提交",
        8003: "服务器繁忙",
        8010: "非法参数",
        8011: "用户不存在",
        8012: "不能重复提交",
        8013: "该身份信息已经使用",
        8014: "服务器繁忙",
        8020: "非法参数",
        8021: "服务器繁忙",
        8022: "币种不支持",
        8023: "用户不存在",
        8024: "验证码错误",
        8025: "提币联系人已存在",
        8026: "余额不足",
        8027: "提币联系人不存在",
        8028: "不能转账给自己",
        8029: "提币记录不存在",
        8030: "当前阶段无法取消提币",
        8040: "参数错误",
        8041: "服务器繁忙"
    }
    msg = obj[code] ? obj[code] : "操作失败";
    if (code == '5003') location.href = "/#/login";
    return msg;
}
let paramError = function (type) {
    let msg = "参数错误";
    switch (type) {
        case 'loginCheck': msg = "用户名或密码错误！"; break;
        default: break;
    }
    return msg;
}

export { BeforeSendPut, BeforeSendPost, BeforeSendGet, Cgicallget, Cgicallgets, CgicallPost, CgicallPut, ObjClone, GetErrorMsg }