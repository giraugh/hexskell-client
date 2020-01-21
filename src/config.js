import dotenv from 'dotenv'
dotenv.config()

export const BACK_END_AUTH_ADDRESS = process.env.BACK_END_AUTH_ADDRESS || 'http://localhost:8090/auth'
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID