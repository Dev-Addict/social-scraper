export const deformatNumber = (formattedNumber: string) => {
	let rate = 1;

	if (formattedNumber[formattedNumber.length - 1] === 'K') rate = 1000;
	else if (formattedNumber[formattedNumber.length - 1] === 'M') rate = 1000000;

	const relativeNumber = +formattedNumber.replace(/([MK])/, '');

	return relativeNumber * rate;
};
