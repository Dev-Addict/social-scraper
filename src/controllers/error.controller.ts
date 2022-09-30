import {NextFunction, Request, Response} from 'express';

import {Status} from '../types/enums/status.enum';
import {AppError} from '../util/app-error.util';

const compileError = (error: any) => {
	try {
		if (error.isOperational) {
			return {
				message: (<AppError>error).message,
				code: (<AppError>error).code,
			};
		}
		if (error.statusCode === 400) {
			return {
				message: error.message.match(/0xE[A-F\d]{6}/),
				code: 400,
			};
		}
	} catch (error) {
		return {
			message: '0xE000002',
			code: 500,
		};
	}
	return {
		message: '0xE000002',
		code: 500,
	};
};

export const handleError = (
	err: any,
	req: Request,
	res: Response,
	_: NextFunction
) => {
	const compiledError = compileError(err);

	res.status(compiledError.code).json({
		status: compiledError.code.toString().startsWith('5')
			? Status.ERROR
			: Status.FAIL,
		message: compiledError.message,
	});
};

export const notFound = (_: Request, res: Response) => {
	res.status(404).json({
		status: Status.FAIL,
		message: '0xE00003',
	});
};
