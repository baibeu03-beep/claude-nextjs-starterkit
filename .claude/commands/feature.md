---
description: 새 도메인의 기능 슬라이스를 프로젝트 규약대로 스캐폴딩합니다
argument-hint: <도메인명>
allowed-tools:
  [
    'Read',
    'Write',
    'Edit',
    'Glob',
    'Grep',
    'Bash(npm run typecheck:*)',
    'Bash(npx shadcn:*)',
  ]
---

도메인: $ARGUMENTS

`src/features/users/`를 레퍼런스 슬라이스로 삼아 새 기능을 추가합니다.

## 먼저 읽기

추측하지 말고 아래 파일을 먼저 읽어 실제 패턴을 확인하세요.

- `src/features/users/{types,data,actions}.ts`, `columns.tsx`, `user-form.tsx`
- `src/app/(app)/users/page.tsx`
- `src/config/nav.ts`

## 생성 대상

1. `src/features/<도메인>/types.ts`
   도메인 타입과 zod 스키마(`<도메인>InputSchema`)를 함께 export합니다.

2. `src/features/<도메인>/data.ts`
   **첫 줄은 반드시 `import "server-only";`** 입니다. 인메모리 목 데이터와
   `list/create/delete` 함수를 둡니다. 실제 DB로 교체할 때 시그니처만 유지하면
   호출부를 고치지 않아도 되도록 작성하세요.

3. `src/features/<도메인>/actions.ts`
   `"use server"`로 시작. 클라이언트 검증을 신뢰하지 말고 **같은 zod 스키마로
   서버에서 재검증**한 뒤, 성공 시 `revalidatePath("/<도메인>")`을 호출합니다.
   반환 타입은 `users/actions.ts`의 `ActionResult` 형태를 따릅니다.

4. `src/app/(app)/<도메인>/page.tsx`
   서버 컴포넌트에서 `list*()`로 조회해 클라이언트 컴포넌트에 props로 내려보냅니다.
   `export const metadata`를 포함하고, `PageHeader` + `EmptyState`를 활용하세요.

5. `src/config/nav.ts`
   `navGroups`에 항목 추가. **이 파일이 사이드바·브레드크럼·⌘K 팔레트의 단일
   소스이므로, 빠뜨리면 기능은 동작하지만 어디서도 접근할 수 없습니다.**
   아이콘은 `lucide-react`에서 가져와 import 목록에도 추가하세요.

## 지켜야 할 것

- 테이블이 필요하면 `columns.tsx`는 `features/<도메인>/`에 둡니다. 제네릭
  `DataTable`은 `components/common/`에 그대로 두고 도메인 타입을 넣지 마세요.
- TanStack Table은 **v9**입니다. `useReactTable`이나 `getCoreRowModel()`이 아니라
  `useTable`과 `src/lib/table.ts`의 `tableFeatureSet`을 씁니다.
- 목록 검색·페이지·탭 상태는 `useState`가 아니라 `nuqs`의 `useQueryState`.
- 폼은 `Field` + react-hook-form + zod 조합입니다. `FormField`/`FormControl`은
  이 프리셋에 존재하지 않습니다. `Select`·`Switch`는 `<Controller>`로 감싸세요.
- UI 컴포넌트는 이 프리셋이 Radix가 아니라 **Base UI** 기반입니다. 합성은
  `asChild`가 아니라 `render` prop입니다. 쓰기 전에 `src/components/ui/`의 실제
  파일을 읽으세요. 없는 컴포넌트는 `npx shadcn@latest add <component>`로 추가합니다.
- `"use client"`는 상호작용이 필요한 말단 컴포넌트에만 붙입니다.

## 마무리

`npm run typecheck`를 실행하고, 실패하면 출력을 그대로 보고하세요.
마지막에 생성·수정한 파일 목록을 정리해 보여주세요.
