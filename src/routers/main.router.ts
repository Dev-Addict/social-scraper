import {Router} from 'express';

import {apiRouter} from './api/api.router';
import {notFound} from '../controllers/error.controller';

export const mainRouter = Router();

mainRouter.use('/api', apiRouter);

mainRouter.all('*', notFound);
