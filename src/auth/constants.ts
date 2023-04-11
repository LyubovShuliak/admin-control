import 'dotenv/config';

export const jwtConstants = {
  secret: process.env.JWTKEY,
};

export const SALT = 20;
