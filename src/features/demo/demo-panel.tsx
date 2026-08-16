"use client";

import * as React from "react";
import { toast } from "sonner";
import { SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DemoPanel() {
  const [name, setName] = React.useState("");

  return (
    <Tabs defaultValue="form" className="w-full">
      <TabsList>
        <TabsTrigger value="form">Form</TabsTrigger>
        <TabsTrigger value="overlay">Overlay</TabsTrigger>
        <TabsTrigger value="loading">Loading</TabsTrigger>
      </TabsList>

      <TabsContent value="form" className="pt-4">
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            toast.success(`반갑습니다, ${name || "익명"}님!`);
          }}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              placeholder="홍길동"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button type="submit">
              <SparklesIcon />
              토스트 띄우기
            </Button>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button type="button" variant="ghost">
                    Tooltip
                  </Button>
                }
              />
              <TooltipContent>Base UI 기반 툴팁입니다</TooltipContent>
            </Tooltip>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="overlay" className="pt-4">
        <Dialog>
          <DialogTrigger render={<Button variant="outline">다이얼로그 열기</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>동작 확인</DialogTitle>
              <DialogDescription>
                포털 · 포커스 트랩 · 애니메이션이 정상 동작하면 설치가 완료된
                것입니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="ghost">닫기</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TabsContent>

      <TabsContent value="loading" className="pt-4">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Separator />
          <Skeleton className="h-20 w-full" />
        </div>
      </TabsContent>
    </Tabs>
  );
}
