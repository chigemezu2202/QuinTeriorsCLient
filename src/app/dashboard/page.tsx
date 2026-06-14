import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          { label: "Settings", href: "/settings" },
          { label: "Leads", href: "/leads" },
          { label: "Services", href: "/services" },
          { label: "Service Items", href: "/service-items" },
          { label: "Uploads", href: "/uploads" },
          { label: "Admins", href: "/admins" },
          { label: "Pages", href: "/pages" },
          { label: "Testimonials", href: "/testimonials" },
          { label: "Gallery", href: "/gallery" },
          { label: "Portfolio", href: "/portfolio" },
        ].map((item) => (
          <Card key={item.href} className="border">
            <CardHeader>
              <CardTitle>{item.label}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Access the full CRUD admin console for {item.label}.
              </p>
              <Link href={item.href}>
                <Button size="sm">Open {item.label}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <Separator />
      <div className="rounded-lg border bg-card p-4">
        <h2 className="text-lg font-semibold">Admin dashboard</h2>
        <p className="text-sm text-muted-foreground mt-2">
          This dashboard is wired to the QuinTeriors API and supports the main
          resource workflows defined for Settings, Leads, Services, Pages,
          Testimonials, Gallery, Portfolio, Uploads, Admins, and Service Items.
        </p>
      </div>
    </div>
  );
}
