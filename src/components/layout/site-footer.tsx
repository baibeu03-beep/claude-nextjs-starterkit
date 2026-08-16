import { siteConfig } from "@/config/site";

/** 공개(랜딩) 페이지용 푸터. */
export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>Next.js 16 · Tailwind CSS v4 · shadcn/ui</p>
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.links.shadcn}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-foreground"
          >
            shadcn/ui
          </a>
          <a
            href={siteConfig.links.baseUi}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-foreground"
          >
            Base UI
          </a>
        </div>
      </div>
    </footer>
  );
}
