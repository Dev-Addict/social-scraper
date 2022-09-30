import express from 'express';
import {PORT} from './env';

const app = express();

app.listen(PORT, () => {
	console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
