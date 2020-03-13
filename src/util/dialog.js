/**
 * 错误提示函数(轻提示)
 */
export const errorToast = (msg, duration = 3000) => {
    if (msg) {
        Toast.success({
            message: msg,
            duration: duration,
            forbidClick: false // 禁用背景点击
        });
    }
};
