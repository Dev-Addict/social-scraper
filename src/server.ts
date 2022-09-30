import {COOKIE_SECRET, IS_DEV, PORT} from './env';

import express, {json, urlencoded} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import {mainRouter} from './routers/main.router';
import {handleError} from './controllers/error.controller';

const app = express();

if (!IS_DEV) app.use(helmet());

app.use(
	cors({
		credentials: true,
	})
);
app.use(
	json({
		limit: '24mb',
	})
);
app.use(urlencoded({extended: true}));
app.use(cookieParser(COOKIE_SECRET));

app.use(mainRouter);

app.use(handleError);

app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://127.0.0.1:${PORT}`);
});
