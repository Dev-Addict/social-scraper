import {Router} from 'express';

import {tiktokRouter} from './tiktok/tiktok.router';

export const v1Router = Router();

v1Router.use('/tiktok', tiktokRouter);
