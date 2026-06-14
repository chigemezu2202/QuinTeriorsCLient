import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
"use client";

import { useShow, useOne } from "@refinedev/core";

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

export default function ServiceItemsShow() {
  const { result: record, query } = useShow({ resource: "service-items" });
  const {
    result: service,
    query: { isLoading: serviceIsLoading },
  } = useOne({
    resource: "services",
    id: record?.service_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { isLoading } = query;

  return (
    <ShowView>
      <ShowViewHeader />
<div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{record?.name || record?.id}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-4">
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Service</h4>
              <p className="text-sm text-muted-foreground">{serviceIsLoading ? 'Loading...' : service?.data?.title || record?.service_id || '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Name</h4>
              <p className="text-sm text-muted-foreground">{record?.name ?? '-'}</p>
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

          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
}
