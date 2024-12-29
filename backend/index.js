const express = require('express');
const cors = require('cors');
const { connect } = require('./fabric/connect');

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// API 엔드포인트
app.post('/api/assets', async (req, res) => {
    try {
        console.log('=== Start Create Asset ===');
        console.log('Request body:', req.body);
        
        const gateway = await connect();
        console.log('Gateway connected');
        
        const network = await gateway.getNetwork('mychannel');
        console.log('Network accessed');
        
        const contract = network.getContract('basic');
        console.log('Contract accessed');

        // 체인코드 호출
        console.log('Submitting transaction...');
        const result = await contract.submitTransaction(
            'CreateAsset',
            req.body.id,
            req.body.color,
            req.body.size,
            req.body.owner,
            req.body.value
        );
        console.log('Transaction submitted successfully');
        console.log('Transaction result:', result.toString());

        // 게이트웨이 연결 해제
        gateway.disconnect();
        console.log('Gateway disconnected');

        console.log('=== End Create Asset ===');

        res.json({ 
            success: true, 
            message: 'Asset created successfully',
            result: result.toString()
        });
    } catch (error) {
        console.error('=== Error in Create Asset ===');
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            error: error.message,
            details: error.stack
        });
    }
});

// GetAllAssets API 엔드포인트
app.get('/api/assets', async (req, res) => {
    try {
        console.log('=== Start Get All Assets ===');
        
        const gateway = await connect();
        console.log('Gateway connected');
        
        const network = await gateway.getNetwork('mychannel');
        console.log('Network accessed');
        
        const contract = network.getContract('basic');
        console.log('Contract accessed');

        // 체인코드 쿼리
        console.log('Evaluating transaction...');
        const result = await contract.evaluateTransaction('GetAllAssets');
        console.log('Raw result:', result.toString());
        
        // 게이트웨이 연결 해제
        gateway.disconnect();
        console.log('Gateway disconnected');

        const assets = JSON.parse(result.toString());
        console.log('Parsed assets:', assets);

        console.log('=== End Get All Assets ===');

        res.json({
            success: true,
            assets: assets
        });
    } catch (error) {
        console.error('=== Error in Get All Assets ===');
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            error: error.message,
            details: error.stack
        });
    }
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
