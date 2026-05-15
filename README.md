# Bzznbyd Weather Assignment

버즈앤비 FE 개발자 구현과제 제출용 repository입니다.

Next.js 12 환경에서 도시별 날씨 정보를 조회하는 페이지를 구현합니다.

## Tech Stack

- Next.js 12
- React 18
- GraphQL API Route
- Apollo Server
- CSS Module
- OpenWeather API

## Requirements

- `localhost:3000` 접속 시 메인 페이지 표시
- `/Seoul`, `/Tokyo`, `/Paris`, `/London` 상세 페이지 제공
- Next.js로 frontend와 backend 구현
- Backend는 GraphQL 사용
- CSS Module 사용
- 반응형 레이아웃 구현
- OpenWeather API key는 서버 환경 변수로 관리

## Getting Started

권장 Node.js 버전은 20입니다.

```bash
nvm use
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

`.env.local`에 실제 OpenWeather API key를 설정합니다.

```bash
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

`.env.local`은 Git에 포함하지 않습니다.

## Routes

- `/`
- `/Seoul`
- `/Tokyo`
- `/Paris`
- `/London`

## GraphQL Endpoint

GraphQL endpoint는 아래 경로에서 제공합니다.

```text
POST /api/graphql
```

현재 endpoint 상태 확인용 query:

```bash
curl -X POST http://localhost:3000/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ health { ok service version } version }"}'
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Notes

- Next.js 12와 Apollo Server 5의 호환성을 고려해 Node.js 20 기준으로 검증했습니다.
- 구현 과정에서 확인한 기술 조사와 설계 판단은 [RESEARCH_LOG.md](./RESEARCH_LOG.md)에 정리합니다.
