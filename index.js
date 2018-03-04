import express from 'express'; 
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';

import router from './router';
import config from './config';

const { db: { host, port, name }} = config;

const app = express();

// Db Setup
mongoose.connect(`mongodb://${host}:${port}/${name}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('MongoDb: Connection Successful!'));

// App basic setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
// app.use(bodyParser.urlencoded({ extended: true }));

router(app);

// Server basic setup
const currentPort = process.env.PORT || config.app.port;
app.listen(currentPort);

// const server = http.createServer(app);
// server.listen(currentPort);

console.log(`Server is listening at port ${currentPort}`);