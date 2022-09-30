import {Status} from '../types/enums/status.enum';

export class AppError extends Error {
	public readonly isOperational = true;
	public readonly status: Status;

	constructor(message: string, public readonly code: number) {
		super(message);

		this.status = this.code.toString().startsWith('4')
			? Status.FAIL
			: Status.ERROR;
	}
}
