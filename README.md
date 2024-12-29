# Fabric UI Project

## 프로젝트 개요
하이퍼레저 패브릭을 활용한 자산 관리 시스템

## 기술 스택
- Frontend: Vue.js 3
- Backend: Node.js, Express
- Blockchain: Hyperledger Fabric 2.5.10

## 개발자
- Email: ace@yysoft.kr

## 설치 및 실행 방법

### 사전 요구사항
- Node.js
- Docker
- Hyperledger Fabric 2.5.10

### 설치 단계

1. 하이퍼레저 패브릭 네트워크 실행
```bash
cd fabric-samples/test-network
./network.sh up -ca
./network.sh createChannel
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-go -ccl go
```

2. 백엔드 설정
```bash
cd backend
npm install
node enrollAdmin.js
node index.js
```

3. 프론트엔드 설정
```bash
cd frontend
npm install
npm run serve
```
