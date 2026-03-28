import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4009;

// 1. 보안 헤더 설정
app.use(helmet());

// 2. CORS 설정 (프론트엔드 주소만 허용)
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// 테스트용 라우트
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running!' });
});

app.listen(PORT, () => {
    console.log(`🚀 서버가 포트 ${PORT}에서 작동 중입니다!`);
});