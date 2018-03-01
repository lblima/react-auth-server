import express from 'express'; 
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import http from 'http';

import router from './router';

const app = express();

// App basic setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
// app.use(bodyParser.urlencoded({ extended: true }));

router(app);

// Server basic setup
const port = process.env.PORT || 3030;
const server = app.listen(port);

// const server = http.createServer(app);
// server.listen(3030);

console.log(`Server is listening at port ${port}`);