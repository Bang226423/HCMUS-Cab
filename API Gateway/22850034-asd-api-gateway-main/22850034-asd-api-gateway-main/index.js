require('dotenv').config();
const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`22850034-ASD-API Gateway MS is running on port ${port}`);
});