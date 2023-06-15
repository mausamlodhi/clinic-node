import dotenv from 'dotenv';
import express from 'express';
import Bootstrap from './bootstrap.js';
dotenv.config();
const app = express();
app.set('port',process.dotenv||3006);
const bootstrap = new Bootstrap(app);

