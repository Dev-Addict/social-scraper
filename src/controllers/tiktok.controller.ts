import * as Puppeteer from 'puppeteer';
import {checkSchema} from 'express-validator';

import {handle} from '../util/handle.util';
import {Status} from '../types/enums/status.enum';
import {AppError} from '../util/app-error.util';
import {deformatNumber} from '../util/deformat-number.util';

interface GetUserDetailsParams {
	username: string;
}

export const validateGetUserDetails = checkSchema({
	username: {
		in: ['params'],
		custom: {
			options: (value) => {
				if (!value) return false;
				if (typeof value !== 'string') return false;
				return /^(?!.*\.\.)(?!.*\.$)\w[\w.]{2,24}$/.test(value);
			},
		},
		errorMessage: '0xE000000',
	},
});
export const getUserDetails = handle(async (req, res) => {
	const {username} = req.params as unknown as GetUserDetailsParams;

	const browser = await Puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	const page = await browser.newPage();

	await page.goto(`https://www.tiktok.com/@${username}`);

	if (
		await page.waitForXPath(
			'//*[contains(text(), "Couldn\'t find this account")]'
		)
	)
		throw new AppError('0xE000001', 404);

	const followingElement = await page.waitForSelector(
		'strong[title=Following]'
	);
	const followingText = await page.evaluate(
		(element) => element?.textContent,
		followingElement
	);
	const followersElement = await page.waitForSelector(
		'strong[title=Followers]'
	);
	const followersText = await page.evaluate(
		(element) => element?.textContent,
		followersElement
	);
	const likesElement = await page.waitForSelector('strong[title=Likes]');
	const likesText = await page.evaluate(
		(element) => element?.textContent,
		likesElement
	);

	await browser.close();

	res.json({
		status: Status.SUCCESS,
		data: {
			username,
			followingText,
			following: deformatNumber(followingText || ''),
			followersText,
			followers: deformatNumber(followersText || ''),
			likesText,
			likes: deformatNumber(likesText || ''),
		},
	});
});
