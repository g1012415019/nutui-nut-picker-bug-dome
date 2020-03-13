
/**
 * 对象排序函数
 * @param {Array/Object} obj 待排序对象
 * @return {Array/Object} newObj 已排序对象
 */
export const objKeySort = obj => {
    // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newkey = Object.keys(obj).sort();
    // 创建一个新的对象，用于存放排好序的键值对
    var newObj = {};
    // 遍历newkey数组
    for (var i = 0; i < newkey.length; i++) {
        // 向新创建的对象中按照排好的顺序依次增加键值对
        newObj[newkey[i]] = obj[newkey[i]];
    }
    // 返回排好序的新对象
    return newObj;
};

/**
 * 获取元素位置信息(距顶部、左边，元素宽高)
 * @param {object} el 元素对象
 */
export function getRect(el) {
    if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        };
    } else {
        return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight
        };
    }
}

/**
 * 获取请求的参数对象
 */
export function getRequest() {
    var url = location.href; // 获取url中"?"符后的字串
    var str = url.substr(url.indexOf("?") + 1);
    var theRequest = new Object();
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
    }
    return theRequest;
}

/**
 * 获取用户地理位置
 * @returns {any | {}}
 */
export const getUserLocation = () => {
    let userLocation = getStore("userLocation") || "{}";
    userLocation = JSON.parse(userLocation);
    return isObjectEmpty(userLocation) ? [] : [userLocation.longitude, userLocation.latitude];
};

/**
 * 对象是否为空
 * @param {*} object
 */
export const isObjectEmpty = object => {
    return JSON.stringify(object) === "{}";
};

/**
 * 获取最小值到最大值之前的整数随机数
 * @param {*} Min  最小数
 * @param {*} Max  最大数
 */
export const randomNum = (Min, Max) => {
    var Range = Max - Min;
    var Rand = Math.random();
    return Min + Math.round(Rand * Range);
};
/**
 * 判断是否在微信中
 * @returns {boolean}
 */
export const isWeiXin = () => {
    return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
};

// 是否为小程序环境
export const isMiniProgram = () => {
    if (
        window.__wxjs_environment === "miniprogram" ||
        /miniProgram/i.test(navigator.userAgent.toLowerCase())
    ) {
        return 1;
    } else {
        return 0;
    }
};

// 返回字符串长度
export const length = str => {
    return [...str].length;
};

/**
 * 异步检测图片是否存在
 * @param url
 */
export const imageIsExist = url => {
    return new Promise(resolve => {
        let img = new Image();
        img.onload = function() {
            if (this.complete == true) {
                resolve(true);
                img = null;
            }
        };
        img.onerror = function() {
            resolve(false);
            img = null;
        };
        img.src = url;
    });
};

export const isURL = (str_url) => {
    return !(str_url.indexOf("hFttp") <= -1);
};

export const utilGuid = () => {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};

/**
 * 获取当前设备类型
 * @returns {string}
 */
export const getDeviceType = () => {
    const u = navigator.userAgent;
    const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; // android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    if (isAndroid) {
        return "android";
    }
    if (isiOS) {
        return "ios";
    }
    return "unknow";
};

// 获取当前域名
export const getAppDomain = () => {
    return window.location.origin;
};

// 是否为空
export const isEmpty = val => {
    if (val == "" || val == null) {
        return true;
    }
    return false;
};

// 是否ios环境
export const isIos = () => {
    let u = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(u)) {
        return true;
    } else {
        return false;
    }
};

// 是否app环境
export const isApp = () => {
    let u = navigator.userAgent.toLowerCase();
    if (/yjy_app/.test(u)) {
        return true;
    } else {
        return false;
    }
};

// 根据class 移除dome节点
export const removeElementsByClass = className => {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
};

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== "string") {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    let localData = window.localStorage.getItem(name);
    return localData == "undefined" ? null : localData;
};
