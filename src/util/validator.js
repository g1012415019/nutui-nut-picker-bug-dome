const regexs = {
    // 匹配 max_length(12) => ["max_length",12]
    rule: /^(.+?)\((.+)\)$/,
    // 数字
    numericRegex: /^[0-9]+$/,
    /**
     * @descrition:邮箱规则
     * 1.邮箱以a-z、A-Z、0-9开头，最小长度为1.
     * 2.如果左侧部分包含-、_、.则这些特殊符号的前面必须包一位数字或字母。
     * 3.@符号是必填项
     * 4.右则部分可分为两部分，第一部分为邮件提供商域名地址，第二部分为域名后缀，现已知的最短为2位。最长的为6为。
     * 5.邮件提供商域可以包含特殊字符-、_、.
     */
    email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,

    idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,

    /**
     * [ip ipv4、ipv6]
     * "192.168.0.0"
     * "192.168.2.3.1.1"
     * "235.168.2.1"
     * "192.168.254.10"
     * "192.168.254.10.1.1"
     */
    ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){5})$/,
    /**
     * @descrition:判断输入的参数是否是个合格的固定电话号码。
     * 待验证的固定电话号码。
     * 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)
     **/
    fax: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
    /**
     *@descrition:手机号码段规则
     * 13段：130、131、132、133、134、135、136、137、138、139
     * 14段：145、147
     * 15段：150、151、152、153、155、156、157、158、159
     * 17段：170、176、177、178
     * 18段：180、181、182、183、184、185、186、187、188、189
     * 国际码 如：中国(+86)
     */
    phone: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[03678]|18[0-9]|19[0-9]|16[0-9])\d{8}$/,
    /**
     * @descrition 匹配 URL
     */
    url: /[a-zA-z]+:\/\/[^\s]/,
    money: /^(0|[1-9]\d*)(\.\d+)?$/,
    english: /^[A-Za-z]+$/,
    chinese: /^[\u0391-\uFFE5]+$/,
    percent: /^(?:[1-9][0-9]?|100)(?:\.[0-9]{1,2})?$/
};


// 验证合法邮箱
export function is_email(field) {
    return regexs.email.test(backVal(field));
};
// 验证合法 ip 地址
export function is_ip(field) {
    return regexs.ip.test(backVal(field));
};
export function is_id_card(field) {
    return regexs.ip.test(backVal(field));
};
// 验证传真
export function is_fax(field) {
    return regexs.fax.test(backVal(field));
};
// 验证座机
export function is_tel(field) {
    return regexs.fax.test(backVal(field));
};
// 验证手机
export function is_phone(field) {
    return regexs.phone.test(backVal(field));
};
// 验证URL
export function is_url(field) {
    return regexs.url.test(backVal(field));
};
export function is_money(field) {
    return regexs.money.test(backVal(field));
};
export function is_english(field) {
    return regexs.english.test(backVal(field));
};
export function is_chinese(field) {
    return regexs.chinese.test(backVal(field));
};
export function is_percent(field) {
    return regexs.percent.test(backVal(field));
};

// 指定字段内容是否相同
export function same(field, newField) {
    var value1 = backVal(field);
    var value2 = backVal(this.fields[newField].element);

    return value1 == value2;
};

// 直接判断字符串是否相等
export function contains(field, value) {
    var value1 = backVal(field);

    return value1 == value;
};
/* 数字 */
export function number(str) {
    const reg = /^\d{4}$/
    return reg.test(str)
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * [backVal 判断 field 是否为字符串 ]
 * @param  {[type]}              [Object or String]
 * @return {[type]}              [String]
 */
function backVal(field) {
    return typeof field === "string" ? field : field.value;
}

