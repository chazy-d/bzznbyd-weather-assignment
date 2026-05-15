# Research Log

이 문서는 과제 요구사항 중 익숙하지 않거나 추가 학습이 필요한 기술을 명시하고, 구현 과정에서 어떤 기준으로 학습/적용했는지 기록하기 위한 자료입니다.

## 학습 필요 기술과 포인트

| 기술 | 현재 기준 | 공부해야 할 부분 | 구현에서 확인할 포인트 |
| --- | --- | --- | --- |
| Next.js 12 Pages Router | 기본 라우팅은 가능하지만 과제는 v12 고정이 필요함 | `pages` 기반 라우팅, 동적 라우팅, API Routes, build/lint 흐름 | `/`, `/[city]`, `/api/graphql` 경계를 명확히 분리 |
| GraphQL | REST와 달리 schema/query 중심 흐름을 더 확인해야 함 | typeDefs, resolver, Query root, error extensions | OpenWeather raw response를 그대로 노출하지 않고 `WeatherReport`로 정규화 |
| Apollo Client | React query 호출 방식과 cache policy를 확인해야 함 | `ApolloProvider`, `useQuery`, loading/error/data 상태 | 페이지는 `/api/graphql`만 호출하고 OpenWeather를 직접 호출하지 않음 |
| Apollo Server on Next.js | Next API Route에 GraphQL server를 붙이는 방식 확인 필요 | Next.js 12 API Route와 Apollo Server handler 연결 | `/api/graphql` 단일 backend endpoint 구성 |
| OpenWeather API | Current/Forecast 응답 필드와 제한 정책 확인 필요 | Current Weather, 5 day / 3 hour Forecast, `units`, `lang`, API key | current + forecast 병렬 호출, 3시간 데이터를 5일 카드로 변환 |
| CSS Module | 기본 사용은 가능하지만 과제 반응형 조건이 명확함 | module scope, breakpoint, horizontal scroll 처리 | 1280px 이상 중앙 정렬, 800~1279px width 100%, 800px 미만 고정 폭 |
| Code Splitting | Next.js route splitting 외 명시 포인트 확인 필요 | route-based splitting, `next/dynamic` | forecast 영역을 동적 import 후보로 분리 |
| Jest | 선택 구현이지만 핵심 mapper 테스트에 유용함 | pure function test, fixture 기반 테스트 | forecast grouping/representative condition 로직 검증 |

## Commit 1. Project Bootstrap

### 확인한 내용

- `create-next-app@12.3.7`로 프로젝트 골격을 생성했다.
- 생성 직후 최신 Next 의존성이 들어가는 것을 확인했고, 과제 요구사항에 맞춰 `next@12.3.7`로 명시 고정했다.
- 기본 라우팅은 Next.js Pages Router를 사용한다.
- OpenWeather API key는 `.env.local`에 두고, repository에는 `.env.example`만 포함한다.
- 현재 시스템 Node.js v26에서는 Next.js 12 production build가 실패했다.
- Node.js 18.20.8과 20.20.2에서는 production build가 통과했다.
- 따라서 `.nvmrc`와 `engines.node`로 Node.js 18 이상 20 이하를 명시했다.

### 검증 중 발견한 호환성 이슈

```text
현상: Node.js v26에서 next build 실행 시 next/dist/compiled/jsonwebtoken 내부 오류 발생
판단: Next.js 12와 최신 Node.js 런타임의 호환성 문제
대응: 과제 실행 기준 Node.js를 18~20으로 고정하고 README에 명시
```

### npm audit 결과

```text
현상: next@12.3.7과 transitive dependency인 postcss에서 audit warning 발생
판단: npm audit fix --force를 실행하면 next@16으로 올라가 과제의 Next.js 12 요구사항을 위반함
대응: 과제에서는 Next.js 12를 유지하고, 실제 운영 서비스라면 프레임워크 업그레이드 또는 보안 패치 버전 검토가 필요하다고 기록
```

### 이번 커밋에서 의도적으로 하지 않은 것

- GraphQL endpoint 구현
- Apollo Client 연결
- OpenWeather 실제 호출
- 5일 예보 데이터 가공
- Jest 테스트

위 항목들은 이후 커밋에서 별도 검증 단위로 구현한다.
