require('dotenv').config();
const axios = require('axios');

const setupAuth = (app, routes) => {
    const verifyToken = async (req, res, next) => {
        try {
            const token = req.headers['authorization']; // Lấy token từ session (có thể thay đổi tùy vào cách lưu trữ token)

            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            console.log(token)

            const response = await axios.post(process.env.MS_AUTH_URL + '/authentication', null, {
                headers: {
                    'Authorization': `${token}`,
                },
            });

            if (response.status == 200) {
                next();
            } else {
                return res.status(401).json({ message: 'Invalid Token' });
            }
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };

    routes.forEach((r) => {
        if (r.auth) {
            app.use(r.url, verifyToken);
        }
    });
};

exports.setupAuth = setupAuth;