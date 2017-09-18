import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';

import config from './config';
import authRoute from './routes/auth.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

mongoose.Promise - bluebird;
mongoose.connect(config.datasets, err => {
	if(err){
		throw err
	}
	console.log('Mongo connected');
});

app.listen(config.port, err => {
	if(err) throw err;
	console.log(`Server listen on port ${config.port}`);
});

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	resove: true,
	saveUninitialized: true,
	secret: config.secret
}));
app.get('*', async(req, res) => {
	res.end('hello World');
});

app.use('/api', authRoute);
app.use(errorHandler);
