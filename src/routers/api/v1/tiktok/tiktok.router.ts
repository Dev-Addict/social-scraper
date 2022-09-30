import {Router} from 'express';

import {
	getUserDetails,
	validateGetUserDetails,
} from '../../../../controllers/tiktok.controller';

export const tiktokRouter = Router();

tiktokRouter.get('/:username', validateGetUserDetails, getUserDetails);
