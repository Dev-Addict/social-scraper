import {join} from 'path';
import {config} from 'dotenv';

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_DEV = NODE_ENV !== 'production';

config({
	path: join(__dirname, `../.env.${IS_DEV ? 'dev' : 'pro'}`),
});

export const PORT = +(process.env.PORT || 4000);
export const COOKIE_SECRET = process.env.COOKIE_SECRET || 'secret';
