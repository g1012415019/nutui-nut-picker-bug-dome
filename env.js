const env = {
    //自动上传配置
    sftpOption: {
        host: '',
        port: '',
        username: '',
        password: '',
        target: ''
    },
    //devServer 启项目启动配置
    devServer: {
        host: 'localhost',
        port: 8080,
    }
};
//开发环境
const development = {
    devServer: {
        // host: 'vip-dev.yyzj.com',
        host: '',
        port: 8080,
    }
};
//生生产环境
const production = {};

module.exports = {
    //开发环境
    development: { ...{}, ...env, ...development },
    //生产环境
    production: { ...{}, ...env, ...production }
}