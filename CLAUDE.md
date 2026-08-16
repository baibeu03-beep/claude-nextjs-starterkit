# CLAUDE.md

이 파일은 이 저장소에서 작업하는 Claude Code(claude.ai/code)에게 제공되는 지침입니다.

@AGENTS.md

## 명령어

```bash
npm run dev        # 개발 서버 (Turbopack)
npm run build      # 프로덕션 빌드 — TypeScript 전체 검사도 함께 수행
npm run start      # 프로덕션 빌드 서빙
npm run lint       # eslint (Next 16에서 `next lint`가 제거되어 eslint를 직접 호출)
npm run lint:fix
npm run typecheck  # tsc --noEmit
```

테스트 프레임워크는 설정되어 있지 않으며, 실행할 테스트도 없습니다. 테스트 도입은
프로젝트 차원의 결정 사항이지 기본값으로 가정할 일이 아닙니다.

`npm run typecheck`는 `.next/types`와 `.next/dev/types`에 생성되는 라우트 타입에
의존합니다(`tsconfig.json`의 `include` 참고). 새로 체크아웃한 상태라면 먼저
`npm run build` 또는 `npm run dev`를 한 번 실행해야 하며, 그렇지 않으면
`LayoutProps` 같은 전역 타입이 해석되지 않습니다.

UI 컴포넌트는 직접 작성하지 말고 CLI로 추가하세요:

```bash
npx shadcn@latest add <component>
```

## 아키텍처

Next.js 16 App Router, React 19, Tailwind CSS v4, shadcn/ui — 각각 공식 가이드
그대로 설치되어 있습니다. 소스는 `src/` 아래에 있으며 `@/*`로 별칭 처리됩니다.

### 이 프리셋은 Radix가 아니라 Base UI를 사용합니다

`components.json`이 스타일을 `base-nova`로 고정하므로 `src/components/ui/*`는
`@base-ui/react/*`에서 import합니다. 학습 데이터에 있는 shadcn/ui 지식은 대부분
Radix를 전제하므로 여기서는 맞지 않습니다:

- 합성은 `asChild`가 아니라 **`render` prop**입니다:
  `<DialogTrigger render={<Button variant="outline">열기</Button>} />`
- `Button`을 앵커로 렌더링하려면 `render={<a href="..." />}`와 함께
  `nativeButton={false}`를 전달하세요.
- 위치 관련 props(`align`, `side`, `sideOffset`, `alignOffset`)는 content
  컴포넌트에 전달합니다. 내부적으로 Portal → Positioner → Popup 순서로 감쌉니다.

컴포넌트 API를 쓰기 전에 `src/components/ui/`의 실제 파일을 먼저 읽으세요.

### 스타일링: Tailwind 설정 파일 없음

Tailwind v4는 CSS-first 방식입니다. `tailwind.config.*`는 의도적으로 존재하지
않으며, 같은 이유로 `components.json`의 `tailwind.config`도 `""`입니다. 모든
설정은 `src/app/globals.css`에 있습니다:

- `@import "tailwindcss"` → `tw-animate-css` → `shadcn/tailwind.css`
  (이 import 때문에 `shadcn`은 CLI일 뿐 아니라 런타임 의존성이기도 합니다)
- `@theme inline { ... }`이 CSS 변수를 Tailwind 토큰으로 매핑
- `:root` / `.dark`가 oklch 색상값을 보유 — 테마 변경은 여기서
- `@layer base`가 `border-border`, `bg-background`, `font-sans`를 적용

`postcss.config.mjs`에는 `@tailwindcss/postcss`만 등록되어 있습니다.

### 폰트 토큰 연결 구조

폰트는 두 단계를 거치며, 어느 한쪽이라도 어긋나면 서체가 조용히 사라집니다:

`layout.tsx`의 `Geist({ variable: "--font-geist-sans" })`
→ `globals.css`의 `@theme inline { --font-sans: var(--font-geist-sans) }`
→ `@layer base { html { @apply font-sans } }`

`@theme inline`에서 변수를 자기 자신으로 정의하면
(`--font-sans: var(--font-sans)`) 오류 없이 값이 사라지므로 절대 피하세요.

### 다크 모드 계약

`next-themes`의 `attribute="class"`는 `globals.css`의
`@custom-variant dark (&:is(.dark *))`와 짝을 이룹니다. 양쪽이 항상 일치해야
합니다. 테마 클래스가 클라이언트에서 적용되므로 `<html>`에는
`suppressHydrationWarning`이 필요합니다.

Provider는 `src/components/providers/index.tsx`에 모여 있고 중첩 순서는
`ThemeProvider` → `NuqsAdapter` → `TooltipProvider` → children입니다.
`<Toaster />`는 `layout.tsx`에서 `<Providers>`의 형제로 렌더링됩니다.
`NuqsAdapter`를 빼면 `useQueryState`를 쓰는 모든 컴포넌트가 런타임에 죽습니다.

### 컴포넌트 계층

