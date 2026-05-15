# Bzznbyd Weather Assignment

버즈앤비 FE 개발자 구현과제 제출용 repository입니다.

## Stack

- Next.js 12
- React 18
- CSS Module
- GraphQL, Apollo, OpenWeather API는 이후 커밋에서 연결 예정

## Getting Started

권장 Node.js 버전은 18 이상 20 이하입니다. Next.js 12는 최신 Node.js 26 환경에서 production build가 실패할 수 있어 `.nvmrc`를 함께 제공합니다.

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

## Current Progress

현재 커밋은 프로젝트 부트스트랩 단계입니다.

- Create Next App으로 기본 골격 생성
- Next.js 12 버전 고정
- 도시 선택 메인 페이지 생성
- 도시별 동적 라우팅 생성
- `.env.example` 추가
- 리서치 로그 초안 작성

GraphQL endpoint, Apollo Client, OpenWeather 연동, 5일 예보 가공, 테스트는 다음 커밋에서 단계적으로 구현합니다.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

현재 로컬 검증은 Node.js 20.20.2 기준으로 진행했습니다.
