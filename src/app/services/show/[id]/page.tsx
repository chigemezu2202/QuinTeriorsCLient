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

export default function ServicesShow() {
  const { result: record, query } = useShow({});

  const { isLoading } = query;

  return (
    <ShowView>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{record?.name || record?.id}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-4">
                <Badge variant={record?.is_featured ? 'default' : 'secondary'}>{record?.is_featured ? 'Featured' : 'Not featured'}</Badge>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Name</h4>
              <p className="text-sm text-muted-foreground">{record?.name ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Slug</h4>
              <p className="text-sm text-muted-foreground">{record?.slug ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <div className="prose prose-sm max-w-none text-muted-foreground">{record?.description || '-'}</div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Image URL</h4>
              <p className="text-sm text-muted-foreground">{record?.image_url ?? '-'}</p>
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
