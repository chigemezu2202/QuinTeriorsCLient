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

export default function PortfolioShow() {
  const { result: record, query } = useShow({ resource: "portfolio" });

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
                <Badge variant={record?.is_featured ? 'default' : 'secondary'}>{record?.is_featured ? 'Featured' : 'Not featured'}</Badge>
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
              <h4 className="text-sm font-medium mb-2">Category</h4>
              <p className="text-sm text-muted-foreground">{record?.category ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Before image URL</h4>
              <p className="text-sm text-muted-foreground">{record?.before_image ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">After image URL</h4>
              <p className="text-sm text-muted-foreground">{record?.after_image ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <div className="prose prose-sm max-w-none text-muted-foreground">{record?.description || '-'}</div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Featured</h4>
              <p className="text-sm text-muted-foreground">{record?.is_featured ? 'Yes' : 'No'}</p>
            </div>

          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
}
