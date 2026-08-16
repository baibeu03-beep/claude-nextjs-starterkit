# Next.js 스타터킷

Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui(Base UI) ·
lucide-react 기반의 모던 웹 스타터킷입니다.

앱 셸, 인증 화면, 데이터 테이블, 폼 검증, 환경변수 검증까지 **어떤 웹앱에도 필요한
공통 기반**이 갖춰져 있습니다.

## 시작하기

```bash
npm install
cp .env.example .env.local   # 필요한 값 채우기
npm run dev
```

http://localhost:3000 에서 확인합니다.

### 명령어

```bash
npm run dev        # 개발 서버 (Turbopack)
npm run build      # 프로덕션 빌드 — TypeScript 전체 검사 포함
npm run start      # 프로덕션 빌드 서빙
npm run lint       # eslint (Next 16에서 `next lint` 제거됨)
npm run lint:fix
npm run typecheck  # tsc --noEmit
```

> `npm run typecheck`는 `.next/types`에 생성되는 라우트 타입에 의존합니다.
> 새로 체크아웃한 상태라면 `npm run build`나 `npm run dev`를 먼저 한 번 실행하세요.

## 포함된 것

| 영역 | 내용 |
| --- | --- |
| 앱 셸 | 접이식 사이드바(쿠키로 상태 유지), 브레드크럼, ⌘K 커맨드 팔레트, 테마 토글 |
| 라우트 | 랜딩, 대시보드, 사용자 목록, 설정, 로그인/회원가입/비밀번호 재설정 |
| 데이터 | TanStack Table v9 데이터 테이블 — 정렬·검색·페이지네이션이 **URL에 동기화** |
| 폼 | react-hook-form + zod, 서버 액션에서 동일 스키마로 재검증 |
| 상태 | 다크 모드(next-themes), URL 쿼리 상태(nuqs) |
| 안전장치 | 환경변수 빌드타임 검증, `error.tsx`/`loading.tsx`/`not-found.tsx` |

## 디렉토리 구조

```
src/
├── app/                     라우트 (App Router)
│   ├── (app)/               앱 셸 — 사이드바 + 헤더
│   │   ├── dashboard/
│   │   ├── users/
│   │   └── settings/
│   ├── (auth)/              인증 셸 — 사이드바 없음, 중앙 정렬
│   │   ├── login/  signup/  forgot-password/
│   ├── api/health/          Route Handler 예시
│   ├── layout.tsx  page.tsx  error.tsx  not-found.tsx
├── components/
│   ├── ui/                  Tier 1 — shadcn CLI 관리 (직접 수정 금지)
│   ├── common/              Tier 2 — 도메인 무관 재사용 패턴
│   ├── layout/              Tier 3 — 앱 셸
│   └── providers/           전역 Provider 모음
├── features/                Tier 4 — 도메인별 (users, settings, auth, dashboard)
├── config/                  site.ts(메타), nav.ts(네비게이션 단일 소스)
├── hooks/                   use-mobile
└── lib/                     env, format, table, session, utils, mock-data
```

## 컴포넌트 계층 규칙

**위 계층은 아래 계층만 참조합니다.** 새 컴포넌트를 어디 둘지는 아래 기준으로 판단하세요.

```
Tier 0  디자인 토큰   src/app/globals.css      색·radius·폰트
   ↑
Tier 1  UI 프리미티브  src/components/ui/       CLI가 생성. 앱 지식 0
   ↑
Tier 2  공통 패턴     src/components/common/   다른 프로젝트에 복사해도 동작
   ↑
Tier 3  레이아웃      src/components/layout/   이 앱의 네비게이션/URL을 앎
   ↑
Tier 4  기능(도메인)   src/features/<domain>/   특정 도메인 타입에 의존
```

| 계층 | 예시 |
| --- | --- |
| Tier 1 | `Button`, `Input`, `Table`, `Sidebar` |
| Tier 2 | `PageHeader`, `DataTable`, `EmptyState`, `ConfirmDialog`, `StatCard` |
| Tier 3 | `AppSidebar`, `AppHeader`, `NavMain`, `Breadcrumbs`, `CommandMenu` |
| Tier 4 | `features/users/user-form.tsx`, `features/users/columns.tsx` |

