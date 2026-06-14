"use client";

import { useShow } from "@refinedev/core";

import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function UploadsShow() {
  const { result: record, query } = useShow({ resource: "uploads" });

  const { isLoading } = query;

  return (
    <ShowView>
      <ShowViewHeader />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{record?.file_name || record?.id}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-4">
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">File name</h4>
              <p className="text-sm text-muted-foreground">{record?.file_name ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">File URL</h4>
              <p className="text-sm text-muted-foreground">{record?.file_url ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">File type</h4>
              <p className="text-sm text-muted-foreground">{record?.file_type ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Uploaded by</h4>
              <p className="text-sm text-muted-foreground">{record?.uploaded_by ?? '-'}</p>
            </div>

          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
}
