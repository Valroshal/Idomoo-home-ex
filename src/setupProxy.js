const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    //console.log('in proxy')
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://usa-api.idomoo.com',
            changeOrigin: true,
            secure: false,
            headers: {
                'Authorization': 'Basic MzU1MDpQaUtRMXhmdUtDMjJjMWM1YzAwNjFhZjEyYTI0MGUwOTJkOTNlYzZhNDdnbWNrd1FHaHA2',
            }
        })
    )
    app.listen(3000)
}
