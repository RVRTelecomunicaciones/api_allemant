/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import { argv } from 'yargs';
const ROOT_PATH = path.join(__dirname, '..');
const packageJSON = require(path.resolve(ROOT_PATH, 'package.json'));
export const APP = {
  PORT: 8000,
  MASTER: 'Allemant',
  NAME: 'Allemantperitos.com',
  CLIENT_URL: 'http://localhost:3000',
  URL_API: '"http://localhost:5000"',
  ROOT_PATH,
  DEFAULT_CACHE_TTL: 60 * 60 * 24,
};

export const PROJECT = {
  name: packageJSON.name,
  version: packageJSON.version,
  author: packageJSON.author,
  site: APP.CLIENT_URL,
  homepage: packageJSON.homepage,
};
export const AUTH = {
  expiresIn: argv.auth_expires_in || 900,
  data: argv.auth_data || { user: 'root' },
  jwtTokenSecret: argv.auth_key || 'nodepress',
  jwtRefreshTokenSecret: argv.auth_key || 'nodepressRefresh',
  defaultPassword: argv.auth_default_password || 'root',
};

export const EMAIL = {
  account: argv.email_account || 'sisalm0202@gmail.com',
  from: '"Allemant Peritos Valuadores" <info@allemantperitos.com>',
  admin: 'info@allemantperitos.com',
  EMAIL_CLIENT_ID:
    '815510269818-tif38pbakn9im469mouvo5av705e2eb0.apps.googleusercontent.com',
  EMAIL_CLIENT_SECRET: 'RWCXCF5w34xmxCrfqycDIonR',
  EMAIL_REFRESH_TOKEN:
    '1//04kwoxk5hYry9CgYIARAAGAQSNwF-L9IrbADjTnIFCrgLrWu6KNJg6uqovKdj-fC9fvsL1f6EotRAdppB2EQPyND2-nG3lKsFZYc',
  EMAIL_ACCESS_TOKEN:
    'ya29.a0ARrdaM8wfyZbYNBJquQOscsxFvhpSelKVgnVPntVVs2KhXK-3UTWB5xXlEqqKpiBYXRSQJ03tttvXMNjMi-o9qa4UWCPoJG5rPgT4GrkO1uiyTRAcdXJIwGu5gZuMv38V9Yf7pUsxijhRAHqjXhGfDAvVJrM',
  EMAIL_TOKEN_EXPIRES: 1484314697598,
};

export const MAIL_SENDGRID = {
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  user: 'apikey',
  pass: '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',
  name: 'Allemant Peritos Valuadores',
  email: 'info@rvrtelecomunicaciones.com',
};

export const PROJECT_EMAIL = {
  name: 'Allemant Peritos Valuadores',
  address: 'Av. Manuel Olguin N° 373, Oficina N° 604, Santiago de Surco, Lima',
  logoUrl:
    'https://res.cloudinary.com/dplnkkbtz/image/upload/v1640819653/AllemantPeritos/logo_2021_c5naxm.png',
  slogan: 'Made in Perú',
  color: '#064273',
  socials: [
    ['GitHub', '__Project_GitHub_URL__'],
    ['__Social_Media_1__', '__Social_Media_1_URL__'],
    ['__Social_Media_2__', '__Social_Media_2_URL__'],
  ],
  url: 'http://localhost:4200',
  mailVerificationUrl: 'http://localhost:8080/auth/activation/',
  mailChangeUrl: 'http://localhost:8080/auth/change-email',
  resetPasswordUrl: 'http://localhost:4200/reset-password',
  termsOfServiceUrl: 'http://localhost:4200/legal/terms',
};
