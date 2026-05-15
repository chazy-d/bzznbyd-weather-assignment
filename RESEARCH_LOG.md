# Research Log

이 문서는 구현과제 요구사항 중 처음 적용하거나 추가 확인이 필요했던 기술을 정리한 자료입니다.

제출용 README에는 실행 방법과 사용법을 중심으로 적고, 이 문서에는 기술 조사와 설계 판단을 남깁니다.

## 학습 및 확인 대상

| 기술 | 확인한 내용 | 구현에서 적용할 기준 |
| --- | --- | --- |
| Next.js 12 Pages Router | `pages` 기반 라우팅, 동적 라우팅, API Routes | `/`, `/[city]`, `/api/graphql` 역할을 분리 |
| GraphQL | `typeDefs`, `resolvers`, Query root | OpenWeather raw response를 UI에 직접 노출하지 않고 schema로 정규화 |
| Apollo Server on Next.js | Next.js API Route에 Apollo Server handler 연결 | `/api/graphql` 단일 backend endpoint 구성 |
| Apollo Client | `ApolloProvider`, `useQuery`, loading/error/data 상태 | 페이지는 OpenWeather를 직접 호출하지 않고 GraphQL endpoint만 호출 |
| OpenWeather API | Current Weather, 5 day / 3 hour Forecast | current + forecast를 서버에서 호출하고 5일 예보 카드로 가공 |
| CSS Module | component 단위 style scope | 과제 반응형 조건을 CSS Module로 구현 |
| Code Splitting | Next.js route-based splitting, `next/dynamic` | forecast 영역을 동적 import 후보로 분리 |
| Jest | 순수 함수 단위 테스트 | forecast grouping/representative condition 로직 검증 |

## 설계 판단

### 1. Next.js 12와 Node.js 20

과제 요구사항은 Next.js 12 사용입니다. 현재 로컬 기본 Node.js v26에서는 Next.js 12 production build가 실패하는 것을 확인했습니다. Node.js 18/20에서는 build가 통과했고, Apollo Server 5는 Node.js 20 이상을 요구하므로 실행 기준을 Node.js 20으로 정했습니다.

반영 사항:

- `.nvmrc`에 `20` 명시
- `package.json`의 `engines.node`를 `>=20 <21`로 설정

### 2. Apollo Server 5 선택

Next.js 12와 함께 사용할 수 있는 Apollo Server 통합 방식을 확인했습니다. Apollo Server 4 조합도 가능하지만 2026년 기준 EOL 경고가 발생하므로, Next.js 12를 지원하는 `@as-integrations/next@4.1.0`과 `@apollo/server@5.5.1` 조합을 선택했습니다.

반영 사항:

- `pages/api/graphql.js`를 GraphQL endpoint로 사용
- `typeDefs`와 `resolvers`를 `src/server/graphql` 아래로 분리
- 현재는 endpoint 동작 확인을 위한 `health`, `version` query만 제공

### 3. API key 관리

OpenWeather API key는 브라우저 번들에 노출되면 안 됩니다. 따라서 클라이언트가 OpenWeather를 직접 호출하지 않고, Next.js API Route의 GraphQL resolver를 통해 서버에서 호출하는 구조로 설계합니다.

반영 사항:

- 실제 key는 `.env.local`에 저장
- repository에는 `.env.example`만 포함
- OpenWeather 연동은 server layer에서 처리 예정

### 4. OpenWeather response 정규화

OpenWeather 응답 필드는 외부 API 구조에 종속되어 있습니다. UI 컴포넌트가 `main.temp`, `weather[0].description`, `list[].dt_txt` 같은 raw field를 직접 알게 되면 변경 영향 범위가 커집니다.

반영 예정:

- `weatherMapper`에서 raw response를 내부 `WeatherReport` 모델로 변환
- 3시간 단위 forecast list를 5일 예보 카드로 그룹핑
- mapper 로직은 Jest 단위 테스트로 검증

### 5. npm audit 경고

`next@12.3.7` 사용으로 인해 `npm audit`에서 Next.js 및 transitive dependency 관련 경고가 발생합니다. `npm audit fix --force`를 실행하면 Next.js가 최신 major version으로 올라가 과제의 Next.js 12 요구사항을 위반하므로 적용하지 않았습니다.

실제 운영 서비스라면 프레임워크 업그레이드 또는 보안 패치 버전을 검토해야 합니다.
