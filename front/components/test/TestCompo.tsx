'use client';

export default function TestPage() {
    const handleSave = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test-save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: 145830,
                    category: '공과금',
                    description: '이사 전 가스비 정산 테스트'
                }),
            });

            const result = await response.json();
            if (result.success) alert('슈파베이스 저장 성공!');
            else alert('저장 실패: ' + result.error);
        } catch (err) {
            console.error(err);
            alert('서버 연결 에러!');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>가계부 테스트</h1>
            <button onClick={handleSave} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                가스비(145,830원) 저장하기
            </button>
        </div>
    );
}