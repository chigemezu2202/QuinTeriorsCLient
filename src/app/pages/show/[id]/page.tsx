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

export default function PagesShow() {
  const { result: record, query } = useShow({ resource: "pages" });

  const { isLoading } = query;

  return (
    <ShowView>
      <ShowViewHeader />
<div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{record?.title || record?.id}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-4">
                <Badge variant={record?.is_published ? 'default' : 'secondary'}>{record?.is_published ? 'Published' : 'Not published'}</Badge>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Title</h4>
              <p className="text-sm text-muted-foreground">{record?.title ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Slug</h4>
              <p className="text-sm text-muted-foreground">{record?.slug ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Content</h4>
              <div className="prose prose-sm max-w-none text-muted-foreground">{record?.content || '-'}</div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Meta title</h4>
              <p className="text-sm text-muted-foreground">{record?.meta_title ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Meta description</h4>
              <div className="prose prose-sm max-w-none text-muted-foreground">{record?.meta_description || '-'}</div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Published</h4>
              <p className="text-sm text-muted-foreground">{record?.is_published ? 'Yes' : 'No'}</p>
            </div>

          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
}
