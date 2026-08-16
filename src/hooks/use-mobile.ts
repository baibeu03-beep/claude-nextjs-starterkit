import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * 뷰포트가 모바일 폭인지 여부.
 *
 * shadcn CLI가 생성한 원본은 `useEffect` 안에서 `setState`를 호출해
 * `react-hooks/set-state-in-effect` 린트 에러가 납니다. matchMedia는 외부
 * 스토어이므로 `useSyncExternalStore`가 정석입니다 — 캐스케이딩 렌더가 없고
 * 서버 스냅샷(`false`)이 분리되어 하이드레이션도 안전합니다.
 *
 * 주의: `shadcn add sidebar`를 다시 실행하면 이 파일이 원본으로 덮어써집니다.
 */
export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
