"use client";

import { useShow } from "@refinedev/core";

import { ShowView } from "@/components/refine-ui/views/show-view";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AdminsShow() {
  const { result: record, query } = useShow({});

  const { isLoading } = query;

  return (
    <ShowView>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{record?.email || record?.id}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-4">
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Email</h4>
              <p className="text-sm text-muted-foreground">{record?.email ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Password</h4>
              <p className="text-sm text-muted-foreground">{record?.password ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Role</h4>
              <p className="text-sm text-muted-foreground">{record?.role ?? '-'}</p>
            </div>

          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
}
