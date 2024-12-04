import http from 'http';
import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
