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

export default function SettingsShow() {
  const { result: record, query } = useShow({ resource: "settings" });

  const { isLoading } = query;

  return (
    <ShowView>
      <ShowViewHeader />
<div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{record?.site_name || record?.id}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-4">
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Site name</h4>
              <p className="text-sm text-muted-foreground">{record?.site_name ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Tagline</h4>
              <p className="text-sm text-muted-foreground">{record?.tagline ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Headline</h4>
              <p className="text-sm text-muted-foreground">{record?.headline ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Sub headline</h4>
              <p className="text-sm text-muted-foreground">{record?.sub_headline ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Phone</h4>
              <p className="text-sm text-muted-foreground">{record?.phone ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">WhatsApp</h4>
              <p className="text-sm text-muted-foreground">{record?.whatsapp ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Email</h4>
              <p className="text-sm text-muted-foreground">{record?.email ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Address</h4>
              <div className="prose prose-sm max-w-none text-muted-foreground">{record?.address || '-'}</div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">City</h4>
              <p className="text-sm text-muted-foreground">{record?.city ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">State</h4>
              <p className="text-sm text-muted-foreground">{record?.state ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Country</h4>
              <p className="text-sm text-muted-foreground">{record?.country ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Facebook URL</h4>
              <p className="text-sm text-muted-foreground">{record?.facebook_url ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">TikTok URL</h4>
              <p className="text-sm text-muted-foreground">{record?.tiktok_url ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Business hours (weekdays)</h4>
              <p className="text-sm text-muted-foreground">{record?.business_hours_weekdays ?? '-'}</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Business hours (Saturday)</h4>
              <p className="text-sm text-muted-foreground">{record?.business_hours_saturday ?? '-'}</p>
            </div>

          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
}