위 계층은 아래 계층만 참조합니다. 새 컴포넌트는 아래 기준으로 배치하세요.

| 위치 | 계층 | 기준 |
| --- | --- | --- |
| `src/components/ui/` | Tier 1 | shadcn CLI가 생성. 앱 지식 0 |
| `src/components/common/` | Tier 2 | 다른 프로젝트에 복사해도 그대로 동작 |
| `src/components/layout/` | Tier 3 | 이 앱의 네비게이션/URL을 앎 |
| `src/features/<domain>/` | Tier 4 | 특정 도메인 타입에 의존 |

`common/`에 `User` 같은 도메인 타입이 등장하면 계층을 잘못 고른 것입니다.
`DataTable`이 제네릭이고 `columns.tsx`가 `features/users/`에 있는 이유입니다.

네비게이션은 `src/config/nav.ts`가 **단일 소스**입니다. 사이드바(`nav-main.tsx`),
브레드크럼(`breadcrumbs.tsx`), ⌘K 팔레트(`command-menu.tsx`)가 모두 이 배열을
읽으므로 라우트를 추가할 때 이 파일만 고치면 세 곳에 동시에 반영됩니다.

### 폼: `form` 컴포넌트는 존재하지 않습니다

`base-nova` 레지스트리의 `form`은 **파일이 0개인 빈 스텁**입니다. Radix 시절의
`Form`/`FormField`/`FormItem`/`FormControl` 조합은 여기서 쓸 수 없습니다.

표준 패턴은 `field` + react-hook-form + zod입니다:

```tsx
<Field data-invalid={Boolean(errors.email) || undefined}>
  <FieldLabel htmlFor="email">이메일</FieldLabel>
  <Input id="email" aria-invalid={Boolean(errors.email)} {...form.register("email")} />
  <FieldError errors={[errors.email]} />   {/* errors는 배열 */}
</Field>
```

`Select`·`Switch` 등 네이티브가 아닌 제어 컴포넌트는 `register()`로 연결되지
않습니다. `<Controller>`로 감싸세요 — `watch()`는 메모이제이션이 불가능해
`react-hooks/incompatible-library` 린트 경고가 납니다.
서버 액션은 클라이언트 검증을 신뢰하지 않고 **같은 zod 스키마로 재검증**합니다.

### 데이터 테이블: TanStack Table v9

v9는 v8과 API가 다릅니다. 학습 데이터의 v8 예제는 대부분 맞지 않습니다.

- `useReactTable` → **`useTable(options, selector)`**
- `getCoreRowModel()` 등의 옵션은 사라졌고 기능이 **옵트인**입니다.
  `src/lib/table.ts`의 `tableFeatureSet`에 등록된 것만 동작합니다.
- 제네릭에 features가 추가됩니다: `ColumnDef<TFeatures, TData, TValue>`
- `TData`에는 반드시 `extends RowData` 제약이 필요합니다(없으면 타입 에러)
- `table.getState()` → `table.state`, `table.firstPage()`/`lastPage()` 사용 가능

### Turbopack 루트

`next.config.ts`가 `turbopack.root`를 이 디렉토리로 고정합니다. 상위 디렉토리에
다른 `package.json`이나 lockfile이 있으면 Turbopack이 홈 디렉토리를 프로젝트
루트로 잘못 추론합니다. 제거하지 마세요.

## 규칙

- `src/components/ui/`의 파일은 CLI가 관리하며 `shadcn add`가 덮어쓸 수 있습니다.
  직접 수정하지 말고 새 컴포넌트로 감싸서 커스터마이징하세요.
- 라우트 핸들러, 레이아웃, 페이지는 기본이 Server Component입니다. `"use client"`는
  상호작용이 필요한 말단 컴포넌트에만 사용하세요(`nav-main.tsx`,
  `theme-toggle.tsx` 참고).
- 레이아웃/페이지의 prop 타입은 직접 작성한 `{ children: React.ReactNode }`가
  아니라 Next가 생성한 전역 타입(`LayoutProps<"/">`)을 사용합니다. 라우트 그룹
  레이아웃(`(app)`, `(auth)`)도 그룹명이 URL에 없으므로 `LayoutProps<"/">`입니다.
- 데이터 접근 모듈(`features/*/data.ts`, `lib/session.ts`)은 `import "server-only"`로
  시작합니다. 클라이언트에서 import하면 빌드가 실패해야 정상입니다.
- 환경변수는 `process.env`가 아니라 `@/lib/env`의 `env` 객체로 읽습니다.
- `src/hooks/use-mobile.ts`는 CLI 원본을 `useSyncExternalStore`로 고쳐 둔
  상태입니다(원본은 `react-hooks/set-state-in-effect` 린트 에러). `shadcn add
  sidebar`를 다시 실행하면 되돌아가므로 그때 다시 고쳐야 합니다.
- `AGENTS.md`의 `nextjs-agent-rules` 블록은 `next dev`가 다시 씁니다. 지우려
  하지 말고 작업 내용과 함께 커밋하세요.
