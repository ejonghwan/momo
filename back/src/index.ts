import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// 환경 변수 로드
const envMode = process.env.NODE_ENV || 'local';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${envMode}`) });

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL })); // 3009 포트 허용
app.use(express.json());

// 슈파베이스 관리자 클라이언트
const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 테스트용 POST 라우트
app.post('/api/test-save', async (req, res) => {
    const { amount, category, description } = req.body;

    const { data, error } = await supabase
        .from('transactions') // 슈파베이스에 이 이름으로 테이블이 있어야 합니다!
        .insert([{ amount, category, description }])
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true, data });
});

const PORT = process.env.PORT || 4009;
app.listen(PORT, () => console.log(`🚀 백엔드 서버가 ${PORT}에서 작동 중!`));