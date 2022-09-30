export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_DEV = NODE_ENV !== 'production';
export const PORT = +(process.env.PORT || 4000);
