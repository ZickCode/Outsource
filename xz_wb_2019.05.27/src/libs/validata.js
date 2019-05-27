import { post, get } from '@/libs/api';
import util from '@/libs/util'

export default {
    mobile: function () {
        return (rule, value, callback) => {
            if (util.isEmpty(value)) {
                callback();
            }
            else if (!value.length === 11 || !/^(1([358][0-9]|4[1579]|66|7[0135678]|9[89])[0-9]{8})$/.test(value)) {
                callback(new Error('请输入正确的手机号'))
            } else {
                callback();
            }
        }
    },
    phone: function () {
        return (rule, value, callback) => {
            if (util.isEmpty(value)) {
                callback();
            } else if (!/^(1([358][0-9]|4[1579]|66|7[0135678]|9[89])[0-9]{8})$/.test(value) && !/^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/.test(value)) {
                callback(new Error('电话号码'))
            } else {
                callback();
            }
        }
    },
    equalsPWD: function (pwd) {
        return (rule, value, callback) => {
            if (value !== pwd) {
                callback(new Error('两次输入的密码不一致'))
            } else {
                callback();
            }
        }
    },
    password: function () {
        return (rule, value, callback) => {
            if (!/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(value)) {
                callback(new Error('最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'))
            } else {
                callback();
            }
        }
    },
    checkMobile: function () {
        return (rule, value, callback) => {
            post(
                {
                    method: "api.module.member.public.check",
                    name: "mobile",
                    param: value
                },
                function (data) {
                    if (200 !== data.code) {
                        callback(new Error("该手机号已注册"))
                    } else {
                        callback();
                    }
                }
            )
        }
    },
    checkUsername: function () {
        return (rule, value, callback) => {
            post(
                {
                    method: "api.module.member.public.check",
                    name: "username",
                    param: value
                },
                function (data) {
                    if (200 !== data.code) {
                        callback(new Error("该手机号已注册"))
                    } else {
                        callback();
                    }
                }
            )
        }
    }
}