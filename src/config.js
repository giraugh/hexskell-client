import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

export const BACK_END_ADDRESS = process.env.BACK_END_ADDRESS || 'http://localhost:8090'
export const BACK_END_AUTH_ADDRESS = process.env.BACK_END_AUTH_ADDRESS || BACK_END_ADDRESS + '/auth'
export const BACK_END_GQL_ADDRESS = process.env.BACK_END_GQL_ADDRESS || BACK_END_ADDRESS + '/graphql'
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
