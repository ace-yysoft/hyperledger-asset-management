const fs = require('fs');
const path = require('path');
const { Gateway, Wallets } = require('fabric-network');

async function connect() {
    try {
        console.log('Starting connection process...');
        
        // 연결 프로파일 경로
        const ccpPath = path.resolve(__dirname, '..', '..', '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        console.log('Connection profile path:', ccpPath);
        
        if (!fs.existsSync(ccpPath)) {
            throw new Error(`Connection profile not found at ${ccpPath}`);
        }

        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        console.log('Connection profile loaded');

        // 지갑 생성
        const walletPath = path.join(process.cwd(), 'wallet');
        console.log('Wallet path:', walletPath);
        
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log('Wallet created');

        // admin 사용자 확인
        const identity = await wallet.get('admin');
        if (!identity) {
            throw new Error('Admin identity not found in wallet');
        }
        console.log('Admin identity found in wallet');

        // 게이트웨이 연결
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: 'admin',
            discovery: { enabled: true, asLocalhost: true }
        });
        console.log('Gateway connected successfully');

        return gateway;
    } catch (error) {
        console.error('Connection error details:', {
            message: error.message,
            stack: error.stack
        });
        throw error;
    }
}

module.exports = { connect };