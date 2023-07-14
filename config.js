import { config as Config } from "dotenv";

Config({path: '.env.development'})



const config = {};

config.app = {
    name: process.env.NAME,
   port: parseInt(process.env.PORT) || 5000 ,
};

config.db = {
  url: process.env.DB_URL || "",
};

config.jwt = {
  key: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRESIN || '2h'
}

config.cookie = {
  key: process.env.COOKIE_SECRET,
  name: process.env.COOKIE_NAME,
  expiresIn: parseInt(process.env.COOKIE_EXPIRESIN) || 120000
}


config.global = {
  SaltRounds: process.env.SaltRounds|| 10,
  secretKey: process.env.SECRET_KEY || '',
  baseURL: process.env.BASE_URL && process.env.PORT ? `${process.env.BASE_URL}:${process.env.PORT}` : 'https://localhost:5000',
//   email: process.env.EMAIL || null,
//   pass: process.env.EMAIL_PASS || null
}

export default config;