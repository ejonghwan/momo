import dotenv from 'dotenv';
import path from 'path';

// NODE_ENV 값에 따라 파일 경로 설정 (기본값은 development)
const envMode = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${envMode}`) });

export const config = {
    port: process.env.PORT || 4009,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};