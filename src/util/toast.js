import nutui from "@nutui/nutui";

class Toast {
    constructor() {}

    // 错误提示函数(轻提示)
    error(msg) {
        if (msg) {
            this.$toast.text("提示信息");
        }
    }

    // 文本提示
    text(msg) {
        this.$toast.text(msg, {
            id: 123,
            duration: 4000, // 展示时长
            center: true, // 是否居中展示，值为false时展示在页面底部
            bottom: 40, // 展示在页面底部时，距底部的距离（px)
            textAlignCenter: false // 多行文本是否居中展示，值为false时单行居中，多行居左
        });
    }
}
export default new Toast();
