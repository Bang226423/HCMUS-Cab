require('dotenv').config();
import { listen } from './app';
import { info } from "./services/logger";

const port = process.env.PORT;

listen(port, () => {
    info(`22850034-ASD-Authentication MS is running on port ${port}`);
});