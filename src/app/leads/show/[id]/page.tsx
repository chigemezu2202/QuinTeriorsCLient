"use client";

import { useShow, useOne } from "@refinedev/core";
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

export default function LeadsShow() {
  const { result: record, query } = useShow({ resource: "leads" });
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
              <h4 className="text-sm font-medium mb-2">Name</h4>
              <p className="text-sm text-muted-foreground">{record?.name ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Phone</h4>
              <p className="text-sm text-muted-foreground">{record?.phone ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Email</h4>
              <p className="text-sm text-muted-foreground">{record?.email ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Message</h4>
              <div className="prose prose-sm max-w-none text-muted-foreground">{record?.message || '-'}</div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Service</h4>
              <p className="text-sm text-muted-foreground">{serviceIsLoading ? 'Loading...' : service?.data?.title || record?.service_id || '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Status</h4>
              <p className="text-sm text-muted-foreground">{record?.status ?? '-'}</p>
            </div>

          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
}
