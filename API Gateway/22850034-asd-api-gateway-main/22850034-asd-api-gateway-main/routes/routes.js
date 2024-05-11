require('dotenv').config();

const ROUTES = [
    {
        url: '/user/*',
        auth: false,
        proxy: {
            target: process.env.MS_AUTH_URL,
            changeOrigin: true,
            pathRewrite: {
                [`/user/*`]: '/',
            },
        }
    }
]

exports.ROUTES = ROUTES;