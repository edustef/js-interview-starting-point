if (!process.env.API_TOKEN) {
		throw new Error('API_TOKEN is not defined in environment variables');
	}

export const apiToken = process.env.API_TOKEN;