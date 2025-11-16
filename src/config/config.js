import dotenv from 'dotenv'

dotenv.config()

const {
    SUPABASE_URL,
    SUPABASE_API_KEY,
    DATABASE,
    SERVER_PORT,
    SERVER_HOST
} = process.env


export const config = {
    SUPABASE_URL,
    SUPABASE_API_KEY,
    DATABASE,
    SERVER_PORT,
    SERVER_HOST
}