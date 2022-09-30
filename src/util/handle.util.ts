import {Handler} from 'express';

export const handle =
	(fn: Handler): Handler =>
	async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