`Tier 2`에 도메인 타입(`User` 등)이 등장하면 계층을 잘못 고른 것입니다.
`DataTable`이 제네릭이고 `columns.tsx`가 `features/`에 있는 이유가 이것입니다.

## 라이브러리 선택 근거

바퀴를 재발명하지 않습니다. 각 문제는 이미 검증된 표준 라이브러리에 위임했습니다.

| 문제 | 선택 | 직접 구현하지 않는 이유 |
| --- | --- | --- |
| 폼 상태·검증 | `react-hook-form` + `zod` + `@hookform/resolvers` | 비제어 리렌더 최적화, 에러 전파, 중첩 필드 |
| 스키마/타입 | `zod` | 폼·서버 액션·env를 하나의 스키마로 검증하고 `z.infer`로 타입 도출 |
| 환경변수 | `@t3-oss/env-nextjs` | 서버/클라이언트 분리와 빌드타임 실패를 이미 해결 |
| 데이터 테이블 | `@tanstack/react-table` v9 | 정렬·필터·페이지네이션 헤드리스 엔진 |
| URL 쿼리 상태 | `nuqs` | App Router에서 검색/필터/페이지를 URL과 동기화 |
| 날짜 | `date-fns` | 트리셰이킹되는 표준 |
| 차트 | `recharts` | shadcn `chart` 컴포넌트의 공식 의존성 |
| 서버 전용 보호 | `server-only` | 데이터 계층이 클라이언트 번들에 새는 것을 빌드에서 차단 |

**의도적으로 넣지 않은 것**: `@tanstack/react-query`(RSC + 서버 액션으로 충분),
`zustand`(공유할 전역 클라이언트 상태 없음), 인증 백엔드·DB·테스트 프레임워크
(프로젝트 차원의 별도 결정 사항).

## 레시피

### 새 라우트 추가

1. `src/app/(app)/<route>/page.tsx` 생성
2. `src/config/nav.ts`의 `navGroups`에 항목 추가
   → 사이드바·브레드크럼·⌘K 팔레트에 **동시에** 반영됩니다

### 새 폼 만들기

`base-nova` 레지스트리에는 shadcn의 `form` 컴포넌트가 **없습니다**(빈 스텁).
대신 `Field` 계열 + react-hook-form 조합이 이 프로젝트의 표준입니다.
`src/features/users/user-form.tsx`를 복사해 시작하세요.

```tsx
const form = useForm<Input>({ resolver: zodResolver(schema) });

<Field data-invalid={Boolean(errors.email) || undefined}>
  <FieldLabel htmlFor="email">이메일</FieldLabel>
  <Input id="email" aria-invalid={Boolean(errors.email)} {...form.register("email")} />
  <FieldError errors={[errors.email]} />
</Field>
```

`Select`·`Switch` 같은 제어 컴포넌트는 `register()`가 아니라 `<Controller>`로 감쌉니다.

### 새 데이터 테이블 만들기

1. `features/<domain>/columns.tsx`에 `AppColumnDef<T>[]` 정의
   (정렬 헤더는 `DataTableColumnHeader`, 열 토글 라벨은 `meta: { label }`)
2. 서버 컴포넌트에서 데이터를 읽어 `<DataTable columns={...} data={...} />`에 전달

테이블 기능(행 선택, 그룹핑 등)을 추가하려면 `src/lib/table.ts`의
`tableFeatureSet`에만 등록하면 타입이 전체로 전파됩니다.

### 실제 DB / 인증 연결

- 데이터: `src/features/users/data.ts`의 함수 본문만 교체 (시그니처 유지)
- 인증: `src/lib/session.ts`의 `getCurrentUser()` 교체

## 이 프리셋의 주의사항

Base UI 기반이라 학습 데이터의 Radix 전제 shadcn 지식이 맞지 않습니다.
자세한 내용은 [`CLAUDE.md`](./CLAUDE.md)를 참고하세요.

- 합성은 `asChild`가 아니라 **`render` prop**
- `src/components/ui/`는 `shadcn add`가 덮어씁니다 — 감싸서 커스터마이징하세요
- `tailwind.config.*`는 의도적으로 없습니다 — 모든 설정은 `globals.css`에
