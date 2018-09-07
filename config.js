const env = process.env;

export const nodeEnv = env.NODE_ENV || 'developement';

export const port = env.PORT || 3000;

export const host = env.HOST || '0.0.0.0';
